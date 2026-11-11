import type { Question, StageResult } from './types';

export type AnswerFeedback = 'correct' | 'incorrect';

export type StageSession = {
  /** Questões pendentes; a primeira é a questão em exibição. */
  queue: readonly Question[];
  totalQuestions: number;
  /**
   * Resposta em construção: um id nas questões de escolha, ou os blocos na
   * ordem escolhida nas questões de ordenar.
   */
  answer: readonly string[];
  feedback: AnswerFeedback | null;
  missedQuestionIds: readonly string[];
};

export function createStageSession(questions: readonly Question[]): StageSession {
  return {
    queue: questions,
    totalQuestions: questions.length,
    answer: [],
    feedback: null,
    missedQuestionIds: [],
  };
}

/**
 * Nas questões de escolha, troca a opção escolhida. Nas de ordenar, adiciona o
 * bloco ao fim da resposta ou o remove, se ele já estiver nela.
 */
export function selectOption(
  session: StageSession,
  optionId: string,
): StageSession {
  const [question] = session.queue;
  if (!question || session.feedback) {
    return session;
  }
  if (question.type === 'code_order') {
    const answer = session.answer.includes(optionId)
      ? session.answer.filter(id => id !== optionId)
      : [...session.answer, optionId];
    return { ...session, answer };
  }
  return { ...session, answer: [optionId] };
}

/** A resposta pode ser verificada quando estiver completa. */
export function canCheckAnswer(session: StageSession): boolean {
  const [question] = session.queue;
  if (!question || session.feedback) {
    return false;
  }
  return question.type === 'code_order'
    ? session.answer.length === question.options.length
    : session.answer.length === 1;
}

export function isOptionCorrect(question: Question, optionId: string): boolean {
  return question.options.some(
    option => option.id === optionId && option.isCorrect,
  );
}

export function isAnswerCorrect(
  question: Question,
  answer: readonly string[],
): boolean {
  if (question.type === 'code_order') {
    return (
      answer.length === question.correctOrder.length &&
      answer.every((id, index) => id === question.correctOrder[index])
    );
  }
  return answer.length === 1 && isOptionCorrect(question, answer[0]);
}

export function checkAnswer(session: StageSession): StageSession {
  const [question] = session.queue;
  if (!question || !canCheckAnswer(session)) {
    return session;
  }

  const correct = isAnswerCorrect(question, session.answer);
  const alreadyMissed = session.missedQuestionIds.includes(question.id);

  return {
    ...session,
    feedback: correct ? 'correct' : 'incorrect',
    missedQuestionIds:
      correct || alreadyMissed
        ? session.missedQuestionIds
        : [...session.missedQuestionIds, question.id],
  };
}

/** Questões respondidas errado voltam para o fim da fila. */
export function advance(session: StageSession): StageSession {
  const [question, ...rest] = session.queue;
  if (!question || !session.feedback) {
    return session;
  }

  return {
    ...session,
    queue: session.feedback === 'correct' ? rest : [...rest, question],
    answer: [],
    feedback: null,
  };
}

export function isSessionFinished(session: StageSession): boolean {
  return session.totalQuestions > 0 && session.queue.length === 0;
}

export function getSessionProgress(session: StageSession): number {
  if (session.totalQuestions === 0) {
    return 0;
  }
  const answered =
    session.totalQuestions -
    session.queue.length +
    (session.feedback === 'correct' ? 1 : 0);
  return answered / session.totalQuestions;
}

export function getStageResult(session: StageSession): StageResult {
  return {
    firstTryCorrect: session.totalQuestions - session.missedQuestionIds.length,
    totalQuestions: session.totalQuestions,
  };
}

import type { Question, StageResult } from './types';

export type AnswerFeedback = 'correct' | 'incorrect';

export type StageSession = {
  /** Questões pendentes; a primeira é a questão em exibição. */
  queue: readonly Question[];
  totalQuestions: number;
  selectedOptionId: string | null;
  feedback: AnswerFeedback | null;
  missedQuestionIds: readonly string[];
};

export function createStageSession(questions: readonly Question[]): StageSession {
  return {
    queue: questions,
    totalQuestions: questions.length,
    selectedOptionId: null,
    feedback: null,
    missedQuestionIds: [],
  };
}

export function selectOption(
  session: StageSession,
  optionId: string,
): StageSession {
  return session.feedback
    ? session
    : { ...session, selectedOptionId: optionId };
}

export function isOptionCorrect(question: Question, optionId: string): boolean {
  return question.options.some(
    option => option.id === optionId && option.isCorrect,
  );
}

export function checkAnswer(session: StageSession): StageSession {
  const [question] = session.queue;
  if (!question || !session.selectedOptionId || session.feedback) {
    return session;
  }

  const correct = isOptionCorrect(question, session.selectedOptionId);
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
    selectedOptionId: null,
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

import {
  advance,
  checkAnswer,
  createStageSession,
  getSessionProgress,
  getStageResult,
  isSessionFinished,
  selectOption,
  type StageSession,
} from '../stageSession';
import type { Question } from '../types';

const question = (id: string): Question => ({
  id,
  type: 'multiple_choice',
  prompt: id,
  codeSnippet: null,
  explanation: '',
  options: [
    { id: `${id}-right`, text: 'certa', isCorrect: true },
    { id: `${id}-wrong`, text: 'errada', isCorrect: false },
  ],
});

const answer = (session: StageSession, optionId: string) =>
  advance(checkAnswer(selectOption(session, optionId)));

describe('sessão de uma etapa', () => {
  it('conclui quando todas as questões são respondidas corretamente', () => {
    let session = createStageSession([question('a'), question('b')]);
    session = answer(session, 'a-right');
    expect(isSessionFinished(session)).toBe(false);
    session = answer(session, 'b-right');
    expect(isSessionFinished(session)).toBe(true);
    expect(getStageResult(session)).toEqual({
      firstTryCorrect: 2,
      totalQuestions: 2,
    });
  });

  it('devolve a questão errada para o fim da fila', () => {
    const session = answer(
      createStageSession([question('a'), question('b')]),
      'a-wrong',
    );
    expect(session.queue.map(q => q.id)).toEqual(['b', 'a']);
    expect(session.selectedOptionId).toBeNull();
    expect(session.feedback).toBeNull();
  });

  it('conta um erro uma única vez por questão', () => {
    let session = createStageSession([question('a')]);
    session = answer(session, 'a-wrong');
    session = answer(session, 'a-wrong');
    session = answer(session, 'a-right');
    expect(isSessionFinished(session)).toBe(true);
    expect(getStageResult(session)).toEqual({
      firstTryCorrect: 0,
      totalQuestions: 1,
    });
  });

  it('não verifica sem uma opção selecionada', () => {
    const session = createStageSession([question('a')]);
    expect(checkAnswer(session)).toBe(session);
  });

  it('não permite trocar a resposta depois de verificar', () => {
    const checked = checkAnswer(
      selectOption(createStageSession([question('a')]), 'a-wrong'),
    );
    expect(selectOption(checked, 'a-right').selectedOptionId).toBe('a-wrong');
  });

  it('calcula o progresso e ignora respostas erradas', () => {
    const session = createStageSession([question('a'), question('b')]);
    expect(getSessionProgress(session)).toBe(0);
    expect(
      getSessionProgress(checkAnswer(selectOption(session, 'a-wrong'))),
    ).toBe(0);
    expect(
      getSessionProgress(checkAnswer(selectOption(session, 'a-right'))),
    ).toBe(0.5);
  });

  it('não considera concluída uma etapa sem questões', () => {
    expect(isSessionFinished(createStageSession([]))).toBe(false);
  });
});

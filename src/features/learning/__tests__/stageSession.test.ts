import {
  advance,
  checkAnswer,
  createStageSession,
  getSessionProgress,
  getStageResult,
  isSessionFinished,
  canCheckAnswer,
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
    expect(session.answer).toEqual([]);
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
    expect(selectOption(checked, 'a-right').answer).toEqual(['a-wrong']);
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

describe('questão de ordenar blocos', () => {
  const ordering: Question = {
    id: 'o',
    type: 'code_order',
    prompt: 'Ordene',
    codeSnippet: null,
    explanation: '',
    options: [
      { id: 'l2', text: 'b', isCorrect: true },
      { id: 'l1', text: 'a', isCorrect: true },
      { id: 'l3', text: 'c', isCorrect: true },
    ],
    correctOrder: ['l1', 'l2', 'l3'],
  };

  it('só permite verificar com todos os blocos posicionados', () => {
    let session = createStageSession([ordering]);
    session = selectOption(session, 'l1');
    session = selectOption(session, 'l2');
    expect(canCheckAnswer(session)).toBe(false);
    session = selectOption(session, 'l3');
    expect(session.answer).toEqual(['l1', 'l2', 'l3']);
    expect(canCheckAnswer(session)).toBe(true);
  });

  it('remove um bloco ao tocar nele de novo', () => {
    let session = createStageSession([ordering]);
    session = selectOption(session, 'l1');
    session = selectOption(session, 'l2');
    session = selectOption(session, 'l1');
    expect(session.answer).toEqual(['l2']);
  });

  it('aceita apenas a ordem correta', () => {
    const pick = (ids: string[]) =>
      ids.reduce(selectOption, createStageSession([ordering]));
    expect(checkAnswer(pick(['l1', 'l2', 'l3'])).feedback).toBe('correct');
    expect(checkAnswer(pick(['l2', 'l1', 'l3'])).feedback).toBe('incorrect');
  });
});

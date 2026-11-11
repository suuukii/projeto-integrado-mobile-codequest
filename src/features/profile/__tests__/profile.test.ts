import type { StageWithStatus } from '../../learning/types';
import { AVATARS, getAvatar } from '../avatars';
import { summarizeProgress } from '../progressSummary';

const stage = (
  id: string,
  status: StageWithStatus['status'],
): StageWithStatus => ({ id, position: 1, title: id, description: '', status });

describe('summarizeProgress', () => {
  it('conta etapas concluídas e soma os acertos de primeira', () => {
    const summary = summarizeProgress(
      [stage('a', 'completed'), stage('b', 'completed'), stage('c', 'current')],
      [
        { stageId: 'a', firstTryCorrect: 3, totalQuestions: 4 },
        { stageId: 'b', firstTryCorrect: 4, totalQuestions: 4 },
        { stageId: 'outra-trilha', firstTryCorrect: 9, totalQuestions: 9 },
      ],
    );
    expect(summary).toEqual({
      completedStages: 2,
      totalStages: 3,
      percent: 67,
      firstTryCorrect: 7,
      answeredQuestions: 8,
    });
  });

  it('lida com trilha vazia', () => {
    expect(summarizeProgress([], []).percent).toBe(0);
  });
});

describe('getAvatar', () => {
  it('encontra a foto pelo id', () => {
    expect(getAvatar('robot').emoji).toBe('🤖');
  });

  it('usa a foto padrão para id desconhecido ou ausente', () => {
    expect(getAvatar('nao-existe').id).toBe('snake');
    expect(getAvatar(null).id).toBe('snake');
  });

  it('tem ids únicos', () => {
    expect(new Set(AVATARS.map(avatar => avatar.id)).size).toBe(AVATARS.length);
  });
});

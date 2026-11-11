import { buildStagesWithStatus, countCompletedStages } from '../trackProgress';
import type { Stage } from '../types';

const stage = (position: number): Stage => ({
  id: `s${position}`,
  position,
  title: `Etapa ${position}`,
  description: '',
});

const stages = [stage(2), stage(1), stage(3)];
const statuses = (completed: string[]) =>
  buildStagesWithStatus(stages, new Set(completed)).map(s => s.status);

describe('buildStagesWithStatus', () => {
  it('libera somente a primeira etapa para quem está começando', () => {
    expect(statuses([])).toEqual(['current', 'locked', 'locked']);
  });

  it('avança a etapa atual conforme o progresso', () => {
    expect(statuses(['s1'])).toEqual(['completed', 'current', 'locked']);
  });

  it('não tem etapa atual quando a trilha termina', () => {
    expect(statuses(['s1', 's2', 's3'])).toEqual([
      'completed',
      'completed',
      'completed',
    ]);
  });

  it('ordena as etapas pela posição', () => {
    const ordered = buildStagesWithStatus(stages, new Set());
    expect(ordered.map(s => s.id)).toEqual(['s1', 's2', 's3']);
  });
});

describe('countCompletedStages', () => {
  it('conta apenas as etapas concluídas', () => {
    expect(
      countCompletedStages(buildStagesWithStatus(stages, new Set(['s1']))),
    ).toBe(1);
  });
});

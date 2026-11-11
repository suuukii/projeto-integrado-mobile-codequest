import type { Stage, StageWithStatus } from './types';

/**
 * Define o estado de cada etapa: a primeira não concluída é a atual e as
 * seguintes ficam bloqueadas.
 */
export function buildStagesWithStatus(
  stages: readonly Stage[],
  completedStageIds: ReadonlySet<string>,
): StageWithStatus[] {
  let currentAssigned = false;

  return [...stages]
    .sort((a, b) => a.position - b.position)
    .map(stage => {
      if (completedStageIds.has(stage.id)) {
        return { ...stage, status: 'completed' as const };
      }
      if (!currentAssigned) {
        currentAssigned = true;
        return { ...stage, status: 'current' as const };
      }
      return { ...stage, status: 'locked' as const };
    });
}

export function countCompletedStages(
  stages: readonly StageWithStatus[],
): number {
  return stages.filter(stage => stage.status === 'completed').length;
}

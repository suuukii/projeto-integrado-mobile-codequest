import type { StageProgress } from '../learning/progressService';
import type { StageWithStatus } from '../learning/types';

export type ProgressSummary = {
  completedStages: number;
  totalStages: number;
  /** Porcentagem inteira de etapas concluídas, de 0 a 100. */
  percent: number;
  firstTryCorrect: number;
  answeredQuestions: number;
};

/** Resume o progresso do usuário em uma trilha para exibir no perfil. */
export function summarizeProgress(
  stages: readonly StageWithStatus[],
  progress: readonly StageProgress[],
): ProgressSummary {
  const completedStages = stages.filter(
    stage => stage.status === 'completed',
  ).length;
  const totalStages = stages.length;
  const stageIds = new Set(stages.map(stage => stage.id));
  const results = progress.filter(row => stageIds.has(row.stageId));

  return {
    completedStages,
    totalStages,
    percent: totalStages
      ? Math.round((completedStages / totalStages) * 100)
      : 0,
    firstTryCorrect: results.reduce((sum, row) => sum + row.firstTryCorrect, 0),
    answeredQuestions: results.reduce(
      (sum, row) => sum + row.totalQuestions,
      0,
    ),
  };
}

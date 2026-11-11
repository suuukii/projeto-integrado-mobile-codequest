import type { StageRef } from '../features/learning/types';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: { notice?: string } | undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Track: undefined;
  /** `nextStages` são as etapas seguintes, usadas para avançar ao concluir. */
  Stage: { stageId: string; title: string; nextStages: StageRef[] };
  StageResult: {
    title: string;
    firstTryCorrect: number;
    totalQuestions: number;
    nextStages: StageRef[];
  };
};

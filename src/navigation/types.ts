import type { NavigatorScreenParams } from '@react-navigation/native';

import type { StageRef } from '../features/learning/types';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: { notice?: string } | undefined;
  Register: undefined;
};

/** Abas da barra inferior. */
export type MainTabParamList = {
  Learn: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  /** `nextStages` são as etapas seguintes, usadas para avançar ao concluir. */
  Stage: { stageId: string; title: string; nextStages: StageRef[] };
  StageResult: {
    title: string;
    firstTryCorrect: number;
    totalQuestions: number;
    nextStages: StageRef[];
  };
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: { notice?: string } | undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Track: undefined;
  Stage: { stageId: string; title: string };
  StageResult: { title: string; firstTryCorrect: number; totalQuestions: number };
};

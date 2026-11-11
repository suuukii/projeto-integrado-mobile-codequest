export type Stage = {
  id: string;
  position: number;
  title: string;
  description: string;
};

export type Track = {
  id: string;
  slug: string;
  title: string;
  description: string;
  stages: Stage[];
};

export type StageStatus = 'completed' | 'current' | 'locked';

export type StageWithStatus = Stage & {
  status: StageStatus;
};

export type QuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type MultipleChoiceQuestion = {
  id: string;
  type: 'multiple_choice';
  prompt: string;
  codeSnippet: string | null;
  explanation: string;
  options: QuestionOption[];
};

/** Novos formatos de questão entram nesta união. */
export type Question = MultipleChoiceQuestion;

/** Ilustração animada exibida no topo de um cartão de explicação. */
export type LessonVisual = 'mascot' | 'code' | 'points' | 'variable';

export type LessonCard = {
  id: string;
  visual: LessonVisual;
  title: string;
  body: string;
  codeSnippet: string | null;
  codeOutput: string | null;
  points: string[];
};

export type StageResult = {
  firstTryCorrect: number;
  totalQuestions: number;
};

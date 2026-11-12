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
  /** Nome da linguagem ensinada na trilha, como "Python". */
  languageName: string;
  stages: Stage[];
};

/** Referência mínima a uma etapa, usada para navegar entre elas. */
export type StageRef = { id: string; title: string };

export type StageStatus = 'completed' | 'current' | 'locked';

export type StageWithStatus = Stage & {
  status: StageStatus;
};

export type QuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type QuestionBase = {
  id: string;
  prompt: string;
  codeSnippet: string | null;
  explanation: string;
  options: QuestionOption[];
};

/** Escolher uma alternativa entre várias. */
export type MultipleChoiceQuestion = QuestionBase & { type: 'multiple_choice' };

/** Escolher o bloco que preenche a lacuna ___ do código. */
export type CodeCompletionQuestion = QuestionBase & { type: 'code_completion' };

/** Montar o código tocando nos blocos na ordem certa. */
export type CodeOrderQuestion = QuestionBase & {
  type: 'code_order';
  /** Ids das opções na ordem correta; `options` vem embaralhada. */
  correctOrder: string[];
};

/**
 * Escrever livremente o trecho que preenche a lacuna ___ do código. Cada opção
 * é uma resposta aceita; a primeira é a exibida como solução.
 */
export type CodeInputQuestion = QuestionBase & { type: 'code_input' };

/** Novos formatos de questão entram nesta união. */
export type Question =
  | MultipleChoiceQuestion
  | CodeCompletionQuestion
  | CodeOrderQuestion
  | CodeInputQuestion;

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

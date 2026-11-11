import type { AnswerFeedback } from '../stageSession';
import type { QuestionOption } from '../types';
import type { OptionState } from './OptionButton';

/** Estado visual de uma opção nas questões de escolha. */
export function getOptionState(
  option: QuestionOption,
  selectedOptionId: string | null,
  feedback: AnswerFeedback | null,
): OptionState {
  const isSelected = option.id === selectedOptionId;
  if (!feedback) {
    return isSelected ? 'selected' : 'idle';
  }
  if (option.isCorrect) {
    return 'correct';
  }
  return isSelected ? 'incorrect' : 'dimmed';
}

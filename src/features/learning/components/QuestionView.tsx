import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../../theme';
import type { AnswerFeedback } from '../stageSession';
import type { Question, QuestionOption } from '../types';
import { CodeBlock } from './CodeBlock';
import { OptionButton, type OptionState } from './OptionButton';

type QuestionViewProps = {
  question: Question;
  selectedOptionId: string | null;
  feedback: AnswerFeedback | null;
  onSelect: (optionId: string) => void;
};

function getOptionState(
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

export function QuestionView({
  question,
  selectedOptionId,
  feedback,
  onSelect,
}: QuestionViewProps) {
  return (
    <View>
      <Text style={styles.prompt}>{question.prompt}</Text>
      {question.codeSnippet && <CodeBlock code={question.codeSnippet} />}
      {question.options.map(option => (
        <OptionButton
          key={option.id}
          text={option.text}
          state={getOptionState(option, selectedOptionId, feedback)}
          disabled={feedback !== null}
          onPress={() => onSelect(option.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  prompt: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
});

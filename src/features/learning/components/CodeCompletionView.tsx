import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../theme';
import type { AnswerFeedback } from '../stageSession';
import type { CodeCompletionQuestion } from '../types';
import { CodeChip } from './CodeChip';
import { CodeWithBlank } from './CodeWithBlank';
import { getOptionState } from './optionState';

type CodeCompletionViewProps = {
  question: CodeCompletionQuestion;
  answer: readonly string[];
  feedback: AnswerFeedback | null;
  onSelect: (optionId: string) => void;
};

/** Código com uma lacuna que é preenchida pelo bloco escolhido. */
export function CodeCompletionView({
  question,
  answer,
  feedback,
  onSelect,
}: CodeCompletionViewProps) {
  const selected = question.options.find(option => option.id === answer[0]);

  return (
    <View>
      <CodeWithBlank
        code={question.codeSnippet ?? ''}
        fill={selected?.text ?? ''}
        feedback={feedback}
      />
      <View style={styles.chips}>
        {question.options.map(option => (
          <CodeChip
            key={option.id}
            code={option.text}
            state={getOptionState(option, answer[0] ?? null, feedback)}
            disabled={feedback !== null}
            onPress={() => onSelect(option.id)}
            accessibilityHint="Preenche a lacuna do código"
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});

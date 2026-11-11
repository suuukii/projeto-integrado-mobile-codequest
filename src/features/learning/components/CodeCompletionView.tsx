import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../../../theme';
import { splitAtBlank } from '../questionBlocks';
import type { AnswerFeedback } from '../stageSession';
import type { CodeCompletionQuestion } from '../types';
import { CodeChip } from './CodeChip';
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
  const parts = splitAtBlank(question.codeSnippet ?? '');
  const [before, after] = parts ?? [question.codeSnippet ?? '', ''];

  const blankStyle = !selected
    ? styles.blankEmpty
    : !feedback
    ? styles.blankFilled
    : feedback === 'correct'
    ? styles.blankCorrect
    : styles.blankIncorrect;

  return (
    <View>
      <View style={styles.codeBlock}>
        <Text style={styles.code}>
          {before}
          <Text style={[styles.blank, blankStyle]}>
            {selected ? ` ${selected.text} ` : ' ____ '}
          </Text>
          {after}
        </Text>
      </View>
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
  codeBlock: {
    backgroundColor: colors.sunken,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.surfaceRaised,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 17,
    lineHeight: 30,
    color: colors.text,
  },
  blank: { fontWeight: '700' },
  blankEmpty: { color: colors.textMuted, backgroundColor: colors.surface },
  blankFilled: { color: colors.text, backgroundColor: colors.primarySoft },
  blankCorrect: { color: colors.text, backgroundColor: colors.successSoft },
  blankIncorrect: { color: colors.text, backgroundColor: colors.errorSoft },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});

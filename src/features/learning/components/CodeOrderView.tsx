import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../../theme';
import type { AnswerFeedback } from '../stageSession';
import type { CodeOrderQuestion, QuestionOption } from '../types';
import { CodeBlock } from './CodeBlock';
import { CodeChip } from './CodeChip';
import type { OptionState } from './OptionButton';

type CodeOrderViewProps = {
  question: CodeOrderQuestion;
  answer: readonly string[];
  feedback: AnswerFeedback | null;
  onSelect: (optionId: string) => void;
};

/** Área onde o código é montado e, abaixo, os blocos ainda disponíveis. */
export function CodeOrderView({
  question,
  answer,
  feedback,
  onSelect,
}: CodeOrderViewProps) {
  const byId = new Map(question.options.map(option => [option.id, option]));
  const placed = answer
    .map(id => byId.get(id))
    .filter((option): option is QuestionOption => option !== undefined);
  const available = question.options.filter(
    option => !answer.includes(option.id),
  );

  const placedState = (index: number): OptionState => {
    if (!feedback) {
      return 'selected';
    }
    return answer[index] === question.correctOrder[index]
      ? 'correct'
      : 'incorrect';
  };

  const correctCode = question.correctOrder
    .map(id => byId.get(id)?.text ?? '')
    .join('\n');

  return (
    <View>
      {question.codeSnippet && <CodeBlock code={question.codeSnippet} />}

      <View style={styles.answerArea}>
        {placed.length === 0 ? (
          <Text style={styles.placeholder}>
            Toque nos blocos abaixo para montar o código.
          </Text>
        ) : (
          placed.map((option, index) => (
            <CodeChip
              key={option.id}
              code={option.text}
              lineNumber={index + 1}
              fullWidth
              state={placedState(index)}
              disabled={feedback !== null}
              onPress={() => onSelect(option.id)}
              accessibilityHint="Remove o bloco do código"
            />
          ))
        )}
      </View>

      {available.length > 0 && (
        <View style={styles.bank}>
          {available.map(option => (
            <CodeChip
              key={option.id}
              code={option.text}
              fullWidth
              state="idle"
              disabled={feedback !== null}
              onPress={() => onSelect(option.id)}
              accessibilityHint="Adiciona o bloco ao fim do código"
            />
          ))}
        </View>
      )}

      {feedback === 'incorrect' && (
        <View style={styles.solution}>
          <Text style={styles.solutionLabel}>Ordem correta</Text>
          <CodeBlock code={correctCode} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  answerArea: {
    minHeight: 120,
    backgroundColor: colors.sunken,
    borderRadius: radius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.sm,
    justifyContent: 'center',
  },
  placeholder: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
  bank: { gap: spacing.sm, marginTop: spacing.lg },
  solution: { marginTop: spacing.lg },
  solutionLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
});

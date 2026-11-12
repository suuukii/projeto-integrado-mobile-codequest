import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../../theme';
import type { AnswerFeedback } from '../stageSession';
import type { CodeInputQuestion } from '../types';
import { CodeBlock } from './CodeBlock';
import { CodeWithBlank } from './CodeWithBlank';

type CodeInputViewProps = {
  question: CodeInputQuestion;
  answer: readonly string[];
  feedback: AnswerFeedback | null;
  onChangeText: (text: string) => void;
};

/** Código com uma lacuna que o usuário preenche digitando. */
export function CodeInputView({
  question,
  answer,
  feedback,
  onChangeText,
}: CodeInputViewProps) {
  const [focused, setFocused] = useState(false);
  const typed = answer[0] ?? '';
  const solution = question.options[0]?.text ?? '';

  return (
    <View>
      <CodeWithBlank
        code={question.codeSnippet ?? ''}
        fill={typed}
        feedback={feedback}
      />
      <Text style={styles.label}>Sua resposta</Text>
      <TextInput
        accessibilityLabel="Código que preenche a lacuna"
        value={typed}
        onChangeText={onChangeText}
        editable={feedback === null}
        placeholder="Digite o código"
        placeholderTextColor={colors.textDisabled}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        spellCheck={false}
        returnKeyType="done"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          focused && styles.inputFocused,
          feedback === 'correct' && styles.inputCorrect,
          feedback === 'incorrect' && styles.inputIncorrect,
        ]}
      />
      {feedback === 'incorrect' && (
        <View style={styles.solution}>
          <Text style={styles.label}>Resposta esperada</Text>
          <CodeBlock code={solution} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  input: {
    minHeight: 52,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    fontFamily: 'monospace',
    fontSize: 17,
    color: colors.text,
  },
  inputFocused: { borderColor: colors.primary },
  inputCorrect: { borderColor: colors.success },
  inputIncorrect: { borderColor: colors.error },
  solution: { marginTop: spacing.lg },
});

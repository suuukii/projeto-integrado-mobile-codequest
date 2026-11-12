import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../../../theme';
import { splitAtBlank } from '../questionBlocks';
import type { AnswerFeedback } from '../stageSession';

type CodeWithBlankProps = {
  code: string;
  /** Texto que preenche a lacuna; vazio mostra a lacuna em aberto. */
  fill: string;
  feedback: AnswerFeedback | null;
};

/** Código com a lacuna ___ destacada e preenchida pela resposta atual. */
export function CodeWithBlank({ code, fill, feedback }: CodeWithBlankProps) {
  const [before, after] = splitAtBlank(code) ?? [code, ''];
  const filled = fill.trim().length > 0;

  const blankStyle = !filled
    ? styles.blankEmpty
    : !feedback
    ? styles.blankFilled
    : feedback === 'correct'
    ? styles.blankCorrect
    : styles.blankIncorrect;

  return (
    <View style={styles.codeBlock}>
      <Text style={styles.code}>
        {before}
        <Text style={[styles.blank, blankStyle]}>
          {filled ? ` ${fill} ` : ' ____ '}
        </Text>
        {after}
      </Text>
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
});

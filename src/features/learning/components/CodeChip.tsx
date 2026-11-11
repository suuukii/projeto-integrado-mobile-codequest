import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../../../theme';
import { optionStateStyles, type OptionState } from './OptionButton';

type CodeChipProps = {
  code: string;
  state: OptionState;
  disabled: boolean;
  onPress: () => void;
  /** Número da linha, exibido nos blocos já posicionados. */
  lineNumber?: number;
  /** Ocupa a largura toda, como uma linha de código. */
  fullWidth?: boolean;
  accessibilityHint?: string;
};

/** Bloco de código tocável usado nas questões de completar e de ordenar. */
export function CodeChip({
  code,
  state,
  disabled,
  onPress,
  lineNumber,
  fullWidth = false,
  accessibilityHint,
}: CodeChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={code}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ selected: state === 'selected', disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        optionStateStyles[state],
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.row}>
        {lineNumber !== undefined && (
          <Text style={styles.lineNumber}>{lineNumber}</Text>
        )}
        <Text style={[styles.code, state === 'dimmed' && styles.dimmed]}>
          {code}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.sm,
    borderWidth: 2,
    borderBottomWidth: 4,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  fullWidth: { alignSelf: 'stretch' },
  pressed: { opacity: 0.75 },
  row: { flexDirection: 'row', alignItems: 'center' },
  lineNumber: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: colors.textDisabled,
    width: 22,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    flexShrink: 1,
  },
  dimmed: { color: colors.textDisabled },
});

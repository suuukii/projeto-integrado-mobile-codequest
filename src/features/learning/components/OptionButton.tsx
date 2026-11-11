import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing, typography } from '../../../theme';

export type OptionState =
  | 'idle'
  | 'selected'
  | 'correct'
  | 'incorrect'
  | 'dimmed';

type OptionButtonProps = {
  text: string;
  state: OptionState;
  disabled: boolean;
  onPress: () => void;
};

export function OptionButton({
  text,
  state,
  disabled,
  onPress,
}: OptionButtonProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={text}
      accessibilityState={{
        selected: state === 'selected',
        disabled,
      }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        stateStyles[state],
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, state === 'dimmed' && styles.textDimmed]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    minHeight: 54,
    justifyContent: 'center',
    borderRadius: radius.md,
    borderWidth: 2,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  pressed: { opacity: 0.75 },
  text: { ...typography.body, color: colors.text },
  textDimmed: { color: colors.textDisabled },
});

const stateStyles = StyleSheet.create({
  idle: { backgroundColor: colors.surface, borderColor: colors.border },
  selected: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  correct: { backgroundColor: colors.successSoft, borderColor: colors.success },
  incorrect: { backgroundColor: colors.errorSoft, borderColor: colors.error },
  dimmed: { backgroundColor: colors.background, borderColor: colors.surface },
});

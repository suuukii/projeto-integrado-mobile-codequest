import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../../theme';
import { getPasswordStrength } from '../passwordStrength';

const SEGMENTS = [1, 2, 3, 4] as const;

const LEVEL_COLORS = {
  0: colors.surfaceRaised,
  1: colors.error,
  2: colors.warning,
  3: colors.primary,
  4: colors.success,
} as const;

type PasswordStrengthMeterProps = {
  password: string;
};

export function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps) {
  const { level, label } = getPasswordStrength(password);

  return (
    <View style={styles.container}>
      <View style={styles.segments}>
        {SEGMENTS.map(segment => (
          <View
            key={segment}
            style={[
              styles.segment,
              {
                backgroundColor:
                  segment <= level ? LEVEL_COLORS[level] : colors.surfaceRaised,
              },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.label, { color: LEVEL_COLORS[level] }]}>
        {label ? `Força da senha: ${label}` : ' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.sm },
  segments: { flexDirection: 'row', gap: spacing.xs },
  segment: { flex: 1, height: 8, borderRadius: radius.round },
  label: { ...typography.label, marginTop: spacing.xs },
});

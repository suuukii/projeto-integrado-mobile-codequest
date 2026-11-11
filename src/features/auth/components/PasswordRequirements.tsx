import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../../theme';
import { PASSWORD_RULES } from '../validation';

type PasswordRequirementsProps = {
  password: string;
};

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <View style={styles.container}>
      {PASSWORD_RULES.map(rule => {
        const met = rule.isMet(password);
        return (
          <Text
            key={rule.id}
            style={[styles.rule, met ? styles.met : styles.unmet]}
          >
            {met ? '✓' : '○'} {rule.label}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  rule: { ...typography.caption, marginBottom: 2 },
  met: { color: colors.success },
  unmet: { color: colors.textMuted },
});

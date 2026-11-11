import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined';
  loading?: boolean;
  disabled?: boolean;
};

export function PrimaryButton({
  title,
  onPress,
  variant = 'filled',
  loading = false,
  disabled = false,
}: PrimaryButtonProps) {
  const isInactive = disabled || loading;
  const isFilled = variant === 'filled';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isInactive }}
      disabled={isInactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isFilled ? styles.filled : styles.outlined,
        pressed && (isFilled ? styles.filledPressed : styles.outlinedPressed),
        isInactive && styles.inactive,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            color={isFilled ? colors.onPrimary : colors.primary}
          />
        ) : (
          <Text style={isFilled ? styles.filledText : styles.outlinedText}>
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: radius.md,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  content: { alignItems: 'center' },
  filled: {
    backgroundColor: colors.primary,
    borderBottomWidth: 4,
    borderBottomColor: colors.primaryEdge,
  },
  filledPressed: {
    backgroundColor: colors.primaryPressed,
    borderBottomWidth: 1,
    marginTop: 3,
  },
  outlined: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  outlinedPressed: { backgroundColor: colors.primarySoft },
  inactive: { opacity: 0.55 },
  filledText: {
    ...typography.body,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  outlinedText: {
    ...typography.body,
    fontWeight: '800',
    color: colors.primary,
  },
});

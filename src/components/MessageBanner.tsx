import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type MessageBannerProps = {
  message: string;
  tone?: 'error' | 'success';
};

export function MessageBanner({ message, tone = 'error' }: MessageBannerProps) {
  const isError = tone === 'error';
  return (
    <View
      accessibilityLiveRegion="polite"
      style={[styles.banner, isError ? styles.error : styles.success]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  error: { backgroundColor: colors.errorSoft, borderColor: colors.error },
  success: { backgroundColor: colors.successSoft, borderColor: colors.success },
  text: { ...typography.label, color: colors.text },
});

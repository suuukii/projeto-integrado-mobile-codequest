import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../../../theme';

type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <View style={styles.block}>
      <Text style={styles.code}>{code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
});

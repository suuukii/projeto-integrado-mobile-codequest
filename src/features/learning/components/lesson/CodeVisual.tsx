import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../../../theme';
import { getTypingDuration } from '../../lessonVisuals';

type CodeVisualProps = {
  code: string;
  output: string | null;
  animate: boolean;
};

/** Digita o código caractere por caractere e depois mostra a saída. */
export function CodeVisual({ code, output, animate }: CodeVisualProps) {
  const [typed, setTyped] = useState(animate ? 0 : code.length);
  const outputOpacity = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const done = typed >= code.length;

  useEffect(() => {
    if (!animate) {
      return;
    }
    const step = getTypingDuration(code) / Math.max(code.length, 1);
    const timer = setInterval(() => {
      setTyped(current => {
        if (current >= code.length) {
          clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, step);
    return () => clearInterval(timer);
  }, [animate, code]);

  useEffect(() => {
    if (done && animate) {
      Animated.timing(outputOpacity, {
        toValue: 1,
        duration: 350,
        delay: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [done, animate, outputOpacity]);

  return (
    <View style={styles.window}>
      <View style={styles.titleBar}>
        <View style={[styles.light, styles.lightRed]} />
        <View style={[styles.light, styles.lightYellow]} />
        <View style={[styles.light, styles.lightGreen]} />
        <Text style={styles.fileName}>main.py</Text>
      </View>
      <Text style={styles.code}>
        {code.slice(0, typed)}
        {!done && <Text style={styles.cursor}>▌</Text>}
      </Text>
      {output !== null && (
        <Animated.View
          style={[
            styles.output,
            {
              opacity: outputOpacity,
              transform: [
                {
                  translateY: outputOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.outputLabel}>Saída</Text>
          <Text style={styles.outputText}>{output}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const MONO = { fontFamily: 'monospace', fontSize: 15, lineHeight: 22 } as const;

const styles = StyleSheet.create({
  window: {
    backgroundColor: colors.sunken,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.surfaceRaised,
    overflow: 'hidden',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  light: { width: 10, height: 10, borderRadius: 5 },
  lightRed: { backgroundColor: colors.error },
  lightYellow: { backgroundColor: colors.warning },
  lightGreen: { backgroundColor: colors.success },
  fileName: { ...typography.caption, color: colors.textMuted, marginLeft: spacing.sm },
  code: { ...MONO, color: colors.text, padding: spacing.md, minHeight: 60 },
  cursor: { color: colors.primary },
  output: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceRaised,
    padding: spacing.md,
  },
  outputLabel: { ...typography.caption, color: colors.primary, fontWeight: '700' },
  outputText: { ...MONO, color: colors.success },
});

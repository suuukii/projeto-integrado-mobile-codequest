import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../../../../theme';
import type { Assignment } from '../../lessonVisuals';

type VariableVisualProps = {
  assignment: Assignment;
  animate: boolean;
};

/** Uma caixa com o nome da variável recebe o valor, que cai dentro dela. */
export function VariableVisual({ assignment, animate }: VariableVisualProps) {
  const drop = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const glow = useRef(new Animated.Value(animate ? 0 : 1)).current;

  useEffect(() => {
    if (!animate) {
      return;
    }
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(drop, {
        toValue: 1,
        duration: 700,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(glow, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animate, drop, glow]);

  return (
    <View style={styles.container}>
      <Text style={styles.code}>
        <Text style={styles.name}>{assignment.name}</Text>
        {' = '}
        <Text style={styles.value}>{assignment.value}</Text>
      </Text>

      <View style={styles.stage}>
        <Animated.View
          style={[
            styles.valueChip,
            {
              opacity: drop.interpolate({
                inputRange: [0, 0.2, 1],
                outputRange: [0, 1, 1],
              }),
              transform: [
                {
                  translateY: drop.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.valueChipText}>{assignment.value}</Text>
        </Animated.View>

        <View style={styles.box}>
          <Animated.View style={[styles.boxGlow, { opacity: glow }]} />
          <View style={styles.label}>
            <Text style={styles.labelText}>{assignment.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const BOX_WIDTH = 170;

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  code: {
    fontFamily: 'monospace',
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  name: { color: colors.primary, fontWeight: '700' },
  value: { color: colors.success },
  stage: { width: BOX_WIDTH, height: 150, alignItems: 'center', justifyContent: 'flex-end' },
  valueChip: {
    position: 'absolute',
    bottom: 54,
    zIndex: 1,
    backgroundColor: colors.success,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  valueChipText: {
    fontFamily: 'monospace',
    fontSize: 22,
    fontWeight: '700',
    color: colors.sunken,
  },
  box: {
    width: BOX_WIDTH,
    height: 90,
    borderWidth: 4,
    borderTopWidth: 0,
    borderColor: colors.primary,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  boxGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.primarySoft,
  },
  label: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginBottom: spacing.sm,
  },
  labelText: {
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: '700',
    color: colors.onPrimary,
  },
});

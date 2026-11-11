import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../../../theme';

type PointsVisualProps = {
  points: string[];
  animate: boolean;
};

/** Tópicos que entram um de cada vez, deslizando da esquerda. */
export function PointsVisual({ points, animate }: PointsVisualProps) {
  const progress = useRef(
    points.map(() => new Animated.Value(animate ? 0 : 1)),
  ).current;

  useEffect(() => {
    if (!animate) {
      return;
    }
    Animated.stagger(
      180,
      progress.map(value =>
        Animated.spring(value, {
          toValue: 1,
          friction: 7,
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, [animate, progress]);

  return (
    <View style={styles.list}>
      {points.map((point, index) => (
        <Animated.View
          key={point}
          style={[
            styles.item,
            {
              opacity: progress[index],
              transform: [
                {
                  translateX: progress[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{index + 1}</Text>
          </View>
          <Text style={styles.text}>{point}</Text>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.sm },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.surfaceRaised,
    padding: spacing.md,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  badgeText: { ...typography.label, color: colors.onPrimary, fontWeight: '800' },
  text: { ...typography.body, color: colors.text, flex: 1 },
});

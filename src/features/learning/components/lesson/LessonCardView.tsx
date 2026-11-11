import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text } from 'react-native';

import { useReducedMotion } from '../../../../hooks/useReducedMotion';
import { colors, spacing, typography } from '../../../../theme';
import { parseAssignment } from '../../lessonVisuals';
import type { LessonCard } from '../../types';
import { CodeVisual } from './CodeVisual';
import { MascotVisual } from './MascotVisual';
import { PointsVisual } from './PointsVisual';
import { VariableVisual } from './VariableVisual';

type LessonCardViewProps = {
  card: LessonCard;
};

/** Um cartão de explicação: visual animado, título e texto. */
export function LessonCardView({ card }: LessonCardViewProps) {
  const animate = !useReducedMotion();
  const entrance = useRef(new Animated.Value(animate ? 0 : 1)).current;

  useEffect(() => {
    if (animate) {
      Animated.timing(entrance, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }).start();
    }
  }, [animate, entrance]);

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{
          opacity: entrance,
          transform: [
            {
              translateY: entrance.interpolate({
                inputRange: [0, 1],
                outputRange: [24, 0],
              }),
            },
          ],
        }}
      >
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.body}>{card.body}</Text>
      </Animated.View>
      <LessonVisualView card={card} animate={animate} />
    </ScrollView>
  );
}

function LessonVisualView({
  card,
  animate,
}: {
  card: LessonCard;
  animate: boolean;
}) {
  switch (card.visual) {
    case 'mascot':
      return <MascotVisual animate={animate} />;
    case 'points':
      return <PointsVisual points={card.points} animate={animate} />;
    case 'code':
      return card.codeSnippet ? (
        <CodeVisual
          code={card.codeSnippet}
          output={card.codeOutput}
          animate={animate}
        />
      ) : null;
    case 'variable': {
      const assignment = parseAssignment(card.codeSnippet);
      return assignment ? (
        <VariableVisual assignment={assignment} animate={animate} />
      ) : null;
    }
  }
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingBottom: spacing.lg },
  title: { ...typography.title, color: colors.text },
  body: {
    ...typography.body,
    fontSize: 17,
    lineHeight: 25,
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});

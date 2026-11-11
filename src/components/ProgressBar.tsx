import { StyleSheet, View } from 'react-native';

import { colors, radius } from '../theme';

type ProgressBarProps = {
  /** Valor entre 0 e 1. */
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percent }}
      style={styles.track}
    >
      <View style={[styles.fill, { width: `${percent}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    height: 12,
    borderRadius: radius.round,
    backgroundColor: colors.surfaceRaised,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.round,
    backgroundColor: colors.primary,
  },
});

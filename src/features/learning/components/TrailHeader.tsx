import { StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '../../../components/ProgressBar';
import { colors, radius, spacing, typography } from '../../../theme';
import type { StageWithStatus } from '../types';

type TrailHeaderProps = {
  trackTitle: string;
  currentStage: StageWithStatus | undefined;
  completedCount: number;
  totalCount: number;
};

export function TrailHeader({
  trackTitle,
  currentStage,
  completedCount,
  totalCount,
}: TrailHeaderProps) {
  return (
    <View style={styles.card}>
      <View style={styles.face}>
        <Text style={styles.track}>{trackTitle}</Text>
        <Text style={styles.stage} numberOfLines={2}>
          {currentStage
            ? `${currentStage.position}. ${currentStage.title}`
            : 'Trilha concluída!'}
        </Text>
        <View style={styles.progressRow}>
          <ProgressBar
            progress={totalCount ? completedCount / totalCount : 0}
          />
          <Text style={styles.count}>
            {completedCount}/{totalCount}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primarySoftEdge,
    borderRadius: radius.lg + 4,
    padding: 4,
    paddingBottom: 9,
  },
  face: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  track: { ...typography.label, color: colors.textMuted },
  stage: {
    fontFamily: 'monospace',
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  progressRow: { flexDirection: 'row', alignItems: 'center' },
  count: { ...typography.label, color: colors.text, marginLeft: spacing.md },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../../theme';
import type { StageStatus, StageWithStatus } from '../types';

type StageCardProps = {
  stage: StageWithStatus;
  isLast: boolean;
  onPress: (stage: StageWithStatus) => void;
};

const STATUS_LABELS: Record<StageStatus, string> = {
  completed: 'Concluída',
  current: 'Etapa atual',
  locked: 'Bloqueada',
};

const MARKERS: Record<StageStatus, (position: number) => string> = {
  completed: () => '✓',
  current: position => String(position),
  locked: () => '🔒',
};

export function StageCard({ stage, isLast, onPress }: StageCardProps) {
  const { status } = stage;
  const isLocked = status === 'locked';

  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View style={[styles.marker, markerStyles[status]]}>
          <Text style={[styles.markerText, markerTextStyles[status]]}>
            {MARKERS[status](stage.position)}
          </Text>
        </View>
        {!isLast && (
          <View
            style={[
              styles.connector,
              status === 'completed' && styles.connectorDone,
            ]}
          />
        )}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${stage.title}, ${STATUS_LABELS[status]}`}
        accessibilityState={{ disabled: isLocked }}
        disabled={isLocked}
        onPress={() => onPress(stage)}
        style={({ pressed }) => [
          styles.card,
          status === 'current' && styles.cardCurrent,
          isLocked && styles.cardLocked,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={[styles.status, statusTextStyles[status]]}>
          {STATUS_LABELS[status]}
        </Text>
        <Text style={[styles.title, isLocked && styles.textLocked]}>
          {stage.title}
        </Text>
        <Text style={[styles.description, isLocked && styles.textLocked]}>
          {stage.description}
        </Text>
      </Pressable>
    </View>
  );
}

const MARKER_SIZE = 44;

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rail: { width: MARKER_SIZE, alignItems: 'center', marginRight: spacing.md },
  marker: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: { ...typography.body, fontWeight: '800' },
  connector: {
    flex: 1,
    width: 4,
    backgroundColor: colors.surfaceRaised,
  },
  connectorDone: { backgroundColor: colors.primary },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardCurrent: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  cardLocked: { backgroundColor: colors.background },
  cardPressed: { opacity: 0.75 },
  status: { ...typography.caption, fontWeight: '700' },
  title: { ...typography.heading, color: colors.text },
  description: { ...typography.caption, color: colors.textMuted },
  textLocked: { color: colors.textDisabled },
});

const markerStyles = StyleSheet.create({
  completed: { backgroundColor: colors.primary },
  current: {
    backgroundColor: colors.primarySoft,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  locked: { backgroundColor: colors.surfaceRaised },
});

const markerTextStyles = StyleSheet.create({
  completed: { color: colors.onPrimary },
  current: { color: colors.text },
  locked: { color: colors.textDisabled },
});

const statusTextStyles = StyleSheet.create({
  completed: { color: colors.success },
  current: { color: colors.primary },
  locked: { color: colors.textDisabled },
});

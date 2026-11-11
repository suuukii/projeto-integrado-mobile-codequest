import { Pressable, StyleSheet, View } from 'react-native';

import { colors } from '../../../theme';
import type { StageStatus, StageWithStatus } from '../types';
import { CheckIcon, LockIcon, PlayIcon } from './TrailIcons';

export const TRAIL_NODE_SIZE = 88;
const EDGE = 5;
const DEPTH = 6;
const RING_GAP = 7;
const RING_WIDTH = 3;

const STATUS_LABELS: Record<StageStatus, string> = {
  completed: 'concluída',
  current: 'etapa atual',
  locked: 'bloqueada',
};

const PALETTE: Record<StageStatus, { face: string; edge: string }> = {
  completed: { face: colors.primary, edge: colors.primaryEdge },
  current: { face: colors.primarySoft, edge: colors.primarySoftEdge },
  locked: { face: colors.sunken, edge: colors.surfaceRaised },
};

type TrailNodeProps = {
  stage: StageWithStatus;
  onPress: (stage: StageWithStatus) => void;
};

export function TrailNode({ stage, onPress }: TrailNodeProps) {
  const { status } = stage;
  const { face, edge } = PALETTE[status];
  const isLocked = status === 'locked';

  return (
    <View style={styles.wrapper}>
      {status === 'current' && <View style={styles.ring} />}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Etapa ${stage.position}: ${stage.title}, ${STATUS_LABELS[status]}`}
        accessibilityState={{ disabled: isLocked }}
        disabled={isLocked}
        onPress={() => onPress(stage)}
        style={({ pressed }) => [
          styles.block,
          { backgroundColor: edge },
          pressed && styles.blockPressed,
        ]}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.face,
              { backgroundColor: face },
              pressed && styles.facePressed,
            ]}
          >
            {status === 'completed' && <CheckIcon color={colors.onPrimary} />}
            {status === 'current' && <PlayIcon color={colors.text} />}
            {isLocked && (
              <LockIcon color={colors.surfaceRaised} holeColor={face} />
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const FACE_RADIUS = 24;

const styles = StyleSheet.create({
  wrapper: {
    width: TRAIL_NODE_SIZE,
    height: TRAIL_NODE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: TRAIL_NODE_SIZE + RING_GAP * 2,
    height: TRAIL_NODE_SIZE + RING_GAP * 2,
    borderRadius: FACE_RADIUS + EDGE + RING_GAP,
    borderWidth: RING_WIDTH,
    borderColor: colors.primary,
  },
  block: {
    width: TRAIL_NODE_SIZE,
    height: TRAIL_NODE_SIZE,
    borderRadius: FACE_RADIUS + EDGE,
    padding: EDGE,
    paddingBottom: EDGE + DEPTH,
  },
  blockPressed: { paddingBottom: EDGE + 2, paddingTop: EDGE + DEPTH - 2 },
  face: {
    flex: 1,
    borderRadius: FACE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facePressed: { opacity: 0.9 },
});

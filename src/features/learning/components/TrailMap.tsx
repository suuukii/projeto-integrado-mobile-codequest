import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../../theme';
import { buildTrailLayout } from '../trailLayout';
import type { StageWithStatus } from '../types';
import { TrailConnectorView } from './TrailConnectorView';
import { TRAIL_NODE_SIZE, TrailNode } from './TrailNode';

const LINE_WIDTH = 7;
const DOT_SPACING = 56;
const DOT_SIZE = 8;

const LAYOUT_OPTIONS = {
  nodeSize: TRAIL_NODE_SIZE,
  rowSpacing: 140,
  paddingTop: 32,
  paddingBottom: 48,
  lineWidth: LINE_WIDTH,
  cornerRadius: 26,
};

type TrailMapProps = {
  stages: StageWithStatus[];
  width: number;
  onStagePress: (stage: StageWithStatus) => void;
};

export function TrailMap({ stages, width, onStagePress }: TrailMapProps) {
  const layout = useMemo(
    () => buildTrailLayout(stages.length, { ...LAYOUT_OPTIONS, width }),
    [stages.length, width],
  );

  const dots = useMemo(() => buildDots(width, layout.height), [
    width,
    layout.height,
  ]);

  return (
    <View style={{ width, height: layout.height }}>
      {dots.map(dot => (
        <View
          key={`${dot.x}-${dot.y}`}
          style={[styles.dot, { left: dot.x, top: dot.y }]}
        />
      ))}

      {layout.connectors.map(connector => (
        <TrailConnectorView
          key={connector.fromIndex}
          shapes={connector.shapes}
          lineWidth={LINE_WIDTH}
          color={
            stages[connector.fromIndex].status === 'completed'
              ? colors.primary
              : colors.surfaceRaised
          }
        />
      ))}

      {stages.map((stage, index) => (
        <View
          key={stage.id}
          style={[
            styles.node,
            {
              left: layout.nodes[index].x - TRAIL_NODE_SIZE / 2,
              top: layout.nodes[index].y - TRAIL_NODE_SIZE / 2,
            },
          ]}
        >
          <TrailNode stage={stage} onPress={onStagePress} />
        </View>
      ))}
    </View>
  );
}

function buildDots(width: number, height: number) {
  const dots: { x: number; y: number }[] = [];
  const offset = (width % DOT_SPACING) / 2 + DOT_SPACING / 2;
  for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
    for (let x = offset; x < width; x += DOT_SPACING) {
      dots.push({ x: x - DOT_SIZE / 2, y: y - DOT_SIZE / 2 });
    }
  }
  return dots;
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.trailDot,
  },
  node: { position: 'absolute' },
});

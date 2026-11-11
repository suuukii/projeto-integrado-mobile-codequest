import { StyleSheet, View, type ViewStyle } from 'react-native';

import type { ArcCorner, ConnectorShape } from '../trailLayout';

type TrailConnectorViewProps = {
  shapes: ConnectorShape[];
  color: string;
  lineWidth: number;
};

export function TrailConnectorView({
  shapes,
  color,
  lineWidth,
}: TrailConnectorViewProps) {
  return (
    <>
      {shapes.map((shape, index) =>
        shape.kind === 'line' ? (
          <View
            key={index}
            style={[
              styles.shape,
              {
                left: shape.left,
                top: shape.top,
                width: shape.width,
                height: shape.height,
                backgroundColor: color,
              },
            ]}
          />
        ) : (
          <View
            key={index}
            style={[
              styles.shape,
              {
                left: shape.left,
                top: shape.top,
                width: shape.size,
                height: shape.size,
                borderColor: color,
              },
              arcStyle(shape.corner, shape.size, lineWidth),
            ]}
          />
        ),
      )}
    </>
  );
}

/** Desenha um quarto de círculo usando duas bordas e um canto arredondado. */
function arcStyle(corner: ArcCorner, size: number, width: number): ViewStyle {
  switch (corner) {
    case 'topLeft':
      return {
        borderTopWidth: width,
        borderLeftWidth: width,
        borderTopLeftRadius: size,
      };
    case 'topRight':
      return {
        borderTopWidth: width,
        borderRightWidth: width,
        borderTopRightRadius: size,
      };
    case 'bottomLeft':
      return {
        borderBottomWidth: width,
        borderLeftWidth: width,
        borderBottomLeftRadius: size,
      };
    case 'bottomRight':
      return {
        borderBottomWidth: width,
        borderRightWidth: width,
        borderBottomRightRadius: size,
      };
  }
}

const styles = StyleSheet.create({
  shape: { position: 'absolute' },
});

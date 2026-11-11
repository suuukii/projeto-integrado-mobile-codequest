/**
 * Calcula a posição dos blocos da trilha em zigue-zague e os traços que os
 * ligam. Cada ligação é um "L" com a curva arredondada.
 */

export type TrailColumn = 'left' | 'center' | 'right';

export type Point = { x: number; y: number };

export type ArcCorner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type ConnectorShape =
  | { kind: 'line'; left: number; top: number; width: number; height: number }
  | { kind: 'arc'; left: number; top: number; size: number; corner: ArcCorner };

export type TrailConnector = {
  /** Índice do bloco de onde a ligação sai. */
  fromIndex: number;
  shapes: ConnectorShape[];
};

export type TrailLayout = {
  nodes: Point[];
  connectors: TrailConnector[];
  height: number;
};

export type TrailLayoutOptions = {
  width: number;
  nodeSize: number;
  rowSpacing: number;
  paddingTop: number;
  paddingBottom: number;
  lineWidth: number;
  cornerRadius: number;
};

const COLUMN_PATTERN: readonly TrailColumn[] = [
  'center',
  'right',
  'center',
  'left',
];

const COLUMN_POSITION: Record<TrailColumn, number> = {
  left: 0.22,
  center: 0.5,
  right: 0.78,
};

export function getTrailColumn(index: number): TrailColumn {
  return COLUMN_PATTERN[index % COLUMN_PATTERN.length];
}

export function buildTrailLayout(
  count: number,
  options: TrailLayoutOptions,
): TrailLayout {
  const { width, nodeSize, rowSpacing, paddingTop, paddingBottom } = options;

  const nodes = Array.from({ length: count }, (_, index) => ({
    x: Math.round(width * COLUMN_POSITION[getTrailColumn(index)]),
    y: paddingTop + nodeSize / 2 + index * rowSpacing,
  }));

  const connectors = nodes.slice(1).map((to, index) => ({
    fromIndex: index,
    shapes: buildConnectorShapes(
      nodes[index],
      to,
      getTrailColumn(index) === 'center',
      options,
    ),
  }));

  const height =
    count === 0
      ? 0
      : paddingTop + nodeSize + (count - 1) * rowSpacing + paddingBottom;

  return { nodes, connectors, height };
}

/**
 * Saindo de um bloco central, a linha segue primeiro na horizontal e depois
 * desce. Saindo de um bloco lateral, desce primeiro e depois segue na
 * horizontal até o bloco seguinte.
 */
export function buildConnectorShapes(
  from: Point,
  to: Point,
  horizontalFirst: boolean,
  { lineWidth, cornerRadius }: Pick<TrailLayoutOptions, 'lineWidth' | 'cornerRadius'>,
): ConnectorShape[] {
  const half = lineWidth / 2;

  if (from.x === to.x) {
    return [
      vertical(from.x, from.y, to.y, half),
    ];
  }

  const dx = Math.sign(to.x - from.x);
  const radius = Math.min(
    cornerRadius,
    Math.abs(to.x - from.x),
    Math.abs(to.y - from.y),
  );
  const arcSize = radius + half;
  // As retas avançam 1px sob a curva para não deixar uma emenda visível.
  const joint = Math.max(radius - 1, 0);

  if (horizontalFirst) {
    const corner = { x: to.x, y: from.y };
    return [
      horizontal(from.x, corner.x - dx * joint, from.y, half),
      {
        kind: 'arc',
        corner: dx > 0 ? 'topRight' : 'topLeft',
        size: arcSize,
        left: dx > 0 ? corner.x + half - arcSize : corner.x - half,
        top: corner.y - half,
      },
      vertical(corner.x, corner.y + joint, to.y, half),
    ];
  }

  const corner = { x: from.x, y: to.y };
  return [
    vertical(from.x, from.y, corner.y - joint, half),
    {
      kind: 'arc',
      corner: dx > 0 ? 'bottomLeft' : 'bottomRight',
      size: arcSize,
      left: dx > 0 ? corner.x - half : corner.x + half - arcSize,
      top: corner.y + half - arcSize,
    },
    horizontal(corner.x + dx * joint, to.x, to.y, half),
  ];
}

function horizontal(x1: number, x2: number, y: number, half: number) {
  return {
    kind: 'line' as const,
    left: Math.min(x1, x2),
    top: y - half,
    width: Math.abs(x2 - x1),
    height: half * 2,
  };
}

function vertical(x: number, y1: number, y2: number, half: number) {
  return {
    kind: 'line' as const,
    left: x - half,
    top: Math.min(y1, y2),
    width: half * 2,
    height: Math.abs(y2 - y1),
  };
}

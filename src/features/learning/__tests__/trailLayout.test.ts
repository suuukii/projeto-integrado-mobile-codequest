import {
  buildConnectorShapes,
  buildTrailLayout,
  getTrailColumn,
  type ConnectorShape,
} from '../trailLayout';

const options = {
  width: 400,
  nodeSize: 80,
  rowSpacing: 120,
  paddingTop: 20,
  paddingBottom: 30,
  lineWidth: 6,
  cornerRadius: 20,
};

const lines = (shapes: ConnectorShape[]) =>
  shapes.filter(shape => shape.kind === 'line');

describe('getTrailColumn', () => {
  it('alterna centro, direita, centro e esquerda', () => {
    expect([0, 1, 2, 3, 4, 5].map(getTrailColumn)).toEqual([
      'center',
      'right',
      'center',
      'left',
      'center',
      'right',
    ]);
  });
});

describe('buildTrailLayout', () => {
  it('posiciona os blocos em zigue-zague, um por linha', () => {
    const layout = buildTrailLayout(4, options);
    expect(layout.nodes).toEqual([
      { x: 200, y: 60 },
      { x: 312, y: 180 },
      { x: 200, y: 300 },
      { x: 88, y: 420 },
    ]);
  });

  it('cria uma ligação entre cada par de blocos', () => {
    const layout = buildTrailLayout(4, options);
    expect(layout.connectors.map(c => c.fromIndex)).toEqual([0, 1, 2]);
  });

  it('calcula a altura total com os espaçamentos', () => {
    expect(buildTrailLayout(3, options).height).toBe(20 + 80 + 240 + 30);
    expect(buildTrailLayout(0, options).height).toBe(0);
  });
});

describe('buildConnectorShapes', () => {
  it('a partir do centro, segue na horizontal e depois desce', () => {
    const shapes = buildConnectorShapes(
      { x: 200, y: 60 },
      { x: 312, y: 180 },
      true,
      options,
    );
    expect(shapes.map(s => s.kind)).toEqual(['line', 'arc', 'line']);
    expect(shapes[1]).toMatchObject({ kind: 'arc', corner: 'topRight' });

    const [first, second] = lines(shapes);
    expect(first).toEqual({
      kind: 'line',
      left: 200,
      top: 57,
      width: 93,
      height: 6,
    });
    expect(second).toEqual({
      kind: 'line',
      left: 309,
      top: 79,
      width: 6,
      height: 101,
    });
  });

  it('a partir da lateral, desce e depois segue na horizontal', () => {
    const shapes = buildConnectorShapes(
      { x: 312, y: 180 },
      { x: 200, y: 300 },
      false,
      options,
    );
    expect(shapes[1]).toMatchObject({ kind: 'arc', corner: 'bottomRight' });
    const [first, second] = lines(shapes);
    expect(first).toMatchObject({ left: 309, top: 180, height: 101 });
    expect(second).toMatchObject({ left: 200, top: 297, width: 93 });
  });

  it('usa a curva correta para cada direção', () => {
    const corner = (from: number, to: number, horizontalFirst: boolean) =>
      buildConnectorShapes(
        { x: from, y: 0 },
        { x: to, y: 100 },
        horizontalFirst,
        options,
      )[1];
    expect(corner(200, 88, true)).toMatchObject({ corner: 'topLeft' });
    expect(corner(88, 200, false)).toMatchObject({ corner: 'bottomLeft' });
  });

  it('liga com uma reta quando os blocos estão alinhados', () => {
    const shapes = buildConnectorShapes(
      { x: 100, y: 0 },
      { x: 100, y: 120 },
      true,
      options,
    );
    expect(shapes).toEqual([
      { kind: 'line', left: 97, top: 0, width: 6, height: 120 },
    ]);
  });
});

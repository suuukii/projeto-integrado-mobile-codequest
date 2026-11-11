import { shuffleBlocks, splitAtBlank } from '../questionBlocks';

describe('splitAtBlank', () => {
  it('separa o código antes e depois da lacuna', () => {
    expect(splitAtBlank('print(7 ___ 2)')).toEqual(['print(7 ', ' 2)']);
  });

  it('devolve null quando não há lacuna', () => {
    expect(splitAtBlank('print(1)')).toBeNull();
  });
});

describe('shuffleBlocks', () => {
  it('mantém os mesmos itens', () => {
    expect(shuffleBlocks(['a', 'b', 'c', 'd']).sort()).toEqual([
      'a',
      'b',
      'c',
      'd',
    ]);
  });

  it('nunca devolve a ordem original', () => {
    // Com random sempre 0.999, Fisher-Yates mantém a ordem original.
    expect(shuffleBlocks(['a', 'b', 'c'], () => 0.999)).toEqual(['b', 'c', 'a']);
  });

  it('aceita listas curtas', () => {
    expect(shuffleBlocks(['a'])).toEqual(['a']);
    expect(shuffleBlocks([])).toEqual([]);
  });
});

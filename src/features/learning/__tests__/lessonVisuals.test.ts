import { getTypingDuration, parseAssignment } from '../lessonVisuals';

describe('parseAssignment', () => {
  it('separa nome e valor', () => {
    expect(parseAssignment('idade = 20')).toEqual({ name: 'idade', value: '20' });
    expect(parseAssignment('nome="Ana"')).toEqual({ name: 'nome', value: '"Ana"' });
  });

  it('ignora o que não é uma atribuição simples', () => {
    expect(parseAssignment(null)).toBeNull();
    expect(parseAssignment('print(1)')).toBeNull();
    expect(parseAssignment('2x = 3')).toBeNull();
    expect(parseAssignment('x == 3')).toBeNull();
  });
});

describe('getTypingDuration', () => {
  it('cresce com o tamanho do código até um limite', () => {
    expect(getTypingDuration('abc')).toBe(84);
    expect(getTypingDuration('x'.repeat(1000))).toBe(2400);
  });
});

import { getPasswordStrength } from '../passwordStrength';

describe('getPasswordStrength', () => {
  it.each([
    ['', 0, ''],
    ['abc', 1, 'Fraca'],
    ['abcdefgh', 1, 'Fraca'],
    ['abcdefg1', 2, 'Razoável'],
    ['Abcdefg1', 2, 'Razoável'],
    ['Abcdef1!', 3, 'Boa'],
    ['Abcdefghij1!', 4, 'Forte'],
  ])('classifica "%s"', (password, level, label) => {
    expect(getPasswordStrength(password)).toEqual({ level, label });
  });
});

/** Marca a lacuna nas questões de completar o código. */
export const CODE_BLANK = '___';

/** Separa o código no ponto da lacuna, ou devolve null se não houver lacuna. */
export function splitAtBlank(code: string): [string, string] | null {
  const index = code.indexOf(CODE_BLANK);
  if (index === -1) {
    return null;
  }
  return [code.slice(0, index), code.slice(index + CODE_BLANK.length)];
}

/**
 * Embaralha os blocos de uma questão de ordenar. Garante que o resultado não
 * fique na ordem original, para que a resposta nunca venha pronta.
 */
export function shuffleBlocks<T>(
  items: readonly T[],
  random: () => number = Math.random,
): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const unchanged = shuffled.every((item, index) => item === items[index]);
  if (unchanged && shuffled.length > 1) {
    shuffled.push(shuffled.shift() as T);
  }
  return shuffled;
}

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

const isWordChar = (char: string | undefined) =>
  char !== undefined && /\w/.test(char);

/**
 * Padroniza um trecho de código digitado para comparar com as respostas
 * aceitas. Espaços só importam entre duas palavras (`not x`), e strings com
 * aspas simples ou duplas são equivalentes, como no Python. O conteúdo das
 * strings é mantido exatamente como foi digitado.
 */
export function normalizeCode(code: string): string {
  const text = code.trim();
  let result = '';
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    if (char === '"' || char === "'") {
      const end = text.indexOf(char, i + 1);
      if (end === -1) {
        // String sem fechamento: mantém como está para não virar resposta certa.
        result += text.slice(i);
        break;
      }
      result += `"${text.slice(i + 1, end)}"`;
      i = end + 1;
    } else if (/\s/.test(char)) {
      let next = i;
      while (next < text.length && /\s/.test(text[next])) {
        next++;
      }
      if (isWordChar(result[result.length - 1]) && isWordChar(text[next])) {
        result += ' ';
      }
      i = next;
    } else {
      result += char;
      i++;
    }
  }
  return result;
}

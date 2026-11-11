export type Assignment = { name: string; value: string };

/** Lê uma atribuição simples, como `idade = 20`, para o visual de variável. */
export function parseAssignment(code: string | null): Assignment | null {
  const match = code?.match(/^\s*([A-Za-z_]\w*)\s*=(?!=)\s*(.+?)\s*$/);
  return match ? { name: match[1], value: match[2] } : null;
}

/** Duração da digitação do código, limitada para trechos longos. */
export function getTypingDuration(code: string, msPerChar = 28): number {
  return Math.min(code.length * msPerChar, 2400);
}

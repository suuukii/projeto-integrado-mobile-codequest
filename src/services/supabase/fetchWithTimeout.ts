export const REQUEST_TIMEOUT_MS = 15000;

/**
 * Envolve o fetch com um tempo limite. No React Native as requisições não têm
 * limite por padrão: se a conexão cai no meio do uso, a chamada fica pendente
 * para sempre e a tela nunca sai do carregamento.
 */
export function createFetchWithTimeout(
  timeoutMs: number = REQUEST_TIMEOUT_MS,
  baseFetch: typeof fetch = fetch,
): typeof fetch {
  return (input, init) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    // Mantém o cancelamento pedido por quem chamou.
    const callerSignal = init?.signal;
    if (callerSignal?.aborted) {
      controller.abort();
    } else {
      callerSignal?.addEventListener('abort', () => controller.abort());
    }

    return baseFetch(input, { ...init, signal: controller.signal }).finally(
      () => clearTimeout(timer),
    );
  };
}

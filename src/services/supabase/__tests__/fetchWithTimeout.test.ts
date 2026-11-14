import { createFetchWithTimeout } from '../fetchWithTimeout';

/** Fetch falso que nunca responde e só termina quando é cancelado. */
const hangingFetch = jest.fn(
  (_input: unknown, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () =>
        reject(new Error('Aborted')),
      );
    }),
) as unknown as typeof fetch;

describe('createFetchWithTimeout', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('cancela a requisição que passa do tempo limite', async () => {
    const request = createFetchWithTimeout(1000, hangingFetch)('https://x');
    const outcome = request.then(
      () => 'respondeu',
      () => 'cancelada',
    );
    jest.advanceTimersByTime(1000);
    await expect(outcome).resolves.toBe('cancelada');
  });

  it('devolve a resposta quando ela chega a tempo', async () => {
    const response = { ok: true } as Response;
    const quickFetch = jest.fn(() => Promise.resolve(response));
    const result = await createFetchWithTimeout(
      1000,
      quickFetch as unknown as typeof fetch,
    )('https://x');
    expect(result).toBe(response);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('respeita o cancelamento pedido por quem chamou', async () => {
    const caller = new AbortController();
    const request = createFetchWithTimeout(1000, hangingFetch)('https://x', {
      signal: caller.signal,
    });
    const outcome = request.then(
      () => 'respondeu',
      () => 'cancelada',
    );
    caller.abort();
    await expect(outcome).resolves.toBe('cancelada');
  });
});

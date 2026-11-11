import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@env';

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Variável de ambiente ausente: ${name}. Configure o arquivo .env conforme o README.`,
    );
  }
  return value;
}

export const env = {
  supabaseUrl: requireEnv('SUPABASE_URL', SUPABASE_URL),
  supabasePublishableKey: requireEnv(
    'SUPABASE_PUBLISHABLE_KEY',
    SUPABASE_PUBLISHABLE_KEY,
  ),
};

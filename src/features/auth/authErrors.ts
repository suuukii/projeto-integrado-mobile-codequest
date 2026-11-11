import { AuthError, isAuthError } from '@supabase/supabase-js';

const MESSAGES_BY_CODE: Record<string, string> = {
  invalid_credentials: 'E-mail ou senha incorretos.',
  email_not_confirmed: 'Confirme seu e-mail antes de entrar.',
  user_already_exists: 'Este e-mail já está cadastrado.',
  email_exists: 'Este e-mail já está cadastrado.',
  weak_password: 'A senha não atende aos requisitos de segurança.',
  email_address_invalid: 'Informe um e-mail válido.',
  over_email_send_rate_limit:
    'Muitas tentativas de envio de e-mail. Aguarde alguns minutos.',
  over_request_rate_limit: 'Muitas tentativas. Aguarde alguns minutos.',
  signup_disabled: 'O cadastro está temporariamente desativado.',
  unexpected_failure:
    'Não foi possível concluir o cadastro. Verifique se o nome de usuário está disponível.',
};

const CONNECTION_MESSAGE =
  'Não foi possível conectar ao servidor. Verifique sua internet.';
const GENERIC_MESSAGE = 'Algo deu errado. Tente novamente.';

export function getAuthErrorMessage(error: unknown): string {
  if (isAuthError(error)) {
    return messageForAuthError(error);
  }
  return isConnectionFailure(error) ? CONNECTION_MESSAGE : GENERIC_MESSAGE;
}

function messageForAuthError(error: AuthError): string {
  if (error.code && MESSAGES_BY_CODE[error.code]) {
    return MESSAGES_BY_CODE[error.code];
  }
  if (error.name === 'AuthRetryableFetchError') {
    return CONNECTION_MESSAGE;
  }
  return GENERIC_MESSAGE;
}

function isConnectionFailure(error: unknown): boolean {
  return (
    error instanceof TypeError && /network|fetch/i.test(error.message)
  );
}

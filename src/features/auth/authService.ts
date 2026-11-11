import type { Session } from '@supabase/supabase-js';

import { supabase } from '../../services/supabase/client';

export type SignUpInput = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResult = 'signed_in' | 'confirmation_required';

export class EmailAlreadyRegisteredError extends Error {}
export class UsernameTakenError extends Error {}

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) {
    throw error;
  }
}

export async function signUp({
  username,
  email,
  password,
}: SignUpInput): Promise<SignUpResult> {
  const normalizedUsername = username.trim();

  const { data: available, error: availabilityError } = await supabase.rpc(
    'is_username_available',
    { candidate: normalizedUsername },
  );
  if (availabilityError) {
    throw availabilityError;
  }
  if (!available) {
    throw new UsernameTakenError();
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { username: normalizedUsername } },
  });
  if (error) {
    throw error;
  }

  // Com a confirmação de e-mail ativa, o Supabase devolve um usuário sem
  // identidades em vez de um erro quando o e-mail já existe.
  if (data.user?.identities?.length === 0) {
    throw new EmailAlreadyRegisteredError();
  }

  return data.session ? 'signed_in' : 'confirmation_required';
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) {
    throw error;
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data.session;
}

export function subscribeToSessionChanges(
  listener: (session: Session | null) => void,
): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    listener(session);
  });
  return () => data.subscription.unsubscribe();
}

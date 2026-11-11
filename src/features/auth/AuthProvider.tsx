import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getCurrentSession, subscribeToSessionChanges } from './authService';

type AuthContextValue = {
  session: Session | null;
  /** Verdadeiro enquanto a sessão salva no aparelho é restaurada. */
  isRestoring: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    let active = true;

    getCurrentSession()
      .then(restored => {
        if (active) {
          setSession(restored);
        }
      })
      .catch(() => {
        // Sessão salva inválida: o usuário volta para a tela de login.
        if (active) {
          setSession(null);
        }
      })
      .finally(() => {
        if (active) {
          setIsRestoring(false);
        }
      });

    const unsubscribe = subscribeToSessionChanges(setSession);
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ session, isRestoring }),
    [session, isRestoring],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }
  return context;
}

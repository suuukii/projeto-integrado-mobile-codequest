import { PASSWORD_RULES } from './validation';

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

export type PasswordStrength = {
  /** 0 significa senha vazia; de 1 (fraca) a 4 (forte). */
  level: PasswordStrengthLevel;
  label: string;
};

const STRONG_PASSWORD_LENGTH = 12;

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { level: 0, label: '' };
  }

  const metRules = PASSWORD_RULES.filter(rule => rule.isMet(password)).length;

  if (metRules < 3) {
    return { level: 1, label: 'Fraca' };
  }
  if (metRules < PASSWORD_RULES.length) {
    return { level: 2, label: 'Razoável' };
  }
  if (password.length < STRONG_PASSWORD_LENGTH) {
    return { level: 3, label: 'Boa' };
  }
  return { level: 4, label: 'Forte' };
}

export type PasswordRule = {
  id: 'length' | 'lowercase' | 'uppercase' | 'digit' | 'special';
  label: string;
  isMet: (password: string) => boolean;
};

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_RULES: readonly PasswordRule[] = [
  {
    id: 'length',
    label: `Pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
    isMet: password => password.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: 'lowercase',
    label: 'Uma letra minúscula',
    isMet: password => /[a-z]/.test(password),
  },
  {
    id: 'uppercase',
    label: 'Uma letra maiúscula',
    isMet: password => /[A-Z]/.test(password),
  },
  {
    id: 'digit',
    label: 'Um número',
    isMet: password => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'Um caractere especial',
    isMet: password => /[^A-Za-z0-9\s]/.test(password),
  },
];

const USERNAME_PATTERN = /^[A-Za-z0-9_]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateUsername(username: string): string | null {
  const value = username.trim();
  if (!value) {
    return 'Informe um nome de usuário.';
  }
  if (value.length < 3 || value.length > 20) {
    return 'O nome de usuário deve ter entre 3 e 20 caracteres.';
  }
  if (!USERNAME_PATTERN.test(value)) {
    return 'Use apenas letras, números e sublinhado (_).';
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) {
    return 'Informe seu e-mail.';
  }
  if (!EMAIL_PATTERN.test(value)) {
    return 'Informe um e-mail válido.';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Informe uma senha.';
  }
  if (!PASSWORD_RULES.every(rule => rule.isMet(password))) {
    return 'A senha não atende a todos os requisitos.';
  }
  return null;
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string,
): string | null {
  if (!confirmation) {
    return 'Confirme sua senha.';
  }
  if (password !== confirmation) {
    return 'As senhas não são iguais.';
  }
  return null;
}

import {
  PASSWORD_RULES,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateUsername,
} from '../validation';

describe('validateUsername', () => {
  it.each(['ana', 'Ana_123', 'a'.repeat(20), '  ana  '])('aceita %s', value => {
    expect(validateUsername(value)).toBeNull();
  });

  it.each(['', '   ', 'ab', 'a'.repeat(21), 'ana silva', 'ana-1', 'ação'])(
    'rejeita "%s"',
    value => {
      expect(validateUsername(value)).not.toBeNull();
    },
  );
});

describe('validateEmail', () => {
  it.each(['a@b.co', 'nome.sobrenome+tag@dominio.com.br', ' a@b.co '])(
    'aceita %s',
    value => {
      expect(validateEmail(value)).toBeNull();
    },
  );

  it.each(['', 'abc', 'a@b', '@b.com', 'a b@c.com', 'a@b.c'])(
    'rejeita "%s"',
    value => {
      expect(validateEmail(value)).not.toBeNull();
    },
  );
});

describe('validatePassword', () => {
  it('aceita senha que cumpre todas as regras', () => {
    expect(validatePassword('Abcdef1!')).toBeNull();
  });

  it.each([
    ['vazia', ''],
    ['curta', 'Ab1!'],
    ['sem minúscula', 'ABCDEF1!'],
    ['sem maiúscula', 'abcdef1!'],
    ['sem número', 'Abcdefg!'],
    ['sem especial', 'Abcdefg1'],
  ])('rejeita senha %s', (_name, value) => {
    expect(validatePassword(value)).not.toBeNull();
  });

  it('avalia cada regra individualmente', () => {
    const met = PASSWORD_RULES.filter(rule => rule.isMet('abc1')).map(
      rule => rule.id,
    );
    expect(met).toEqual(['lowercase', 'digit']);
  });
});

describe('validatePasswordConfirmation', () => {
  it('aceita senhas iguais', () => {
    expect(validatePasswordConfirmation('Abc', 'Abc')).toBeNull();
  });

  it('rejeita confirmação vazia ou diferente', () => {
    expect(validatePasswordConfirmation('Abc', '')).not.toBeNull();
    expect(validatePasswordConfirmation('Abc', 'abc')).toBe(
      'As senhas não são iguais.',
    );
  });
});

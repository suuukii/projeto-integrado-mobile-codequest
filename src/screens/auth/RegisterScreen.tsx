import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MessageBanner } from '../../components/MessageBanner';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField';
import { getAuthErrorMessage } from '../../features/auth/authErrors';
import {
  EmailAlreadyRegisteredError,
  signUp,
  UsernameTakenError,
} from '../../features/auth/authService';
import { PasswordRequirements } from '../../features/auth/components/PasswordRequirements';
import { PasswordStrengthMeter } from '../../features/auth/components/PasswordStrengthMeter';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateUsername,
} from '../../features/auth/validation';
import type { AuthStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';

type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;

type Field = 'username' | 'email' | 'password' | 'confirmation';

const NO_FIELDS_TOUCHED: Record<Field, boolean> = {
  username: false,
  email: false,
  password: false,
  confirmation: false,
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [touched, setTouched] = useState(NO_FIELDS_TOUCHED);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const confirmationError = validatePasswordConfirmation(
    password,
    confirmation,
  );
  // A divergência aparece enquanto o usuário digita a confirmação.
  const showConfirmationError =
    touched.confirmation || (confirmation.length > 0 && Boolean(confirmationError));

  const markTouched = (field: Field) =>
    setTouched(current => ({ ...current, [field]: true }));

  const handleSubmit = async () => {
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmation: true,
    });
    setSubmitError(null);
    setUsernameTaken(false);
    setEmailTaken(false);

    if (usernameError || emailError || passwordError || confirmationError) {
      return;
    }

    setSubmitting(true);
    try {
      const result = await signUp({ username, email, password });
      if (result === 'confirmation_required') {
        navigation.navigate('Login', {
          notice: 'Conta criada. Confirme seu e-mail para entrar.',
        });
        setSubmitting(false);
      }
      // Com sessão ativa, a navegação troca para a área principal.
    } catch (error) {
      if (error instanceof UsernameTakenError) {
        setUsernameTaken(true);
      } else if (error instanceof EmailAlreadyRegisteredError) {
        setEmailTaken(true);
      } else {
        setSubmitError(getAuthErrorMessage(error));
      }
      setSubmitting(false);
    }
  };

  return (
    <Screen scrollable showBackButton>
      <Text style={styles.title}>Criar conta</Text>

      {submitError && <MessageBanner message={submitError} />}

      <TextField
        label="Nome de usuário"
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect={false}
        value={username}
        error={
          usernameTaken
            ? 'Este nome de usuário já está em uso.'
            : touched.username
            ? usernameError
            : null
        }
        onChangeText={value => {
          setUsername(value);
          setUsernameTaken(false);
        }}
        onBlur={() => markTouched('username')}
      />
      <TextField
        label="E-mail"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={email}
        error={
          emailTaken
            ? 'Este e-mail já está cadastrado.'
            : touched.email
            ? emailError
            : null
        }
        onChangeText={value => {
          setEmail(value);
          setEmailTaken(false);
        }}
        onBlur={() => markTouched('email')}
      />
      <TextField
        label="Senha"
        isPassword
        autoCapitalize="none"
        autoComplete="new-password"
        value={password}
        error={touched.password ? passwordError : null}
        onChangeText={setPassword}
        onBlur={() => markTouched('password')}
      />
      <PasswordStrengthMeter password={password} />
      <PasswordRequirements password={password} />
      <TextField
        label="Confirmar senha"
        isPassword
        autoCapitalize="none"
        autoComplete="new-password"
        value={confirmation}
        error={showConfirmationError ? confirmationError : null}
        onChangeText={setConfirmation}
        onBlur={() => markTouched('confirmation')}
      />

      <PrimaryButton
        title="Cadastrar"
        loading={submitting}
        onPress={handleSubmit}
      />
      <View style={styles.secondaryAction}>
        <PrimaryButton
          title="Já tenho conta"
          variant="outlined"
          disabled={submitting}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  secondaryAction: { marginTop: spacing.md },
});

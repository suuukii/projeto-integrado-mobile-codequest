import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Logo } from '../../components/Logo';
import { MessageBanner } from '../../components/MessageBanner';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField';
import { getAuthErrorMessage } from '../../features/auth/authErrors';
import { signIn } from '../../features/auth/authService';
import { validateEmail } from '../../features/auth/validation';
import type { AuthStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation, route }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const nextEmailError = validateEmail(email);
    const nextPasswordError = password ? null : 'Informe sua senha.';
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    setSubmitError(null);
    if (nextEmailError || nextPasswordError) {
      return;
    }

    setSubmitting(true);
    try {
      // Em caso de sucesso, a navegação troca para a área principal.
      await signIn(email, password);
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
      setSubmitting(false);
    }
  };

  return (
    <Screen scrollable showBackButton>
      <View style={styles.header}>
        <Logo />
        <Text style={styles.title}>Codequest</Text>
        <Text style={styles.subtitle}>Aprenda programação passo a passo</Text>
      </View>

      {route.params?.notice && (
        <MessageBanner message={route.params.notice} tone="success" />
      )}
      {submitError && <MessageBanner message={submitError} />}

      <TextField
        label="E-mail"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={email}
        error={emailError}
        onChangeText={setEmail}
      />
      <TextField
        label="Senha"
        isPassword
        autoCapitalize="none"
        autoComplete="current-password"
        value={password}
        error={passwordError}
        onChangeText={setPassword}
        onSubmitEditing={handleSubmit}
      />

      <PrimaryButton
        title="Entrar"
        loading={submitting}
        onPress={handleSubmit}
      />
      <View style={styles.secondaryAction}>
        <PrimaryButton
          title="Criar conta"
          variant="outlined"
          disabled={submitting}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: spacing.lg, marginBottom: spacing.lg },
  title: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
  secondaryAction: { marginTop: spacing.md },
});

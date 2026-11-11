import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { Logo } from '../../components/Logo';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import type { AuthStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <Screen>
      <View style={styles.hero}>
        <Logo size={180} />
        <Text style={styles.title}>Codequest</Text>
        <Text style={styles.subtitle}>
          Aprenda programação de um jeito simples, uma etapa por vez.
        </Text>
      </View>

      <PrimaryButton
        title="Iniciar"
        onPress={() => navigation.navigate('Register')}
      />
      <View style={styles.secondaryAction}>
        <PrimaryButton
          title="Eu já tenho uma conta"
          variant="outlined"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, justifyContent: 'center' },
  title: {
    ...typography.title,
    fontSize: 36,
    lineHeight: 44,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  secondaryAction: { marginTop: spacing.md },
});

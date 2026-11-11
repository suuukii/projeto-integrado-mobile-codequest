import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { MessageBanner } from '../../components/MessageBanner';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { getAuthErrorMessage } from '../../features/auth/authErrors';
import { signOut } from '../../features/auth/authService';
import { colors, spacing, typography } from '../../theme';

export function TrackScreen() {
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = () => {
    signOut().catch(signOutError =>
      setError(getAuthErrorMessage(signOutError)),
    );
  };

  return (
    <Screen>
      {error && <MessageBanner message={error} />}
      <Text style={styles.title}>Codequest</Text>
      <PrimaryButton title="Sair" variant="outlined" onPress={handleSignOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.lg,
  },
});

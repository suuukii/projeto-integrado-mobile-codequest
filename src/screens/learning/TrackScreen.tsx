import { StyleSheet, Text } from 'react-native';

import { Screen } from '../../components/Screen';
import { colors, typography } from '../../theme';

export function TrackScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Codequest</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text },
});

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MessageBanner } from '../../components/MessageBanner';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';
import { Screen } from '../../components/Screen';
import { getAuthErrorMessage } from '../../features/auth/authErrors';
import { signOut } from '../../features/auth/authService';
import { useAuth } from '../../features/auth/AuthProvider';
import { StageCard } from '../../features/learning/components/StageCard';
import { DEFAULT_TRACK_SLUG } from '../../features/learning/constants';
import { countCompletedStages } from '../../features/learning/trackProgress';
import type { StageWithStatus } from '../../features/learning/types';
import { useTrack } from '../../features/learning/useTrack';
import type { MainStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';

type TrackScreenProps = NativeStackScreenProps<MainStackParamList, 'Track'>;

export function TrackScreen({ navigation }: TrackScreenProps) {
  const { session } = useAuth();
  const { data, failed, reload } = useTrack(DEFAULT_TRACK_SLUG);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const username: unknown = session?.user.user_metadata.username;

  const handleSignOut = () => {
    signOut().catch(error => setSignOutError(getAuthErrorMessage(error)));
  };

  const handleStagePress = (stage: StageWithStatus) => {
    navigation.navigate('Stage', { stageId: stage.id, title: stage.title });
  };

  const completedCount = data ? countCompletedStages(data.stages) : 0;
  const totalCount = data?.stages.length ?? 0;

  return (
    <Screen>
      <View style={styles.topBar}>
        <Text style={styles.greeting} numberOfLines={1}>
          {typeof username === 'string' ? `Olá, ${username}!` : 'Olá!'}
        </Text>
        <Pressable accessibilityRole="button" hitSlop={8} onPress={handleSignOut}>
          <Text style={styles.signOut}>Sair</Text>
        </Pressable>
      </View>

      {signOutError && <MessageBanner message={signOutError} />}

      {failed && !data && (
        <View style={styles.centered}>
          <MessageBanner message="Não foi possível carregar a trilha. Verifique sua conexão." />
          <PrimaryButton title="Tentar novamente" onPress={reload} />
        </View>
      )}

      {!failed && !data && (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}

      {data && (
        <FlatList
          data={data.stages}
          keyExtractor={stage => stage.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>{data.track.title}</Text>
              <Text style={styles.description}>{data.track.description}</Text>
              <View style={styles.progressRow}>
                <ProgressBar
                  progress={totalCount ? completedCount / totalCount : 0}
                />
                <Text style={styles.progressText}>
                  {completedCount}/{totalCount}
                </Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <StageCard
              stage={item}
              isLast={index === totalCount - 1}
              onPress={handleStagePress}
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  greeting: { ...typography.label, color: colors.textMuted, flex: 1 },
  signOut: { ...typography.label, color: colors.primary, marginLeft: spacing.md },
  centered: { flex: 1, justifyContent: 'center' },
  header: { marginBottom: spacing.lg },
  title: { ...typography.title, color: colors.text },
  description: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  progressRow: { flexDirection: 'row', alignItems: 'center' },
  progressText: {
    ...typography.label,
    color: colors.text,
    marginLeft: spacing.md,
  },
});

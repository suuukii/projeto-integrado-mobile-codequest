import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MessageBanner } from '../../components/MessageBanner';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { getAuthErrorMessage } from '../../features/auth/authErrors';
import { signOut } from '../../features/auth/authService';
import { useAuth } from '../../features/auth/AuthProvider';
import { TrailHeader } from '../../features/learning/components/TrailHeader';
import { TrailMap } from '../../features/learning/components/TrailMap';
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
  const [trailWidth, setTrailWidth] = useState(0);

  const username: unknown = session?.user.user_metadata.username;

  const handleSignOut = () => {
    signOut().catch(error => setSignOutError(getAuthErrorMessage(error)));
  };

  const handleStagePress = (stage: StageWithStatus) => {
    navigation.navigate('Stage', { stageId: stage.id, title: stage.title });
  };

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
        <>
          <TrailHeader
            trackTitle={data.track.title}
            currentStage={data.stages.find(stage => stage.status === 'current')}
            completedCount={countCompletedStages(data.stages)}
            totalCount={data.stages.length}
          />
          <ScrollView
            style={styles.trail}
            showsVerticalScrollIndicator={false}
            onLayout={event => setTrailWidth(event.nativeEvent.layout.width)}
          >
            {trailWidth > 0 && (
              <TrailMap
                stages={data.stages}
                width={trailWidth}
                onStagePress={handleStagePress}
              />
            )}
          </ScrollView>
        </>
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
  trail: { flex: 1, marginHorizontal: -spacing.lg },
});

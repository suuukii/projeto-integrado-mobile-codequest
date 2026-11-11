import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { MessageBanner } from '../../components/MessageBanner';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import { TrailHeader } from '../../features/learning/components/TrailHeader';
import { TrailMap } from '../../features/learning/components/TrailMap';
import { DEFAULT_TRACK_SLUG } from '../../features/learning/constants';
import {
  countCompletedStages,
  getFollowingStages,
} from '../../features/learning/trackProgress';
import type { StageWithStatus } from '../../features/learning/types';
import { useTrack } from '../../features/learning/useTrack';
import type {
  MainStackParamList,
  MainTabParamList,
} from '../../navigation/types';
import { colors, spacing } from '../../theme';

type TrackScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Learn'>,
  NativeStackScreenProps<MainStackParamList>
>;

export function TrackScreen({ navigation }: TrackScreenProps) {
  const { data, failed, reload } = useTrack(DEFAULT_TRACK_SLUG);
  const [trailWidth, setTrailWidth] = useState(0);

  const handleStagePress = (stage: StageWithStatus) => {
    navigation.navigate('Stage', {
      stageId: stage.id,
      title: stage.title,
      nextStages: data ? getFollowingStages(data.stages, stage.id) : [],
    });
  };

  return (
    <Screen insideTabs>
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
  centered: { flex: 1, justifyContent: 'center' },
  trail: { flex: 1, marginHorizontal: -spacing.lg },
});

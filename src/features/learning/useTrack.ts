import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { fetchCompletedStageIds } from './progressService';
import { buildStagesWithStatus } from './trackProgress';
import { fetchTrackBySlug } from './trackService';
import type { StageWithStatus, Track } from './types';

type TrackData = {
  track: Track;
  stages: StageWithStatus[];
};

async function loadTrack(slug: string): Promise<TrackData> {
  const track = await fetchTrackBySlug(slug);
  const completedStageIds = await fetchCompletedStageIds(
    track.stages.map(stage => stage.id),
  );
  return {
    track,
    stages: buildStagesWithStatus(track.stages, completedStageIds),
  };
}

export function useTrack(slug: string) {
  const [data, setData] = useState<TrackData | null>(null);
  const [failed, setFailed] = useState(false);

  const reload = useCallback(() => {
    let active = true;
    setFailed(false);
    loadTrack(slug)
      .then(result => {
        if (active) {
          setData(result);
        }
      })
      .catch(() => {
        if (active) {
          setFailed(true);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  // Recarrega ao voltar para a tela, para refletir o progresso mais recente.
  useFocusEffect(reload);

  return { data, failed, reload };
}

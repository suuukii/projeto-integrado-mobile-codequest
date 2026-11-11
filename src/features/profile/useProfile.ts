import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { fetchCompletedStageIds, fetchStageProgress } from '../learning/progressService';
import { buildStagesWithStatus } from '../learning/trackProgress';
import { fetchTrackBySlug } from '../learning/trackService';
import { fetchProfile, updateAvatar, type Profile } from './profileService';
import { summarizeProgress, type ProgressSummary } from './progressSummary';

export type ProfileData = {
  profile: Profile;
  languageName: string;
  trackTitle: string;
  summary: ProgressSummary;
};

async function loadProfile(userId: string, trackSlug: string): Promise<ProfileData> {
  const [profile, track] = await Promise.all([
    fetchProfile(userId),
    fetchTrackBySlug(trackSlug),
  ]);
  const stageIds = track.stages.map(stage => stage.id);
  const [completedIds, progress] = await Promise.all([
    fetchCompletedStageIds(stageIds),
    fetchStageProgress(stageIds),
  ]);
  return {
    profile,
    languageName: track.languageName,
    trackTitle: track.title,
    summary: summarizeProgress(
      buildStagesWithStatus(track.stages, completedIds),
      progress,
    ),
  };
}

export function useProfile(userId: string, trackSlug: string) {
  const [data, setData] = useState<ProfileData | null>(null);
  const [failed, setFailed] = useState(false);

  const reload = useCallback(() => {
    let active = true;
    setFailed(false);
    loadProfile(userId, trackSlug)
      .then(result => active && setData(result))
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [userId, trackSlug]);

  // Recarrega ao abrir a aba, para mostrar o progresso mais recente.
  useFocusEffect(reload);

  /** Salva a nova foto; em caso de erro, mantém a anterior e repassa o erro. */
  const changeAvatar = useCallback(
    async (avatar: string) => {
      await updateAvatar(userId, avatar);
      setData(current =>
        current && { ...current, profile: { ...current.profile, avatar } },
      );
    },
    [userId],
  );

  return { data, failed, reload, changeAvatar };
}

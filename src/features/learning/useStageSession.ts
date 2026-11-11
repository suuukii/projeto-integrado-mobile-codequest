import { useCallback, useEffect, useState } from 'react';

import { saveStageCompletion } from './progressService';
import { fetchStageQuestions } from './questionService';
import {
  advance,
  checkAnswer,
  createStageSession,
  getStageResult,
  isSessionFinished,
  selectOption,
  type StageSession,
} from './stageSession';
import type { StageResult } from './types';

type Phase = 'loading' | 'load_failed' | 'ready' | 'saving' | 'save_failed';

export function useStageSession(
  userId: string,
  stageId: string,
  onCompleted: (result: StageResult) => void,
) {
  const [session, setSession] = useState<StageSession | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');

  const load = useCallback(() => {
    let active = true;
    setPhase('loading');
    fetchStageQuestions(stageId)
      .then(questions => {
        if (active) {
          setSession(createStageSession(questions));
          setPhase('ready');
        }
      })
      .catch(() => {
        if (active) {
          setPhase('load_failed');
        }
      });
    return () => {
      active = false;
    };
  }, [stageId]);

  useEffect(() => load(), [load]);

  const save = useCallback(
    (finished: StageSession) => {
      const result = getStageResult(finished);
      setPhase('saving');
      saveStageCompletion(userId, stageId, result)
        .then(() => onCompleted(result))
        .catch(() => setPhase('save_failed'));
    },
    [userId, stageId, onCompleted],
  );

  const choose = (optionId: string) =>
    setSession(current => current && selectOption(current, optionId));

  const verify = () => setSession(current => current && checkAnswer(current));

  const next = () => {
    if (!session) {
      return;
    }
    const advanced = advance(session);
    setSession(advanced);
    if (isSessionFinished(advanced)) {
      save(advanced);
    }
  };

  const retrySave = () => {
    if (session) {
      save(session);
    }
  };

  return { session, phase, reload: load, choose, verify, next, retrySave };
}

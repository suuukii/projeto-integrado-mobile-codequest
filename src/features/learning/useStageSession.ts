import { useCallback, useEffect, useState } from 'react';

import { fetchStageLesson } from './lessonService';
import { saveStageCompletion } from './progressService';
import { fetchStageQuestions } from './questionService';
import {
  advance,
  checkAnswer,
  createStageSession,
  getStageResult,
  isSessionFinished,
  selectOption,
  typeAnswer,
  type StageSession,
} from './stageSession';
import type { LessonCard, StageResult } from './types';

type Phase = 'loading' | 'load_failed' | 'ready' | 'saving' | 'save_failed';

export function useStageSession(
  userId: string,
  stageId: string,
  onCompleted: (result: StageResult) => void,
) {
  const [session, setSession] = useState<StageSession | null>(null);
  const [lessonCards, setLessonCards] = useState<LessonCard[]>([]);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');

  const load = useCallback(() => {
    let active = true;
    setPhase('loading');
    Promise.all([fetchStageQuestions(stageId), fetchStageLesson(stageId)])
      .then(([questions, cards]) => {
        if (active) {
          setSession(createStageSession(questions));
          setLessonCards(cards);
          setLessonIndex(0);
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

  const write = (text: string) =>
    setSession(current => current && typeAnswer(current, text));

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

  /** A explicação vem antes das questões; cada chamada avança um cartão. */
  const lessonCard: LessonCard | undefined = lessonCards[lessonIndex];
  const nextLessonCard = () => setLessonIndex(index => index + 1);
  const lessonProgress = lessonCards.length
    ? (lessonIndex + 1) / lessonCards.length
    : 1;
  const isLastLessonCard = lessonIndex === lessonCards.length - 1;

  return {
    session,
    phase,
    reload: load,
    choose,
    write,
    verify,
    next,
    retrySave,
    lessonCard,
    lessonProgress,
    isLastLessonCard,
    nextLessonCard,
  };
}

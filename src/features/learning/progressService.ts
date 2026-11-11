import { supabase } from '../../services/supabase/client';
import type { StageResult } from './types';

export async function fetchCompletedStageIds(
  stageIds: readonly string[],
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('stage_id')
    .in('stage_id', [...stageIds]);

  if (error) {
    throw error;
  }
  return new Set(data.map(row => row.stage_id));
}

export type StageProgress = {
  stageId: string;
  firstTryCorrect: number;
  totalQuestions: number;
};

/** Resultado registrado de cada etapa concluída pelo usuário. */
export async function fetchStageProgress(
  stageIds: readonly string[],
): Promise<StageProgress[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('stage_id, first_try_correct, total_questions')
    .in('stage_id', [...stageIds]);

  if (error) {
    throw error;
  }
  return data.map(row => ({
    stageId: row.stage_id,
    firstTryCorrect: row.first_try_correct,
    totalQuestions: row.total_questions,
  }));
}

export async function saveStageCompletion(
  userId: string,
  stageId: string,
  result: StageResult,
): Promise<void> {
  const { error } = await supabase.from('user_progress').upsert({
    user_id: userId,
    stage_id: stageId,
    first_try_correct: result.firstTryCorrect,
    total_questions: result.totalQuestions,
    completed_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }
}

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

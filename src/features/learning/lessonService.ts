import { supabase } from '../../services/supabase/client';
import type { LessonCard } from './types';

export async function fetchStageLesson(stageId: string): Promise<LessonCard[]> {
  const { data, error } = await supabase
    .from('lesson_cards')
    .select('id, visual, title, body, code_snippet, code_output, points')
    .eq('stage_id', stageId)
    .order('position');

  if (error) {
    throw error;
  }

  return data.map(row => ({
    id: row.id,
    visual: row.visual,
    title: row.title,
    body: row.body,
    codeSnippet: row.code_snippet,
    codeOutput: row.code_output,
    points: row.points,
  }));
}

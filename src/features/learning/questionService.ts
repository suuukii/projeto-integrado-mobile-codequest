import { supabase } from '../../services/supabase/client';
import type { Question } from './types';

export async function fetchStageQuestions(
  stageId: string,
): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select(
      'id, type, prompt, code_snippet, explanation, question_options(id, text, is_correct, position)',
    )
    .eq('stage_id', stageId)
    .order('position')
    .order('position', { referencedTable: 'question_options' });

  if (error) {
    throw error;
  }

  return data.map(row => ({
    id: row.id,
    type: row.type,
    prompt: row.prompt,
    codeSnippet: row.code_snippet,
    explanation: row.explanation,
    options: row.question_options.map(option => ({
      id: option.id,
      text: option.text,
      isCorrect: option.is_correct,
    })),
  }));
}

import { supabase } from '../../services/supabase/client';
import { shuffleBlocks } from './questionBlocks';
import type { Question, QuestionOption } from './types';

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

  return data.map((row): Question => {
    const base = {
      id: row.id,
      prompt: row.prompt,
      codeSnippet: row.code_snippet,
      explanation: row.explanation,
    };
    const options: QuestionOption[] = row.question_options.map(option => ({
      id: option.id,
      text: option.text,
      isCorrect: option.is_correct,
    }));

    if (row.type === 'code_order') {
      // As opções chegam na ordem correta; o usuário as vê embaralhadas.
      return {
        ...base,
        type: 'code_order',
        correctOrder: options.map(option => option.id),
        options: shuffleBlocks(options),
      };
    }
    return { ...base, type: row.type, options };
  });
}

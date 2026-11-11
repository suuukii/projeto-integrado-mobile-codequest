import { supabase } from '../../services/supabase/client';
import type { Track } from './types';

export async function fetchTrackBySlug(slug: string): Promise<Track> {
  const { data, error } = await supabase
    .from('tracks')
    .select(
      'id, slug, title, description, languages(name), stages(id, position, title, description)',
    )
    .eq('slug', slug)
    .single();

  if (error) {
    throw error;
  }
  const { languages, ...track } = data;
  return { ...track, languageName: languages.name };
}

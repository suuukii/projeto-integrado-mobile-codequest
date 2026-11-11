import { supabase } from '../../services/supabase/client';

export type Profile = {
  username: string;
  avatar: string;
};

export async function fetchProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('username, avatar')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }
  return data;
}

export async function updateAvatar(
  userId: string,
  avatar: string,
): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ avatar })
    .eq('id', userId);

  if (error) {
    throw error;
  }
}

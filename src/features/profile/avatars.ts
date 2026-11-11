export type AvatarOption = {
  id: string;
  emoji: string;
  background: string;
  label: string;
};

/** Fotos de perfil disponíveis. Os ids precisam existir na restrição do banco. */
export const AVATARS: readonly AvatarOption[] = [
  { id: 'snake', emoji: '🐍', background: '#3F6B4E', label: 'Cobra' },
  { id: 'fox', emoji: '🦊', background: '#7A4A2E', label: 'Raposa' },
  { id: 'cat', emoji: '🐱', background: '#7A6A2E', label: 'Gato' },
  { id: 'owl', emoji: '🦉', background: '#5B4A3A', label: 'Coruja' },
  { id: 'panda', emoji: '🐼', background: '#4A5260', label: 'Panda' },
  { id: 'robot', emoji: '🤖', background: '#2E5A7A', label: 'Robô' },
  { id: 'alien', emoji: '👾', background: '#5A3C82', label: 'Alienígena' },
  { id: 'rocket', emoji: '🚀', background: '#7A2E4A', label: 'Foguete' },
];

export const DEFAULT_AVATAR_ID = 'snake';

/** Devolve a foto pelo id, usando a padrão quando o id é desconhecido. */
export function getAvatar(id: string | null | undefined): AvatarOption {
  return (
    AVATARS.find(avatar => avatar.id === id) ??
    AVATARS.find(avatar => avatar.id === DEFAULT_AVATAR_ID) ??
    AVATARS[0]
  );
}

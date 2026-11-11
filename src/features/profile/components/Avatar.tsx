import { StyleSheet, Text, View } from 'react-native';

import { getAvatar } from '../avatars';

type AvatarProps = {
  avatarId: string | null | undefined;
  size: number;
};

/** Foto de perfil predefinida: um emoji sobre um círculo colorido. */
export function Avatar({ avatarId, size }: AvatarProps) {
  const avatar = getAvatar(avatarId);
  return (
    <View
      accessibilityLabel={`Foto de perfil: ${avatar.label}`}
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: avatar.background,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.52, lineHeight: size * 0.68 }}>
        {avatar.emoji}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});

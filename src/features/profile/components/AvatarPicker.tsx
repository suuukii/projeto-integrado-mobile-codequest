import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { MessageBanner } from '../../../components/MessageBanner';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { colors, radius, spacing, typography } from '../../../theme';
import { AVATARS } from '../avatars';
import { Avatar } from './Avatar';

type AvatarPickerProps = {
  visible: boolean;
  selectedId: string;
  saving: boolean;
  error: string | null;
  onSelect: (avatarId: string) => void;
  onClose: () => void;
};

/** Janela com as fotos predefinidas para o usuário escolher. */
export function AvatarPicker({
  visible,
  selectedId,
  saving,
  error,
  onSelect,
  onClose,
}: AvatarPickerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Toques dentro do cartão não fecham a janela. */}
        <Pressable style={styles.sheet} onPress={() => {}}>
          <Text style={styles.title}>Escolha sua foto</Text>
          {error && <MessageBanner message={error} />}
          <View style={styles.grid}>
            {AVATARS.map(avatar => {
              const selected = avatar.id === selectedId;
              return (
                <Pressable
                  key={avatar.id}
                  accessibilityRole="radio"
                  accessibilityLabel={avatar.label}
                  accessibilityState={{ selected, disabled: saving }}
                  disabled={saving}
                  onPress={() => onSelect(avatar.id)}
                  style={[styles.option, selected && styles.optionSelected]}
                >
                  <Avatar avatarId={avatar.id} size={56} />
                </Pressable>
              );
            })}
          </View>
          <PrimaryButton title="Fechar" variant="outlined" onPress={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: { ...typography.heading, color: colors.text, textAlign: 'center' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  option: {
    padding: 4,
    borderRadius: radius.round,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  optionSelected: { borderColor: colors.primary },
});

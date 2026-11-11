import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius } from '../theme';

type BackButtonProps = {
  /** Ação alternativa; por padrão volta para a tela anterior. */
  onPress?: () => void;
};

export function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Pressable
      accessibilityLabel="Voltar"
      accessibilityRole="button"
      hitSlop={8}
      onPress={handlePress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={styles.arrowHead} />
      <View style={styles.arrowShaft} />
    </Pressable>
  );
}

const ARROW_COLOR = colors.text;

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: colors.surface },
  arrowHead: {
    position: 'absolute',
    left: 12,
    width: 14,
    height: 14,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: ARROW_COLOR,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  arrowShaft: {
    position: 'absolute',
    left: 13,
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: ARROW_COLOR,
  },
});

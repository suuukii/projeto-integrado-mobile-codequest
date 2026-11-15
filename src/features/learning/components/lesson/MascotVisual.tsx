import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

import { Logo } from '../../../../components/Logo';
import { colors } from '../../../../theme';

type MascotVisualProps = {
  animate: boolean;
};

/** Mascote que entra pulando e depois flutua suavemente. */
export function MascotVisual({ animate }: MascotVisualProps) {
  const entrance = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) {
      // A preferência por menos movimento pode chegar com a entrada já em
      // andamento: mostra o mascote parado.
      entrance.setValue(1);
      float.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    const spring = Animated.spring(entrance, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    });
    spring.start(({ finished }) => finished && loop.start());
    return () => {
      spring.stop();
      loop.stop();
    };
  }, [animate, entrance, float]);

  return (
    <Animated.View
      style={[
        styles.halo,
        {
          opacity: entrance,
          transform: [
            { scale: entrance.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) },
            { translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) },
          ],
        },
      ]}
    >
      <Logo size={150} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  halo: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

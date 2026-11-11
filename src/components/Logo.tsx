import { Image, StyleSheet } from 'react-native';

const logoSource = require('../assets/logo.png');

type LogoProps = {
  size?: number;
};

export function Logo({ size = 120 }: LogoProps) {
  return (
    <Image
      accessibilityLabel="Logo do Codequest"
      resizeMode="contain"
      source={logoSource}
      style={[styles.image, { width: size, height: size }]}
    />
  );
}

const styles = StyleSheet.create({
  image: { alignSelf: 'center' },
});

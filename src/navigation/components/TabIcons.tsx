import { StyleSheet, View } from 'react-native';

type IconProps = {
  color: string;
};

/** Capelo de formatura desenhado com formas simples. */
export function LearnIcon({ color }: IconProps) {
  return (
    <View style={styles.box}>
      <View style={[styles.capBase, { backgroundColor: color }]} />
      <View style={[styles.boardTop, { borderBottomColor: color }]} />
      <View style={[styles.boardBottom, { borderTopColor: color }]} />
      <View style={[styles.tassel, { backgroundColor: color }]} />
    </View>
  );
}

/** Pessoa dentro de um círculo. */
export function ProfileIcon({ color }: IconProps) {
  return (
    <View style={[styles.userRing, { borderColor: color }]}>
      <View style={[styles.userHead, { borderColor: color }]} />
      <View style={[styles.userBody, { borderColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: 30, height: 26 },
  // O topo do capelo é um losango feito de dois triângulos.
  boardTop: {
    position: 'absolute',
    left: 1,
    top: 1,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  boardBottom: {
    position: 'absolute',
    left: 1,
    top: 8,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  capBase: {
    position: 'absolute',
    left: 7,
    top: 11,
    width: 16,
    height: 10,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  tassel: {
    position: 'absolute',
    left: 24,
    top: 8,
    width: 2,
    height: 11,
    borderRadius: 1,
  },
  userRing: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  userHead: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 4,
  },
  userBody: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginTop: 2,
  },
});

import { StyleSheet, View } from 'react-native';

type IconProps = {
  color: string;
};

export function PlayIcon({ color }: IconProps) {
  return <View style={[styles.play, { borderLeftColor: color }]} />;
}

export function CheckIcon({ color }: IconProps) {
  return <View style={[styles.check, { borderColor: color }]} />;
}

export function LockIcon({
  color,
  holeColor,
}: IconProps & { holeColor: string }) {
  return (
    <View style={styles.lock}>
      <View style={[styles.shackle, { borderColor: color }]} />
      <View style={[styles.lockBody, { backgroundColor: color }]}>
        <View style={[styles.keyhole, { backgroundColor: holeColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  play: {
    width: 0,
    height: 0,
    marginLeft: 6,
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderLeftWidth: 24,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  check: {
    width: 28,
    height: 15,
    marginTop: -6,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 2,
    transform: [{ rotate: '-45deg' }],
  },
  lock: { alignItems: 'center' },
  shackle: {
    width: 20,
    height: 16,
    borderWidth: 4,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: -1,
  },
  lockBody: {
    width: 30,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyhole: { width: 6, height: 8, borderRadius: 3 },
});

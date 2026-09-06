import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.round(progress * 100)}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: COLORS.track,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.accentRed,
    borderRadius: 4,
  },
});

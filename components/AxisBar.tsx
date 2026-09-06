import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

interface AxisBarProps {
  leftLabel: string;
  rightLabel: string;
  value: number; // -2..2
}

const MIN = -2;
const MAX = 2;

export default function AxisBar({ leftLabel, rightLabel, value }: AxisBarProps) {
  const clamped = Math.max(MIN, Math.min(MAX, value));
  const percent = ((clamped - MIN) / (MAX - MIN)) * 100;

  return (
    <View style={styles.wrap}>
      <View style={styles.labelsRow}>
        <Text style={styles.label}>{leftLabel}</Text>
        <Text style={styles.label}>{rightLabel}</Text>
      </View>
      <View style={styles.track}>
        <View style={styles.centerLine} />
        <View style={[styles.marker, { left: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 20,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 12,
    color: COLORS.inkMuted,
    maxWidth: '48%',
  },
  track: {
    height: 6,
    backgroundColor: COLORS.track,
    borderRadius: 3,
    justifyContent: 'center',
  },
  centerLine: {
    position: 'absolute',
    left: '50%',
    width: 1,
    height: 12,
    top: -3,
    backgroundColor: COLORS.ink,
    opacity: 0.3,
  },
  marker: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.ink,
    marginLeft: -9,
    top: -6,
    borderWidth: 3,
    borderColor: COLORS.yellow,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

interface AxisBarProps {
  leftLabel: string;
  rightLabel: string;
  value: number; // -3..3
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
    fontSize: 12,
    color: COLORS.inkMuted,
    fontFamily: 'ZenMaruGothic_500Medium',
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
    backgroundColor: COLORS.cardBorder,
  },
  marker: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.accentRed,
    marginLeft: -8,
    top: -5,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});

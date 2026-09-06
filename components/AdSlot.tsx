import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

// Native (iOS/Android) placeholder. Real mobile ads require a native SDK
// (e.g. react-native-google-mobile-ads + AdMob account + a rebuilt app),
// which is a separate integration from the web ad tags below.
export default function AdSlot({ label = '広告' }: { label?: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}スペース</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: 250,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
  },
  label: {
    color: COLORS.inkMuted,
    fontSize: 13,
  },
});

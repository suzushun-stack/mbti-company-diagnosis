import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import { AD_BANNER } from '../data/ads';
import { COLORS } from '../theme';

// Native (iOS/Android): renders the A8.net banner as an Image wrapped in a
// Pressable that opens the tracking link in the system browser, plus a
// hidden 1x1 Image to fire the impression pixel.
export default function AdSlot() {
  return (
    <View style={styles.box}>
      <Pressable onPress={() => Linking.openURL(AD_BANNER.href)}>
        <Image
          source={{ uri: AD_BANNER.imageSrc }}
          style={{ width: AD_BANNER.width, height: AD_BANNER.height }}
          resizeMode="contain"
        />
      </Pressable>
      <Image source={{ uri: AD_BANNER.impressionPixel }} style={styles.pixel} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
  },
  pixel: {
    width: 1,
    height: 1,
  },
});

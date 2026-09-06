import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { AD_BANNER } from '../data/ads';
import { COLORS } from '../theme';

// Web: renders the A8.net banner tag (click-through <a><img> plus the 1x1
// impression pixel) directly into the DOM.
export default function AdSlot() {
  const ref = useRef<View>(null);

  useEffect(() => {
    const node = ref.current as unknown as HTMLDivElement | null;
    if (!node) return;
    node.id = 'ad-slot-interstitial';
    node.innerHTML =
      `<a href="${AD_BANNER.href}" rel="nofollow noopener sponsored" target="_blank">` +
      `<img border="0" width="${AD_BANNER.width}" height="${AD_BANNER.height}" alt="" src="${AD_BANNER.imageSrc}"></a>` +
      `<img border="0" width="1" height="1" src="${AD_BANNER.impressionPixel}" alt="">`;
  }, []);

  return <View ref={ref} style={styles.box} />;
}

const styles = {
  box: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
  },
};

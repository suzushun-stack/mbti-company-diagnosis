import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { COLORS } from '../theme';

// Web-only ad slot. Renders a real <div> in the DOM so a third-party ad
// network's embed code (Google AdSense, an ASP like A8.net, etc.) can be
// dropped in below. Ads only work once this is deployed to a real static
// host (GitHub Pages, Vercel, ...) — third-party ad scripts do not run
// inside the Artifact preview sandbox.
export default function AdSlot({ label = '広告' }: { label?: string }) {
  const ref = useRef<View>(null);

  useEffect(() => {
    const node = ref.current as unknown as HTMLDivElement | null;
    if (!node) return;
    node.id = 'ad-slot-interstitial';

    // --- Paste your ad network's embed code here ---
    // Example (Google AdSense), after adding the AdSense loader script to
    // public/index.html's <head> and creating an ad unit in your AdSense
    // dashboard:
    //
    // node.innerHTML =
    //   '<ins class="adsbygoogle" style="display:block" ' +
    //   'data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" ' +
    //   'data-ad-slot="XXXXXXXXXX" data-ad-format="auto" ' +
    //   'data-full-width-responsive="true"></ins>';
    // ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    //
    // For an affiliate ASP (e.g. A8.net), paste the <a>/<img> snippet they
    // give you into node.innerHTML instead.
  }, []);

  return (
    <View ref={ref} style={styles.box}>
      <span style={{ color: COLORS.inkMuted, fontSize: 13 }}>{label}スペース</span>
    </View>
  );
}

const styles = {
  box: {
    minHeight: 250,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed' as const,
    borderColor: COLORS.cardBorder,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: COLORS.card,
  },
};

import { Linking, Pressable, Text } from 'react-native';
import { COLORS } from '../theme';

interface AffiliateLinkProps {
  href: string;
  title: string;
  description: string;
}

// Native (iOS/Android): opens the affiliate URL in the system browser so the
// ASP's tracking redirect and cookie land correctly.
export default function AffiliateLink({ href, title, description }: AffiliateLinkProps) {
  return (
    <Pressable style={styles.card} onPress={() => Linking.openURL(href)}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = {
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontFamily: 'ZenMaruGothic_700Bold',
    fontSize: 15,
    color: COLORS.ink,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: COLORS.inkMuted,
    lineHeight: 18,
  },
} as const;

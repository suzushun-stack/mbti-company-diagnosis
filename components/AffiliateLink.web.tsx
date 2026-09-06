import type { CSSProperties } from 'react';
import { COLORS } from '../theme';

interface AffiliateLinkProps {
  href: string;
  title: string;
  description: string;
}

// Web: renders a real <a> tag. rel="sponsored" marks it as a paid/affiliate
// link per Google's link-attribute guidelines; target="_blank" opens the
// merchant site in a new tab so the quiz result stays open.
export default function AffiliateLink({ href, title, description }: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      style={styles.card}
    >
      <span style={styles.title}>{title}</span>
      <span style={styles.description}>{description}</span>
    </a>
  );
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: 'block',
    backgroundColor: COLORS.card,
    border: `2px solid ${COLORS.cardBorder}`,
    borderRadius: 16,
    padding: 16,
    textDecoration: 'none',
  },
  title: {
    display: 'block',
    fontFamily: 'ZenKakuGothicNew_700Bold, sans-serif',
    fontWeight: 700,
    fontSize: 15,
    color: COLORS.ink,
    marginBottom: 4,
  },
  description: {
    display: 'block',
    fontFamily: 'ZenKakuGothicNew_500Medium, sans-serif',
    fontSize: 13,
    color: COLORS.inkMuted,
    lineHeight: '18px',
  },
};

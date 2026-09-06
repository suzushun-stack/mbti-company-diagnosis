export interface AffiliateItem {
  title: string;
  description: string;
  // TODO: Replace with your actual ASP tracking URL once each merchant
  // program is approved (A8.net, もしもアフィリエイト, バリューコマース, etc).
  // Each ASP gives you a unique tracking link per merchant/program — paste
  // it here in place of the '#' placeholder.
  href: string;
}

export const AFFILIATE_ITEMS: AffiliateItem[] = [
  {
    title: '自己分析をもっと深めたい方へ',
    description: '診断結果をもとに、より詳しい自己分析ツールで強みを言語化してみましょう。',
    href: '#',
  },
  {
    title: 'SPI・適性検査の対策に',
    description: '応募企業の選考で使われることが多いSPI・適性検査を教材で対策できます。',
    href: '#',
  },
  {
    title: '就活エージェントに相談する',
    description: '業界研究や面接対策までサポートしてくれる就活エージェントを活用する方法も。',
    href: '#',
  },
];

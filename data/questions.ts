export type Axis = 'stability' | 'team' | 'org' | 'domain';

export interface Question {
  id: number;
  text: string;
  axis: Axis;
  // direction: 1 if agreeing moves the axis toward its positive pole, -1 if toward the negative pole
  direction: 1 | -1;
}

// Axes and their meaning:
// stability: negative = 安定重視(Stable) / positive = 挑戦・成長重視(Growth)
// team:      negative = チームプレー(Team) / positive = 個人プレー(Individual)
// org:       negative = 大手・組織型(Corporate) / positive = スタートアップ・裁量型(Venture)
// domain:    negative = モノづくり・技術志向(Craft) / positive = 対人・対顧客志向(Human)

export const QUESTIONS: Question[] = [
  { id: 1, axis: 'stability', text: '会社選びで大事なのは、安定した収入や制度より成長できる機会だ', direction: 1 },
  { id: 2, axis: 'stability', text: '慣れたやり方を着実に守るより、新しいやり方をどんどん試したい', direction: 1 },
  { id: 3, axis: 'stability', text: '多少リスクがあっても、大きな成果を狙えるほうにワクワクする', direction: 1 },
  { id: 13, axis: 'stability', text: '給料や待遇が多少下がっても、自分の市場価値を高められる環境を選びたい', direction: 1 },
  { id: 14, axis: 'stability', text: '先が読めない環境より、見通しが立つ環境で着実に歩みたい', direction: -1 },

  { id: 4, axis: 'team', text: '一人で自分のペースで進めるより、チームで協力して進めたい', direction: -1 },
  { id: 5, axis: 'team', text: '周りに相談しながら決めるより、自分で考えて決めたい', direction: 1 },
  { id: 6, axis: 'team', text: 'チームを引っ張るより、自分の専門性を高めることに集中したい', direction: 1 },
  { id: 15, axis: 'team', text: '一人で成果を出すより、みんなで喜びを分かち合いたい', direction: -1 },
  { id: 16, axis: 'team', text: '誰かに合わせるより、自分のやり方を貫きたい', direction: 1 },

  { id: 7, axis: 'org', text: '整った研修や福利厚生がある環境より、裁量を持って自由に動ける環境がいい', direction: 1 },
  { id: 8, axis: 'org', text: '知名度やブランド力より、会社の成長スピードを重視したい', direction: 1 },
  { id: 9, axis: 'org', text: '決まったキャリアパスより、自分でキャリアを切り開くほうが性に合う', direction: 1 },
  { id: 17, axis: 'org', text: '大きな組織の歯車になるより、少人数の組織で意思決定に関わりたい', direction: 1 },
  { id: 18, axis: 'org', text: '経営が不安定なベンチャーより、経営基盤が安定した大企業で働きたい', direction: -1 },

  { id: 10, axis: 'domain', text: '人と接して価値を届けるより、モノや技術を作り込むことに惹かれる', direction: -1 },
  { id: 11, axis: 'domain', text: '一人で黙々と作業する時間より、人と話してニーズを引き出す時間が好き', direction: 1 },
  { id: 12, axis: 'domain', text: 'エンジニアリングやものづくりより、営業・企画・接客などの対人業務に興味がある', direction: 1 },
  { id: 19, axis: 'domain', text: '人と話すことより、じっくり考えて何かを作り上げることに集中したい', direction: -1 },
  { id: 20, axis: 'domain', text: 'モノを作ることより、人の悩みや要望に向き合うことにやりがいを感じる', direction: 1 },
];

import { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useFonts,
  ZenKakuGothicNew_500Medium,
  ZenKakuGothicNew_700Bold,
  ZenKakuGothicNew_900Black,
} from '@expo-google-fonts/zen-kaku-gothic-new';
import { QUESTIONS } from './data/questions';
import { Answers, Choice, computeAxisScores, describeType, matchCompanies } from './lib/scoring';
import { TYPE_PROFILES, getTypeCode } from './data/types';
import ProgressBar from './components/ProgressBar';
import AxisBar from './components/AxisBar';
import AdSlot from './components/AdSlot';
import AffiliateLink from './components/AffiliateLink';
import { AFFILIATE_ITEMS } from './data/affiliates';
import { COLORS } from './theme';

const HERO_IMAGE = require('./assets/illustrations/hero-businessman.png');

type Screen = 'intro' | 'quiz' | 'ad' | 'result';
const AD_WAIT_SECONDS = 5;

export default function App() {
  const [fontsLoaded] = useFonts({
    ZenKakuGothicNew_500Medium,
    ZenKakuGothicNew_700Bold,
    ZenKakuGothicNew_900Black,
  });

  const [screen, setScreen] = useState<Screen>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [adSecondsLeft, setAdSecondsLeft] = useState(AD_WAIT_SECONDS);

  useEffect(() => {
    if (screen !== 'ad') return;
    setAdSecondsLeft(AD_WAIT_SECONDS);
    const timer = setInterval(() => {
      setAdSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [screen]);

  const currentQuestion = QUESTIONS[questionIndex];

  const scores = useMemo(() => computeAxisScores(answers), [answers]);
  const matches = useMemo(() => matchCompanies(scores, 5), [scores]);
  const typeLabel = useMemo(() => describeType(scores), [scores]);
  const typeProfile = useMemo(() => TYPE_PROFILES[getTypeCode(scores)], [scores]);

  function startQuiz() {
    setAnswers({});
    setQuestionIndex(0);
    setScreen('quiz');
  }

  function backToIntro() {
    setAnswers({});
    setQuestionIndex(0);
    setScreen('intro');
  }

  function selectAnswer(choice: Choice) {
    const nextAnswers = { ...answers, [currentQuestion.id]: choice };
    setAnswers(nextAnswers);
    if (questionIndex + 1 < QUESTIONS.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreen('ad');
    }
  }

  function goBack() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }

  function continueToResult() {
    setScreen('result');
  }

  if (!fontsLoaded) {
    return <View style={styles.safe} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      {screen === 'intro' && (
        <View style={styles.centerScreen}>
          <Text style={styles.badge}>20の質問でわかる</Text>
          <Text style={styles.title}>MBTI風オススメ企業診断</Text>
          <Text style={styles.subtitle}>
            20個の質問に答えるだけで、あなたの価値観に合いそうな企業をタイプ診断します。
          </Text>
          <Text style={styles.disclaimer}>
            ※ 診断結果は自己分析のきっかけとして使う簡易的なものです。実際の企業研究や説明会参加も忘れずに。
          </Text>
          <Image source={HERO_IMAGE} style={styles.heroImage} resizeMode="contain" />
          <Pressable style={styles.primaryButton} onPress={startQuiz}>
            <Text style={styles.primaryButtonText}>診断をはじめる</Text>
          </Pressable>
        </View>
      )}

      {screen === 'quiz' && currentQuestion && (
        <View style={styles.quizScreen}>
          <ProgressBar progress={(questionIndex + 1) / QUESTIONS.length} />
          <Text style={[styles.badge, styles.badgeLeft]}>
            質問 {questionIndex + 1} / {QUESTIONS.length}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>

          <View style={styles.optionsWrap}>
            <Pressable style={styles.optionButton} onPress={() => selectAnswer('SA')}>
              <Text style={styles.optionText}>そう思う</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={() => selectAnswer('A')}>
              <Text style={styles.optionText}>どちらかといえばそう思う</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={() => selectAnswer('D')}>
              <Text style={styles.optionText}>どちらかといえばそう思わない</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={() => selectAnswer('SD')}>
              <Text style={styles.optionText}>そう思わない</Text>
            </Pressable>
          </View>

          {questionIndex > 0 && (
            <Pressable style={styles.backLink} onPress={goBack}>
              <Text style={styles.backLinkText}>← 前の質問に戻る</Text>
            </Pressable>
          )}
        </View>
      )}

      {screen === 'ad' && (
        <View style={styles.adScreen}>
          <Text style={[styles.badge, styles.badgeCenter]}>診断結果はこのあと表示されます</Text>
          <View style={styles.adSlotWrap}>
            <AdSlot />
          </View>
          <Pressable
            style={[styles.primaryButton, adSecondsLeft > 0 && styles.primaryButtonDisabled]}
            onPress={continueToResult}
            disabled={adSecondsLeft > 0}
          >
            <Text style={styles.primaryButtonText}>
              {adSecondsLeft > 0 ? `結果を見る (${adSecondsLeft})` : '結果を見る'}
            </Text>
          </Pressable>
        </View>
      )}

      {screen === 'result' && (
        <ScrollView contentContainerStyle={styles.resultScreen}>
          <Text style={[styles.badge, styles.badgeCenter]}>あなたのタイプ</Text>
          <Text style={styles.resultTypeTitle}>{typeProfile.title}</Text>
          <Text style={styles.resultType}>{typeLabel}</Text>

          <View style={styles.characterCard}>
            <Text style={styles.characterText}>{typeProfile.description}</Text>
          </View>

          <View style={styles.axisSection}>
            <AxisBar leftLabel="安定重視" rightLabel="挑戦・成長重視" value={scores.stability} />
            <AxisBar leftLabel="チームプレー" rightLabel="個人プレー" value={scores.team} />
            <AxisBar leftLabel="大手・組織型" rightLabel="スタートアップ・裁量型" value={scores.org} />
            <AxisBar leftLabel="モノづくり・技術志向" rightLabel="対人・対顧客志向" value={scores.domain} />
          </View>

          <Text style={[styles.badge, styles.badgeLeft]}>おすすめの企業 TOP5</Text>
          {matches.map(({ company, matchPercent }, index) => (
            <View key={company.name} style={styles.companyCard}>
              <View style={styles.companyCardHeader}>
                <View style={styles.companyRankBadge}>
                  <Text style={styles.companyRankText}>{index + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.companyIndustry}>{company.industry}</Text>
                </View>
                <View style={styles.matchPercentBadge}>
                  <Text style={styles.matchPercentText}>{matchPercent}%</Text>
                </View>
              </View>
              <Text style={styles.companyDescription}>{company.description}</Text>
              <View style={styles.candidateBox}>
                <Text style={[styles.badge, styles.badgeLeft]}>求める人物像</Text>
                <Text style={styles.candidateText}>{company.idealCandidate}</Text>
              </View>
            </View>
          ))}

          <Text style={[styles.badge, styles.badgeLeft]}>こんなサービスもチェック</Text>
          <View style={styles.affiliateSection}>
            {AFFILIATE_ITEMS.map((item) => (
              <AffiliateLink
                key={item.title}
                href={item.href}
                title={item.title}
                description={item.description}
              />
            ))}
          </View>

          <Pressable style={styles.primaryButton} onPress={backToIntro}>
            <Text style={styles.primaryButtonText}>トップに戻る</Text>
          </Pressable>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  badge: {
    fontFamily: 'ZenKakuGothicNew_700Bold',
    fontSize: 12,
    color: COLORS.badgeText,
    backgroundColor: COLORS.badgeBg,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  badgeLeft: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeCenter: {
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'ZenKakuGothicNew_900Black',
    fontSize: 28,
    color: COLORS.ink,
    marginBottom: 14,
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 16,
    color: COLORS.inkMuted,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  disclaimer: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 12,
    color: COLORS.inkMuted,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 18,
  },
  heroImage: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: COLORS.yellow,
    borderWidth: 2,
    borderColor: COLORS.ink,
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: COLORS.ink,
    shadowOpacity: 0.2,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
  },
  primaryButtonText: {
    fontFamily: 'ZenKakuGothicNew_700Bold',
    color: COLORS.ink,
    fontSize: 16,
  },
  primaryButtonDisabled: {
    opacity: 0.4,
  },
  adScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  adSlotWrap: {
    marginTop: 4,
    marginBottom: 24,
  },
  quizScreen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  questionText: {
    fontFamily: 'ZenKakuGothicNew_700Bold',
    fontSize: 22,
    color: COLORS.ink,
    marginTop: 8,
    marginBottom: 8,
    lineHeight: 34,
  },
  optionsWrap: {
    marginTop: 24,
    gap: 12,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: COLORS.ink,
    backgroundColor: COLORS.card,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  optionText: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 16,
    color: COLORS.ink,
    textAlign: 'center',
  },
  backLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  backLinkText: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    color: COLORS.inkMuted,
    fontSize: 14,
  },
  resultScreen: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },
  resultTypeTitle: {
    fontFamily: 'ZenKakuGothicNew_900Black',
    fontSize: 26,
    color: COLORS.ink,
    textAlign: 'center',
    marginTop: 4,
  },
  resultType: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 13,
    color: COLORS.inkMuted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  characterCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  characterText: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 15,
    color: COLORS.ink,
    lineHeight: 25,
  },
  axisSection: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  companyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
  },
  companyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  companyRankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.yellow,
    borderWidth: 1.5,
    borderColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyRankText: {
    fontFamily: 'ZenKakuGothicNew_900Black',
    fontSize: 14,
    color: COLORS.ink,
  },
  companyName: {
    fontFamily: 'ZenKakuGothicNew_700Bold',
    fontSize: 17,
    color: COLORS.ink,
  },
  companyIndustry: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 12,
    color: COLORS.inkMuted,
    marginTop: 2,
  },
  matchPercentBadge: {
    backgroundColor: COLORS.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  matchPercentText: {
    fontFamily: 'ZenKakuGothicNew_900Black',
    fontSize: 14,
    color: COLORS.badgeText,
  },
  companyDescription: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 14,
    color: COLORS.inkMuted,
    marginTop: 12,
    lineHeight: 20,
  },
  candidateBox: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.cardBorder,
  },
  candidateText: {
    fontFamily: 'ZenKakuGothicNew_500Medium',
    fontSize: 14,
    color: COLORS.ink,
    lineHeight: 20,
  },
  affiliateSection: {
    gap: 12,
    marginBottom: 32,
  },
});

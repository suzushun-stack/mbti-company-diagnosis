import { Axis, QUESTIONS } from '../data/questions';
import { Company, COMPANIES } from '../data/companies';

export type Choice = 'SA' | 'A' | 'D' | 'SD';

// SA = そう思う, A = どちらかといえばそう思う, D = どちらかといえばそう思わない, SD = そう思わない
const CHOICE_WEIGHT: Record<Choice, number> = { SA: 2, A: 1, D: -1, SD: -2 };

export type Answers = Record<number, Choice>;

export type AxisScores = Record<Axis, number>;

const AXES: Axis[] = ['stability', 'team', 'org', 'domain'];

export function computeAxisScores(answers: Answers): AxisScores {
  const raw: AxisScores = { stability: 0, team: 0, org: 0, domain: 0 };
  const countPerAxis: Record<Axis, number> = { stability: 0, team: 0, org: 0, domain: 0 };

  for (const q of QUESTIONS) {
    countPerAxis[q.axis] += 1;
    const choice = answers[q.id];
    if (!choice) continue;
    raw[q.axis] += q.direction * CHOICE_WEIGHT[choice];
  }

  // Normalize each axis to roughly the same -2..2 range as company scores
  // (max raw per axis = questionsPerAxis * 2, so dividing by questionsPerAxis maps it to -2..2).
  const normalized: AxisScores = { stability: 0, team: 0, org: 0, domain: 0 };
  for (const axis of AXES) {
    normalized[axis] = countPerAxis[axis] > 0 ? raw[axis] / countPerAxis[axis] : 0;
  }
  return normalized;
}

export interface MatchResult {
  company: Company;
  matchPercent: number;
}

// Axes range roughly -2..2 for both user scores and company scores, so the max
// possible per-axis difference is 4.
const MAX_DISTANCE = Math.sqrt(4 * Math.pow(4, 2));

export function matchCompanies(scores: AxisScores, topN = 3): MatchResult[] {
  const results = COMPANIES.map((company) => {
    const dx = scores.stability - company.stability;
    const dy = scores.team - company.team;
    const dz = scores.org - company.org;
    const dw = scores.domain - company.domain;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
    const matchPercent = Math.max(0, Math.round((1 - distance / MAX_DISTANCE) * 100));
    return { company, matchPercent };
  });
  results.sort((a, b) => b.matchPercent - a.matchPercent);
  return results.slice(0, topN);
}

export function describeType(scores: AxisScores): string {
  const parts: string[] = [];
  parts.push(scores.stability <= 0 ? '安定志向' : '挑戦志向');
  parts.push(scores.team <= 0 ? 'チーム型' : '個人型');
  parts.push(scores.org <= 0 ? '大手・組織型' : 'スタートアップ・裁量型');
  parts.push(scores.domain <= 0 ? 'モノづくり志向' : '対人志向');
  return parts.join(' × ');
}

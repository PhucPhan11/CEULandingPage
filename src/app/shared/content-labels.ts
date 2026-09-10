import { LocalizedText, ResultOutcome, ScheduleKind } from '../models/team-data';

export const SCHEDULE_KIND_LABELS: Record<ScheduleKind, LocalizedText> = {
  practice: { vi: 'Tập luyện', en: 'Practice' },
  pickup: { vi: 'Pick-up', en: 'Pick-up' },
  match: { vi: 'Thi đấu', en: 'Match' },
};

export const RESULT_OUTCOME_LABELS: Record<ResultOutcome, LocalizedText> = {
  win: { vi: 'Thắng', en: 'Win' },
  loss: { vi: 'Thua', en: 'Loss' },
  draw: { vi: 'Hòa', en: 'Draw' },
};

export function resultSymbol(outcome: ResultOutcome): string {
  return outcome === 'win' ? 'W' : outcome === 'loss' ? 'L' : 'D';
}

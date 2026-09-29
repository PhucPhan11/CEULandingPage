import { LocalizedText, ScheduleKind } from '../models/team-data';

export const SCHEDULE_KIND_LABELS: Record<ScheduleKind, LocalizedText> = {
  practice: { vi: 'Tập luyện', en: 'Practice' },
  pickup: { vi: 'Pick-up', en: 'Pick-up' },
  match: { vi: 'Thi đấu', en: 'Match' },
};

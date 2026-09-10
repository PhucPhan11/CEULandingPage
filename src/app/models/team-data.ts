export type Language = 'vi' | 'en';

export interface LocalizedText {
  vi: string;
  en: string;
}

export type ScheduleKind = 'practice' | 'pickup' | 'match';
export type ResultOutcome = 'win' | 'loss' | 'draw';

export interface TeamStat {
  value: string;
  label: LocalizedText;
}

export interface TeamValue {
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
}

export interface SiteContent {
  name: string;
  shortName: string;
  location: LocalizedText;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  introduction: LocalizedText[];
  sampleNotice: LocalizedText;
  stats: TeamStat[];
  values: TeamValue[];
}

export interface ScheduleItem {
  id: string;
  date: string;
  dateLabel: LocalizedText;
  time: string;
  kind: ScheduleKind;
  title: LocalizedText;
  opponent?: string;
  location: LocalizedText;
  address: LocalizedText;
  mapUrl?: string;
  note?: LocalizedText;
}

export interface RosterMember {
  id: string;
  name: string;
  number: string;
  role: LocalizedText;
  bio: LocalizedText;
  initials: string;
  accent: 'green' | 'orange' | 'blue' | 'yellow';
  photo?: string;
}

export interface MatchResult {
  id: string;
  date: string;
  dateLabel: LocalizedText;
  opponent: string;
  competition: LocalizedText;
  teamScore: number;
  opponentScore: number;
  outcome: ResultOutcome;
  highlight: LocalizedText;
}

export interface RecentEventImage {
  src: string;
  alt: LocalizedText;
  fit?: 'cover' | 'contain';
}

export interface RecentEvent {
  id: string;
  date: string;
  endDate?: string;
  dateLabel: LocalizedText;
  endDateLabel?: LocalizedText;
  title: LocalizedText;
  opponent?: string;
  opponentLogo?: string;
  host?: string;
  hostLogo?: string;
  eventLogo?: string;
  background?: string;
  images: RecentEventImage[];
}

export interface RecruitmentContent {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  buttonLabel: LocalizedText;
  buttonUrl: string;
  details: LocalizedText[];
}

export type ContactIcon = 'email' | 'instagram' | 'facebook' | 'youtube';

export interface SocialLink {
  label: string;
  shortLabel: string;
  icon: Exclude<ContactIcon, 'email'>;
  url: string;
}

export interface ContactContent {
  email: string;
  location: LocalizedText;
  socials: SocialLink[];
}

export interface TeamData {
  site: SiteContent;
  schedule: ScheduleItem[];
  roster: RosterMember[];
  results: MatchResult[];
  events: RecentEvent[];
  recruitment: RecruitmentContent;
  contact: ContactContent;
}

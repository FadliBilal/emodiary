export type MoodState = 'radiant' | 'calm' | 'neutral' | 'drained' | 'overwhelmed';

export interface MoodMeta {
  key: MoodState;
  label: string;
  subLabel: string;
  score: number; // 5 (Radiant) to 1 (Overwhelmed)
  colorHex: string;
  bgHex: string;
  borderHex: string;
  textHex: string;
  emoji: string;
  ariaLabel: string;
}

export interface ESMTag {
  id: string;
  label: string;
  category: 'emotion' | 'context' | 'somatic';
  recommendedFor?: MoodState[];
}

export interface MoodEntry {
  id: string;
  timestamp: string;
  dateFormatted: string;
  dayLabel: string;
  timeLabel: string;
  mood: MoodState;
  score: number;
  emotionTags: string[];
  contextTags: string[];
  textNote: string;
  sourceType: 'text' | 'voice';
  voiceDetails?: {
    durationSeconds: number;
    transcript: string;
    isSimulated?: boolean;
    waveformSamples?: number[];
  };
  sleepHours?: number;
  extractedThemes: string[];
  cbtReflectionDone?: boolean;
  persistenceRiskFlag?: boolean;
}

export type DemoScenarioId = 'raka' | 'nadia' | 'sandbox';

export interface DemoScenario {
  id: DemoScenarioId;
  name: string;
  age: number;
  role: string;
  institution: string;
  personaDescription: string;
  clinicalRiskLevel: 'low' | 'moderate' | 'elevated';
  riskBadgeText: string;
  consecutiveNegativeDays: number;
  primaryPatternHighlight: string;
  suggestedAction: string;
  initialEntries: MoodEntry[];
}

export interface ReflectiveMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  socraticPromptTag?: string;
  suggestedQuickReplies?: string[];
}

export interface PsychoeducationModule {
  id: string;
  title: string;
  badge: string;
  category: 'CBT Cognitive Reframing' | 'Somatic Grounding' | 'Sleep & Rhythm' | 'Clinical Self-Advocacy';
  estimatedReadTime: string;
  summary: string;
  interactiveType?: 'breathing' | 'thought-record' | 'sleep-checklist';
  articleSections: { heading: string; paragraphs: string[] }[];
  keyTakeaway: string;
  targetMoods: MoodState[];
}

export interface Psychologist {
  id: string;
  name: string;
  credentials: string;
  institution: string;
  sippkLicense: string;
  specialties: string[];
  therapeuticApproach: string;
  consultationTypes: string[];
  rating: number;
  consultationCount: number;
  feeInfo: string;
  availableSlots: string[];
  avatarInitial: string;
  avatarBg: string;
  isUntagPartner?: boolean;
}

export interface ConsentExportState {
  includeMoodTrajectory: boolean;
  includeStressorTags: boolean;
  includeSleepCorrelation: boolean;
  includePersistenceRiskScore: boolean;
  includeRawDiaryNotes: boolean; // default false for granular privacy
  notesToPsychologist: string;
}

// Core Data Types for AceCoach (PTR/USPTA Standard & Biomechanics)

export type HandDominance = 'right' | 'left';
export type BackhandStyle = 'two_handed' | 'one_handed';
export type NTRPLevel = '1.5' | '2.0' | '2.5' | '3.0' | '3.5' | '4.0' | '4.5';
export type CourtSurface = 'hard' | 'clay' | 'grass';
export type DrillContext = 'Solo Shadow' | 'Wall / Dinding' | 'Feeder' | 'Live Rally';

export interface UserProfile {
  version: string;
  handDominance: HandDominance;
  backhandStyle: BackhandStyle;
  ntrpLevel: NTRPLevel;
  courtSurface: CourtSurface;
  joinedDate: string;
  highContrastOutdoor: boolean;
  voiceAudioEnabled: boolean;
  audioVolume: number;
}

export interface CurriculumLesson {
  id: string;
  week: number;
  title: string;
  subtitle: string;
  level: 'beginner' | 'intermediate';
  context: DrillContext;
  durationMinutes: number;
  objective: string;
  biomechanicsFocus: string;
  kineticChainCheckpoint: string;
  drills: string[];
  repsOrSets: string;
  proTipPTR: string;
  backhandSpecific?: 'two_handed' | 'one_handed' | 'both';
}

export interface BiomechanicsPhase {
  id: string;
  name: string;
  title: string;
  description: string;
  keyActionRighty: string;
  keyActionLefty: string;
  angleTarget: string;
  kineticChainRole: string;
  mythVsModern: {
    myth: string;
    reality: string;
    whyItMatters: string;
  };
}

export interface PracticeLog {
  id: string;
  date: string;
  durationMinutes: number;
  context: DrillContext;
  focusStroke: 'Forehand' | 'Backhand' | 'Serve' | 'Volley & Net' | 'Footwork' | 'Matchplay';
  rpeRating: number; // 1 to 10 scale
  notes: string;
  ballsHitEstimate?: number;
}

export interface FaultDiagnostic {
  id: string;
  symptom: string;
  stroke: 'Forehand' | 'Backhand' | 'Serve' | 'General';
  biomechanicalCause: string;
  kineticChainFailure: string;
  remedyDrill: {
    title: string;
    context: DrillContext;
    instructions: string[];
    reps: string;
  };
}

export interface TargetScoreState {
  zoneA: number; // Deep Crosscourt
  zoneB: number; // Short Angle
  zoneC: number; // Down The Line
  missed: number;
}

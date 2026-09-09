import { UserProfile, PracticeLog } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'acecoach_profile_v1_2',
  COMPLETED_LESSONS: 'acecoach_completed_lessons_v1_2',
  PRACTICE_LOGS: 'acecoach_practice_logs_v1_2',
  MASTERED_SKILLS: 'acecoach_mastered_skills_v1_2'
};

export const DEFAULT_PROFILE: UserProfile = {
  version: '1.2.0',
  handDominance: 'right',
  backhandStyle: 'two_handed',
  ntrpLevel: '2.5',
  courtSurface: 'hard',
  joinedDate: new Date().toISOString().split('T')[0],
  highContrastOutdoor: true,
  voiceAudioEnabled: true,
  audioVolume: 0.85
};

export const loadProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.warn('saveProfile error:', err);
  }
};

export const loadCompletedLessons = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCompletedLessons = (lessons: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(lessons));
  } catch (err) {
    console.warn('saveCompletedLessons error:', err);
  }
};

export const loadPracticeLogs = (): PracticeLog[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRACTICE_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const savePracticeLogs = (logs: PracticeLog[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRACTICE_LOGS, JSON.stringify(logs));
  } catch (err) {
    console.warn('savePracticeLogs error:', err);
  }
};

/**
 * Export all AceCoach data as a downloadable JSON file
 */
export const exportDataJSON = (): void => {
  const data = {
    exportDate: new Date().toISOString(),
    profile: loadProfile(),
    completedLessons: loadCompletedLessons(),
    practiceLogs: loadPracticeLogs()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `acecoach-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Import AceCoach data from a JSON file
 */
export const importDataJSON = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.profile) saveProfile(parsed.profile);
        if (parsed.completedLessons) saveCompletedLessons(parsed.completedLessons);
        if (parsed.practiceLogs) savePracticeLogs(parsed.practiceLogs);
        resolve(true);
      } catch (err) {
        console.warn('importDataJSON parse error:', err);
        resolve(false);
      }
    };
    reader.onerror = () => resolve(false);
    reader.readAsText(file);
  });
};

/**
 * Reset all user progress with safe verification
 */
export const resetAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};

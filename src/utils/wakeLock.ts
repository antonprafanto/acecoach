// Screen Wake Lock API helper for on-court drill sessions

let wakeLockSentinel: any = null;

export const requestWakeLock = async (): Promise<boolean> => {
  if ('wakeLock' in navigator) {
    try {
      wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
      });
      console.log('AceCoach: Screen Wake Lock active (Layar tetap menyala di lapangan)');
      return true;
    } catch (err) {
      console.warn('AceCoach: Screen Wake Lock error:', err);
      return false;
    }
  }
  return false;
};

export const releaseWakeLock = async (): Promise<void> => {
  if (wakeLockSentinel) {
    try {
      await wakeLockSentinel.release();
      wakeLockSentinel = null;
      console.log('AceCoach: Screen Wake Lock released');
    } catch (err) {
      console.warn('AceCoach: Release Wake Lock error:', err);
    }
  }
};

export const isWakeLockSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'wakeLock' in navigator;
};

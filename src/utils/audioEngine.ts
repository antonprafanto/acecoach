// Dual Audio Engine for AceCoach (Web Audio API Synth + Web Speech API)

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Unlock AudioContext on iOS Safari / Chrome on first user interaction
 */
export const unlockAudio = async (): Promise<boolean> => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    // Play an ultra-short silent beep to fully activate the pipeline
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.001;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
    return true;
  } catch (err) {
    console.warn('AudioContext unlock failed:', err);
    return false;
  }
};

/**
 * Play a synthesized high-frequency beep for on-court wind penetration
 */
export const playBeep = (freq = 880, duration = 0.12, volume = 0.8, type: OscillatorType = 'sine'): void => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('playBeep error:', err);
  }
};

/**
 * Play tennis whistle effect for interval round changes
 */
export const playWhistle = (volume = 0.8): void => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Dual oscillator whistle
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(2400, now);
    osc1.frequency.exponentialRampToValueAtTime(1800, now + 0.35);

    osc2.frequency.setValueAtTime(2450, now);
    osc2.frequency.exponentialRampToValueAtTime(1850, now + 0.35);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  } catch (err) {
    console.warn('playWhistle error:', err);
  }
};

/**
 * Speech synthesis for tactical verbal cues ("Ready", "Split!", "Hit!")
 */
export const speakCue = (text: string, lang = 'id-ID'): void => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.15; // Slightly faster for athletic timing
      utterance.pitch = 1.05;
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  }
};

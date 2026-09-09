import React from 'react';
import { Play, Volume2, Shield, Flame, CheckCircle2 } from 'lucide-react';
import { unlockAudio } from '../utils/audioEngine';
import { requestWakeLock } from '../utils/wakeLock';

interface SplashModalProps {
  onEnterCourt: () => void;
}

export const SplashModal: React.FC<SplashModalProps> = ({ onEnterCourt }) => {
  const handleStart = async () => {
    // Unlock iOS audio context on touch
    await unlockAudio();
    // Attempt to activate screen wake lock
    await requestWakeLock();
    onEnterCourt();
  };

  return (
    <div className="fixed inset-0 z-50 bg-tennis-dark/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-tennis-surface border border-slate-800 max-w-sm w-full rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-tennis-yellow/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-tennis-yellow/10 border border-tennis-yellow mx-auto mb-4 flex items-center justify-center court-glow-yellow">
          <Flame className="w-8 h-8 text-tennis-yellow" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">
          Masuk ke <span className="text-tennis-yellow">Lapangan</span>
        </h2>
        <p className="text-slate-400 text-xs mb-5">
          Sentuh tombol di bawah untuk mengaktifkan audio vokal lapangan dan mencegah layar HP mati saat berlatih.
        </p>

        <div className="space-y-2.5 text-left bg-tennis-navy/40 border border-slate-800 p-3.5 rounded-xl mb-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-tennis-yellow shrink-0" />
            <span>Audio sintetis & vokal aba-aba drill aktif</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-tennis-yellow shrink-0" />
            <span>Screen Wake Lock: layar tidak akan mati di bangku</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-tennis-yellow shrink-0" />
            <span>100% Offline PWA & Zero-Server data lokal</span>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full min-h-[52px] bg-tennis-yellow text-tennis-dark font-bold text-base rounded-xl flex items-center justify-center gap-2 hover:bg-tennis-yellowDark transition-all court-glow-yellow active:scale-95"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Mulai Latihan (Enter Court)</span>
        </button>
      </div>
    </div>
  );
};

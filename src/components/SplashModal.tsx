import React from 'react';
import { Play, Flame, HelpCircle, BookOpen, Volume2, Camera } from 'lucide-react';
import { unlockAudio } from '../utils/audioEngine';
import { requestWakeLock } from '../utils/wakeLock';

interface SplashModalProps {
  onEnterCourt: () => void;
  onOpenGuide: () => void;
}

export const SplashModal: React.FC<SplashModalProps> = ({ onEnterCourt, onOpenGuide }) => {
  const handleStart = async (openGuideAfter = false) => {
    // Unlock iOS/Android audio context on user touch
    await unlockAudio();
    // Attempt to activate screen wake lock
    await requestWakeLock();
    onEnterCourt();
    if (openGuideAfter) {
      onOpenGuide();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-tennis-dark/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-tennis-surface border border-slate-700/80 max-w-sm w-full rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-tennis-yellow/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-tennis-yellow/10 border border-tennis-yellow mx-auto mb-4 flex items-center justify-center court-glow-yellow">
          <Flame className="w-8 h-8 text-tennis-yellow" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">
          Selamat Datang di <span className="text-tennis-yellow">AceCoach</span>
        </h2>
        <p className="text-slate-300 text-xs mb-5">
          Asisten & pelatih tenis mandiri di saku Anda untuk berlatih lebih terarah di lapangan maupun di rumah.
        </p>

        <div className="space-y-3 text-left bg-tennis-navy/50 border border-slate-800 p-3.5 rounded-xl mb-6 text-xs text-slate-200">
          <div className="flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-tennis-yellow shrink-0 mt-0.5" />
            <span><strong>Kurikulum Teknik:</strong> Pelajari grip, ayunan, & servis dengan ilustrasi 3D realistis.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Volume2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Pelatih Suara di Lapangan:</strong> HP memberi aba-aba vokal tempo otomatis saat drill.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Camera className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><strong>Kamera Cermin Gerakan:</strong> Cocokkan pose ayunan Anda dengan standar petenis pro.</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => handleStart(false)}
            className="w-full min-h-[50px] bg-tennis-yellow text-tennis-dark font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-tennis-yellowDark transition-all court-glow-yellow active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Masuk ke Lapangan 🎾</span>
          </button>

          <button
            onClick={() => handleStart(true)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-700 hover:border-tennis-yellow/60 text-slate-300 hover:text-tennis-yellow text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors bg-slate-900/50"
          >
            <HelpCircle className="w-4 h-4 text-tennis-yellow" />
            <span>Baru Pertama Kali? Baca Panduan (1 Menit)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

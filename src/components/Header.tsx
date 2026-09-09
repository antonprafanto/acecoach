import React from 'react';
import { Shield, Sun, Moon, Volume2, VolumeX, Eye, Flame, Compass, Heart, HelpCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  wakeLockActive: boolean;
  onToggleWakeLock: () => void;
  onOpenNTRPQuiz: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onUpdateProfile,
  wakeLockActive,
  onToggleWakeLock,
  onOpenNTRPQuiz,
  onOpenGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-tennis-navy/95 backdrop-blur border-b border-slate-800 px-3 sm:px-4 py-2.5 sm:py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-tennis-yellow/10 border border-tennis-yellow flex items-center justify-center court-glow-yellow shrink-0">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-tennis-yellow" />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-white leading-none">
                Ace<span className="text-tennis-yellow">Coach</span>
              </h1>
              <span className="hidden sm:inline-flex text-[9px] sm:text-[10px] uppercase font-bold tracking-widest bg-tennis-yellow/15 text-tennis-yellow px-1.5 py-0.5 rounded border border-tennis-yellow/30">
                PTR v1.2
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate mt-0.5">
              <span className="hidden sm:inline">Modern Tennis Biomechanics • </span>
              <span className="text-slate-500 sm:text-slate-400">by Anton Prafanto</span>
            </p>
          </div>
        </div>

        {/* Quick Action Toggles */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* User Guide Button */}
          <button
            onClick={onOpenGuide}
            title="Panduan Cara Pakai Aplikasi"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-tennis-yellow/15 border border-tennis-yellow/40 text-xs text-tennis-yellow hover:bg-tennis-yellow hover:text-tennis-dark transition-all font-bold"
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px]">Panduan</span>
          </button>

          {/* NTRP Level Badge (Clickable for diagnostic quiz) */}
          <button
            onClick={onOpenNTRPQuiz}
            title="Klik untuk Kuis Diagnostik NTRP"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-tennis-surface border border-slate-700 text-xs text-slate-200 hover:border-tennis-yellow transition-colors font-semibold"
          >
            <Compass className="w-3.5 h-3.5 text-tennis-yellow shrink-0" />
            <span className="text-[11px]">
              <span className="hidden sm:inline">NTRP </span>
              {profile.ntrpLevel}
            </span>
          </button>

          {/* Screen Wake Lock Toggle */}
          <button
            onClick={onToggleWakeLock}
            title={wakeLockActive ? 'Layar Terkunci Aktif (Tidak Akan Mati)' : 'Layar Normal'}
            className={`p-1.5 sm:p-2 rounded-lg border transition-colors shrink-0 ${
              wakeLockActive
                ? 'bg-tennis-yellow/20 border-tennis-yellow text-tennis-yellow court-glow-yellow'
                : 'bg-tennis-surface border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Audio Voice Toggle */}
          <button
            onClick={() =>
              onUpdateProfile({
                voiceAudioEnabled: !profile.voiceAudioEnabled,
              })
            }
            title={profile.voiceAudioEnabled ? 'Suara Vokal Aktif' : 'Suara Vokal Mati'}
            className={`p-1.5 sm:p-2 rounded-lg border transition-colors shrink-0 ${
              profile.voiceAudioEnabled
                ? 'bg-tennis-blue/30 border-tennis-blueLight text-tennis-blueLight'
                : 'bg-tennis-surface border-slate-700 text-slate-400'
            }`}
          >
            {profile.voiceAudioEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

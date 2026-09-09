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
    <header className="sticky top-0 z-40 bg-tennis-navy/95 backdrop-blur border-b border-slate-800 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-tennis-yellow/10 border border-tennis-yellow flex items-center justify-center court-glow-yellow">
            <Flame className="w-5 h-5 text-tennis-yellow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold tracking-tight text-white">
                Ace<span className="text-tennis-yellow">Coach</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-tennis-yellow/15 text-tennis-yellow px-1.5 py-0.5 rounded border border-tennis-yellow/30">
                PTR v1.2
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
              Modern Tennis Biomechanics <span className="text-slate-500">• by Anton Prafanto</span>
            </p>
          </div>
        </div>

        {/* Quick Action Toggles */}
        <div className="flex items-center gap-2">
          {/* User Guide Button */}
          <button
            onClick={onOpenGuide}
            title="Panduan Cara Pakai Aplikasi"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-tennis-yellow/15 border border-tennis-yellow/40 text-xs text-tennis-yellow hover:bg-tennis-yellow hover:text-tennis-dark transition-all font-bold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Panduan</span>
          </button>

          {/* NTRP Level Badge (Clickable for diagnostic quiz) */}
          <button
            onClick={onOpenNTRPQuiz}
            title="Klik untuk Kuis Diagnostik NTRP"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-tennis-surface border border-slate-700 text-xs text-slate-300 hover:border-tennis-yellow transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-tennis-yellow" />
            <span className="font-bold">NTRP {profile.ntrpLevel}</span>
          </button>

          {/* Screen Wake Lock Toggle */}
          <button
            onClick={onToggleWakeLock}
            title={wakeLockActive ? 'Layar Terkunci Aktif (Tidak Akan Mati)' : 'Layar Normal'}
            className={`p-2 rounded-lg border transition-colors ${
              wakeLockActive
                ? 'bg-tennis-yellow/20 border-tennis-yellow text-tennis-yellow court-glow-yellow'
                : 'bg-tennis-surface border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Audio Voice Toggle */}
          <button
            onClick={() =>
              onUpdateProfile({
                voiceAudioEnabled: !profile.voiceAudioEnabled,
              })
            }
            title={profile.voiceAudioEnabled ? 'Suara Vokal Aktif' : 'Suara Vokal Mati'}
            className={`p-2 rounded-lg border transition-colors ${
              profile.voiceAudioEnabled
                ? 'bg-tennis-blue/30 border-tennis-blueLight text-tennis-blueLight'
                : 'bg-tennis-surface border-slate-700 text-slate-400'
            }`}
          >
            {profile.voiceAudioEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MessageCircle, Heart } from 'lucide-react';
import { Header } from './components/Header';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { SplashModal } from './components/SplashModal';
import { NTRPModal } from './components/NTRPModal';
import { CurriculumTab } from './components/CurriculumTab';
import { BiomechanicsTab } from './components/BiomechanicsTab';
import { DrillsTab } from './components/DrillsTab';
import { MentalMatchTab } from './components/MentalMatchTab';
import { DiagnosticsLogTab } from './components/DiagnosticsLogTab';
import {
  loadProfile,
  saveProfile,
  loadCompletedLessons,
  saveCompletedLessons,
  loadPracticeLogs,
  savePracticeLogs,
} from './utils/storage';
import { UserProfile, PracticeLog } from './types';
import { playBeep, speakCue } from './utils/audioEngine';
import { requestWakeLock, releaseWakeLock } from './utils/wakeLock';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [completedLessons, setCompletedLessons] = useState<string[]>(loadCompletedLessons);
  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>(loadPracticeLogs);

  const [activeTab, setActiveTab] = useState<ActiveTab>('curriculum');
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showNTRPModal, setShowNTRPModal] = useState<boolean>(false);
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);

  // Sync state changes to storage
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      saveProfile(next);
      return next;
    });
  };

  const handleToggleLesson = (lessonId: string) => {
    setCompletedLessons((prev) => {
      let next: string[];
      if (prev.includes(lessonId)) {
        next = prev.filter((id) => id !== lessonId);
      } else {
        next = [...prev, lessonId];
        // Celebrate completion!
        playBeep(1760, 0.2, 0.9);
        speakCue('Bagus sekali! Modul selesai.');
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#CCFF00', '#1E40AF', '#FFFFFF'],
          });
        } catch {}
      }
      saveCompletedLessons(next);
      return next;
    });
  };

  const handleAddPracticeLog = (newLog: PracticeLog) => {
    setPracticeLogs((prev) => {
      const next = [newLog, ...prev];
      savePracticeLogs(next);
      return next;
    });
  };

  const handleReloadData = () => {
    setProfile(loadProfile());
    setCompletedLessons(loadCompletedLessons());
    setPracticeLogs(loadPracticeLogs());
  };

  const handleToggleWakeLock = async () => {
    if (wakeLockActive) {
      await releaseWakeLock();
      setWakeLockActive(false);
    } else {
      const success = await requestWakeLock();
      setWakeLockActive(success);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        profile.highContrastOutdoor ? 'bg-tennis-dark' : 'bg-slate-950'
      } text-slate-100 flex flex-col`}
    >
      {/* 1. Header with Brand & Quick Action Toggles */}
      <Header
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        wakeLockActive={wakeLockActive}
        onToggleWakeLock={handleToggleWakeLock}
        onOpenNTRPQuiz={() => setShowNTRPModal(true)}
      />

      {/* 1.5 Community & Developer Support Ribbon (Mobile-First & Ultra Eye-Catching) */}
      <div className="bg-gradient-to-r from-[#061510] via-tennis-navy to-[#1a080c] border-b border-slate-800 px-3 py-2 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs text-slate-200 font-medium">
              Saran, kritik, & apresiasi komunitas tenis:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            {/* WhatsApp Developer Button */}
            <a
              href="https://wa.me/62811553393?text=Halo%20Developer%20AceCoach,%20saya%20ingin%20memberi%20saran%20dan%20kritik:"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs shadow-lg shadow-emerald-950/60 border border-emerald-300/60 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-black shrink-0" />
              <span className="truncate">WA: 0811-553-393</span>
            </a>

            {/* Trakteer Donation Button (Ultra Eye-Catching Gradient + Pulse) */}
            <a
              href="https://trakteer.id/limitless7/tip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:brightness-110 text-white font-extrabold text-xs shadow-lg shadow-red-900/60 border border-red-300/40 transition-all active:scale-95 animate-pulse"
            >
              <Heart className="w-4 h-4 fill-white shrink-0" />
              <span className="truncate">Donasi Trakteer ☕</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Content Viewport */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'curriculum' && (
          <CurriculumTab
            profile={profile}
            completedLessons={completedLessons}
            onToggleLesson={handleToggleLesson}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'biomechanics' && <BiomechanicsTab profile={profile} />}

        {activeTab === 'drills' && <DrillsTab profile={profile} />}

        {activeTab === 'mental' && <MentalMatchTab />}

        {activeTab === 'diagnostics' && (
          <DiagnosticsLogTab
            profile={profile}
            practiceLogs={practiceLogs}
            completedLessonsCount={completedLessons.length}
            onAddPracticeLog={handleAddPracticeLog}
            onReloadData={handleReloadData}
          />
        )}
      </main>

      {/* Floating Mobile Quick Action Pill (Always accessible while scrolling) */}
      <div className="fixed bottom-20 right-3 z-30 flex items-center gap-1.5 bg-tennis-dark/90 backdrop-blur-md p-1.5 rounded-full border border-slate-700/80 shadow-2xl md:hidden">
        <a
          href="https://wa.me/62811553393?text=Halo%20Developer%20AceCoach,%20saya%20ingin%20memberi%20saran%20dan%20kritik:"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat WhatsApp Developer"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#25D366] text-black font-extrabold text-[11px] shadow active:scale-90 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-black" />
          <span>WA</span>
        </a>
        <a
          href="https://trakteer.id/limitless7/tip"
          target="_blank"
          rel="noopener noreferrer"
          title="Donasi Trakteer"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-[11px] shadow active:scale-90 transition-transform animate-pulse"
        >
          <Heart className="w-3.5 h-3.5 fill-white text-white" />
          <span>Donasi ☕</span>
        </a>
      </div>

      {/* 3. Bottom Mobile-First Navigation Bar */}
      <BottomNav activeTab={activeTab} onSelectTab={(tab) => setActiveTab(tab)} />

      {/* 4. Modals */}
      {showSplash && (
        <SplashModal
          onEnterCourt={() => {
            setShowSplash(false);
            setWakeLockActive(true);
          }}
        />
      )}

      {showNTRPModal && (
        <NTRPModal
          currentLevel={profile.ntrpLevel}
          onSelectLevel={(level) => handleUpdateProfile({ ntrpLevel: level })}
          onClose={() => setShowNTRPModal(false)}
        />
      )}
    </div>
  );
}

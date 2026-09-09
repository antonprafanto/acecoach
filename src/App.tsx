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

      {/* Subtle Developer Attribution & Community Links */}
      <footer className="w-full text-center pb-24 pt-4 px-4">
        <p className="text-[11px] text-slate-500 font-medium">
          AceCoach • Dikembangkan oleh{' '}
          <span className="text-slate-400 font-semibold">Anton Prafanto</span>
        </p>
        <div className="flex items-center justify-center gap-3 mt-1.5 text-[10px] text-slate-500">
          <a
            href="https://wa.me/62811553393?text=Halo%20Mas%20Anton,%20saya%20ingin%20memberi%20saran%20untuk%20AceCoach:"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3 text-emerald-500/80" />
            <span>WA: 0811-553-393</span>
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="https://trakteer.id/limitless7/tip"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-colors flex items-center gap-1"
          >
            <Heart className="w-3 h-3 text-rose-500/80 fill-current" />
            <span>Donasi Trakteer</span>
          </a>
        </div>
      </footer>

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

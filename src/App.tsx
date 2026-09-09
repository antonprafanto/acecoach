import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
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

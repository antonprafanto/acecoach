import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Flame,
  Target,
  Timer,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  Award
} from 'lucide-react';
import { playBeep, playWhistle, speakCue } from '../utils/audioEngine';
import { requestWakeLock, releaseWakeLock } from '../utils/wakeLock';
import { UserProfile, TargetScoreState } from '../types';

interface DrillsTabProps {
  profile: UserProfile;
}

export const DrillsTab: React.FC<DrillsTabProps> = ({ profile }) => {
  const [activeTool, setActiveTool] = useState<'metronome' | 'hiit' | 'target'>('metronome');

  // ================= 1. METRONOME STATE =================
  const [bpm, setBpm] = useState<number>(60);
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);
  const [metronomeBeat, setMetronomeBeat] = useState<number>(0); // 0 or 1
  const [metronomeMode, setMetronomeMode] = useState<'voice' | 'beep'>('voice');
  const metronomeTimerRef = useRef<any>(null);

  useEffect(() => {
    if (isMetronomeActive) {
      requestWakeLock();
      const intervalMs = (60 / bpm) * 1000;
      metronomeTimerRef.current = setInterval(() => {
        setMetronomeBeat((prev) => {
          const next = (prev + 1) % 2;
          if (next === 1) {
            // Split-step trigger
            if (metronomeMode === 'voice') {
              speakCue('Split!');
            } else {
              playBeep(1760, 0.1, 0.9);
            }
          } else {
            // Ready / Prepare
            if (metronomeMode === 'voice') {
              speakCue('Ready');
            } else {
              playBeep(880, 0.08, 0.5);
            }
          }
          return next;
        });
      }, intervalMs);
    } else {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    }

    return () => {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    };
  }, [isMetronomeActive, bpm, metronomeMode]);

  // ================= 2. HIIT INTERVAL TIMER STATE =================
  const [workDuration, setWorkDuration] = useState<number>(30);
  const [restDuration, setRestDuration] = useState<number>(15);
  const [totalSets, setTotalSets] = useState<number>(10);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [intervalPhase, setIntervalPhase] = useState<'work' | 'rest' | 'idle'>('idle');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const hiitTimerRef = useRef<any>(null);

  const startHIIT = () => {
    requestWakeLock();
    setIntervalPhase('work');
    setCurrentSet(1);
    setSecondsRemaining(workDuration);
    playWhistle(0.9);
    speakCue('Mulai!');
  };

  const stopHIIT = () => {
    setIntervalPhase('idle');
    releaseWakeLock();
    if (hiitTimerRef.current) clearInterval(hiitTimerRef.current);
  };

  useEffect(() => {
    if (intervalPhase !== 'idle') {
      hiitTimerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Phase Switch
            if (intervalPhase === 'work') {
              if (currentSet >= totalSets) {
                // Finished all sets
                playWhistle(1.0);
                speakCue('Latihan Selesai! Kerja bagus!');
                setIntervalPhase('idle');
                return 0;
              } else {
                // Switch to Rest
                playWhistle(0.8);
                speakCue('Istirahat');
                setIntervalPhase('rest');
                return restDuration;
              }
            } else {
              // Switch to Work
              playWhistle(0.9);
              speakCue('Mulai!');
              setCurrentSet((s) => s + 1);
              setIntervalPhase('work');
              return workDuration;
            }
          }

          if (prev <= 4) {
            playBeep(880, 0.08, 0.6); // 3, 2, 1 countdown
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (hiitTimerRef.current) clearInterval(hiitTimerRef.current);
    };
  }, [intervalPhase, currentSet, totalSets, workDuration, restDuration]);

  // ================= 3. COURT TARGET SCOREKEEPER STATE =================
  const [targetScores, setTargetScores] = useState<TargetScoreState>({
    zoneA: 0,
    zoneB: 0,
    zoneC: 0,
    missed: 0,
  });

  const totalHits =
    targetScores.zoneA + targetScores.zoneB + targetScores.zoneC + targetScores.missed;
  const inTargetHits = targetScores.zoneA + targetScores.zoneB + targetScores.zoneC;
  const accuracyPercent = totalHits > 0 ? Math.round((inTargetHits / totalHits) * 100) : 0;

  const handleAddScore = (zone: keyof TargetScoreState) => {
    playBeep(1200, 0.08, 0.7);
    setTargetScores((prev) => ({ ...prev, [zone]: prev[zone] + 1 }));
  };

  const handleResetScores = () => {
    setTargetScores({ zoneA: 0, zoneB: 0, zoneC: 0, missed: 0 });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Tool Navigation Switcher */}
      <div className="grid grid-cols-3 bg-tennis-surface p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTool('metronome')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            activeTool === 'metronome'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ⏱️ Split Pacer
        </button>
        <button
          onClick={() => setActiveTool('hiit')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            activeTool === 'hiit'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🔥 Shadow HIIT
        </button>
        <button
          onClick={() => setActiveTool('target')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            activeTool === 'target'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🎯 Target Lapangan
        </button>
      </div>

      {/* ================= 1. METRONOME VIEW ================= */}
      {activeTool === 'metronome' && (
        <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-6 text-center space-y-6">
          <div>
            <span className="text-xs text-tennis-yellow font-bold uppercase tracking-wider block">
              Audio Split-Step Metronome
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Ritme Gerak Kaki Refleks</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Melatih timing melompat kecil tepat saat bola lawan dipukul. Gunakan saat shadow swing atau di samping lapangan.
            </p>
          </div>

          {/* Visual Pulsing Ball Indicator */}
          <div className="flex justify-center my-4">
            <div
              className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${
                isMetronomeActive
                  ? metronomeBeat === 1
                    ? 'scale-110 bg-tennis-yellow border-white court-glow-yellow'
                    : 'scale-95 bg-tennis-navy border-tennis-yellow/50'
                  : 'bg-tennis-navy border-slate-700'
              }`}
            >
              <span
                className={`text-xl font-extrabold uppercase tracking-wider ${
                  isMetronomeActive && metronomeBeat === 1 ? 'text-tennis-dark' : 'text-slate-400'
                }`}
              >
                {isMetronomeActive ? (metronomeBeat === 1 ? 'SPLIT!' : 'READY') : 'PAUSED'}
              </span>
            </div>
          </div>

          {/* BPM Slider & Display */}
          <div className="bg-tennis-navy/40 border border-slate-800 p-4 rounded-xl max-w-sm mx-auto space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Kecepatan Tempo:</span>
              <span className="font-extrabold text-lg text-tennis-yellow">{bpm} BPM</span>
            </div>
            <input
              type="range"
              min="45"
              max="85"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-tennis-yellow cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>45 (Santai)</span>
              <span>65 (Reli Sedang)</span>
              <span>85 (Turnamen)</span>
            </div>
          </div>

          {/* Mode Switcher: Vokal vs Bip */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setMetronomeMode('voice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                metronomeMode === 'voice'
                  ? 'bg-tennis-blue/30 border-tennis-blueLight text-tennis-blueLight'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              🗣️ Aba-Aba Vokal
            </button>
            <button
              onClick={() => setMetronomeMode('beep')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                metronomeMode === 'beep'
                  ? 'bg-tennis-blue/30 border-tennis-blueLight text-tennis-blueLight'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              🔊 Nada Bip Lapangan
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsMetronomeActive(!isMetronomeActive)}
            className={`w-full max-w-sm mx-auto min-h-[52px] rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isMetronomeActive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-tennis-yellow text-tennis-dark hover:bg-tennis-yellowDark court-glow-yellow'
            }`}
          >
            {isMetronomeActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isMetronomeActive ? 'Hentikan Metronome' : 'Nyalakan Split Pacer'}</span>
          </button>
        </div>
      )}

      {/* ================= 2. HIIT SHADOW TIMER VIEW ================= */}
      {activeTool === 'hiit' && (
        <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-6 text-center space-y-6">
          <div>
            <span className="text-xs text-tennis-clay font-bold uppercase tracking-wider block">
              Shadow Swing Interval Pacer
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">HIIT Stamina & Kecepatan Ayunan</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Pertahankan mekanika pukulan sempurna di bawah tekanan kelelahan fisik.
            </p>
          </div>

          {/* Main Interval Display */}
          <div
            className={`p-6 rounded-2xl border-2 transition-all duration-300 max-w-sm mx-auto ${
              intervalPhase === 'work'
                ? 'bg-emerald-950/30 border-emerald-500 shadow-lg shadow-emerald-900/20'
                : intervalPhase === 'rest'
                ? 'bg-amber-950/30 border-amber-500 shadow-lg shadow-amber-900/20'
                : 'bg-tennis-navy/50 border-slate-700'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-widest mb-1 text-slate-400">
              {intervalPhase === 'work'
                ? '🔥 WORK (AYUN EKSPLOSIF!)'
                : intervalPhase === 'rest'
                ? '😮‍💨 REST (ATUR NAPAS)'
                : 'BERHENTI'}
            </div>

            <div
              className={`text-6xl font-extrabold tabular-nums my-2 ${
                intervalPhase === 'work'
                  ? 'text-emerald-400'
                  : intervalPhase === 'rest'
                  ? 'text-amber-400'
                  : 'text-white'
              }`}
            >
              {secondsRemaining}s
            </div>

            <div className="text-xs text-slate-300 font-semibold">
              Ronde: <span className="text-tennis-yellow font-bold text-sm">{currentSet}</span> / {totalSets} Set
            </div>
          </div>

          {/* Config Controls when idle */}
          {intervalPhase === 'idle' && (
            <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto text-xs">
              <div className="bg-tennis-navy/40 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Work</span>
                <span className="text-base font-bold text-white">{workDuration}s</span>
              </div>
              <div className="bg-tennis-navy/40 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Rest</span>
                <span className="text-base font-bold text-white">{restDuration}s</span>
              </div>
              <div className="bg-tennis-navy/40 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Ronde</span>
                <span className="text-base font-bold text-tennis-yellow">{totalSets}x</span>
              </div>
            </div>
          )}

          {/* Button Actions */}
          <div className="flex gap-3 max-w-sm mx-auto">
            {intervalPhase === 'idle' ? (
              <button
                onClick={startHIIT}
                className="flex-1 min-h-[52px] bg-tennis-yellow text-tennis-dark font-bold text-base rounded-xl hover:bg-tennis-yellowDark transition-colors flex items-center justify-center gap-2 court-glow-yellow"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Mulai Sesi HIIT</span>
              </button>
            ) : (
              <button
                onClick={stopHIIT}
                className="flex-1 min-h-[52px] bg-red-600 text-white font-bold text-base rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Pause className="w-5 h-5" />
                <span>Selesaikan Drill</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= 3. COURT TARGET SCOREKEEPER ================= */}
      {activeTool === 'target' && (
        <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-tennis-yellow font-bold uppercase tracking-wider">
                Court Target Map & Scorekeeper
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">Penghitung Akurasi Pukulan</h3>
            </div>
            <button
              onClick={handleResetScores}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1.5 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Skor
            </button>
          </div>

          {/* Summary Accuracy Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-tennis-navy/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Bola</span>
              <p className="text-2xl font-bold text-white">{totalHits}</p>
            </div>
            <div className="bg-tennis-navy/60 p-3 rounded-xl border border-tennis-yellow/30">
              <span className="text-[10px] text-tennis-yellow uppercase font-semibold">Masuk Target</span>
              <p className="text-2xl font-bold text-tennis-yellow">{inTargetHits}</p>
            </div>
            <div className="bg-tennis-navy/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Akurasi</span>
              <p className="text-2xl font-bold text-emerald-400">{accuracyPercent}%</p>
            </div>
          </div>

          {/* Interactive SVG Tennis Court Diagram */}
          <div className="relative bg-[#0A192F] p-4 rounded-xl border border-slate-700 shadow-inner">
            <svg viewBox="0 0 300 450" className="w-full max-w-xs mx-auto drop-shadow-md">
              {/* Court Boundary */}
              <rect x="25" y="25" width="250" height="400" fill="#1E3A8A" stroke="#FFFFFF" strokeWidth="3" />
              {/* Singles Sidelines */}
              <line x1="55" y1="25" x2="55" y2="425" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4,0" />
              <line x1="245" y1="25" x2="245" y2="425" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4,0" />
              {/* Service Line Top & Bottom */}
              <line x1="55" y1="125" x2="245" y2="125" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="55" y1="325" x2="245" y2="325" stroke="#FFFFFF" strokeWidth="2" />
              {/* Center Service Line */}
              <line x1="150" y1="125" x2="150" y2="325" stroke="#FFFFFF" strokeWidth="2" />
              {/* Net Line (Center) */}
              <line x1="15" y1="225" x2="285" y2="225" stroke="#CCFF00" strokeWidth="4" />

              {/* Target Zones Overlays on Opponent Court */}
              {/* Zone A: Deep Crosscourt */}
              <rect
                x="55"
                y="25"
                width="95"
                height="80"
                fill="rgba(204, 255, 0, 0.35)"
                stroke="#CCFF00"
                strokeWidth="2"
                className="cursor-pointer hover:fill-tennis-yellow/50"
                onClick={() => handleAddScore('zoneA')}
              />
              <text x="102" y="65" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                Zone A: Deep
              </text>
              <text x="102" y="80" fill="#CCFF00" fontSize="12" fontWeight="extrabold" textAnchor="middle">
                ({targetScores.zoneA})
              </text>

              {/* Zone B: Short Angle */}
              <rect
                x="150"
                y="130"
                width="95"
                height="85"
                fill="rgba(59, 130, 246, 0.35)"
                stroke="#3B82F6"
                strokeWidth="2"
                className="cursor-pointer hover:fill-blue-500/50"
                onClick={() => handleAddScore('zoneB')}
              />
              <text x="197" y="170" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                Zone B: Angle
              </text>
              <text x="197" y="185" fill="#93C5FD" fontSize="12" fontWeight="extrabold" textAnchor="middle">
                ({targetScores.zoneB})
              </text>

              {/* Zone C: Down The Line */}
              <rect
                x="180"
                y="25"
                width="65"
                height="90"
                fill="rgba(234, 88, 12, 0.35)"
                stroke="#EA580C"
                strokeWidth="2"
                className="cursor-pointer hover:fill-orange-500/50"
                onClick={() => handleAddScore('zoneC')}
              />
              <text x="212" y="65" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                Zone C: DTL
              </text>
              <text x="212" y="80" fill="#FDBA74" fontSize="12" fontWeight="extrabold" textAnchor="middle">
                ({targetScores.zoneC})
              </text>
            </svg>
          </div>

          {/* Quick Increment Buttons */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => handleAddScore('zoneA')}
              className="p-3 bg-tennis-yellow/15 border border-tennis-yellow text-tennis-yellow rounded-xl flex items-center justify-between"
            >
              <span>+ Masuk Zone A (Deep)</span>
              <span className="text-base">{targetScores.zoneA}</span>
            </button>

            <button
              onClick={() => handleAddScore('zoneB')}
              className="p-3 bg-blue-950/40 border border-blue-600 text-blue-300 rounded-xl flex items-center justify-between"
            >
              <span>+ Masuk Zone B (Angle)</span>
              <span className="text-base">{targetScores.zoneB}</span>
            </button>

            <button
              onClick={() => handleAddScore('zoneC')}
              className="p-3 bg-orange-950/40 border border-orange-600 text-orange-300 rounded-xl flex items-center justify-between"
            >
              <span>+ Masuk Zone C (DTL)</span>
              <span className="text-base">{targetScores.zoneC}</span>
            </button>

            <button
              onClick={() => handleAddScore('missed')}
              className="p-3 bg-red-950/40 border border-red-800 text-red-300 rounded-xl flex items-center justify-between"
            >
              <span>+ Out / Nyangkut Net</span>
              <span className="text-base">{targetScores.missed}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

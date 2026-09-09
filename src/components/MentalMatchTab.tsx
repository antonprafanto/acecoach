import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { playBeep, speakCue } from '../utils/audioEngine';
import { requestWakeLock } from '../utils/wakeLock';

export const MentalMatchTab: React.FC = () => {
  const [subTool, setSubTool] = useState<'routine' | 'scoreboard'>('routine');

  // ================= 1. THE 16-SECOND ROUTINE STATE =================
  const [routineTimeLeft, setRoutineTimeLeft] = useState<number>(20);
  const [isRoutineActive, setIsRoutineActive] = useState<boolean>(false);
  const routineTimerRef = useRef<any>(null);

  const startRoutine = () => {
    requestWakeLock();
    setRoutineTimeLeft(20);
    setIsRoutineActive(true);
    playBeep(880, 0.1, 0.7);
    speakCue('Tegakkan badan, napas dalam');
  };

  const stopRoutine = () => {
    setIsRoutineActive(false);
    if (routineTimerRef.current) clearInterval(routineTimerRef.current);
  };

  useEffect(() => {
    if (isRoutineActive) {
      routineTimerRef.current = setInterval(() => {
        setRoutineTimeLeft((prev) => {
          if (prev <= 1) {
            playBeep(1760, 0.25, 0.9);
            speakCue('Waktu habis, ambil posisi!');
            setIsRoutineActive(false);
            return 20;
          }

          // Voice / Beep triggers on phase shifts
          if (prev === 15) {
            playBeep(1100, 0.1, 0.6);
            speakCue('Rileks, lap keringat, betulkan senar');
          }
          if (prev === 8) {
            playBeep(1100, 0.1, 0.6);
            speakCue('Tentukan target servis atau return');
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (routineTimerRef.current) clearInterval(routineTimerRef.current);
    };
  }, [isRoutineActive]);

  // Current Phase based on routineTimeLeft (20s countdown)
  const elapsed = 20 - routineTimeLeft;
  let currentPhaseInfo = {
    title: 'Tahap 1: Respon Fisik Positif (0-5 detik)',
    color: 'border-emerald-500 bg-emerald-950/20 text-emerald-300',
    instruction: 'Tegakkan punggung, raket di tangan non-dominan, tatap lurus ke depan, dan tarik napas diafragma dalam.'
  };

  if (elapsed > 5 && elapsed <= 12) {
    currentPhaseInfo = {
      title: 'Tahap 2: Relaksasi & Rutinitas Senar (6-12 detik)',
      color: 'border-blue-500 bg-blue-950/20 text-blue-300',
      instruction: 'Usap keringat, rapikan senar raket untuk memfokuskan mata ke objek dekat, lepaskan ketegangan bahu.'
    };
  } else if (elapsed > 12) {
    currentPhaseInfo = {
      title: 'Tahap 3: Perencanaan Taktis (13-20 detik)',
      color: 'border-tennis-yellow bg-tennis-navy/50 text-tennis-yellow',
      instruction: 'Tentukan pola: "Saya akan servis slice keluar dan hajar forehand ke ruang kosong" sebelum mengambil posisi!'
    };
  }

  // ================= 2. MATCH & TIEBREAK SCOREKEEPER STATE =================
  const [p1Points, setP1Points] = useState<number>(0);
  const [p2Points, setP2Points] = useState<number>(0);
  const [p1Games, setP1Games] = useState<number>(0);
  const [p2Games, setP2Games] = useState<number>(0);
  const [server, setServer] = useState<'P1' | 'P2'>('P1');
  const [isTiebreak, setIsTiebreak] = useState<boolean>(false);

  // Tennis Score Display Calculation
  const standardPointLabels = ['0', '15', '30', '40'];

  const getScoreDisplay = () => {
    if (isTiebreak) {
      return { p1: `${p1Points}`, p2: `${p2Points}`, status: 'Tiebreak Mode' };
    }

    if (p1Points >= 3 && p2Points >= 3) {
      if (p1Points === p2Points) return { p1: '40', p2: '40', status: 'Deuce' };
      if (p1Points === p2Points + 1) return { p1: 'Ad', p2: '40', status: 'Advantage P1' };
      if (p2Points === p1Points + 1) return { p1: '40', p2: 'Ad', status: 'Advantage P2' };
    }

    return {
      p1: standardPointLabels[Math.min(p1Points, 3)],
      p2: standardPointLabels[Math.min(p2Points, 3)],
      status: 'Game In Progress'
    };
  };

  const scoreDisplay = getScoreDisplay();

  // Serving side determination (Deuce Court right vs Ad Court left)
  const totalPointsInGame = p1Points + p2Points;
  const servingCourt = totalPointsInGame % 2 === 0 ? 'Deuce Court (Kanan)' : 'Ad Court (Kiri)';

  // Tiebreak change ends warning (Every 6 points)
  const isTiebreakChangeEnds = isTiebreak && totalPointsInGame > 0 && totalPointsInGame % 6 === 0;

  const handlePoint = (player: 'P1' | 'P2') => {
    playBeep(980, 0.08, 0.7);

    if (isTiebreak) {
      const nextP1 = player === 'P1' ? p1Points + 1 : p1Points;
      const nextP2 = player === 'P2' ? p2Points + 1 : p2Points;
      setP1Points(nextP1);
      setP2Points(nextP2);

      // Check Tiebreak Win (first to 7 by 2)
      if ((nextP1 >= 7 || nextP2 >= 7) && Math.abs(nextP1 - nextP2) >= 2) {
        if (nextP1 > nextP2) setP1Games((g) => g + 1);
        else setP2Games((g) => g + 1);
        setP1Points(0);
        setP2Points(0);
        setIsTiebreak(false);
        speakCue('Set Selesai!');
      } else {
        // Rotate server: Point 1 server A, then alternating every 2 points
        const total = nextP1 + nextP2;
        if (total % 2 === 1) {
          setServer((s) => (s === 'P1' ? 'P2' : 'P1'));
        }
      }
      return;
    }

    // Standard Game Logic
    let nextP1 = player === 'P1' ? p1Points + 1 : p1Points;
    let nextP2 = player === 'P2' ? p2Points + 1 : p2Points;

    // Check Win Game
    if ((nextP1 >= 4 || nextP2 >= 4) && Math.abs(nextP1 - nextP2) >= 2) {
      if (nextP1 > nextP2) setP1Games((g) => g + 1);
      else setP2Games((g) => g + 1);
      setP1Points(0);
      setP2Points(0);
      setServer((s) => (s === 'P1' ? 'P2' : 'P1')); // Switch server on game end
      speakCue('Game!');

      // Check if Tiebreak reached (6-6)
      const g1 = nextP1 > nextP2 ? p1Games + 1 : p1Games;
      const g2 = nextP2 > nextP1 ? p2Games + 1 : p2Games;
      if (g1 === 6 && g2 === 6) {
        setIsTiebreak(true);
        speakCue('Tiebreak dimulai!');
      }
    } else {
      setP1Points(nextP1);
      setP2Points(nextP2);
    }
  };

  const handleResetMatch = () => {
    setP1Points(0);
    setP2Points(0);
    setP1Games(0);
    setP2Games(0);
    setIsTiebreak(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Sub-tool switcher */}
      <div className="flex bg-tennis-surface p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setSubTool('routine')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
            subTool === 'routine'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🧠 Rutinitas 16 Detik (Mental)
        </button>
        <button
          onClick={() => setSubTool('scoreboard')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
            subTool === 'scoreboard'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🎾 Scorekeeper & Tiebreak
        </button>
      </div>

      {/* ================= 1. THE 16-SECOND ROUTINE ================= */}
      {subTool === 'routine' && (
        <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-6 text-center space-y-6">
          <div>
            <span className="text-xs text-tennis-yellow font-bold uppercase tracking-wider block">
              Jim Loehr Framework • USPTA Mental Toughness
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">The 16-Second Between-Point Routine</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Pemenang pertandingan tenis ditentukan oleh apa yang Anda lakukan dalam 20 detik di antara setiap poin!
            </p>
          </div>

          {/* Countdown Display */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" stroke="#1F2937" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="#CCFF00"
                strokeWidth="8"
                fill="none"
                strokeDasharray={276}
                strokeDashoffset={276 - (276 * routineTimeLeft) / 20}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-extrabold text-white tabular-nums">
                {routineTimeLeft}
              </span>
              <span className="text-[10px] text-tennis-yellow font-bold uppercase">Detik</span>
            </div>
          </div>

          {/* Active Psychological Phase Card */}
          <div className={`p-4 rounded-xl border-2 transition-all text-left max-w-sm mx-auto ${currentPhaseInfo.color}`}>
            <span className="text-xs font-bold block mb-1">{currentPhaseInfo.title}</span>
            <p className="text-xs leading-relaxed opacity-95">{currentPhaseInfo.instruction}</p>
          </div>

          {/* Trigger Button */}
          <button
            onClick={isRoutineActive ? stopRoutine : startRoutine}
            className={`w-full max-w-sm mx-auto min-h-[52px] rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isRoutineActive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-tennis-yellow text-tennis-dark hover:bg-tennis-yellowDark court-glow-yellow'
            }`}
          >
            {isRoutineActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isRoutineActive ? 'Batalkan Timer' : 'Poin Selesai! Mulai Rutinitas 20s'}</span>
          </button>
        </div>
      )}

      {/* ================= 2. MATCH & TIEBREAK SCOREKEEPER ================= */}
      {subTool === 'scoreboard' && (
        <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-tennis-yellow font-bold uppercase tracking-wider">
                Court Score & Rotation Assistant
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">Pencatat Skor & Rotasi Servis</h3>
            </div>
            <button
              onClick={handleResetMatch}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1.5 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Match
            </button>
          </div>

          {/* Court Serving Position Notification */}
          <div className="bg-tennis-navy/60 border border-slate-700 p-3 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Giliran Servis:</span>
              <strong className="text-tennis-yellow text-sm font-bold">
                {server === 'P1' ? 'Pemain 1 (Anda)' : 'Pemain 2 (Lawan)'}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Posisi Servis:</span>
              <strong className="text-white text-sm font-bold">{servingCourt}</strong>
            </div>
          </div>

          {/* Tiebreak Change Ends Alert */}
          {isTiebreakChangeEnds && (
            <div className="p-3 bg-amber-950/40 border border-amber-500 rounded-xl flex items-center gap-2 text-xs text-amber-300 court-glow-yellow">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>
                <strong>GANTI SISI LAPANGAN (Change Ends)!</strong> Total poin mencapai kelipatan 6 ({totalPointsInGame} poin).
              </span>
            </div>
          )}

          {/* Scoreboard Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Player 1 Card */}
            <div
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between ${
                server === 'P1'
                  ? 'bg-tennis-navy border-tennis-yellow court-glow-yellow'
                  : 'bg-tennis-surfaceLight/40 border-slate-700'
              }`}
            >
              <div className="text-center">
                <span className="text-xs text-slate-400 font-bold block">Pemain 1 (Anda)</span>
                <span className="text-xs text-tennis-yellow font-semibold">Game: {p1Games}</span>
              </div>
              <div className="text-5xl font-extrabold text-white my-3 tabular-nums">
                {scoreDisplay.p1}
              </div>
              <button
                onClick={() => handlePoint('P1')}
                className="w-full py-3 bg-tennis-yellow text-tennis-dark font-bold text-sm rounded-xl hover:bg-tennis-yellowDark transition-colors active:scale-95"
              >
                + Poin P1
              </button>
            </div>

            {/* Player 2 Card */}
            <div
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between ${
                server === 'P2'
                  ? 'bg-tennis-navy border-tennis-yellow court-glow-yellow'
                  : 'bg-tennis-surfaceLight/40 border-slate-700'
              }`}
            >
              <div className="text-center">
                <span className="text-xs text-slate-400 font-bold block">Pemain 2 (Lawan)</span>
                <span className="text-xs text-tennis-yellow font-semibold">Game: {p2Games}</span>
              </div>
              <div className="text-5xl font-extrabold text-white my-3 tabular-nums">
                {scoreDisplay.p2}
              </div>
              <button
                onClick={() => handlePoint('P2')}
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm rounded-xl transition-colors active:scale-95"
              >
                + Poin P2
              </button>
            </div>
          </div>

          {/* Match Status Bar */}
          <div className="text-center py-2 bg-tennis-navy/40 border border-slate-800 rounded-xl text-xs text-slate-400 font-semibold">
            Status: <span className="text-white font-bold">{scoreDisplay.status}</span>
          </div>
        </div>
      )}
    </div>
  );
};

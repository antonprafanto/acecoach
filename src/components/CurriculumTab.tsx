import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Zap,
  ShieldAlert,
  Flame,
  Dumbbell,
  Target,
  Sparkles,
  Play,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { DYNAMIC_WARMUP, GEAR_SANITY_GUIDE } from '../data/prehabData';
import { UserProfile, CurriculumLesson, DrillContext } from '../types';
import { playBeep } from '../utils/audioEngine';
import { LessonIllustration } from './LessonIllustration';

interface CurriculumTabProps {
  profile: UserProfile;
  completedLessons: string[];
  onToggleLesson: (lessonId: string) => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const CurriculumTab: React.FC<CurriculumTabProps> = ({
  profile,
  completedLessons,
  onToggleLesson,
  onUpdateProfile,
}) => {
  const [subView, setSubView] = useState<'curriculum' | 'prehab'>('curriculum');
  const [activeLevel, setActiveLevel] = useState<'beginner' | 'intermediate'>(
    parseFloat(profile.ntrpLevel) <= 2.5 ? 'beginner' : 'intermediate'
  );
  const [selectedContextFilter, setSelectedContextFilter] = useState<string>('All');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>('b_w1_grip'); // Default expand week 1 so diagram is visible immediately!

  // Warmup Timer State
  const [activeWarmupIndex, setActiveWarmupIndex] = useState<number | null>(null);
  const [warmupSecondsLeft, setWarmupSecondsLeft] = useState<number>(60);
  const [isWarmupRunning, setIsWarmupRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let timer: any = null;
    if (isWarmupRunning && warmupSecondsLeft > 0) {
      timer = setInterval(() => {
        setWarmupSecondsLeft((prev) => {
          if (prev <= 1) {
            playBeep(1760, 0.3, 0.9); // High beep finish
            setIsWarmupRunning(false);
            return 0;
          }
          if (prev <= 4) {
            playBeep(880, 0.08, 0.5); // Count down beeps
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isWarmupRunning, warmupSecondsLeft]);

  const handleStartWarmup = (index: number) => {
    setActiveWarmupIndex(index);
    setWarmupSecondsLeft(DYNAMIC_WARMUP[index].durationSeconds);
    setIsWarmupRunning(true);
    playBeep(1200, 0.15, 0.8);
  };

  // Filter lessons
  const filteredLessons = CURRICULUM_DATA.filter((lesson) => {
    if (lesson.level !== activeLevel) return false;
    if (selectedContextFilter !== 'All' && lesson.context !== selectedContextFilter) return false;
    return true;
  });

  const levelLessons = CURRICULUM_DATA.filter((l) => l.level === activeLevel);
  const completedInLevel = levelLessons.filter((l) => completedLessons.includes(l.id)).length;
  const progressPercent = Math.round((completedInLevel / levelLessons.length) * 100) || 0;

  const getContextBadgeStyle = (ctx: DrillContext) => {
    switch (ctx) {
      case 'Solo Shadow':
        return 'bg-purple-950/60 text-purple-300 border-purple-800';
      case 'Wall / Dinding':
        return 'bg-blue-950/60 text-blue-300 border-blue-800';
      case 'Feeder':
        return 'bg-amber-950/60 text-amber-300 border-amber-800';
      case 'Live Rally':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Sub-view Switcher Header */}
      <div className="flex bg-tennis-surface p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setSubView('curriculum')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
            subView === 'curriculum'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🎓 Kurikulum & Diagram Latihan
        </button>
        <button
          onClick={() => setSubView('prehab')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
            subView === 'prehab'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🧘 Pre-Hab & Panduan Raket
        </button>
      </div>

      {subView === 'curriculum' ? (
        <>
          {/* Level Switcher & Progress Header */}
          <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveLevel('beginner')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    activeLevel === 'beginner'
                      ? 'bg-tennis-yellow/15 border-tennis-yellow text-tennis-yellow'
                      : 'border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Pemula (4-Week)
                </button>
                <button
                  onClick={() => setActiveLevel('intermediate')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    activeLevel === 'intermediate'
                      ? 'bg-tennis-yellow/15 border-tennis-yellow text-tennis-yellow'
                      : 'border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Menengah (6-Week)
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">
                  Progres: {completedInLevel} dari {levelLessons.length} Modul Selesai
                </span>
                <span className="font-bold text-tennis-yellow">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-tennis-yellow transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Context Filter Tags */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {['All', 'Solo Shadow', 'Wall / Dinding', 'Feeder', 'Live Rally'].map((ctx) => (
                <button
                  key={ctx}
                  onClick={() => setSelectedContextFilter(ctx)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors border ${
                    selectedContextFilter === ctx
                      ? 'bg-slate-700 text-white border-slate-500 font-semibold'
                      : 'bg-tennis-navy/50 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {ctx === 'All' ? 'Semua Fasilitas' : ctx}
                </button>
              ))}
            </div>
          </div>

          {/* Lesson Cards List */}
          <div className="space-y-3">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isExpanded = expandedLessonId === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className={`border rounded-2xl p-4 transition-all ${
                    isCompleted
                      ? 'bg-tennis-surface/40 border-slate-800/80'
                      : 'bg-tennis-surface border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => onToggleLesson(lesson.id)}
                      className="mt-0.5 text-slate-400 hover:text-tennis-yellow transition-colors shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-tennis-yellow fill-tennis-yellow/10" />
                      ) : (
                        <Circle className="w-6 h-6 hover:stroke-tennis-yellow" />
                      )}
                    </button>

                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                          Minggu {lesson.week}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getContextBadgeStyle(
                            lesson.context
                          )}`}
                        >
                          [{lesson.context}]
                        </span>
                        <span className="text-[10px] bg-tennis-yellow/10 text-tennis-yellow border border-tennis-yellow/30 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" /> Diagram Tersedia
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto">
                          <Clock className="w-3 h-3" /> {lesson.durationMinutes}m
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3
                            className={`text-base font-bold ${
                              isCompleted ? 'line-through text-slate-400' : 'text-white'
                            }`}
                          >
                            {lesson.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">{lesson.subtitle}</p>
                        </div>
                        <div className="text-slate-500 hover:text-tennis-yellow ml-2">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Lesson Details with Visual Diagrams */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs">
                      {/* Interactive Visual Kinematic Illustration */}
                      <LessonIllustration lessonId={lesson.id} />

                      <div className="bg-tennis-navy/40 p-3 rounded-xl border border-slate-800">
                        <span className="font-bold text-tennis-yellow block mb-1">
                          🎯 Sasaran Latihan:
                        </span>
                        <p className="text-slate-300 leading-relaxed">{lesson.objective}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        <div className="bg-tennis-surfaceLight/50 p-3 rounded-xl border border-slate-700/60">
                          <span className="font-bold text-white flex items-center gap-1 mb-1">
                            <Zap className="w-3.5 h-3.5 text-tennis-yellow" /> Fokus Biomekanik:
                          </span>
                          <p className="text-slate-300">{lesson.biomechanicsFocus}</p>
                        </div>

                        <div className="bg-tennis-surfaceLight/50 p-3 rounded-xl border border-slate-700/60">
                          <span className="font-bold text-white flex items-center gap-1 mb-1">
                            <Flame className="w-3.5 h-3.5 text-tennis-clay" /> Rantai Kinetik:
                          </span>
                          <p className="text-slate-300">{lesson.kineticChainCheckpoint}</p>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <span className="font-bold text-tennis-yellow block mb-1.5">
                          📋 Menu Drilling ({lesson.repsOrSets}):
                        </span>
                        <ul className="space-y-1.5 text-slate-300">
                          {lesson.drills.map((drill, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-tennis-yellow font-bold">•</span>
                              <span>{drill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-tennis-blue/15 border border-tennis-blue/40 p-3 rounded-xl text-tennis-blueLight">
                        <span className="font-bold block mb-0.5">💡 PTR Pro-Tip Axiom:</span>
                        <p className="italic">{lesson.proTipPTR}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Pre-Hab & Equipment Sanity Sub-view */
        <div className="space-y-4">
          {/* 5-Minute Dynamic Warmup Cards */}
          <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-tennis-yellow" />
                <h3 className="text-base font-bold text-white">5-Minute Dynamic Warmup & Mobility</h3>
              </div>
              <span className="text-xs bg-tennis-yellow/15 text-tennis-yellow px-2 py-0.5 rounded font-bold border border-tennis-yellow/30">
                Wajib Sebelum Main
              </span>
            </div>

            {/* Active Warmup Countdown Timer Banner */}
            {activeWarmupIndex !== null && (
              <div className="bg-tennis-navy border border-tennis-yellow/50 rounded-xl p-3.5 mb-4 court-glow-yellow flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider block">
                    Sedang Berjalan:
                  </span>
                  <p className="text-sm font-bold text-white">
                    {DYNAMIC_WARMUP[activeWarmupIndex].name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-extrabold text-tennis-yellow tabular-nums">
                    {warmupSecondsLeft}s
                  </span>
                  <button
                    onClick={() => setIsWarmupRunning(!isWarmupRunning)}
                    className="p-2 bg-tennis-yellow text-tennis-dark rounded-lg font-bold"
                  >
                    {isWarmupRunning ? 'Pause' : 'Resume'}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2.5">
              {DYNAMIC_WARMUP.map((ex, idx) => (
                <div
                  key={ex.id}
                  className="bg-tennis-navy/40 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-white">{ex.name}</span>
                      <span className="text-[10px] text-slate-400">({ex.targetArea})</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{ex.instructions}</p>
                  </div>
                  <button
                    onClick={() => handleStartWarmup(idx)}
                    className="px-3 py-2 bg-slate-800 hover:bg-tennis-yellow hover:text-tennis-dark text-slate-200 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>60s</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Sanity Warnings */}
          <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-tennis-clay" />
              <h3 className="text-base font-bold text-white">Panduan Peralatan & Pencegahan Cedera</h3>
            </div>

            {/* Index Finger Rule with Visual Diagram */}
            <div className="bg-tennis-navy/40 border border-slate-800 p-3.5 rounded-xl space-y-2">
              <span className="text-xs font-bold text-tennis-yellow block">
                📏 {GEAR_SANITY_GUIDE.gripRule.title}
              </span>
              
              {/* Visual 3D Diagram of Index Finger Rule */}
              <div className="bg-[#070D18] p-3 rounded-xl border border-slate-700/80 flex flex-col items-center">
                <img
                  src="./illustrations/index_finger_grip.jpg"
                  alt="Uji Celah 1 Jari Telunjuk Ukuran Grip Raket"
                  className="w-full max-w-md aspect-video object-contain rounded-lg shadow-lg"
                />
                <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mt-2">
                  Uji Celah 1 Jari Telunjuk: Pas Tanpa Longgar & Tanpa Menjepit
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {GEAR_SANITY_GUIDE.gripRule.description}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                {GEAR_SANITY_GUIDE.gripRule.verdict}
              </p>
            </div>

            {/* Polyester String Warning */}
            <div className="bg-tennis-clay/15 border border-tennis-clay/40 p-3.5 rounded-xl space-y-1.5">
              <span className="text-xs font-bold text-tennis-clay block">
                ⚠️ {GEAR_SANITY_GUIDE.stringWarning.title}
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {GEAR_SANITY_GUIDE.stringWarning.danger}
              </p>
              <div className="bg-black/30 p-2.5 rounded-lg text-xs text-tennis-yellow">
                <strong>Rekomendasi Pelatih:</strong>{' '}
                {GEAR_SANITY_GUIDE.stringWarning.recommendation}
              </div>
            </div>

            {/* Court Surface Footwork */}
            <div className="bg-tennis-surfaceLight/50 border border-slate-700/60 p-3.5 rounded-xl space-y-2">
              <span className="text-xs font-bold text-white block">
                🏟️ {GEAR_SANITY_GUIDE.surfaceGuide.title}
              </span>
              <div className="text-xs text-slate-300 space-y-1">
                <p>• {GEAR_SANITY_GUIDE.surfaceGuide.hardCourt}</p>
                <p>• {GEAR_SANITY_GUIDE.surfaceGuide.clayCourt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

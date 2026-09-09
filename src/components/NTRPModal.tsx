import React, { useState } from 'react';
import { Compass, X, Check, ArrowRight, Award } from 'lucide-react';
import { NTRP_DIAGNOSTIC_QUIZ } from '../data/prehabData';
import { NTRPLevel } from '../types';

interface NTRPModalProps {
  currentLevel: NTRPLevel;
  onSelectLevel: (level: NTRPLevel) => void;
  onClose: () => void;
}

export const NTRPModal: React.FC<NTRPModalProps> = ({
  currentLevel,
  onSelectLevel,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedScores, setSelectedScores] = useState<number[]>([]);
  const [calculatedResult, setCalculatedResult] = useState<NTRPLevel | null>(null);

  const question = NTRP_DIAGNOSTIC_QUIZ[currentQuestionIndex];

  const handleSelectOption = (score: number) => {
    const nextScores = [...selectedScores, score];
    setSelectedScores(nextScores);

    if (currentQuestionIndex < NTRP_DIAGNOSTIC_QUIZ.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate average score
      const total = nextScores.reduce((acc, curr) => acc + curr, 0);
      const avg = total / nextScores.length;

      let resultLevel: NTRPLevel = '2.5';
      if (avg <= 1.8) resultLevel = '1.5';
      else if (avg <= 2.3) resultLevel = '2.0';
      else if (avg <= 2.8) resultLevel = '2.5';
      else if (avg <= 3.3) resultLevel = '3.0';
      else if (avg <= 3.8) resultLevel = '3.5';
      else if (avg <= 4.2) resultLevel = '4.0';
      else resultLevel = '4.5';

      setCalculatedResult(resultLevel);
    }
  };

  const handleApplyResult = () => {
    if (calculatedResult) {
      onSelectLevel(calculatedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-tennis-surface border border-slate-800 max-w-md w-full rounded-2xl p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-tennis-yellow" />
          <h3 className="text-lg font-bold text-white">Kuis Penentu Level NTRP</h3>
        </div>

        {!calculatedResult ? (
          <div>
            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mb-4 overflow-hidden">
              <div
                className="bg-tennis-yellow h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / NTRP_DIAGNOSTIC_QUIZ.length) * 100}%`,
                }}
              />
            </div>

            <p className="text-xs text-tennis-yellow uppercase font-bold tracking-wider mb-1">
              Pertanyaan {currentQuestionIndex + 1} dari {NTRP_DIAGNOSTIC_QUIZ.length}
            </p>
            <h4 className="text-base font-semibold text-white mb-4">{question.question}</h4>

            <div className="space-y-2.5">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-700 hover:border-tennis-yellow hover:bg-tennis-yellow/5 text-slate-200 text-xs transition-all flex items-center justify-between group"
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-tennis-yellow shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-tennis-yellow/20 border-2 border-tennis-yellow mx-auto mb-3 flex items-center justify-center court-glow-yellow">
              <Award className="w-8 h-8 text-tennis-yellow" />
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Rekomendasi Level Anda:
            </p>
            <h2 className="text-4xl font-extrabold text-white my-1">
              NTRP <span className="text-tennis-yellow">{calculatedResult}</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-xs mx-auto mb-6">
              {parseFloat(calculatedResult) <= 2.5
                ? 'Jalur Pemula (4-Week Foundation): Fokus pada Grip, Split-Step, dan konsistensi titik kontak di depan pinggul.'
                : 'Jalur Menengah (6-Week Kinetic Power): Fokus pada Open Stance, Racket Lag, Pronasi Servis, dan Kontrol Arah.'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedScores([]);
                  setCalculatedResult(null);
                }}
                className="flex-1 py-3 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Ulangi Kuis
              </button>
              <button
                onClick={handleApplyResult}
                className="flex-1 py-3 bg-tennis-yellow text-tennis-dark font-bold text-xs rounded-xl hover:bg-tennis-yellowDark transition-colors"
              >
                Gunakan Level Ini
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

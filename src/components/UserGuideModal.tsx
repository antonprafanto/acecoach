import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Volume2,
  Camera,
  Wrench,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface UserGuideModalProps {
  onClose: () => void;
  onNavigateTab?: (tab: 'curriculum' | 'biomechanics' | 'drills' | 'mental' | 'diagnostics') => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ onClose, onNavigateTab }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const guideSteps = [
    {
      id: 1,
      tabKey: 'curriculum' as const,
      icon: BookOpen,
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      title: '1. Pelajari Teknik (Tab Kurikulum)',
      badge: 'Langkah Pertama',
      summary: 'Fondasi gerakan raket dari dasar hingga mahir.',
      instructions: [
        'Buka tab "Kurikulum" di menu bawah.',
        'Mulai dari Modul 1 (Grip & Posisi Bentur), lalu ikuti modul berikutnya berurutan.',
        'Klik modul untuk membaca tips kunci biomekanik dan melihat gambar ilustrasi 3D definisi tinggi.',
        'Klik "Tandai Modul Selesai" jika Anda sudah mempraktikkan materi tersebut.',
      ],
      proTip: 'Semua ilustrasi 3D bisa diklik untuk diperbesar (fullscreen zoom).',
    },
    {
      id: 2,
      tabKey: 'drills' as const,
      icon: Volume2,
      iconColor: 'text-tennis-yellow bg-tennis-yellow/10 border-tennis-yellow/30',
      title: '2. Latihan Mandiri di Lapangan (Tab Drills)',
      badge: 'Pelatih Suara',
      summary: 'HP berteriak aba-aba tempo otomatis di bangku lapangan.',
      instructions: [
        'Bawa HP ke lapangan tenis dan letakkan di bangku pinggir lapangan.',
        'Buka tab "Drills", lalu pilih menu drill (misal: "Split-Step Metronome" atau "Forehand Kinetic Rhythm").',
        'Tekan tombol Mulai. HP Anda akan bersuara dan memberi aba-aba vokal ("Split! Turn! Hit!") secara otomatis.',
        'Layar HP Anda dijaga tetap menyala agar latihan tidak terputus.',
      ],
      proTip: 'Gunakan speaker bluetooth kecil di pinggir lapangan untuk suara lebih menggelegar!',
    },
    {
      id: 3,
      tabKey: 'biomechanics' as const,
      icon: Camera,
      iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      title: '3. Koreksi Gerakan Sendiri (Tab Biomekanik)',
      badge: 'Cermin Kamera',
      summary: 'Samakan ayunan raket Anda dengan standar teknik ATP/WTA.',
      instructions: [
        'Buka tab "Biomekanik" untuk mempelajari 4 fase ayunan (Unit Turn, The Drop, Contact Point, Finish).',
        'Nyalakan tombol "Kamera Selfie Cermin" di bagian atas.',
        'Sandarkan HP di depan Anda dan lakukan gerakan bayangan (shadow swing) menghadap kamera.',
        'Cocokkan sudut siku, lutut, dan posisi raket Anda dengan gambar panduan 3D di sampingnya.',
      ],
      proTip: 'Video kamera diproses langsung di HP Anda (tidak diupload ke server, aman & hemat kuota).',
    },
    {
      id: 4,
      tabKey: 'diagnostics' as const,
      icon: Wrench,
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      title: '4. Cari Solusi Kesalahan Pukulan (Tab Diagnosa)',
      badge: 'Troubleshooter',
      summary: 'Pukulan sering keluar atau nyangkut di net? Cari solusinya di sini.',
      instructions: [
        'Buka tab "Diagnosa & Log" jika pukulan Anda terasa aneh di lapangan.',
        'Ketik gejala masalah di kolom pencarian (misal: "bola nyangkut net" atau "pukulan out panjang").',
        'Aplikasi akan membeberkan kesalahan biomekaniknya (misal: face raket terlalu terbuka / tidak ada topspin) beserta drill pembenahannya.',
        'Gunakan sub-menu "Catat Log" untuk merekam jurnal latihan dan melacak perkembangan Anda.',
      ],
      proTip: 'Tersedia juga fitur Kartu Medsos untuk membagikan pencapaian latihan Anda ke Instagram/WA!',
    },
  ];

  const currentStep = guideSteps.find((s) => s.id === activeStep) || guideSteps[0];
  const StepIcon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 bg-tennis-dark/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-tennis-surface border border-slate-700/80 max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-tennis-navy/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-tennis-yellow/10 border border-tennis-yellow/30 text-tennis-yellow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                Panduan Cara Pakai <span className="text-tennis-yellow">AceCoach</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Pahami cara menggunakan aplikasi dalam 1 menit 🎾
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Tutup Panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-4 p-2 bg-slate-900/80 border-b border-slate-800 gap-1 text-xs shrink-0">
          {guideSteps.map((step) => {
            const Icon = step.icon;
            const isCurrent = step.id === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  isCurrent
                    ? 'bg-tennis-yellow text-tennis-dark font-bold shadow-md shadow-tennis-yellow/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] sm:text-[11px] truncate w-full text-center">
                  Tahap {step.id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Step Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${currentStep.iconColor}`}
              >
                <StepIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-tennis-yellow bg-tennis-yellow/15 px-2 py-0.5 rounded border border-tennis-yellow/30">
                  {currentStep.badge}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                  {currentStep.title}
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium bg-tennis-navy/40 p-2.5 rounded-xl border border-slate-800">
            {currentStep.summary}
          </p>

          {/* Step Instructions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Langkah Penggunaan:
            </h4>
            <div className="space-y-2">
              {currentStep.instructions.map((text, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip Box */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/20 border border-amber-600/30 text-xs text-amber-200">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-300">Tips Lapangan: </strong>
              <span>{currentStep.proTip}</span>
            </div>
          </div>

          {/* Quick Jump to Tab Button */}
          {onNavigateTab && (
            <button
              onClick={() => {
                onNavigateTab(currentStep.tabKey);
                onClose();
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-tennis-surface hover:border-tennis-yellow/60 text-tennis-yellow font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Langsung Buka {currentStep.title.split('(')[1]?.replace(')', '') || 'Tab Ini'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-tennis-navy/80 flex items-center justify-between gap-2 shrink-0">
          {activeStep > 1 ? (
            <button
              onClick={() => setActiveStep(activeStep - 1)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              ← Kembali
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Offline PWA</span>
            </div>
          )}

          {activeStep < guideSteps.length ? (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-4 py-2 bg-tennis-yellow text-tennis-dark font-bold text-xs rounded-xl hover:bg-tennis-yellowDark transition-colors flex items-center gap-1"
            >
              <span>Lanjut Tahap {activeStep + 1}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-tennis-yellow text-tennis-dark font-bold text-xs rounded-xl hover:bg-tennis-yellowDark transition-colors"
            >
              Siap Latihan! Mulai 🎾
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

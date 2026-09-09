import React, { useState } from 'react';
import { Maximize2, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface LessonIllustrationProps {
  lessonId: string;
}

interface IllustrationMeta {
  src: string;
  alt: string;
  caption: string;
  keyCue: string;
}

const ILLUSTRATIONS: Record<string, IllustrationMeta> = {
  b_w1_grip: {
    src: './illustrations/b_w1_grip.jpg',
    alt: 'Anatomi Grip & Bevel Raket',
    caption: 'Visual Bevel Raket (Tampak Bawah Butt-Cap Oktagonal)',
    keyCue: 'Pangkal jari telunjuk (base knuckle) diletakkan di Bevel 2 untuk Servis/Volley (Continental), atau Bevel 4 untuk modern Forehand topspin.'
  },
  b_w1_contact_point: {
    src: './illustrations/b_w1_contact_point.jpg',
    alt: 'Geometri Titik Bentur (Contact Point)',
    caption: 'Titik Bentur 30 - 45 cm Di Depan Tubuh (Depan Kaki Tumpuan)',
    keyCue: 'Pukul bola selalu di depan tubuh agar seluruh rantai kinetik tersalurkan dan melindungi sendi siku dari tennis elbow.'
  },
  b_w2_split_step: {
    src: './illustrations/b_w2_split_step.jpg',
    alt: 'Dinamika Pegas Split-Step',
    caption: 'Dinamika Pegas Split-Step (Lompatan Refleks Kaki)',
    keyCue: 'Lompat kecil 0.1 detik sebelum raket lawan menyentuh bola; mendarat elastis pada bantalan jari kaki dengan lutut lentur.'
  },
  b_w2_unit_turn: {
    src: './illustrations/b_w2_unit_turn.jpg',
    alt: 'Rotasi Unit Turn Bahu',
    caption: 'Rotasi Unit Turn: Bahu dan Torso Memutar 90° Satu Poros',
    keyCue: 'Tangan non-dominan memandu leher raket; putar dada dan bahu secara utuh, bukan sekadar menarik tangan ke belakang.'
  },
  b_w3_forehand_drop: {
    src: './illustrations/b_w3_forehand_drop.jpg',
    alt: 'Modern Forehand: Low-to-High & Racket Drop',
    caption: 'Lintasan Ayunan Low-to-High & Racket Lag Alami',
    keyCue: 'Gravitasi menurunkan kepala raket di bawah ketinggian bola; butt-cap mengarah ke target sebelum menyapu bola ke atas.'
  },
  b_w3_backhand_foundation: {
    src: './illustrations/b_w3_backhand_foundation.jpg',
    alt: 'Fondasi Backhand 2 Tangan',
    caption: 'Fondasi Backhand 2 Tangan: Tangan Kiri Sebagai Pendorong Utama',
    keyCue: 'Tangan non-dominan melakukan forehand dominan melewati bola; tangan kanan hanya menstabilkan poros pukulan.'
  },
  b_w4_serve_trophy: {
    src: './illustrations/b_w4_serve_trophy.jpg',
    alt: 'Servis Trophy Pose & Toss',
    caption: 'Postur Trophy Pose Standar PTR/USPTA & Toss Jam 1',
    keyCue: 'Siku membentuk sudut 90° sejajar bahu, lemparan toss lurus stabil di jam 1, lutut ditekuk siap meluncur ke atas.'
  },
  b_w4_punch_volley: {
    src: './illustrations/b_w4_punch_volley.jpg',
    alt: 'Net Play: Punch Volley & Block',
    caption: 'Mekanika Volley (Racket Head Above Wrist & No Backswing)',
    keyCue: 'Pertahankan kepala raket berdiri tegak di atas pergelangan tangan; blok bola dengan dorongan pendek 20 cm ke depan.'
  },
  i_w1_open_stance_forehand: {
    src: './illustrations/i_w1_open_stance_forehand.jpg',
    alt: 'Open Stance Loading Phase',
    caption: 'Loading Phase Kaki Luar (Ground Reaction Force)',
    keyCue: 'Tumpukan 80% berat badan pada paha kaki luar, lalu dorong tanah ke atas untuk memutar panggul secara eksplosif.'
  },
  i_w2_racket_lag_snap: {
    src: './illustrations/i_w2_racket_lag_snap.jpg',
    alt: 'Akselerasi Racket Lag & Snap',
    caption: 'Efek Cambuk Racket Lag & Loose Wrist (Skala 3/10)',
    keyCue: 'Pergelangan tangan rileks membiarkan kepala raket tertinggal di belakang, lalu mencambuk bola dengan windshield wiper finish.'
  },
  i_w4_serve_pronation: {
    src: './illustrations/i_w4_serve_pronation.jpg',
    alt: 'Pronasi Servis Modern',
    caption: 'Pronasi Lengan Bawah (Rotasi Internal 90° Keluar)',
    keyCue: 'Tepi bingkai raket membelah angin menuju bola, lalu lengan bawah berotasi keluar memutar permukaan senar tepat saat kontak.'
  },
  i_w6_matchplay_tactics: {
    src: './illustrations/i_w6_matchplay_tactics.jpg',
    alt: 'Geometri Lapangan: Crosscourt vs DTL',
    caption: 'Geometri Lapangan: Keunggulan Persentase Crosscourt',
    keyCue: 'Pukul 70% silang (crosscourt) karena net lebih rendah 15 cm di bagian tengah dan lintasan lapangan lebih panjang 1.3 meter.'
  }
};

export const LessonIllustration: React.FC<LessonIllustrationProps> = ({ lessonId }) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const meta = ILLUSTRATIONS[lessonId];

  if (!meta) {
    return (
      <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2 text-center">
        <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
          Aliran Rantai Kinetik
        </span>
        <p className="text-xs text-slate-400">
          Kaki → Panggul → Bahu → Lengan → Kepala Raket
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#070D18] border border-slate-700/80 rounded-2xl p-3.5 my-2.5 transition-all hover:border-slate-600 shadow-lg">
        {/* Caption Header */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-tennis-yellow shrink-0" />
            <span className="text-[11px] font-bold text-tennis-yellow tracking-wide">
              {meta.caption}
            </span>
          </div>
          <button
            onClick={() => setIsZoomed(true)}
            title="Perbesar Gambar"
            className="p-1 rounded-md bg-slate-800/80 text-slate-300 hover:text-tennis-yellow hover:bg-slate-700 transition-colors flex items-center gap-1 text-[10px] px-2"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Zoom</span>
          </button>
        </div>

        {/* 3D Visual Image */}
        <div
          onClick={() => setIsZoomed(true)}
          className="relative w-full aspect-video md:aspect-[16/9] rounded-xl overflow-hidden cursor-pointer group bg-black/40 border border-slate-800 flex items-center justify-center"
        >
          <img
            src={meta.src}
            alt={meta.alt}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
            <span className="text-[11px] bg-tennis-dark/90 border border-tennis-yellow/50 text-tennis-yellow px-2.5 py-1 rounded-full font-semibold shadow flex items-center gap-1">
              <Maximize2 className="w-3 h-3" /> Klik untuk memperbesar
            </span>
          </div>
        </div>

        {/* Key Biomechanical Coaching Cue */}
        <div className="mt-2.5 bg-tennis-navy/40 border border-tennis-yellow/20 rounded-xl p-2.5 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-tennis-yellow shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
            <strong className="text-white">Kunci Biomekanik:</strong> {meta.keyCue}
          </p>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-tennis-dark border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-3.5 bg-tennis-surface border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider block">
                  Panduan Biomekanik 3D (Syari'at Compliant)
                </span>
                <h4 className="text-sm font-bold text-white">{meta.alt}</h4>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Full Image */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/60 min-h-[300px]">
              <img
                src={meta.src}
                alt={meta.alt}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-xl"
              />
            </div>

            {/* Modal Footer Cue */}
            <div className="p-3 bg-tennis-surface border-t border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-tennis-yellow block mb-0.5">💡 Instruksi Pelatih PTR:</span>
              <p className="leading-relaxed">{meta.keyCue}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

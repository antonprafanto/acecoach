import React, { useState } from 'react';
import { Maximize2, X, Info, Check, ShieldCheck } from 'lucide-react';

interface LessonIllustrationProps {
  lessonId: string;
  isLefty?: boolean;
}

export const LessonIllustration: React.FC<LessonIllustrationProps> = ({ lessonId, isLefty = false }) => {
  const [selectedBevel, setSelectedBevel] = useState<number>(2); // Default Bevel 2 (Continental)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const mirrorStyle = isLefty ? { transform: 'scaleX(-1)' } : undefined;

  // Render diagram content based on lessonId
  const renderContent = (isZoomed = false) => {
    switch (lessonId) {
      // ================= 1. OCTAGONAL GRIP BEVELS (INTERACTIVE 3D PERSPECTIVE) =================
      case 'b_w1_grip':
        const bevelInfo: Record<number, { name: string; stroke: string; desc: string; color: string }> = {
          1: { name: 'Bevel 1 (Top / Atas)', stroke: 'Backhand 1 Tangan (1HBH)', desc: 'Pangkal telunjuk di permukaan atas raket. Menahan raket tetap stabil untuk slice & 1HBH.', color: '#94A3B8' },
          2: { name: 'Bevel 2 (Continental)', stroke: 'Servis, Volley, Overhead, Slice', desc: 'Grip paling krusial dalam tenis! Memungkinkan pronasi lengan bawah dan fleksibilitas pergelangan tangan.', color: '#CCFF00' },
          3: { name: 'Bevel 3 (Eastern Forehand)', stroke: 'Forehand Klasik / Flat', desc: 'Sensasi memegang raket seperti "berjabat tangan". Bagus untuk bola rendah dan pukulan mendatar (flat).', color: '#38BDF8' },
          4: { name: 'Bevel 4 (Semi-Western)', stroke: 'Modern Topspin Forehand', desc: 'Standar emas forehand modern! Membantu menyikat bola dari bawah ke atas menghasilkan topspin tinggi.', color: '#F59E0B' },
          5: { name: 'Bevel 5 (Western)', stroke: 'Extreme High Topspin', desc: 'Pangkal telunjuk di bawah gagang. Menghasilkan rotasi putaran tinggi untuk bola pantulan dada ke atas.', color: '#EC4899' },
          6: { name: 'Bevel 6', stroke: 'Backhand Tangan Kiri (2HBH)', desc: 'Posisi tangan non-dominan untuk menyetir forehand kiri pada 2HBH.', color: '#A855F7' },
          7: { name: 'Bevel 7', stroke: 'Continental / Eastern BH', desc: 'Transisi pegangan backhand.', color: '#64748B' },
          8: { name: 'Bevel 8', stroke: 'Top Bevel Angle', desc: 'Peralihan sudut atas raket.', color: '#64748B' }
        };

        const currentBevel = bevelInfo[selectedBevel] || bevelInfo[2];

        return (
          <div className="flex flex-col items-center w-full">
            {/* Header Badge */}
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow animate-pulse"></span>
                Anatomi Grip 8-Bevel (Tampak Belakang Butt-Cap)
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Interaktif • Pilih Bevel
              </span>
            </div>

            {/* SVG Diagram with generous canvas so labels never truncate */}
            <svg viewBox="0 0 460 260" className="w-full max-w-lg h-auto drop-shadow-lg" style={mirrorStyle}>
              <defs>
                {/* 3D Handle Gradient */}
                <linearGradient id="handleGripGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="50%" stopColor="#0F172A" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <radialGradient id="buttCapCenter" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0F172A" />
                </radialGradient>
              </defs>

              {/* Racquet Shaft Perspective in Background */}
              <polygon points="170,30 290,30 330,120 130,120" fill="url(#handleGripGrad)" opacity="0.4" stroke="#334155" strokeWidth="1.5" />
              {/* Overgrip Tape Spirals */}
              <line x1="160" y1="50" x2="300" y2="70" stroke="#475569" strokeWidth="2" opacity="0.6" />
              <line x1="145" y1="80" x2="315" y2="100" stroke="#475569" strokeWidth="2" opacity="0.6" />

              {/* Main Octagonal Butt-Cap */}
              {/* Points for regular octagon centered at (230, 140) with radius ~80 */}
              <polygon
                points="195,65 265,65 315,115 315,165 265,215 195,215 145,165 145,115"
                fill="url(#buttCapCenter)"
                stroke="#475569"
                strokeWidth="4"
              />

              {/* 8 Bevel Segments with dynamic active highlighting */}
              {/* Bevel 1: Top (195,65 to 265,65) */}
              <line x1="195" y1="65" x2="265" y2="65" stroke={selectedBevel === 1 ? '#CCFF00' : '#64748B'} strokeWidth={selectedBevel === 1 ? 8 : 4} strokeLinecap="round" />
              <circle cx="230" cy="65" r={selectedBevel === 1 ? 7 : 4} fill={selectedBevel === 1 ? '#CCFF00' : '#94A3B8'} />
              <text x="230" y="48" fill={selectedBevel === 1 ? '#CCFF00' : '#CBD5E1'} fontSize="12" fontWeight="bold" textAnchor="middle">1 (Top)</text>

              {/* Bevel 2: Continental (265,65 to 315,115) */}
              <line x1="265" y1="65" x2="315" y2="115" stroke={selectedBevel === 2 ? '#CCFF00' : '#475569'} strokeWidth={selectedBevel === 2 ? 9 : 4} strokeLinecap="round" />
              <circle cx="290" cy="90" r={selectedBevel === 2 ? 8 : 4} fill={selectedBevel === 2 ? '#CCFF00' : '#94A3B8'} />
              <text x="330" y="92" fill={selectedBevel === 2 ? '#CCFF00' : '#CBD5E1'} fontSize="13" fontWeight="extrabold">2 (Continental)</text>

              {/* Bevel 3: Eastern (315,115 to 315,165) */}
              <line x1="315" y1="115" x2="315" y2="165" stroke={selectedBevel === 3 ? '#38BDF8' : '#475569'} strokeWidth={selectedBevel === 3 ? 9 : 4} strokeLinecap="round" />
              <circle cx="315" cy="140" r={selectedBevel === 3 ? 8 : 4} fill={selectedBevel === 3 ? '#38BDF8' : '#94A3B8'} />
              <text x="330" y="145" fill={selectedBevel === 3 ? '#38BDF8' : '#CBD5E1'} fontSize="13" fontWeight="bold">3 (Eastern)</text>

              {/* Bevel 4: Semi-Western (315,165 to 265,215) */}
              <line x1="315" y1="165" x2="265" y2="215" stroke={selectedBevel === 4 ? '#F59E0B' : '#475569'} strokeWidth={selectedBevel === 4 ? 9 : 4} strokeLinecap="round" />
              <circle cx="290" cy="190" r={selectedBevel === 4 ? 8 : 4} fill={selectedBevel === 4 ? '#F59E0B' : '#94A3B8'} />
              <text x="330" y="195" fill={selectedBevel === 4 ? '#F59E0B' : '#CBD5E1'} fontSize="13" fontWeight="bold">4 (Semi-Western)</text>

              {/* Bevel 5: Bottom (265,215 to 195,215) */}
              <line x1="265" y1="215" x2="195" y2="215" stroke={selectedBevel === 5 ? '#EC4899' : '#475569'} strokeWidth={selectedBevel === 5 ? 8 : 4} strokeLinecap="round" />
              <text x="230" y="235" fill={selectedBevel === 5 ? '#EC4899' : '#64748B'} fontSize="11" textAnchor="middle">5 (Bottom)</text>

              {/* Left Side Bevels (6, 7, 8) */}
              <line x1="195" y1="215" x2="145" y2="165" stroke={selectedBevel === 6 ? '#A855F7' : '#475569'} strokeWidth={selectedBevel === 6 ? 8 : 4} />
              <text x="130" y="195" fill={selectedBevel === 6 ? '#A855F7' : '#64748B'} fontSize="11" textAnchor="end">6</text>

              <line x1="145" y1="165" x2="145" y2="115" stroke={selectedBevel === 7 ? '#64748B' : '#475569'} strokeWidth={selectedBevel === 7 ? 8 : 4} />
              <text x="130" y="145" fill={selectedBevel === 7 ? '#38BDF8' : '#64748B'} fontSize="11" textAnchor="end">7</text>

              <line x1="145" y1="115" x2="195" y2="65" stroke={selectedBevel === 8 ? '#64748B' : '#475569'} strokeWidth={selectedBevel === 8 ? 8 : 4} />
              <text x="130" y="92" fill={selectedBevel === 8 ? '#CCFF00' : '#64748B'} fontSize="11" textAnchor="end">8</text>

              {/* Center Tennis Racquet Logo / Axis */}
              <circle cx="230" cy="140" r="14" fill="#1E293B" stroke="#CCFF00" strokeWidth="2" />
              <circle cx="230" cy="140" r="4" fill="#CCFF00" />
              <text x="230" y="170" fill="#94A3B8" fontSize="10" textAnchor="middle">Butt-Cap Axis</text>

              {/* Knuckle Pointer Indicator Arrow pointing to currently selected bevel */}
              {selectedBevel === 2 && (
                <g>
                  <path d="M 370 65 L 305 85" stroke="#CCFF00" strokeWidth="2.5" markerEnd="url(#yellowArrow)" />
                  <rect x="340" y="45" width="115" height="22" rx="5" fill="#CCFF00" />
                  <text x="397" y="60" fill="#0A192F" fontSize="10" fontWeight="extrabold" textAnchor="middle">Pangkal Telunjuk Disini</text>
                </g>
              )}
              {selectedBevel === 4 && (
                <g>
                  <path d="M 370 215 L 305 195" stroke="#F59E0B" strokeWidth="2.5" />
                  <rect x="340" y="205" width="115" height="22" rx="5" fill="#F59E0B" />
                  <text x="397" y="220" fill="#0A192F" fontSize="10" fontWeight="extrabold" textAnchor="middle">Pangkal Telunjuk Disini</text>
                </g>
              )}
            </svg>

            {/* Interactive Bevel Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 my-2.5">
              {[1, 2, 3, 4, 5, 6].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBevel(b)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedBevel === b
                      ? 'bg-tennis-yellow text-tennis-dark shadow-md scale-105'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Bevel {b}
                </button>
              ))}
            </div>

            {/* Selected Bevel Description Card */}
            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentBevel.color }}></span>
                  {currentBevel.name}
                </span>
                <span className="text-[11px] font-bold text-tennis-yellow bg-tennis-yellow/10 px-2 py-0.5 rounded border border-tennis-yellow/30">
                  {currentBevel.stroke}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                {currentBevel.desc}
              </p>
            </div>
          </div>
        );

      // ================= 2. CONTACT POINT (PROPORTIONAL FACELESS ATHLETE IN MODEST WEAR) =================
      case 'b_w1_contact_point':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Geometri Titik Kontak: 30–45 cm di Depan Kaki Depan
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Syariat-Compliant (Menutup Aurat & Faceless)
              </span>
            </div>

            {/* SVG Realistic Athlete Figure */}
            <svg viewBox="0 0 480 270" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              <defs>
                <linearGradient id="courtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B1A2E" />
                  <stop offset="100%" stopColor="#07111E" />
                </linearGradient>
                <linearGradient id="jerseyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E3A8A" />
                  <stop offset="100%" stopColor="#172554" />
                </linearGradient>
                <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <radialGradient id="mannequinHead" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#CBD5E1" />
                  <stop offset="70%" stopColor="#64748B" />
                  <stop offset="100%" stopColor="#334155" />
                </radialGradient>
              </defs>

              {/* Court Baseline Floor */}
              <rect x="10" y="240" width="460" height="25" fill="#0F243A" />
              <line x1="10" y1="240" x2="470" y2="240" stroke="#38BDF8" strokeWidth="2.5" opacity="0.7" />

              {/* === ATHLETIC PLAYER (FACELESS, MODEST WEAR COVERING AURAT) === */}
              {/* Back Leg (Right leg supporting, bent at knee) */}
              <path d="M 130 150 Q 110 185 95 240" fill="none" stroke="url(#pantsGrad)" strokeWidth="18" strokeLinecap="round" />
              {/* Front Leg (Left leg stepping forward, bent 110 deg) */}
              <path d="M 140 150 Q 165 185 180 240" fill="none" stroke="url(#pantsGrad)" strokeWidth="20" strokeLinecap="round" />

              {/* Athletic Tennis Shoes */}
              <ellipse cx="90" cy="242" rx="16" ry="6" fill="#CCFF00" stroke="#0F172A" strokeWidth="2" />
              <ellipse cx="185" cy="242" rx="18" ry="7" fill="#CCFF00" stroke="#0F172A" strokeWidth="2" />

              {/* Torso & Athletic Jersey (Coiled & leaning into shot) */}
              <path d="M 115 95 L 155 95 L 145 155 L 125 155 Z" fill="url(#jerseyGrad)" stroke="#2563EB" strokeWidth="1.5" />

              {/* Left Arm (Non-dominant tracking forward for balance) */}
              <path d="M 120 102 Q 150 115 175 110" fill="none" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
              <circle cx="178" cy="110" r="4" fill="#94A3B8" />

              {/* Right Arm (Hitting arm extending forward to contact) */}
              <path d="M 145 105 Q 185 118 240 112" fill="none" stroke="#CCFF00" strokeWidth="10" strokeLinecap="round" />
              <circle cx="240" cy="112" r="5" fill="#FFFFFF" /> {/* Wrist sweatband */}

              {/* Faceless Athletic Mannequin Head (Smooth 3D sphere/silhouette, strictly no eyes/nose/mouth) */}
              <ellipse cx="132" cy="68" rx="15" ry="19" fill="url(#mannequinHead)" />
              {/* Modest athletic collar */}
              <path d="M 122 87 Q 132 93 142 87" fill="none" stroke="#38BDF8" strokeWidth="2" />

              {/* Tennis Racquet (Shaft, Throat & Frame) */}
              <line x1="240" y1="112" x2="275" y2="105" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" /> {/* Grip handle */}
              <polygon points="275,105 295,95 295,115" fill="#1E293B" stroke="#CCFF00" strokeWidth="2" /> {/* Throat */}
              {/* Racket Head Oval */}
              <ellipse cx="320" cy="105" rx="14" ry="38" fill="rgba(204,255,0,0.12)" stroke="#CCFF00" strokeWidth="3" />
              {/* Racket Strings Grid */}
              <line x1="313" y1="75" x2="313" y2="135" stroke="#CCFF00" strokeWidth="0.8" opacity="0.6" />
              <line x1="320" y1="70" x2="320" y2="140" stroke="#CCFF00" strokeWidth="0.8" opacity="0.6" />
              <line x1="327" y1="75" x2="327" y2="135" stroke="#CCFF00" strokeWidth="0.8" opacity="0.6" />
              <line x1="308" y1="95" x2="332" y2="95" stroke="#CCFF00" strokeWidth="0.8" opacity="0.6" />
              <line x1="308" y1="115" x2="332" y2="115" stroke="#CCFF00" strokeWidth="0.8" opacity="0.6" />

              {/* Tennis Ball at Sweet Spot */}
              <circle cx="330" cy="105" r="10" fill="#CCFF00" stroke="#84CC16" strokeWidth="2" />
              <path d="M 324 99 Q 330 105 324 111" fill="none" stroke="#FFFFFF" strokeWidth="1.2" /> {/* Ball curve seam */}

              {/* Measurement Distance Bracket (30-45 cm Out Front) */}
              <line x1="180" y1="210" x2="320" y2="210" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="180" y1="202" x2="180" y2="218" stroke="#F59E0B" strokeWidth="2" />
              <line x1="320" y1="202" x2="320" y2="218" stroke="#F59E0B" strokeWidth="2" />
              <rect x="200" y="198" width="105" height="22" rx="4" fill="#0A192F" stroke="#F59E0B" strokeWidth="1" />
              <text x="252" y="213" fill="#F59E0B" fontSize="11" fontWeight="extrabold" textAnchor="middle">
                30 – 45 cm Di Depan
              </text>

              {/* Danger Zone Behind Hip Indicator */}
              <rect x="40" y="90" width="60" height="60" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
              <text x="70" y="118" fill="#EF4444" fontSize="10" fontWeight="extrabold" textAnchor="middle">ZONA BAHAYA</text>
              <text x="70" y="132" fill="#FCA5A5" fontSize="8" textAnchor="middle">Tennis Elbow</text>
              <line x1="70" y1="138" x2="115" y2="140" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2,2" />

              {/* Success Callout Badge */}
              <g transform="translate(350, 45)">
                <rect x="0" y="0" width="115" height="40" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
                <text x="10" y="16" fill="#34D399" fontSize="9" fontWeight="bold">✓ TITIK OPTIMAL</text>
                <text x="10" y="30" fill="#ECFDF5" fontSize="8">Beban diserap tubuh,</text>
                <text x="10" y="38" fill="#ECFDF5" fontSize="8">bukan sendi siku.</text>
              </g>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Kunci Anatomi Pelatih PTR:</strong>
              Seluruh tumbukan bola harus berada di depan kaki tumpuan depan. Lengan membentuk sudut tumpul 120°–140° dengan pergelangan tangan terkunci stabil saat benturan.
            </div>
          </div>
        );

      // ================= 3. SPLIT STEP DYNAMICS =================
      case 'b_w2_split_step':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Dinamika Pegas Split-Step (3 Fase Gerakan)
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Refleks Lapangan
              </span>
            </div>

            <svg viewBox="0 0 480 230" className="w-full max-w-lg h-auto drop-shadow-md">
              <defs>
                <linearGradient id="stepJersey" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1E3A8A" />
                  <stop offset="100%" stopColor="#172554" />
                </linearGradient>
                <linearGradient id="stepPants" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <radialGradient id="facelessHead" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#475569" />
                </radialGradient>
              </defs>

              {/* Court Surface */}
              <line x1="20" y1="200" x2="460" y2="200" stroke="#334155" strokeWidth="2" />

              {/* PHASE 1: READY POSITION (Left) */}
              <g transform="translate(40, 10)">
                <ellipse cx="40" cy="50" rx="10" ry="13" fill="url(#facelessHead)" />
                <rect x="30" y="65" width="20" height="35" rx="3" fill="url(#stepJersey)" />
                <path d="M 33 100 L 25 155 L 18 190" fill="none" stroke="url(#stepPants)" strokeWidth="10" strokeLinecap="round" />
                <path d="M 47 100 L 55 155 L 62 190" fill="none" stroke="url(#stepPants)" strokeWidth="10" strokeLinecap="round" />
                <ellipse cx="16" cy="190" rx="8" ry="4" fill="#CCFF00" />
                <ellipse cx="64" cy="190" rx="8" ry="4" fill="#CCFF00" />
                {/* Ready Racket */}
                <path d="M 30 75 Q 40 90 50 75" fill="none" stroke="#CCFF00" strokeWidth="4" />
                <ellipse cx="40" cy="55" rx="5" ry="12" fill="none" stroke="#CCFF00" strokeWidth="2" />
                <rect x="10" y="202" width="60" height="18" rx="4" fill="#1E293B" />
                <text x="40" y="214" fill="#CBD5E1" fontSize="9" fontWeight="bold" textAnchor="middle">1. Posisi Siap</text>
              </g>

              {/* Arrow 1 to 2 */}
              <path d="M 130 110 L 165 110" stroke="#64748B" strokeWidth="2" strokeDasharray="3,3" />

              {/* PHASE 2: THE SPLIT HOP (Airborne Spring) (Center) */}
              <g transform="translate(190, 0)">
                <ellipse cx="45" cy="45" rx="10" ry="13" fill="url(#facelessHead)" />
                <rect x="35" y="60" width="20" height="35" rx="3" fill="url(#stepJersey)" />
                {/* Legs spread wide, knees bent, feet off court */}
                <path d="M 38 95 L 18 145 L 8 175" fill="none" stroke="url(#stepPants)" strokeWidth="12" strokeLinecap="round" />
                <path d="M 52 95 L 72 145 L 82 175" fill="none" stroke="url(#stepPants)" strokeWidth="12" strokeLinecap="round" />
                <ellipse cx="6" cy="175" rx="9" ry="4" fill="#CCFF00" />
                <ellipse cx="84" cy="175" rx="9" ry="4" fill="#CCFF00" />
                {/* Elastic Spring Waves below feet */}
                <path d="M 0 190 Q 6 182 12 190" stroke="#CCFF00" strokeWidth="2" fill="none" />
                <path d="M 78 190 Q 84 182 90 190" stroke="#CCFF00" strokeWidth="2" fill="none" />
                <rect x="12" y="202" width="70" height="18" rx="4" fill="#0A192F" stroke="#CCFF00" strokeWidth="1" />
                <text x="47" y="214" fill="#CCFF00" fontSize="9" fontWeight="extrabold" textAnchor="middle">2. Split Hop!</text>
              </g>

              {/* Arrow 2 to 3 */}
              <path d="M 305 110 L 340 110" stroke="#64748B" strokeWidth="2" strokeDasharray="3,3" />

              {/* PHASE 3: EXPLOSIVE PUSH-OFF (Right) */}
              <g transform="translate(360, 5)">
                <ellipse cx="50" cy="48" rx="10" ry="13" fill="url(#facelessHead)" />
                <rect x="40" y="63" width="20" height="35" rx="3" fill="url(#stepJersey)" transform="rotate(10 40 63)" />
                {/* Pushing off hard to the right */}
                <path d="M 40 98 L 15 155 L 5 190" fill="none" stroke="url(#stepPants)" strokeWidth="11" strokeLinecap="round" />
                <path d="M 55 98 L 75 145 L 88 185" fill="none" stroke="#38BDF8" strokeWidth="12" strokeLinecap="round" />
                <ellipse cx="4" cy="190" rx="8" ry="4" fill="#CCFF00" />
                <ellipse cx="90" cy="185" rx="9" ry="5" fill="#38BDF8" />
                {/* Kinetic burst vector */}
                <path d="M 75 130 L 95 125" stroke="#38BDF8" strokeWidth="2.5" />
                <rect x="15" y="202" width="75" height="18" rx="4" fill="#1E293B" />
                <text x="52" y="214" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle">3. Reaksi Meledak</text>
              </g>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Timing Split-Step:</strong>
              Lakukan lompatan kecil 0.1 detik sebelum raket lawan mengenai bola, mendarat pada bantalan depan telapak kaki (*balls of the feet*) untuk mengaktifkan refleks pegas paha & betis.
            </div>
          </div>
        );

      // ================= 4. UNIT TURN ROTATION =================
      case 'b_w2_unit_turn':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Unit Turn 90°: Bahu & Panggul Memutar Bersama
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Menutup Aurat & Faceless
              </span>
            </div>

            <svg viewBox="0 0 460 250" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              {/* Torso top-view coiling illustration */}
              <defs>
                <linearGradient id="unitJersey" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E3A8A" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>

              {/* Net Direction Indicator */}
              <line x1="230" y1="15" x2="230" y2="40" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3,3" />
              <text x="230" y="10" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">▲ Arah Net / Lawan</text>

              {/* Baseline court lines */}
              <line x1="60" y1="220" x2="400" y2="220" stroke="#334155" strokeWidth="2" />

              {/* Player Body Coiled Sideways */}
              <ellipse cx="230" cy="140" rx="38" ry="22" fill="url(#unitJersey)" stroke="#3B82F6" strokeWidth="2" />
              {/* Faceless Head turned watching the ball */}
              <circle cx="230" cy="100" r="16" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />

              {/* Left hand (Non-dominant) resting on racquet throat */}
              <path d="M 195 140 Q 230 170 280 155" fill="none" stroke="#60A5FA" strokeWidth="9" strokeLinecap="round" />
              <text x="280" y="180" fill="#60A5FA" fontSize="9" fontWeight="bold">Tangan Kiri di Leher Raket</text>

              {/* Right arm and Racket coiled back */}
              <path d="M 265 140 Q 290 135 320 110" fill="none" stroke="#CCFF00" strokeWidth="10" strokeLinecap="round" />
              {/* Racket Head in preparation */}
              <ellipse cx="340" cy="95" rx="14" ry="28" transform="rotate(25 340 95)" fill="rgba(204,255,0,0.15)" stroke="#CCFF00" strokeWidth="3" />

              {/* 90 Degree Rotation Arc Guide */}
              <path d="M 160 140 A 70 70 0 0 1 230 70" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4,4" />
              <text x="175" y="95" fill="#F59E0B" fontSize="12" fontWeight="extrabold">90° Bahu</text>

              {/* Lower Body in Long Training Pants */}
              <rect x="200" y="160" width="22" height="55" rx="4" fill="#1E293B" />
              <rect x="238" y="160" width="22" height="55" rx="4" fill="#1E293B" />
              <ellipse cx="211" cy="218" rx="12" ry="5" fill="#CCFF00" />
              <ellipse cx="249" cy="218" rx="12" ry="5" fill="#CCFF00" />
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Kunci Unit Turn:</strong>
              Jangan menarik lengan ke belakang secara terpisah! Putar dada dan bahu bersamaan hingga nomor punggung menghadap lawan samping. Tangan kiri memegang leher raket sampai langkah kaki selesai.
            </div>
          </div>
        );

      // ================= 5. FOREHAND DROP & LOW-TO-HIGH =================
      case 'b_w3_forehand_drop':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Forehand: Racket Drop & Lintasan Low-To-High
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Topspin Generator
              </span>
            </div>

            <svg viewBox="0 0 460 250" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              {/* Ball trajectory coming in flat */}
              <line x1="40" y1="120" x2="260" y2="120" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4,4" />
              <circle cx="260" cy="120" r="8" fill="#CCFF00" stroke="#84CC16" strokeWidth="2" />
              <text x="130" y="112" fill="#94A3B8" fontSize="9">Lintasan Bola Datang</text>

              {/* RACKET DROP (Position 1: Low below ball) */}
              <g transform="translate(100, 160)">
                <ellipse cx="30" cy="20" rx="10" ry="24" transform="rotate(-40 30 20)" fill="rgba(204,255,0,0.15)" stroke="#64748B" strokeWidth="2" />
                <line x1="30" y1="20" x2="60" y2="10" stroke="#64748B" strokeWidth="4" />
                <rect x="0" y="48" width="85" height="18" rx="4" fill="#1E293B" />
                <text x="42" y="60" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle">1. Drop di Bawah Bola</text>
              </g>

              {/* CONTACT (Position 2: Level with ball, sweeping up) */}
              <g transform="translate(240, 95)">
                <ellipse cx="20" cy="25" rx="12" ry="32" fill="rgba(204,255,0,0.25)" stroke="#CCFF00" strokeWidth="3" />
                <line x1="20" y1="25" x2="-10" y2="35" stroke="#CCFF00" strokeWidth="5" />
                <rect x="-15" y="-12" width="70" height="18" rx="4" fill="#0A192F" stroke="#CCFF00" strokeWidth="1" />
                <text x="20" y="0" fill="#CCFF00" fontSize="9" fontWeight="extrabold" textAnchor="middle">2. Kontak & Sikat</text>
              </g>

              {/* FINISH (Position 3: High above opposite shoulder) */}
              <g transform="translate(350, 40)">
                <ellipse cx="25" cy="20" rx="10" ry="24" transform="rotate(45 25 20)" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" strokeWidth="2.5" />
                <rect x="-5" y="48" width="75" height="18" rx="4" fill="#1E293B" />
                <text x="32" y="60" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">3. Finish Tinggi</text>
              </g>

              {/* Upward Curved Dynamic Topspin Arrow */}
              <path d="M 120 180 Q 230 170 260 120 Q 300 65 370 55" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Mekanisme Topspin:</strong>
              Biarkan gravitasi menjatuhkan kepala raket di bawah ketinggian bola (*drop*), lalu percepat raket menyapu bagian belakang bola ke atas (*low-to-high*) menuju bahu seberang.
            </div>
          </div>
        );

      // ================= 6. BACKHAND FOUNDATION =================
      case 'b_w3_backhand_foundation':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Fondasi Backhand 2 Tangan: Tangan Kiri Menyetir
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Menutup Aurat & Faceless
              </span>
            </div>

            <svg viewBox="0 0 460 250" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              {/* Baseline */}
              <line x1="30" y1="220" x2="430" y2="220" stroke="#334155" strokeWidth="2" />

              {/* Player Body in Closed Stance with Long Pants */}
              <path d="M 170 140 L 150 220" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
              <path d="M 190 140 L 220 220" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
              <ellipse cx="145" cy="222" rx="14" ry="5" fill="#CCFF00" />
              <ellipse cx="225" cy="222" rx="16" ry="6" fill="#CCFF00" />

              {/* Torso in Athletic Jersey */}
              <rect x="155" y="85" width="45" height="60" rx="6" fill="#1E3A8A" stroke="#2563EB" strokeWidth="1.5" />
              {/* Faceless Head */}
              <ellipse cx="177" cy="62" rx="13" ry="17" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />

              {/* Right Hand (Dominant - Stabilizer at bottom) */}
              <path d="M 165 95 L 230 115" stroke="#64748B" strokeWidth="8" strokeLinecap="round" />
              {/* Left Hand (Non-Dominant - Main Driver at top) */}
              <path d="M 185 95 L 245 110" stroke="#CCFF00" strokeWidth="9" strokeLinecap="round" />

              {/* Racquet Handle with 2 hands */}
              <line x1="225" y1="118" x2="265" y2="108" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              {/* Racquet Head at Contact Point Out Front */}
              <ellipse cx="310" cy="98" rx="12" ry="34" fill="rgba(204,255,0,0.18)" stroke="#CCFF00" strokeWidth="3" />
              {/* Ball */}
              <circle cx="320" cy="98" r="9" fill="#CCFF00" stroke="#84CC16" strokeWidth="1.5" />

              {/* Annotations */}
              <rect x="230" y="145" width="165" height="24" rx="5" fill="#0A192F" stroke="#CCFF00" strokeWidth="1" />
              <text x="312" y="161" fill="#CCFF00" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                Tangan Non-Dominan = Mesin Utama
              </text>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Rahasia 2HBH:</strong>
              Pikirkan backhand 2 tangan sebagai "forehand tangan kiri" (bagi pemain kanan). Tangan dominan hanya memandu arah, sedangkan tangan non-dominan yang mendorong dan menyikat bola.
            </div>
          </div>
        );

      // ================= 7. SERVE TROPHY POSE =================
      case 'b_w4_serve_trophy':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Servis: Postur Trophy Pose Standar PTR/USPTA
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Menutup Aurat & Faceless
              </span>
            </div>

            <svg viewBox="0 0 460 260" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              {/* Court Baseline */}
              <line x1="30" y1="240" x2="430" y2="240" stroke="#38BDF8" strokeWidth="2.5" />

              {/* Player in Full Trophy Pose */}
              {/* Bent Knees Loading (Long Tracksuit Pants) */}
              <path d="M 210 160 L 195 200 L 205 240" fill="none" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
              <path d="M 225 160 L 240 200 L 230 240" fill="none" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
              <ellipse cx="205" cy="242" rx="14" ry="5" fill="#CCFF00" />
              <ellipse cx="230" cy="242" rx="14" ry="5" fill="#CCFF00" />

              {/* Torso arched slightly back */}
              <rect x="200" y="105" width="35" height="60" rx="5" fill="#1E3A8A" transform="rotate(-5 200 105)" />
              {/* Faceless Head Looking Up at Toss */}
              <ellipse cx="215" cy="80" rx="12" ry="16" fill="#94A3B8" />

              {/* Toss Arm (Straight Up to 1 o'clock) */}
              <line x1="225" y1="110" x2="275" y2="35" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
              <circle cx="282" cy="28" r="9" fill="#CCFF00" stroke="#84CC16" strokeWidth="1.5" />
              <text x="310" y="32" fill="#38BDF8" fontSize="11" fontWeight="extrabold">Toss Jam 1</text>

              {/* Hitting Arm (L-Shape 90 deg Elbow at Shoulder Level) */}
              <path d="M 200 115 L 160 115 L 160 70" fill="none" stroke="#CCFF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              {/* Racquet Pointing Upwards */}
              <line x1="160" y1="70" x2="160" y2="35" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="160" cy="20" rx="10" ry="18" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />

              {/* Alignment guides */}
              <line x1="150" y1="115" x2="230" y2="115" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="70" y="105" width="85" height="20" rx="4" fill="#0A192F" stroke="#F59E0B" strokeWidth="1" />
              <text x="112" y="119" fill="#F59E0B" fontSize="9" fontWeight="bold" textAnchor="middle">Siku 90° Sejajar Bahu</text>

              {/* Knee Flex Callout */}
              <rect x="255" y="195" width="95" height="20" rx="4" fill="#0A192F" stroke="#CCFF00" strokeWidth="1" />
              <text x="302" y="209" fill="#CCFF00" fontSize="9" fontWeight="bold" textAnchor="middle">Lutut Ditekuk (Pegas)</text>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Kunci Trophy Pose:</strong>
              1. Tangan toss terangkat lurus ke arah jam 1. <br />
              2. Siku tangan pemukul membentuk sudut 90° dan sejajar garis bahu (jangan biarkan siku turun ke bawah!). <br />
              3. Lutut ditekuk menyimpan energi dorong ke atas (*leg drive*).
            </div>
          </div>
        );

      // ================= 8. PUNCH VOLLEY & BLOCK =================
      case 'b_w4_punch_volley':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Net Play: Punch Volley (Racket Head Above Wrist)
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Tanpa Ayunan Belakang
              </span>
            </div>

            <svg viewBox="0 0 460 250" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              {/* Tennis Net in Background */}
              <rect x="360" y="80" width="10" height="150" fill="#334155" opacity="0.5" />
              <line x1="360" y1="80" x2="440" y2="80" stroke="#FFFFFF" strokeWidth="4" />
              <text x="400" y="70" fill="#94A3B8" fontSize="10" textAnchor="middle">Net Lapangan</text>

              {/* Player Profile Stepping Forward with Opposite Foot */}
              <path d="M 180 150 L 220 220" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
              <path d="M 160 150 L 130 220" stroke="#334155" strokeWidth="16" strokeLinecap="round" />
              <ellipse cx="225" cy="222" rx="16" ry="6" fill="#CCFF00" />
              <ellipse cx="125" cy="222" rx="14" ry="5" fill="#CCFF00" />

              {/* Torso */}
              <rect x="155" y="90" width="40" height="60" rx="5" fill="#1E3A8A" />
              {/* Faceless Head */}
              <ellipse cx="175" cy="65" rx="13" ry="16" fill="#94A3B8" />

              {/* Arm extending forward */}
              <path d="M 180 105 L 240 115" stroke="#CCFF00" strokeWidth="9" strokeLinecap="round" />
              {/* Wrist Locked */}
              <circle cx="240" cy="115" r="5" fill="#FFFFFF" />

              {/* Racket Head Standing UP (Above Wrist) */}
              <line x1="240" y1="115" x2="255" y2="85" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="265" cy="55" rx="10" ry="28" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="3" />
              {/* Incoming Ball */}
              <circle cx="275" cy="55" r="9" fill="#CCFF00" stroke="#84CC16" strokeWidth="1.5" />

              {/* Red Crossed Out Big Backswing */}
              <g transform="translate(70, 85)">
                <circle cx="30" cy="30" r="22" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" strokeWidth="2" />
                <line x1="15" y1="15" x2="45" y2="45" stroke="#EF4444" strokeWidth="3" />
                <line x1="45" y1="15" x2="15" y2="45" stroke="#EF4444" strokeWidth="3" />
                <text x="30" y="65" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle">DILARANG AYUNAN</text>
              </g>

              {/* Annotation */}
              <rect x="210" y="145" width="135" height="22" rx="4" fill="#0A192F" stroke="#CCFF00" strokeWidth="1" />
              <text x="277" y="160" fill="#CCFF00" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                Kepala Raket di Atas Pergelangan
              </text>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Aksioma PTR:</strong>
              Volley adalah pukulan blok dan kompresi, bukan ayunan melingkar. Kunci pergelangan tangan tetap tegak dan melangkah maju menyongsong bola seperti memberi "high-five" pendek.
            </div>
          </div>
        );

      // ================= 9. INTERMEDIATE: OPEN STANCE FOREHAND =================
      case 'i_w1_open_stance_forehand':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Open Stance: Pembebanan Kaki Luar (Outside Leg Loading)
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Menutup Aurat & Faceless
              </span>
            </div>

            <svg viewBox="0 0 460 250" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              {/* Court */}
              <line x1="30" y1="220" x2="430" y2="220" stroke="#334155" strokeWidth="2" />

              {/* Player in Open Stance with Long Tracksuit Pants */}
              {/* Inside leg (Left leg light) */}
              <path d="M 210 130 L 150 170 L 140 220" stroke="#334155" strokeWidth="14" strokeLinecap="round" fill="none" />
              {/* Outside leg (Right leg deeply loaded with 80% weight) */}
              <path d="M 230 130 L 290 165 L 280 220" stroke="#CCFF00" strokeWidth="18" strokeLinecap="round" fill="none" />
              <ellipse cx="138" cy="222" rx="14" ry="5" fill="#64748B" />
              <ellipse cx="282" cy="222" rx="16" ry="6" fill="#CCFF00" />

              {/* Torso Coiled in Athletic Jersey */}
              <rect x="200" y="70" width="40" height="60" rx="6" fill="#1E3A8A" transform="rotate(-10 200 70)" />
              {/* Faceless Head */}
              <ellipse cx="215" cy="48" rx="13" ry="16" fill="#94A3B8" />

              {/* Ground Reaction Force Vector Arrow */}
              <path d="M 282 210 L 282 145" stroke="#F59E0B" strokeWidth="3.5" markerEnd="url(#orangeArrow)" strokeDasharray="3,3" />
              <rect x="298" y="165" width="105" height="22" rx="4" fill="#0A192F" stroke="#F59E0B" strokeWidth="1" />
              <text x="350" y="180" fill="#F59E0B" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                80% Beban di Kaki Luar
              </text>

              {/* Racket Prepared */}
              <line x1="200" y1="90" x2="160" y2="70" stroke="#CCFF00" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="140" cy="60" rx="12" ry="24" transform="rotate(-30 140 60)" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Kunci Open Stance Modern:</strong>
              Benamkan 80% berat badan ke paha kaki luar (*outside leg*). Dorong lantai ke atas (*ground reaction force*) lalu lepaskan putaran panggul secara eksplosif menuju bola.
            </div>
          </div>
        );

      // ================= 10. INTERMEDIATE: RACKET LAG & SNAP =================
      case 'i_w2_racket_lag_snap':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Akselerasi Cambuk: Racket Lag & Loose Wrist
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Kecepatan Kepala Raket
              </span>
            </div>

            <svg viewBox="0 0 460 250" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              {/* Kinetic arm pulling forward */}
              <path d="M 80 140 Q 180 130 240 105" fill="none" stroke="#38BDF8" strokeWidth="12" strokeLinecap="round" />
              {/* Wrist flexed relaxed */}
              <circle cx="240" cy="105" r="7" fill="#FFFFFF" />

              {/* Racket Handle - Butt Cap Leading */}
              <line x1="240" y1="105" x2="310" y2="155" stroke="#CCFF00" strokeWidth="8" strokeLinecap="round" />
              <circle cx="240" cy="105" r="5" fill="#CCFF00" />
              <text x="210" y="85" fill="#CCFF00" fontSize="11" fontWeight="extrabold">Butt-Cap Memimpin</text>

              {/* Racket Head Lagging Behind */}
              <ellipse cx="350" cy="185" rx="14" ry="34" transform="rotate(35 350 185)" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="3" />

              {/* Whip Acceleration Arc */}
              <path d="M 240 75 Q 310 60 370 120" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="3,3" />
              <rect x="290" y="45" width="130" height="22" rx="4" fill="#0A192F" stroke="#F59E0B" strokeWidth="1" />
              <text x="355" y="60" fill="#F59E0B" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                Sudut Lag 60° (Pergelangan Rileks)
              </text>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Rahasia Kecepatan Kepala Raket:</strong>
              Jangan mencengkeram raket terlalu erat (cukup skala 3/10). Tarik pantat raket (*butt-cap*) mengarah ke bola terlebih dahulu, lalu biarkan pergelangan tangan yang rileks melepaskan kepala raket mencambuk bola.
            </div>
          </div>
        );

      // ================= 11. INTERMEDIATE: SERVE PRONATION =================
      case 'i_w4_serve_pronation':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Pronasi Servis: Rotasi Internal Lengan Bawah 90°
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Menutup Aurat & Faceless
              </span>
            </div>

            <svg viewBox="0 0 460 250" className="w-full max-w-lg h-auto drop-shadow-md" style={mirrorStyle}>
              {/* Extended Arm Upwards */}
              <line x1="200" y1="210" x2="230" y2="90" stroke="#38BDF8" strokeWidth="14" strokeLinecap="round" />
              <line x1="230" y1="90" x2="245" y2="40" stroke="#CCFF00" strokeWidth="10" strokeLinecap="round" />

              {/* Racket Face Rotating Outward */}
              <ellipse cx="255" cy="22" rx="10" ry="24" transform="rotate(20 255 22)" fill="rgba(204,255,0,0.25)" stroke="#CCFF00" strokeWidth="3" />

              {/* Pronation Rotation Spiral Arrow */}
              <path d="M 260 85 A 25 25 0 0 1 295 105" fill="none" stroke="#F59E0B" strokeWidth="4" />
              <rect x="290" y="70" width="130" height="22" rx="4" fill="#0A192F" stroke="#F59E0B" strokeWidth="1" />
              <text x="355" y="85" fill="#F59E0B" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                Pronasi Memutar Keluar 90°
              </text>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Mekanika Pronasi:</strong>
              Tepi bingkai raket membelah angin menuju bola servis seperti kapak, lalu pergelangan tangan dan rotasi internal bahu memutar permukaan senar menghadap target tepat pada mikrodetik benturan.
            </div>
          </div>
        );

      // ================= 12. INTERMEDIATE: MATCHPLAY TACTICS =================
      case 'i_w6_matchplay_tactics':
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Geometri Lapangan: Keunggulan 70% Crosscourt
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Taktik Pintar
              </span>
            </div>

            <svg viewBox="0 0 460 250" className="w-full max-w-lg h-auto drop-shadow-md">
              {/* Tennis Court Top-down View */}
              <rect x="70" y="20" width="320" height="200" rx="6" fill="#064E3B" stroke="#FFFFFF" strokeWidth="2.5" />
              {/* Service boxes */}
              <rect x="120" y="60" width="220" height="120" fill="#047857" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="230" y1="60" x2="230" y2="180" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Net in center */}
              <line x1="50" y1="120" x2="410" y2="120" stroke="#CCFF00" strokeWidth="3" />
              <text x="415" y="124" fill="#CCFF00" fontSize="9" fontWeight="bold">NET (91 cm di tengah)</text>

              {/* Green Safe Crosscourt Line */}
              <line x1="100" y1="205" x2="330" y2="35" stroke="#10B981" strokeWidth="4" strokeDasharray="5,5" />
              <rect x="235" y="130" width="145" height="22" rx="4" fill="#0A192F" stroke="#10B981" strokeWidth="1" />
              <text x="307" y="145" fill="#34D399" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                ✓ Crosscourt: +1.3m Lebih Panjang
              </text>

              {/* Red Risky Down-the-line Line */}
              <line x1="100" y1="205" x2="100" y2="35" stroke="#EF4444" strokeWidth="3" strokeDasharray="3,3" />
              <rect x="75" y="70" width="105" height="22" rx="4" fill="#0A192F" stroke="#EF4444" strokeWidth="1" />
              <text x="127" y="85" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle">
                ⚠ DTL: Net Lebih Tinggi +15cm
              </text>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              <strong className="text-tennis-yellow block mb-1">Formula 70% Pelatih PTR:</strong>
              Pemain pintar mengarahkan 70% bola secara silang (*crosscourt*) karena net 15 cm lebih rendah di tengah dan lapangan memiliki diagonal 1.3 meter lebih panjang daripada garis lurus pinggir (*down-the-line*).
            </div>
          </div>
        );

      // ================= DEFAULT TENNIS KINETIC CHAIN =================
      default:
        return (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold text-tennis-yellow uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tennis-yellow"></span>
                Aliran Rantai Kinetik Tenis Modern
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Kinetic Link
              </span>
            </div>

            <svg viewBox="0 0 460 180" className="w-full max-w-lg h-auto drop-shadow-md">
              <line x1="40" y1="90" x2="420" y2="90" stroke="#334155" strokeWidth="3" strokeDasharray="3,3" />

              {/* Foot (Ground Force) */}
              <g transform="translate(50, 50)">
                <circle cx="20" cy="40" r="20" fill="#1E293B" stroke="#CCFF00" strokeWidth="2.5" />
                <text x="20" y="44" fill="#CCFF00" fontSize="11" fontWeight="bold" textAnchor="middle">Kaki</text>
                <text x="20" y="75" fill="#94A3B8" fontSize="9" textAnchor="middle">Daya Tanah</text>
              </g>

              {/* Hips (Rotation) */}
              <g transform="translate(150, 50)">
                <circle cx="20" cy="40" r="20" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
                <text x="20" y="44" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">Panggul</text>
                <text x="20" y="75" fill="#94A3B8" fontSize="9" textAnchor="middle">Rotasi 45°</text>
              </g>

              {/* Chest / Torso */}
              <g transform="translate(250, 50)">
                <circle cx="20" cy="40" r="20" fill="#1E293B" stroke="#F59E0B" strokeWidth="2.5" />
                <text x="20" y="44" fill="#F59E0B" fontSize="11" fontWeight="bold" textAnchor="middle">Dada</text>
                <text x="20" y="75" fill="#94A3B8" fontSize="9" textAnchor="middle">Uncoiling 90°</text>
              </g>

              {/* Racket Head Speed */}
              <g transform="translate(350, 50)">
                <circle cx="20" cy="40" r="22" fill="#0A192F" stroke="#CCFF00" strokeWidth="3" />
                <text x="20" y="45" fill="#CCFF00" fontSize="12" fontWeight="extrabold" textAnchor="middle">Raket</text>
                <text x="20" y="75" fill="#CCFF00" fontSize="9" fontWeight="bold" textAnchor="middle">Ledakan Tenaga</text>
              </g>
            </svg>

            <div className="w-full bg-[#0D1525] border border-slate-700/80 rounded-xl p-3 text-left mt-2 text-xs text-slate-300">
              Energi ditransfer secara berantai: Dorongan tanah dari kaki $\rightarrow$ rotasi panggul $\rightarrow$ putaran dada $\rightarrow$ lengan sebagai cambuk $\rightarrow$ kepala raket meluncur bebas menembus bola.
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#060D18] border border-slate-700/80 rounded-2xl p-3.5 my-2.5 relative transition-all shadow-xl">
      {/* Zoom / Fullscreen Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-3 right-3 p-1.5 bg-slate-800/90 hover:bg-tennis-yellow hover:text-tennis-dark text-slate-300 rounded-lg text-xs transition-all z-10 flex items-center gap-1 shadow"
        title="Perbesar Diagram"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>

      {/* Render Main Content */}
      {renderContent(false)}

      {/* Lightbox / Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B1322] border border-slate-700 rounded-2xl p-5 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mt-2">
              {renderContent(true)}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-tennis-yellow hover:text-tennis-dark text-white text-xs font-bold rounded-xl transition-all"
              >
                Tutup Tampilan Penuh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

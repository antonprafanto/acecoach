import React from 'react';

interface LessonIllustrationProps {
  lessonId: string;
}

export const LessonIllustration: React.FC<LessonIllustrationProps> = ({ lessonId }) => {

  switch (lessonId) {
    // ================= 1. OCTAGONAL GRIP BEVELS =================
    case 'b_w1_grip':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Visual Bevel Raket (Tampak Bawah Butt-Cap)
          </span>
          <svg viewBox="0 0 220 180" className="w-52 h-40">
            {/* Octagonal Handle */}
            <polygon
              points="85,30 135,30 170,65 170,115 135,150 85,150 50,115 50,65"
              fill="#1E293B"
              stroke="#64748B"
              strokeWidth="2.5"
            />
            {/* Bevel 1: Top */}
            <line x1="85" y1="30" x2="135" y2="30" stroke="#94A3B8" strokeWidth="4" />
            <text x="110" y="24" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">1 (Atas)</text>

            {/* Bevel 2: Continental (Highlighted in Optic Yellow) */}
            <line x1="135" y1="30" x2="170" y2="65" stroke="#CCFF00" strokeWidth="6" strokeLinecap="round" />
            <text x="175" y="45" fill="#CCFF00" fontSize="10" fontWeight="extrabold">2 (Continental)</text>

            {/* Bevel 3: Eastern */}
            <line x1="170" y1="65" x2="170" y2="115" stroke="#38BDF8" strokeWidth="5" />
            <text x="180" y="94" fill="#38BDF8" fontSize="10" fontWeight="bold">3 (Eastern)</text>

            {/* Bevel 4: Semi-Western */}
            <line x1="170" y1="115" x2="135" y2="150" stroke="#F59E0B" strokeWidth="5" />
            <text x="175" y="142" fill="#F59E0B" fontSize="10" fontWeight="bold">4 (Semi-Western)</text>

            {/* Other bevels */}
            <text x="110" y="165" fill="#64748B" fontSize="9" textAnchor="middle">5 (Bawah)</text>
            <text x="35" y="142" fill="#64748B" fontSize="9">6</text>
            <text x="30" y="94" fill="#64748B" fontSize="9">7</text>
            <text x="35" y="45" fill="#64748B" fontSize="9">8</text>

            {/* Center Axis */}
            <circle cx="110" cy="90" r="4" fill="#CCFF00" />
            <text x="110" y="108" fill="#CBD5E1" fontSize="9" textAnchor="middle">Base Knuckle Index</text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Pangkal jari telunjuk di <strong className="text-tennis-yellow">Bevel 2</strong> untuk Servis/Volley, atau <strong className="text-amber-400">Bevel 4</strong> untuk Forehand modern.
          </span>
        </div>
      );

    // ================= 2. CONTACT POINT IN FRONT =================
    case 'b_w1_contact_point':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Geometri Titik Bentur (Tampak Samping & Depan)
          </span>
          <svg viewBox="0 0 240 150" className="w-56 h-36">
            {/* Player Body */}
            <circle cx="60" cy="40" r="14" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="60" y1="54" x2="60" y2="105" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            <line x1="60" y1="105" x2="50" y2="140" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="105" x2="75" y2="140" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />

            {/* Arm Extended Out Front */}
            <path d="M 60 65 L 105 70 L 140 65" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />

            {/* Racket Head at Contact */}
            <line x1="140" y1="65" x2="160" y2="65" stroke="#CCFF00" strokeWidth="3" />
            <ellipse cx="160" cy="65" rx="7" ry="24" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />

            {/* Tennis Ball */}
            <circle cx="168" cy="65" r="7" fill="#CCFF00" stroke="#A3CC00" strokeWidth="1.5" />

            {/* Distance Marker */}
            <line x1="75" y1="110" x2="160" y2="110" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="118" y="125" fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">
              30 - 45 cm Di Depan
            </text>

            {/* Danger Zone Behind Body */}
            <rect x="10" y="50" width="35" height="35" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" strokeDasharray="2,2" />
            <text x="27" y="72" fill="#EF4444" fontSize="8" fontWeight="bold" textAnchor="middle">BAHAYA</text>
            <text x="27" y="80" fill="#EF4444" fontSize="7" textAnchor="middle">Siku Sakit</text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Pukul bola <strong className="text-tennis-yellow">selalu di depan kaki tumpuan</strong>. Hindari memukul terlambat sejajar pinggang.
          </span>
        </div>
      );

    // ================= 3. SPLIT-STEP TIMING =================
    case 'b_w2_split_step':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Dinamika Split-Step (Pegas Elastis Betis)
          </span>
          <svg viewBox="0 0 240 140" className="w-56 h-34">
            {/* Ready Position (Left) */}
            <g transform="translate(25, 10)">
              <circle cx="20" cy="20" r="10" fill="#334155" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="20" y1="30" x2="20" y2="65" stroke="#1E293B" strokeWidth="4" />
              <line x1="20" y1="65" x2="12" y2="95" stroke="#475569" strokeWidth="3" />
              <line x1="20" y1="65" x2="28" y2="95" stroke="#475569" strokeWidth="3" />
              <text x="20" y="112" fill="#94A3B8" fontSize="8" textAnchor="middle">1. Siap</text>
            </g>

            {/* Arrow */}
            <path d="M 65 55 L 85 55" stroke="#64748B" strokeWidth="2" strokeDasharray="2,2" />

            {/* Split Hop in Air (Middle) */}
            <g transform="translate(95, 5)">
              <circle cx="20" cy="18" r="10" fill="#334155" stroke="#CCFF00" strokeWidth="2" />
              <line x1="20" y1="28" x2="20" y2="60" stroke="#1E293B" strokeWidth="4" />
              <line x1="20" y1="60" x2="6" y2="85" stroke="#CCFF00" strokeWidth="3" />
              <line x1="20" y1="60" x2="34" y2="85" stroke="#CCFF00" strokeWidth="3" />
              {/* Spring lines */}
              <path d="M 6 92 Q 10 88 6 85" fill="none" stroke="#CCFF00" strokeWidth="1.5" />
              <path d="M 34 92 Q 38 88 34 85" fill="none" stroke="#CCFF00" strokeWidth="1.5" />
              <text x="20" y="117" fill="#CCFF00" fontSize="9" fontWeight="bold" textAnchor="middle">2. Split Hop!</text>
            </g>

            {/* Arrow */}
            <path d="M 145 55 L 165 55" stroke="#64748B" strokeWidth="2" strokeDasharray="2,2" />

            {/* Explode to Ball (Right) */}
            <g transform="translate(170, 10)">
              <circle cx="20" cy="20" r="10" fill="#334155" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="20" y1="30" x2="28" y2="65" stroke="#1E293B" strokeWidth="4" />
              <line x1="28" y1="65" x2="10" y2="95" stroke="#38BDF8" strokeWidth="3" />
              <line x1="28" y1="65" x2="40" y2="90" stroke="#38BDF8" strokeWidth="3" />
              <text x="25" y="112" fill="#38BDF8" fontSize="8" textAnchor="middle">3. Reaksi Cepat</text>
            </g>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Melompat kecil 0.1 detik <strong className="text-tennis-yellow">sebelum raket lawan mengenai bola</strong>.
          </span>
        </div>
      );

    // ================= 4. UNIT TURN ROTATION =================
    case 'b_w2_unit_turn':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Rotasi Unit Turn (Bahu 90° Menghadap Samping)
          </span>
          <svg viewBox="0 0 200 140" className="w-52 h-34">
            {/* Torso Top View */}
            <ellipse cx="100" cy="70" rx="35" ry="18" fill="#1E293B" stroke="#CCFF00" strokeWidth="2.5" />
            <circle cx="100" cy="40" r="14" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
            {/* Non-dominant hand guiding throat */}
            <path d="M 70 70 Q 95 95 130 85" fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
            {/* Dominant arm */}
            <path d="M 130 70 Q 145 65 155 45" fill="none" stroke="#CCFF00" strokeWidth="3.5" strokeLinecap="round" />
            {/* Racket */}
            <ellipse cx="160" cy="35" rx="12" ry="18" transform="rotate(25 160 35)" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2" />
            {/* Coiling Arc */}
            <path d="M 60 45 A 35 35 0 0 1 130 25" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="120" fill="#CBD5E1" fontSize="10" textAnchor="middle">
              Bahu 90° • Tangan Kiri di Leher Raket
            </text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Putar bahu satu kesatuan, simpan tenaga pegas pada otot punggung dan pinggul.
          </span>
        </div>
      );

    // ================= 5. FOREHAND RACKET DROP =================
    case 'b_w3_forehand_drop':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Lintasan Low-To-High & Racket Drop
          </span>
          <svg viewBox="0 0 220 140" className="w-52 h-34">
            {/* Ball Incoming Line */}
            <line x1="20" y1="65" x2="150" y2="65" stroke="#64748B" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx="150" cy="65" r="6" fill="#CCFF00" />

            {/* Racket Drop Position (Low) */}
            <ellipse cx="60" cy="105" rx="15" ry="9" fill="rgba(204,255,0,0.15)" stroke="#64748B" strokeWidth="2" />
            <text x="60" y="125" fill="#64748B" fontSize="8" textAnchor="middle">1. Drop (Rendah)</text>

            {/* Contact Position */}
            <ellipse cx="140" cy="65" rx="7" ry="20" fill="rgba(204,255,0,0.3)" stroke="#CCFF00" strokeWidth="2.5" />
            <text x="140" y="38" fill="#CCFF00" fontSize="9" fontWeight="bold" textAnchor="middle">2. Contact</text>

            {/* Follow-Through (High) */}
            <ellipse cx="190" cy="40" rx="14" ry="9" transform="rotate(-30 190 40)" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" strokeWidth="2" />
            <text x="190" y="24" fill="#38BDF8" fontSize="8" textAnchor="middle">3. Finish (Tinggi)</text>

            {/* Upward Curved Arrow (Low-to-High) */}
            <path d="M 60 100 Q 110 90 140 65 Q 165 45 185 40" fill="none" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Kepala raket turun <strong className="text-tennis-yellow">di bawah lintasan bola</strong>, lalu menyapu ke atas menghasilkan topspin.
          </span>
        </div>
      );

    // ================= 6. BACKHAND FOUNDATION =================
    case 'b_w3_backhand_foundation':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Fondasi Backhand 2 Tangan (2HBH Driver)
          </span>
          <svg viewBox="0 0 220 140" className="w-52 h-34">
            {/* Player Body Torso */}
            <ellipse cx="80" cy="70" rx="30" ry="16" fill="#1E293B" stroke="#60A5FA" strokeWidth="2" />
            <circle cx="80" cy="40" r="13" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
            {/* Dominant Hand (Bottom) */}
            <path d="M 70 75 L 110 85" fill="none" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
            {/* Non-Dominant Hand (Top Driver - Main Power) */}
            <path d="M 95 70 L 125 80" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
            {/* Handle & Racket */}
            <line x1="110" y1="85" x2="135" y2="80" stroke="#CCFF00" strokeWidth="4" />
            <ellipse cx="160" cy="75" rx="7" ry="22" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />
            {/* Ball */}
            <circle cx="168" cy="75" r="7" fill="#CCFF00" />
            <text x="135" y="115" fill="#CCFF00" fontSize="9" fontWeight="bold" textAnchor="middle">
              Tangan Kiri Menyetir (Forehand Kiri)
            </text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Tangan non-dominan berfungsi sebagai pendorong utama; tangan kanan hanya menstabilkan.
          </span>
        </div>
      );

    // ================= 7. SERVE TROPHY POSE =================
    case 'b_w4_serve_trophy':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Postur Trophy Pose (Standar USPTA)
          </span>
          <svg viewBox="0 0 200 160" className="w-48 h-38">
            {/* Player Silhouette */}
            <circle cx="85" cy="55" r="12" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="85" y1="67" x2="80" y2="115" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />

            {/* Knee Flex */}
            <polyline points="80,115 70,135 85,155" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
            <polyline points="80,115 90,135 85,155" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />

            {/* Toss Arm (Straight Up to 1 o'clock) */}
            <line x1="85" y1="75" x2="125" y2="25" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="127" cy="22" r="6" fill="#CCFF00" stroke="#A3CC00" strokeWidth="1.5" />
            <text x="145" y="24" fill="#38BDF8" fontSize="8" fontWeight="bold">Toss (Jam 1)</text>

            {/* Hitting Arm (L-Shape 90 deg) */}
            <polyline points="85,75 55,75 55,45" fill="none" stroke="#CCFF00" strokeWidth="3.5" strokeLinecap="round" />
            {/* Racket Pointing Up */}
            <line x1="55" y1="45" x2="55" y2="15" stroke="#CCFF00" strokeWidth="3" />
            <ellipse cx="55" cy="10" rx="9" ry="12" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2" />
            <text x="40" y="80" fill="#CCFF00" fontSize="8" textAnchor="end">Siku Sejajar Bahu</text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Siku 90° sejajar garis bahu, toss lurus di jam 1, lutut ditekuk menyimpan daya dorong.
          </span>
        </div>
      );

    // ================= 8. PUNCH VOLLEY & BLOCK =================
    case 'b_w4_punch_volley':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Mekanika Volley (Racket Head Above Wrist)
          </span>
          <svg viewBox="0 0 220 140" className="w-52 h-34">
            {/* Player Profile */}
            <circle cx="50" cy="40" r="12" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="50" y1="52" x2="50" y2="95" stroke="#1E293B" strokeWidth="5" />
            <line x1="50" y1="95" x2="75" y2="135" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />

            {/* Arm forward */}
            <path d="M 50 62 L 95 68 L 125 55" fill="none" stroke="#60A5FA" strokeWidth="3.5" strokeLinecap="round" />

            {/* Racket Head Standing Up (Above Wrist) */}
            <line x1="125" y1="55" x2="135" y2="35" stroke="#CCFF00" strokeWidth="3" />
            <ellipse cx="140" cy="22" rx="8" ry="18" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />
            {/* Ball */}
            <circle cx="148" cy="22" r="6" fill="#CCFF00" />

            {/* No backswing warning */}
            <path d="M 30 50 L 15 50" stroke="#EF4444" strokeWidth="2" strokeDasharray="2,2" />
            <text x="22" y="44" fill="#EF4444" fontSize="8" fontWeight="bold" textAnchor="middle">NO SWING</text>

            <text x="135" y="80" fill="#CCFF00" fontSize="9" fontWeight="bold" textAnchor="middle">
              Kepala Raket di Atas Pergelangan
            </text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Kunci pergelangan tangan tetap tegak. Jangan lakukan ayunan belakang; cukup dorong pendek (punch).
          </span>
        </div>
      );

    // ================= 9. INTERMEDIATE: OPEN STANCE FOREHAND =================
    case 'i_w1_open_stance_forehand':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Loading Kaki Luar (Ground Reaction Force)
          </span>
          <svg viewBox="0 0 220 150" className="w-52 h-36">
            {/* Ground */}
            <line x1="20" y1="135" x2="200" y2="135" stroke="#334155" strokeWidth="2" />

            {/* Player Open Stance - Deep Bend on Outside Leg */}
            <circle cx="110" cy="35" r="12" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="110" y1="47" x2="105" y2="85" stroke="#1E293B" strokeWidth="5" />

            {/* Outside Leg Loaded (Right leg) */}
            <polyline points="105,85 145,105 140,135" fill="none" stroke="#CCFF00" strokeWidth="5" strokeLinecap="round" />
            {/* Inside Leg (Left leg) */}
            <polyline points="105,85 70,110 65,135" fill="none" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />

            {/* Upward Energy Arrows from Loaded Foot */}
            <path d="M 140 130 L 140 90" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="3,3" />
            <text x="165" y="110" fill="#F59E0B" fontSize="9" fontWeight="bold">80% Beban</text>
            <text x="110" y="145" fill="#CBD5E1" fontSize="9" textAnchor="middle">
              Lutut Ditekuk & Ledakkan ke Atas
            </text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Kaki luar menahan 80% berat badan; dorong tanah ke atas untuk memutar panggul secara eksplosif.
          </span>
        </div>
      );

    // ================= 10. INTERMEDIATE: RACKET LAG & SNAP =================
    case 'i_w2_racket_lag_snap':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Efek Cambuk Racket Lag (Butt-Cap Leading)
          </span>
          <svg viewBox="0 0 220 140" className="w-52 h-34">
            {/* Player Arm Forward */}
            <path d="M 40 70 L 95 65 L 125 55" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
            {/* Butt cap leading forward */}
            <circle cx="125" cy="55" r="4" fill="#CCFF00" />
            <line x1="125" y1="55" x2="160" y2="80" stroke="#CCFF00" strokeWidth="4" />
            {/* Racket Head Lagging Behind */}
            <ellipse cx="180" cy="95" rx="8" ry="18" transform="rotate(35 180 95)" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />
            
            {/* Dynamic Whip Arrow */}
            <path d="M 125 45 Q 160 35 185 65" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3,3" />
            <text x="135" y="32" fill="#F59E0B" fontSize="9" fontWeight="bold">Lag 60° (Loose Wrist)</text>
            <text x="75" y="115" fill="#CBD5E1" fontSize="9">
              Butt-cap mengarah ke bola lebih dulu
            </text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Pergelangan tangan rileks (kekencangan 3/10) agar kepala raket tertinggal (lag) lalu mencambuk bola.
          </span>
        </div>
      );

    // ================= 11. INTERMEDIATE: SERVE PRONATION =================
    case 'i_w4_serve_pronation':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Pronasi Lengan Bawah (Rotasi Internal 90°)
          </span>
          <svg viewBox="0 0 220 150" className="w-52 h-36">
            {/* Extended Arm Straight Up */}
            <line x1="90" y1="130" x2="110" y2="60" stroke="#60A5FA" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="110" y1="60" x2="118" y2="30" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />

            {/* Racket Contact Edge-to-Face */}
            <ellipse cx="122" cy="18" rx="6" ry="16" transform="rotate(20 122 18)" fill="rgba(204,255,0,0.25)" stroke="#CCFF00" strokeWidth="2.5" />

            {/* Pronation Rotation Arc (Outward) */}
            <path d="M 125 50 A 18 18 0 0 1 145 65" fill="none" stroke="#F59E0B" strokeWidth="3" />
            <text x="160" y="60" fill="#F59E0B" fontSize="9" fontWeight="bold">Pronasi Keluar</text>
            <text x="110" y="145" fill="#CBD5E1" fontSize="9" textAnchor="middle">
              Tepi raket membelah angin, lalu memutar keluar
            </text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Rotasi internal bahu dan pronasi memutar permukaan senar menghadap target tepat sebelum kontak.
          </span>
        </div>
      );

    // ================= 12. INTERMEDIATE: COURT GEOMETRY TACTICS =================
    case 'i_w6_matchplay_tactics':
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Geometri Lapangan: Crosscourt vs Down-The-Line
          </span>
          <svg viewBox="0 0 220 140" className="w-56 h-36">
            {/* Court Rectangle */}
            <rect x="40" y="15" width="140" height="110" fill="#0D2818" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Net Line (Center) */}
            <line x1="30" y1="70" x2="190" y2="70" stroke="#CCFF00" strokeWidth="2.5" />
            <text x="25" y="73" fill="#CCFF00" fontSize="7" textAnchor="end">NET (91cm di tengah)</text>

            {/* Safe Crosscourt Path (Green) */}
            <line x1="50" y1="120" x2="170" y2="20" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3,3" />
            <text x="135" y="45" fill="#10B981" fontSize="8" fontWeight="bold">Crosscourt: +1.3m Panjang</text>

            {/* Risky Down-the-line Path (Red) */}
            <line x1="50" y1="120" x2="50" y2="20" stroke="#EF4444" strokeWidth="2" strokeDasharray="2,2" />
            <text x="55" y="95" fill="#EF4444" fontSize="7">DTL: Net +15cm</text>
          </svg>
          <span className="text-[10px] text-slate-400 text-center mt-1">
            Pukul 70% silang (crosscourt) karena net lebih rendah 15 cm di tengah dan jarak lapangan lebih panjang 1.3 meter.
          </span>
        </div>
      );

    // ================= DEFAULT TENNIS KINETIC LINK =================
    default:
      return (
        <div className="bg-[#070D18] border border-slate-700/80 rounded-xl p-3 flex flex-col items-center justify-center my-2 text-center">
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider mb-1">
            Aliran Rantai Kinetik (Kinetic Chain Link)
          </span>
          <svg viewBox="0 0 220 60" className="w-52 h-16">
            <line x1="20" y1="30" x2="200" y2="30" stroke="#334155" strokeWidth="2" strokeDasharray="2,2" />
            <circle cx="30" cy="30" r="12" fill="#CCFF00" />
            <text x="30" y="34" fill="#0A192F" fontSize="9" fontWeight="bold" textAnchor="middle">Kaki</text>

            <path d="M 45 30 L 65 30" stroke="#CCFF00" strokeWidth="2" />
            <circle cx="80" cy="30" r="12" fill="#38BDF8" />
            <text x="80" y="34" fill="#0A192F" fontSize="9" fontWeight="bold" textAnchor="middle">Pinggul</text>

            <path d="M 95 30 L 115 30" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="130" cy="30" r="12" fill="#F59E0B" />
            <text x="130" y="34" fill="#0A192F" fontSize="9" fontWeight="bold" textAnchor="middle">Bahu</text>

            <path d="M 145 30 L 165 30" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="180" cy="30" r="12" fill="#CCFF00" />
            <text x="180" y="34" fill="#0A192F" fontSize="9" fontWeight="bold" textAnchor="middle">Raket</text>
          </svg>
          <span className="text-[10px] text-slate-400 mt-1">
            Energi mengalir berurutan: Kaki → Pinggul → Bahu → Lengan → Kepala Raket.
          </span>
        </div>
      );
  }
};

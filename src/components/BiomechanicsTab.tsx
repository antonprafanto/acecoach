import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  CameraOff,
  Eye,
  Zap,
  RotateCw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  X
} from 'lucide-react';
import { BIOMECHANICS_PHASES } from '../data/biomechanicsData';
import { UserProfile, BiomechanicsPhase } from '../types';

interface BiomechanicsTabProps {
  profile: UserProfile;
}

export const BiomechanicsTab: React.FC<BiomechanicsTabProps> = ({ profile }) => {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0);
  const [showMythComparison, setShowMythComparison] = useState<boolean>(true);

  // Camera Mirror State
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const activePhase = BIOMECHANICS_PHASES[selectedPhaseIndex];

  const startCamera = async () => {
    setCameraError(null);
    try {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
      } catch {
        // Fallback for laptops/webcams where facingMode 'user' might not be supported
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      streamRef.current = stream;
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((err) => console.warn('Camera play warning:', err));
      }
    } catch (err: any) {
      console.warn('Camera error:', err);
      setCameraError('Izin kamera ditolak atau kamera tidak terdeteksi pada perangkat ini. Pastikan izin kamera telah diizinkan di browser.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Sync stream to video element whenever camera is toggled or element mounts
  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((err) => console.warn('Video autoPlay warning:', err));
    }
  }, [isCameraActive]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const [isPhaseZoomed, setIsPhaseZoomed] = useState<boolean>(false);
  const [phaseImageErrors, setPhaseImageErrors] = useState<Record<number, boolean>>({});

  const phaseImage = {
    0: {
      src: './illustrations/biomechanics_phase_1_unit_turn.jpg',
      title: 'Fase 1: Unit Turn & Coiling',
      caption: 'Bahu Berputar 90° • Pinggul 45°'
    },
    1: {
      src: './illustrations/biomechanics_phase_2_drop_lag.jpg',
      title: 'Fase 2: The Drop & Racket Lag',
      caption: 'Racket Head di Bawah Bola • Lag 90°'
    },
    2: {
      src: './illustrations/biomechanics_phase_3_contact.jpg',
      title: 'Fase 3: The Contact Point',
      caption: 'Titik Bentur 30–45 cm di Depan Pinggul'
    },
    3: {
      src: './illustrations/biomechanics_phase_4_finish.jpg',
      title: 'Fase 4: Extension & Wiper Finish',
      caption: 'Windshield Wiper Finish • Siku Setinggi Bahu'
    }
  }[selectedPhaseIndex];

  // Visual 3D Biomechanics Diagram with SVG Fallback
  const renderPhaseKinematicDiagram = () => {
    const hasImage = phaseImage && !phaseImageErrors[selectedPhaseIndex];

    return (
      <div className="bg-tennis-navy/70 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
        <div className="w-full flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-700/80">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-tennis-yellow shrink-0" />
            <span className="text-[11px] font-bold text-tennis-yellow tracking-wide">
              {phaseImage ? `${phaseImage.title}: ${phaseImage.caption}` : 'Diagram Kinematik 4-Fase'}
            </span>
          </div>
          {hasImage && (
            <button
              onClick={() => setIsPhaseZoomed(true)}
              className="p-1 rounded-md bg-slate-800/80 text-slate-300 hover:text-tennis-yellow hover:bg-slate-700 transition-colors flex items-center gap-1 text-[10px] px-2"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Zoom</span>
            </button>
          )}
        </div>

        {hasImage ? (
          <div
            onClick={() => setIsPhaseZoomed(true)}
            className="relative w-full max-w-lg aspect-video rounded-xl overflow-hidden cursor-pointer group bg-black/40 border border-slate-800 flex items-center justify-center"
          >
            <img
              src={phaseImage.src}
              alt={phaseImage.title}
              onError={() =>
                setPhaseImageErrors((prev) => ({ ...prev, [selectedPhaseIndex]: true }))
              }
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
              <span className="text-[11px] bg-tennis-dark/90 border border-tennis-yellow/50 text-tennis-yellow px-2.5 py-1 rounded-full font-semibold shadow flex items-center gap-1">
                <Maximize2 className="w-3 h-3" /> Klik untuk memperbesar
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[240px] aspect-[4/3] flex items-center justify-center">
            {selectedPhaseIndex === 0 && (
              // Phase 1: Unit Turn (Shoulder 90, Hip 45)
              <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow">
                <ellipse cx="100" cy="80" rx="35" ry="18" fill="#1E293B" stroke="#CCFF00" strokeWidth="2.5" />
                <circle cx="100" cy="50" r="16" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
                <path d="M 70 80 Q 95 105 130 95" fill="none" stroke="#60A5FA" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 130 80 Q 145 75 160 55" fill="none" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="165" cy="45" rx="14" ry="22" transform="rotate(30 165 45)" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />
                <path d="M 55 55 A 40 40 0 0 1 125 35" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3,3" markerEnd="url(#arrow)" />
                <text x="100" y="145" fill="#94A3B8" fontSize="10" textAnchor="middle">Bahu Berputar 90° • Pinggul 45°</text>
              </svg>
            )}

            {selectedPhaseIndex === 1 && (
              // Phase 2: The Drop & Lag (Racket below ball, 90 deg angle)
              <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow">
                <circle cx="80" cy="45" r="15" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="80" y1="60" x2="80" y2="110" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
                <path d="M 80 75 L 115 85 L 120 115" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
                <line x1="120" y1="115" x2="160" y2="125" stroke="#CCFF00" strokeWidth="3.5" />
                <ellipse cx="170" cy="128" rx="18" ry="12" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />
                <path d="M 125 95 Q 135 105 130 118" fill="none" stroke="#F43F5E" strokeWidth="2" strokeDasharray="2,2" />
                <text x="140" y="105" fill="#F43F5E" fontSize="9" fontWeight="bold">Lag 90°</text>
                <text x="100" y="150" fill="#94A3B8" fontSize="10" textAnchor="middle">Racket Head di Bawah Bola</text>
              </svg>
            )}

            {selectedPhaseIndex === 2 && (
              // Phase 3: Contact Point (In Front of Body)
              <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow">
                <circle cx="70" cy="45" r="15" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="70" y1="60" x2="70" y2="115" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
                <path d="M 70 70 L 110 75 L 135 70" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
                <line x1="135" y1="70" x2="150" y2="70" stroke="#CCFF00" strokeWidth="3.5" />
                <ellipse cx="150" cy="70" rx="8" ry="24" fill="rgba(204,255,0,0.25)" stroke="#CCFF00" strokeWidth="2.5" />
                <circle cx="158" cy="70" r="7" fill="#CCFF00" stroke="#A3CC00" strokeWidth="1.5" />
                <line x1="70" y1="125" x2="150" y2="125" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="110" y="140" fill="#F59E0B" fontSize="9" fontWeight="bold" textAnchor="middle">35 cm di Depan Pinggul</text>
              </svg>
            )}

            {selectedPhaseIndex === 3 && (
              // Phase 4: Follow-Through & Wiper Finish
              <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow">
                <circle cx="100" cy="45" r="15" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="100" y1="60" x2="100" y2="115" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
                <path d="M 100 70 L 125 60 L 85 55" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="65" cy="55" rx="14" ry="22" transform="rotate(-40 65 55)" fill="rgba(204,255,0,0.2)" stroke="#CCFF00" strokeWidth="2.5" />
                <path d="M 140 100 Q 155 50 75 40" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3,3" />
                <text x="100" y="148" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">Windshield Wiper Finish • Siku Tinggi</text>
              </svg>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider block">
            Anatomi Biomekanik Modern
          </span>
          <h2 className="text-lg font-bold text-white">
            Membedah Rantai Kinetik Modern
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs bg-tennis-navy border border-slate-700 px-2.5 py-1 rounded-lg text-slate-300 font-semibold">
            Universal Standard
          </span>
        </div>
      </div>

      {/* 4-Phase Step Tabs */}
      <div className="grid grid-cols-4 gap-1.5 bg-tennis-navy/60 p-1.5 rounded-xl border border-slate-800">
        {BIOMECHANICS_PHASES.map((phase, idx) => (
          <button
            key={phase.id}
            onClick={() => setSelectedPhaseIndex(idx)}
            className={`py-2 px-1 text-center rounded-lg transition-all ${
              selectedPhaseIndex === idx
                ? 'bg-tennis-yellow text-tennis-dark font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-[10px] block opacity-80">Fase {idx + 1}</span>
            <span className="text-xs font-semibold truncate block">
              {idx === 0 ? 'Unit Turn' : idx === 1 ? 'Drop & Lag' : idx === 2 ? 'Contact' : 'Finish'}
            </span>
          </button>
        ))}
      </div>

      {/* Interactive Visual Kinematic SVG Diagram */}
      {renderPhaseKinematicDiagram()}

      {/* Checkpoint Detail Card */}
      <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-tennis-yellow font-bold uppercase tracking-wider">
              {activePhase.angleTarget}
            </span>
            <h3 className="text-xl font-bold text-white">{activePhase.title}</h3>
          </div>
          <span className="text-xs bg-tennis-surfaceLight px-2.5 py-1 rounded-lg text-slate-300 border border-slate-700">
            {activePhase.name}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{activePhase.description}</p>

        {/* Adaptive Key Cue */}
        <div className="bg-tennis-navy/60 border border-tennis-yellow/30 p-3.5 rounded-xl">
          <span className="text-xs font-bold text-tennis-yellow flex items-center gap-1.5 mb-1">
            <Zap className="w-4 h-4" /> Kunci Tindakan Biomekanik:
          </span>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {activePhase.keyActionRighty}
          </p>
          <p className="text-[10px] text-slate-400 mt-1.5 italic">
            *Catatan: Bagi pemain kidal, gunakan arah dan lengan sebaliknya ({activePhase.keyActionLefty}).
          </p>
        </div>

        {/* Role in Kinetic Chain */}
        <div className="bg-tennis-surfaceLight/40 border border-slate-700/60 p-3 rounded-xl text-xs text-slate-300">
          <strong className="text-white">Peran Dalam Rantai Kinetik:</strong> {activePhase.kineticChainRole}
        </div>

        {/* Myth vs Reality Comparative Box */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-tennis-yellow" />
              Mitos Klasik vs Realita Modern
            </span>
            <button
              onClick={() => setShowMythComparison(!showMythComparison)}
              className="text-[11px] text-tennis-yellow hover:underline"
            >
              {showMythComparison ? 'Sembunyikan' : 'Tampilkan'}
            </button>
          </div>

          {showMythComparison && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-red-950/30 border border-red-900/50 p-3.5 rounded-xl text-red-200">
                <div className="flex items-center gap-1.5 font-bold text-red-400 mb-1">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Mitos Usang (Hindari)</span>
                </div>
                <p className="italic text-[11px]">{activePhase.mythVsModern.myth}</p>
              </div>

              <div className="bg-emerald-950/30 border border-emerald-900/50 p-3.5 rounded-xl text-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Mekanika Modern (Benar)</span>
                </div>
                <p className="text-[11px] font-medium">{activePhase.mythVsModern.reality}</p>
                <p className="text-[10px] text-emerald-400/80 mt-1">
                  <strong>Kenapa Penting:</strong> {activePhase.mythVsModern.whyItMatters}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* In-App Camera Mirror (Feel vs. Real) */}
      <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-tennis-yellow" />
            <div>
              <h3 className="text-base font-bold text-white">In-App Selfie Mirror</h3>
              <p className="text-[11px] text-slate-400">
                Periksa postur nyata vs bayangan perasaan Anda ("Feel vs. Real")
              </p>
            </div>
          </div>

          <button
            onClick={isCameraActive ? stopCamera : startCamera}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isCameraActive
                ? 'bg-red-900/40 border border-red-700 text-red-300'
                : 'bg-tennis-yellow text-tennis-dark font-bold hover:bg-tennis-yellowDark court-glow-yellow'
            }`}
          >
            {isCameraActive ? (
              <>
                <CameraOff className="w-4 h-4" />
                <span>Matikan</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                <span>Buka Cermin</span>
              </>
            )}
          </button>
        </div>

        {cameraError && (
          <div className="p-3 bg-red-950/50 border border-red-900 rounded-xl text-xs text-red-300">
            {cameraError}
          </div>
        )}

        {/* Video Viewport with Overlay */}
        {isCameraActive ? (
          <div className="relative w-full aspect-[4/3] bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-inner">
            <video
              ref={(el) => {
                videoRef.current = el;
                if (el && streamRef.current && el.srcObject !== streamRef.current) {
                  el.srcObject = streamRef.current;
                  el.play().catch((e) => console.warn('Video stream error:', e));
                }
              }}
              onCanPlay={() => {
                if (videoRef.current && videoRef.current.paused) {
                  videoRef.current.play().catch((e) => console.warn(e));
                }
              }}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }} // Mirror flip
            />

            {/* Visual Grid Overlay */}
            {showGridOverlay && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                {/* Vertical Center Axis */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-tennis-yellow/40 border-r border-dashed border-tennis-yellow/60" />
                
                {/* Horizontal Alignment Lines */}
                <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white/20 border-b border-dashed border-white/40">
                  <span className="text-[9px] text-white/60 pl-2">Garis Bahu (Shoulder Level)</span>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-tennis-yellow/30 border-b border-dashed border-tennis-yellow/50">
                  <span className="text-[9px] text-tennis-yellow/70 pl-2">Titik Kontak Ideal (Hip Level)</span>
                </div>
                <div className="absolute bottom-1/4 left-0 right-0 h-0.5 bg-white/20 border-b border-dashed border-white/40">
                  <span className="text-[9px] text-white/60 pl-2">Tekukan Lutut (Knee Bend)</span>
                </div>

                {/* Target Guide Badge */}
                <div className="self-end bg-black/70 backdrop-blur px-2.5 py-1 rounded-md text-[10px] text-tennis-yellow font-bold border border-tennis-yellow/40">
                  Fokus: {activePhase.title}
                </div>
              </div>
            )}

            {/* Overlay Controls */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
              <button
                onClick={() => setShowGridOverlay(!showGridOverlay)}
                className="px-2.5 py-1 rounded bg-black/60 backdrop-blur text-[11px] text-slate-200 border border-slate-700 font-semibold"
              >
                {showGridOverlay ? 'Sembunyikan Garis Bantu' : 'Tampilkan Garis Bantu'}
              </button>
              <span className="text-[10px] text-slate-300 bg-black/60 px-2 py-1 rounded">
                🔒 Privasi 100% On-Device
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-tennis-navy/30 border border-dashed border-slate-800 rounded-2xl p-8 text-center text-slate-400">
            <Camera className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <p className="text-xs max-w-xs mx-auto">
              Klik "Buka Cermin" untuk menyalakan kamera depan HP. Sandarkan ponsel di bangku lapangan untuk memeriksa keselarasan rantai kinetik Anda secara langsung.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Zoom Modal for 3D Phase Image */}
      {isPhaseZoomed && phaseImage && (
        <div
          onClick={() => setIsPhaseZoomed(false)}
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
                  Visual Biomekanik 3D (Syari'at Compliant)
                </span>
                <h4 className="text-sm font-bold text-white">{phaseImage.title}</h4>
              </div>
              <button
                onClick={() => setIsPhaseZoomed(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/60 min-h-[300px]">
              <img
                src={phaseImage.src}
                alt={phaseImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-tennis-surface border-t border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-tennis-yellow block mb-0.5">🎯 Fokus Biomekanik:</span>
              <p className="leading-relaxed">{activePhase.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
  Maximize2
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
  const isLefty = profile.handDominance === 'left';

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.warn('Camera error:', err);
      setCameraError('Izin kamera ditolak atau kamera tidak terdeteksi pada perangkat ini.');
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

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner with Hand Dominance status */}
      <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-tennis-yellow font-bold uppercase tracking-wider block">
            Anatomi Biomekanik Modern
          </span>
          <h2 className="text-lg font-bold text-white">
            Membedah Rantai Kinetik {isLefty ? '(Mode Kidal 🎾)' : '(Right-Handed ✋)'}
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs bg-tennis-navy border border-slate-700 px-2.5 py-1 rounded-lg text-slate-300 font-semibold">
            {isLefty ? 'Perspective Mirrored' : 'Standard Perspective'}
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

        {/* Adaptive Key Cue for Righty vs Lefty */}
        <div className="bg-tennis-navy/60 border border-tennis-yellow/30 p-3.5 rounded-xl">
          <span className="text-xs font-bold text-tennis-yellow flex items-center gap-1.5 mb-1">
            <Zap className="w-4 h-4" /> Kunci Tindakan Biomekanik ({isLefty ? 'Tangan Kiri' : 'Tangan Kanan'}):
          </span>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {isLefty ? activePhase.keyActionLefty : activePhase.keyActionRighty}
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
              ref={videoRef}
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
    </div>
  );
};

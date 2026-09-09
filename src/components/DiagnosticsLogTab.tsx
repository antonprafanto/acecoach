import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Calendar,
  Clock,
  Flame,
  Share2,
  Trash2,
  FileJson,
  Search,
  Zap,
  Heart,
  Coffee,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { FAULT_DIAGNOSTICS } from '../data/diagnosticsData';
import { PracticeLog, UserProfile } from '../types';
import { exportDataJSON, importDataJSON, resetAllData } from '../utils/storage';
import { generateWorkoutBadge } from '../utils/canvasBadge';

interface DiagnosticsLogTabProps {
  profile: UserProfile;
  practiceLogs: PracticeLog[];
  completedLessonsCount: number;
  onAddPracticeLog: (log: PracticeLog) => void;
  onReloadData: () => void;
}

export const DiagnosticsLogTab: React.FC<DiagnosticsLogTabProps> = ({
  profile,
  practiceLogs,
  completedLessonsCount,
  onAddPracticeLog,
  onReloadData,
}) => {
  const [subView, setSubView] = useState<'faults' | 'logs' | 'badge' | 'settings'>('faults');

  // Faults Filter
  const [strokeFilter, setStrokeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Log Form State
  const [logDate, setLogDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [logDuration, setLogDuration] = useState<number>(60);
  const [logContext, setLogContext] = useState<any>('Wall / Dinding');
  const [logFocus, setLogFocus] = useState<any>('Forehand');
  const [logRpe, setLogRpe] = useState<number>(7);
  const [logNotes, setLogNotes] = useState<string>('');

  // Badge Generator State
  const [generatedBadgeUrl, setGeneratedBadgeUrl] = useState<string | null>(null);

  // Safety Reset Modal
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: PracticeLog = {
      id: `log_${Date.now()}`,
      date: logDate,
      durationMinutes: logDuration,
      context: logContext,
      focusStroke: logFocus,
      rpeRating: logRpe,
      notes: logNotes,
    };
    onAddPracticeLog(newLog);
    setLogNotes('');
    alert('Catatan latihan berhasil disimpan ke LocalStorage!');
  };

  const handleGenerateBadge = async (log: PracticeLog) => {
    const url = await generateWorkoutBadge(log, profile, completedLessonsCount);
    setGeneratedBadgeUrl(url);
    setSubView('badge');
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const success = await importDataJSON(file);
      if (success) {
        alert('Data backup berhasil diimpor!');
        onReloadData();
      } else {
        alert('Gagal mengimpor file JSON.');
      }
    }
  };

  const handleExecuteReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    alert('Seluruh data latihan dan progres berhasil direset!');
    onReloadData();
  };

  // Filtered Faults
  const filteredFaults = FAULT_DIAGNOSTICS.filter((item) => {
    if (strokeFilter !== 'All' && item.stroke !== strokeFilter) return false;
    if (
      searchQuery &&
      !item.symptom.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.biomechanicalCause.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Sub-view Navigation Bar */}
      <div className="grid grid-cols-4 bg-tennis-surface p-1 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => setSubView('faults')}
          className={`py-2 text-center rounded-lg font-bold transition-all ${
            subView === 'faults'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🔍 Diagnosa
        </button>
        <button
          onClick={() => setSubView('logs')}
          className={`py-2 text-center rounded-lg font-bold transition-all ${
            subView === 'logs'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📝 Catat Log
        </button>
        <button
          onClick={() => setSubView('badge')}
          className={`py-2 text-center rounded-lg font-bold transition-all ${
            subView === 'badge'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🏆 Kartu Medsos
        </button>
        <button
          onClick={() => setSubView('settings')}
          className={`py-2 text-center rounded-lg font-bold transition-all ${
            subView === 'settings'
              ? 'bg-tennis-yellow text-tennis-dark court-glow-yellow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ⚙️ Backup
        </button>
      </div>

      {/* ================= 1. FAULT TROUBLESHOOTER ================= */}
      {subView === 'faults' && (
        <div className="space-y-4">
          <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-tennis-yellow" />
              <div>
                <h3 className="text-base font-bold text-white">Pemeriksa Kesalahan Mekanik</h3>
                <p className="text-[11px] text-slate-400">
                  Diagnosis mandiri gejala masalah pukulan berdasarkan prinsip biomekanik modern.
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari keluhan (misal: 'out panjang', 'sakit siku', 'centong')..."
                className="w-full bg-tennis-navy/50 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-tennis-yellow"
              />
            </div>

            {/* Stroke Filters */}
            <div className="flex gap-1.5 overflow-x-auto text-[11px]">
              {['All', 'Forehand', 'Backhand', 'Serve', 'General'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStrokeFilter(st)}
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    strokeFilter === st
                      ? 'bg-slate-700 text-white border-slate-500 font-semibold'
                      : 'bg-tennis-navy/40 text-slate-400 border-slate-800'
                  }`}
                >
                  {st === 'All' ? 'Semua Pukulan' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Fault Cards List */}
          <div className="space-y-3">
            {filteredFaults.map((fault) => (
              <div
                key={fault.id}
                className="bg-tennis-surface border border-slate-800 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-tennis-clay shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-tennis-clay uppercase tracking-wider bg-tennis-clay/10 px-2 py-0.5 rounded border border-tennis-clay/20">
                      {fault.stroke}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{fault.symptom}</h4>
                  </div>
                </div>

                <div className="bg-tennis-navy/40 border border-slate-800 p-3 rounded-xl space-y-2 text-xs">
                  <div>
                    <strong className="text-tennis-yellow block mb-0.5">
                      🔬 Analisis Biomekanik:
                    </strong>
                    <p className="text-slate-300">{fault.biomechanicalCause}</p>
                  </div>
                  <div>
                    <strong className="text-red-400 block mb-0.5">
                      ⚠️ Kerusakan Rantai Kinetik:
                    </strong>
                    <p className="text-slate-300">{fault.kineticChainFailure}</p>
                  </div>
                </div>

                {/* Remedy Drill Card */}
                <div className="bg-emerald-950/20 border border-emerald-900/50 p-3 rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">
                      🛠️ Resep Drill: {fault.remedyDrill.title}
                    </span>
                    <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      [{fault.remedyDrill.context}]
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {fault.remedyDrill.instructions.map((inst, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-emerald-400/90 font-semibold pt-1">
                    Reps: {fault.remedyDrill.reps}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 2. PRACTICE LOG ================= */}
      {subView === 'logs' && (
        <div className="space-y-5">
          {/* New Log Form */}
          <form
            onSubmit={handleSaveLog}
            className="bg-tennis-surface border border-slate-800 rounded-2xl p-5 space-y-4"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-tennis-yellow" /> Catat Sesi Latihan Baru
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Tanggal</label>
                <input
                  type="date"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  className="w-full bg-tennis-navy/60 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Durasi (Menit)</label>
                <input
                  type="number"
                  min="10"
                  max="240"
                  value={logDuration}
                  onChange={(e) => setLogDuration(Number(e.target.value))}
                  className="w-full bg-tennis-navy/60 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Konteks Latihan</label>
                <select
                  value={logContext}
                  onChange={(e) => setLogContext(e.target.value)}
                  className="w-full bg-tennis-navy/60 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="Solo Shadow">Solo Shadow</option>
                  <option value="Wall / Dinding">Wall / Dinding</option>
                  <option value="Feeder">Feeder</option>
                  <option value="Live Rally">Live Rally</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Fokus Pukulan</label>
                <select
                  value={logFocus}
                  onChange={(e) => setLogFocus(e.target.value)}
                  className="w-full bg-tennis-navy/60 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="Forehand">Forehand</option>
                  <option value="Backhand">Backhand</option>
                  <option value="Serve">Serve</option>
                  <option value="Volley & Net">Volley & Net</option>
                  <option value="Footwork">Footwork</option>
                  <option value="Matchplay">Matchplay</option>
                </select>
              </div>
            </div>

            {/* RPE Rating */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <label className="text-slate-400 font-semibold">Tingkat Kelelahan (RPE 1-10)</label>
                <span className="font-bold text-tennis-yellow">{logRpe} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={logRpe}
                onChange={(e) => setLogRpe(Number(e.target.value))}
                className="w-full accent-tennis-yellow"
              />
            </div>

            {/* Notes */}
            <div className="text-xs">
              <label className="text-slate-400 block mb-1 font-semibold">
                Catatan Refleksi Mandiri
              </label>
              <textarea
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                placeholder="Contoh: Contact point sudah lebih di depan badan. Lengan rileks dan siku tidak pegal."
                rows={3}
                className="w-full bg-tennis-navy/60 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-tennis-yellow"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[50px] bg-tennis-yellow text-tennis-dark font-bold text-sm rounded-xl hover:bg-tennis-yellowDark transition-colors court-glow-yellow"
            >
              Simpan Catatan Latihan
            </button>
          </form>

          {/* History List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Riwayat Sesi Sebelumnya ({practiceLogs.length})</h4>
            {practiceLogs.length === 0 ? (
              <p className="text-xs text-slate-500 italic">Belum ada catatan latihan tersimpan.</p>
            ) : (
              practiceLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-tennis-surface border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{log.focusStroke}</span>
                    <button
                      onClick={() => handleGenerateBadge(log)}
                      className="text-[11px] bg-tennis-yellow/15 border border-tennis-yellow/40 text-tennis-yellow px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-tennis-yellow/25"
                    >
                      <Share2 className="w-3 h-3" /> Buat Badge
                    </button>
                  </div>

                  <div className="flex gap-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {log.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {log.durationMinutes} Menit
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-tennis-clay" /> RPE: {log.rpeRating}/10
                    </span>
                  </div>

                  {log.notes && (
                    <p className="text-slate-300 italic bg-black/20 p-2 rounded-lg">
                      "{log.notes}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================= 3. SHAREABLE WORKOUT BADGE ================= */}
      {subView === 'badge' && (
        <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-6 text-center space-y-5">
          <div>
            <span className="text-xs text-tennis-yellow font-bold uppercase tracking-wider block">
              HTML5 Canvas Generator
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">Kartu Pencapaian Latihan</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Bagikan badge latihan Anda ke status WhatsApp atau Instagram Stories tanpa backend server!
            </p>
          </div>

          {generatedBadgeUrl ? (
            <div className="space-y-4">
              <img
                src={generatedBadgeUrl}
                alt="AceCoach Workout Badge"
                className="max-w-xs mx-auto rounded-xl border border-slate-700 shadow-2xl"
              />
              <a
                href={generatedBadgeUrl}
                download="acecoach-workout.png"
                className="inline-flex items-center gap-2 px-6 py-3 bg-tennis-yellow text-tennis-dark font-bold text-sm rounded-xl hover:bg-tennis-yellowDark transition-colors court-glow-yellow"
              >
                <Download className="w-4 h-4" /> Unduh Gambar (PNG)
              </a>
            </div>
          ) : (
            <div className="py-8 text-xs text-slate-400">
              <p>Buka tab "Catat Log", lalu klik tombol "Buat Badge" pada salah satu riwayat latihan Anda untuk menghasilkan kartu ini.</p>
            </div>
          )}
        </div>
      )}

      {/* ================= 4. BACKUP & SETTINGS ================= */}
      {subView === 'settings' && (
        <div className="bg-tennis-surface border border-slate-800 rounded-2xl p-5 space-y-5 text-xs">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Manajemen Data & Backup</h3>
            <p className="text-slate-400 text-[11px]">
              Semua data disimpan di peramban lokal perangkat Anda (LocalStorage). Ekspor file cadangan secara berkala agar tidak hilang.
            </p>
          </div>

          <div className="space-y-3">
            {/* Export */}
            <div className="bg-tennis-navy/40 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-white block">Ekspor Data Cadangan (.JSON)</strong>
                <span className="text-[11px] text-slate-400">
                  Unduh seluruh profil, log, dan progres kurikulum.
                </span>
              </div>
              <button
                onClick={exportDataJSON}
                className="px-3 py-2 bg-tennis-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Ekspor
              </button>
            </div>

            {/* Import */}
            <div className="bg-tennis-navy/40 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-white block">Impor File Cadangan (.JSON)</strong>
                <span className="text-[11px] text-slate-400">
                  Pulihkan riwayat latihan dari perangkat lain.
                </span>
              </div>
              <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-4 h-4" /> Impor
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
              </label>
            </div>

            {/* Danger Zone: Reset */}
            <div className="bg-red-950/20 border border-red-900/40 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-red-400 block">Reset Seluruh Progres</strong>
                <span className="text-[11px] text-slate-400">
                  Hapus semua log latihan dan centang kurikulum.
                </span>
              </div>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-3 py-2 bg-red-900/40 hover:bg-red-800 text-red-300 border border-red-700 font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Reset Confirmation Dialog */}
          {showResetConfirm && (
            <div className="p-4 bg-red-950/70 border border-red-700 rounded-xl space-y-3">
              <strong className="text-red-300 block text-sm font-bold">
                ⚠️ Apakah Anda benar-benar yakin ingin mereset semua data?
              </strong>
              <p className="text-slate-300 text-[11px]">
                Tindakan ini tidak dapat dibatalkan. Seluruh riwayat latihan dan progres kurikulum akan dihapus dari peramban ini.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-2 bg-slate-800 text-slate-300 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleExecuteReset}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg font-bold"
                >
                  Ya, Hapus Semua
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Developer Contact & Community Support Card */}
      <div className="bg-gradient-to-br from-tennis-surface to-[#070D18] border border-slate-700/80 rounded-2xl p-5 space-y-4 shadow-xl mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-tennis-yellow/15 border border-tennis-yellow/30 text-tennis-yellow">
            <Heart className="w-5 h-5 fill-tennis-yellow" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Hubungi Pengembang & Dukung AceCoach</h3>
            <p className="text-[11px] text-slate-400">Punya saran, kritik, ide fitur, atau ingin memberi apresiasi?</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          AceCoach dikembangkan secara independen dengan dedikasi penuh untuk kemajuan petenis Indonesia. Setiap masukan, kritik, maupun donasi dari Anda sangat berarti untuk kelanjutan pengembangan aplikasi ini! 🎾
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* WhatsApp Developer */}
          <a
            href="https://wa.me/62811553393?text=Halo%20Developer%20AceCoach,%20saya%20ingin%20memberi%20saran%20dan%20kritik:"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-emerald-950/40 border border-emerald-600/50 hover:border-emerald-400 rounded-xl flex items-center justify-between text-emerald-300 hover:text-emerald-100 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-900/60 text-emerald-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold block text-white">WhatsApp Pengembang</span>
                <span className="text-[11px] text-emerald-400/90 font-medium">0811-553-393 (Chat Langsung)</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Trakteer Donation */}
          <a
            href="https://trakteer.id/limitless7/tip"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-red-950/40 border border-red-600/50 hover:border-red-400 rounded-xl flex items-center justify-between text-red-300 hover:text-red-100 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-900/60 text-red-400">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold block text-white">Donasi via Trakteer</span>
                <span className="text-[11px] text-red-400/90 font-medium">trakteer.id/limitless7/tip</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
};

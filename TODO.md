# 📋 Project Roadmap & Task Tracker (TODO)
# AceCoach — Modern Tennis Pathway (Web App)

> **Versi Dokumen:** 1.2.0 (The Definitive & Exhaustive Master Tracker)  
> **Status:** 🟡 Siap Eksekusi  
> **Dasar Acuan:** [PRD.md v1.2.0 (The Definitive Master Edition)](file:///c:/Users/anton/vibecoding/aplikasitenis/PRD.md)  
> **Progress Keseluruhan:** `[ 0% ]` — 0 dari 10 Fase Selesai

---

## 🛠️ Fase 1: Scaffolding Proyek, PWA Manifest, & Konfigurasi GitHub Pages
*Fondasi teknis web app yang ringan, modern, offline-ready, dan kompatibel 100% dengan GitHub Pages.*

- [ ] **1.1 Inisialisasi Vite + React (TypeScript):** Setup proyek frontend berkecepatan tinggi dengan strict typing.
- [ ] **1.2 Konfigurasi Tailwind CSS & Palet Lapangan Kontras Tinggi:**
  - Setup custom colors: *Optic Tennis Yellow* (`#CCFF00`), *Court Navy* (`#0A192F`), *Clay Terracotta* (`#EA580C`), *Slate Court Dark* (`#0B0F19`), dan *Crisp White* (`#FAFAFA`).
  - Penyesuaian touch-target minimum 52px untuk kenyamanan sentuhan tangan basah/keringat.
- [ ] **1.3 Integrasi Lucide React Icons & SVG Assets:** Ikon vektor tajam di layar Retina/OLED.
- [ ] **1.4 Konfigurasi PWA & Service Worker:**
  - Pembuatan `manifest.webmanifest` (nama app, icons 192px/512px, background, theme color).
  - Pendaftaran Service Worker untuk strategi *Cache-First* aset statis (offline mode di lapangan).
- [ ] **1.5 Konfigurasi Base URL & HashRouter:** Penyesuaian `vite.config.ts` (`base: './'`) untuk mencegah broken link & error 404 pada GitHub Pages.
- [ ] **1.6 CI/CD Deployment GitHub Actions:** Pembuatan `.github/workflows/deploy.yml` untuk otomatisasi publish ke GitHub Pages.

---

## 🔊 Fase 2: On-Court Hardware APIs & Core Engine
*Fitur perangkat keras krusial agar aplikasi handal saat digunakan di pinggir lapangan outdoor.*

- [ ] **2.1 Splash Screen "Tap to Enter Court":** Alur interaksi sentuhan pertama untuk menginisialisasi dan membuka izin `AudioContext.resume()` pada iOS Safari & Android Chrome.
- [ ] **2.2 Screen Wake Lock API (`src/utils/wakeLock.ts`):**
  - Mencegah layar ponsel mati otomatis saat ditaruh di bangku lapangan selama drill/timer aktif.
  - Indikator status visual di header ("Screen Awake: Active").
- [ ] **2.3 Dual Audio Engine (`src/utils/audioEngine.ts`):**
  - Web Audio API Synth: Menghasilkan nada bip tajam (880 Hz & 1760 Hz) penembus deru angin lapangan.
  - Web Speech API: Sintesis aba-aba vokal (*"Ready... Split!... Turn!... Hit!"*).
- [ ] **2.4 LocalStorage Manager & Schema Migration (`src/utils/storage.ts`):**
  - Pengelola state lokal v1.2.0 (profil, kurikulum, logs, settings).
  - Skrip migrasi data aman & pencegah korupsi data.
  - Fitur Export JSON & Import JSON untuk backup penuh tanpa login server.
- [ ] **2.5 Canvas Social Badge Generator (`src/utils/canvasBadge.ts`):** Pembuat kartu gambar infografis latihan siap share ke WhatsApp/Instagram Story secara instan via HTML5 Canvas.

---

## 👤 Fase 3: Profil Adaptif & Kuis Diagnostik NTRP
*Personalisasi menyeluruh sebelum pemain memasuki lapangan.*

- [ ] **3.1 Kuis Diagnostik Level NTRP (5 Pertanyaan):**
  - Evaluasi mandiri durasi bermain, konsistensi reli, teknik servis, kontrol arah, dan pengalaman matchplay untuk menempatkan pengguna di jalur Pemula (1.0-2.5) atau Menengah (3.0-4.5).
- [ ] **3.2 Ambidextrous Mode (Pemain Kidal / Southpaw):**
  - Toggle global yang secara reaktif membalik teks panduan kaki/tangan dan membalik seluruh grafis SVG anatomi secara horizontal (`scaleX(-1)`).
- [ ] **3.3 Pilihan Gaya Backhand:** Pemilihan *Two-Handed (2HBH)* vs *One-Handed (1HBH)* untuk memfilter materi kurikulum dan drill yang relevan.
- [ ] **3.4 Outdoor Sunlight Mode Toggle:** Pilihan instan tema *Dark Court* vs *Sunlight High-Contrast* di navbar utama.

---

## 🧘 Fase 4: Modul Pre-Hab & Panduan Peralatan (Gear Sanity)
*Pencegahan cedera dan optimalisasi raket sebelum pemain memukul bola.*

- [ ] **4.1 Panduan Pemanasan Dinamis 5 Menit:**
  - Aktivasi Rotator Cuff (rotasi bahu internal/eksternal dinamis).
  - Mobilitas Thoracic Spine (rotasi tulang dada untuk unit turn maksimal).
  - Peregangan dinamis pergelangan tangan dan mobilitas panggul (*lunges*).
- [ ] **4.2 Gear & String Sanity Guide:**
  - *The Index Finger Rule:* Panduan visual mengukur lingkar grip raket agar cengkeraman rileks.
  - *String Tension & Poly Warning:* Peringatan bahaya senar kaku polyester ditarik > 52 lbs pada pemula/menengah (pencegahan utama *tennis elbow*). Rekomendasi senar multifilament/hybrid ramah sendi.
- [ ] **4.3 Adaptasi Karakter Permukaan Lapangan:** Penyesuaian gaya gerak kaki di lapangan semen (*hard court*) vs tanah liat/sintetis (*clay*).

---

## 🎓 Fase 5: Progressive Pathway Curriculum
*Kurikulum latihan berjenjang dengan penanda sarana fasilitas.*

- [ ] **5.1 Jalur 4-Week Foundation Track (Pemula NTRP 1.0 – 2.5):**
  - Minggu 1: Grip Bevels (Continental, Eastern, Semi-Western) & Contact Point di depan pinggul.
  - Minggu 2: Split-step timing & Unit Turn bahu sebagai satu poros.
  - Minggu 3: Forehand racket drop (lag 90°) & ayunan vertikal Low-to-High.
  - Minggu 4: Servis Continental Trophy pose & Punch volley (tanpa backswing besar).
- [ ] **5.2 Jalur 6-Week Kinetic Power Track (Menengah NTRP 3.0 – 4.5):**
  - Minggu 1-2: Open stance loading, hip-shoulder separation, & windshield wiper finish.
  - Minggu 3: Percabangan Backhand (Jalur khusus 1HBH ekstensi dada vs 2HBH rotasi panggul).
  - Minggu 4-5: Servis modern, shoulder-over-shoulder tilt, & pronasi lengan atas.
  - Minggu 6: Taktik Matchplay (Cross-court percentage & Serve + 1).
- [ ] **5.3 Penanda Konteks Sarana:** Label pada setiap drill: `[Solo Shadow]`, `[Wall / Dinding]`, `[Feeder]`, atau `[Live Rally]`.
- [ ] **5.4 Interactive Progress Tracking:** Checkbox checklist dengan persentase bar visual yang tersimpan otomatis di LocalStorage.

---

## 🧬 Fase 6: Interactive Biomechanics & Camera Mirror
*Membedah rantai kinetik dan memecahkan ilusi "Feel vs. Real".*

- [ ] **6.1 Checkpoint Viewer 4-Fase:**
  - Fase 1: Unit Turn & Coiling
  - Fase 2: The Drop & Racket Lag
  - Fase 3: Contact Point 30–45 cm di depan tubuh
  - Fase 4: Extension & Follow-through
- [ ] **6.2 Toggle "Mitos Klasik vs Realita Modern":** Komparasi interaktif membedah mitos usang vs teknik modern efisien.
- [ ] **6.3 In-App Camera Mirror (WebRTC):**
  - Kamera selfie real-time tepat di samping diagram anatomi.
  - *Visual Grid Overlay:* Garis bantu vertikal dan horizontal untuk memeriksa posisi kepala, tekukan lutut, dan titik jangkauan raket.
  - Fallback Error Boundary jika kamera ditolak atau tidak tersedia.
  - Jaminan privasi 100% lokal (zero-upload).

---

## ⏱️ Fase 7: On-Court Drill Assistant
*Asisten audio dan penghitung target di tepi lapangan tenis.*

- [ ] **7.1 Audio Split-Step Metronome:**
  - Pengaturan tempo (50 – 80 BPM).
  - Pilihan mode suara: Bip nada tinggi (880/1760 Hz) atau Aba-aba vokal (*"Ready... Split!"*).
- [ ] **7.2 Shadow Swing HIIT Interval Timer:**
  - Mode latihan: 30 detik latihan eksplosif + 15 detik istirahat (8–12 set).
  - Efek suara peluit penanda mulai dan selesai ronde.
  - Otomatis mengaktifkan Screen Wake Lock.
- [ ] **7.3 Interactive Court Target Scorekeeper:**
  - Diagram lapangan tenis SVG interaktif: *Zone A (Deep Crosscourt)*, *Zone B (Short Angle)*, *Zone C (Down The Line)*.
  - Tombol penghitung cepat jumlah bola masuk vs total bola (misal: 28/40 bola masuk target).

---

## 🧠 Fase 8: Mental Game & Matchplay Companion
*Membantu ketahanan mental antar poin dan kelancaran aturan main.*

- [ ] **8.1 The 16-Second Between-Point Routine (Jim Loehr Framework):**
  - Timer countdown 20 detik antar poin dengan panduan 3 fase mental:
    1. Detik 0-5: Respon fisik positif (tegakkan punggung, raket di tangan non-dominan, napas dalam).
    2. Detik 6-12: Relaksasi, usap keringat, & membetulkan senar (*string straightening*).
    3. Detik 13-20: Tentukan rencana taktik servis/return berikutnya sebelum mengambil posisi.
- [ ] **8.2 On-Court Score & Tiebreak Rotation Tracker:**
  - Penghitung skor game/set dengan tombol sentuh ekstra besar.
  - Menampilkan otomatis siapa giliran servis dan posisi lapangan (*Deuce* vs *Ad court*).
  - Peringatan otomatis ganti sisi lapangan saat tiebreak (*setiap kelipatan 6 poin*).

---

## 🔍 Fase 9: Fault Troubleshooter, Log Latihan, & Data Management
*Diagnosis mandiri kesalahan mekanik dan pencatatan latihan harian.*

- [ ] **9.1 Biomechanical Fault Troubleshooter:**
  - Matriks diagnosis 6 kesalahan umum (bola out panjang, pukulan hampa tenaga, nyeri siku/tennis elbow, servis nyangkut net, pukulan terkena frame/shanking, servis centong).
  - Analisis rantai kinetik penyebab dan resep drill perbaikan terarah.
- [ ] **9.2 Daily Practice Log Form & History:**
  - Input: Tanggal, Durasi (menit), Konteks (`Solo`, `Wall`, `Sparring`), Fokus Pukulan, Intensitas RPE (1-10), dan Catatan evaluasi pribadi.
  - Daftar riwayat latihan tersimpan rapi dan dapat ditinjau kapan saja.
- [ ] **9.3 Data Portability & Safety Reset:**
  - Tombol Ekspor file `.json` dan Impor data cadangan.
  - Modal konfirmasi keamanan sebelum melakukan reset data agar tidak terhapus tidak sengaja.
- [ ] **9.4 Shareable Workout Badge:** Tombol unduh gambar kartu infografis latihan untuk dibagikan ke WhatsApp / medsos.

---

## 🚀 Fase 10: QA, Uji Lapangan, & Peluncuran Resmi
*Pengujian performa, aksesibilitas, dan deployment akhir.*

- [ ] **10.1 Sunlight & Ergonomics Testing:** Memastikan seluruh kontras warna, ukuran tombol (>=52px), dan keterbacaan teks optimal di bawah terik matahari.
- [ ] **10.2 Audio & Wake Lock Verification di Mobile:** Uji coba di browser smartphone (iOS Safari & Chrome Android) untuk memverifikasi wake lock dan audio unlock.
- [ ] **10.3 Offline PWA Audit:** Uji coba mode pesawat (*airplane mode*), memastikan Service Worker menyajikan halaman secara instan tanpa internet.
- [ ] **10.4 Production Build & Zero-Lint Check:** Menjalankan `npm run build` dan memverifikasi tidak ada error TypeScript atau compiler issue.
- [ ] **10.5 Deployment GitHub Pages:** Verifikasi hasil build terunggah dan aktif pada URL publik GitHub Pages.

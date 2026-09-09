# 📋 Project Roadmap & Task Tracker (TODO)
# AceCoach — Modern Tennis Pathway (Web App)

> **Versi Dokumen:** 1.2.0 (The Definitive & Exhaustive Master Tracker)  
> **Status:** 🟢 100% Selesai & Terunggah ke GitHub Repository!  
> **Dasar Acuan:** [PRD.md v1.2.0 (The Definitive Master Edition)](file:///c:/Users/anton/vibecoding/aplikasitenis/PRD.md)  
> **Progress Keseluruhan:** `[ 100% ]` — 10 dari 10 Fase Selesai  
> **Repository URL:** [https://github.com/antonprafanto/acecoach](https://github.com/antonprafanto/acecoach)  
> **Live GitHub Pages:** [https://antonprafanto.github.io/acecoach/](https://antonprafanto.github.io/acecoach/)

---

## 🛠️ Fase 1: Scaffolding Proyek, PWA Manifest, & Konfigurasi GitHub Pages
*Fondasi teknis web app yang ringan, modern, offline-ready, dan kompatibel 100% dengan GitHub Pages.*

- [x] **1.1 Inisialisasi Vite + React (TypeScript):** Setup proyek frontend berkecepatan tinggi dengan strict typing.
- [x] **1.2 Konfigurasi Tailwind CSS & Palet Lapangan Kontras Tinggi:**
  - Setup custom colors: *Optic Tennis Yellow* (`#CCFF00`), *Court Navy* (`#0A192F`), *Clay Terracotta* (`#EA580C`), *Slate Court Dark* (`#0B0F19`), dan *Crisp White* (`#FAFAFA`).
  - Penyesuaian touch-target minimum 52px untuk kenyamanan sentuhan tangan basah/keringat.
- [x] **1.3 Integrasi Lucide React Icons & SVG Assets:** Ikon vektor tajam di layar Retina/OLED.
- [x] **1.4 Konfigurasi PWA & Service Worker:**
  - Pembuatan `manifest.webmanifest` (nama app, icons 192px/512px, background, theme color).
  - Pendaftaran Service Worker untuk strategi *Cache-First* aset statis (offline mode di lapangan).
- [x] **1.5 Konfigurasi Base URL & HashRouter:** Penyesuaian `vite.config.ts` (`base: './'`) untuk mencegah broken link & error 404 pada GitHub Pages.
- [x] **1.6 CI/CD Deployment GitHub Actions:** Pembuatan `.github/workflows/deploy.yml` untuk otomatisasi publish ke GitHub Pages.

---

## 🔊 Fase 2: On-Court Hardware APIs & Core Engine
*Fitur perangkat keras krusial agar aplikasi handal saat digunakan di pinggir lapangan outdoor.*

- [x] **2.1 Splash Screen "Tap to Enter Court":** Alur interaksi sentuhan pertama untuk menginisialisasi dan membuka izin `AudioContext.resume()` pada iOS Safari & Android Chrome.
- [x] **2.2 Screen Wake Lock API (`src/utils/wakeLock.ts`):**
  - Mencegah layar ponsel mati otomatis saat ditaruh di bangku lapangan selama drill/timer aktif.
  - Indikator status visual di header ("Screen Awake: Active").
- [x] **2.3 Dual Audio Engine (`src/utils/audioEngine.ts`):**
  - Web Audio API Synth: Menghasilkan nada bip tajam (880 Hz & 1760 Hz) penembus deru angin lapangan.
  - Web Speech API: Sintesis aba-aba vokal (*"Ready... Split!... Turn!... Hit!"*).
- [x] **2.4 LocalStorage Manager & Schema Migration (`src/utils/storage.ts`):**
  - Pengelola state lokal v1.2.0 (profil, kurikulum, logs, settings).
  - Skrip migrasi data aman & pencegah korupsi data.
  - Fitur Export JSON & Import JSON untuk backup penuh tanpa login server.
- [x] **2.5 Canvas Social Badge Generator (`src/utils/canvasBadge.ts`):** Pembuat kartu gambar infografis latihan siap share ke WhatsApp/Instagram Story secara instan via HTML5 Canvas.

---

## 👤 Fase 3: Profil Adaptif & Kuis Diagnostik NTRP
*Personalisasi menyeluruh sebelum pemain memasuki lapangan.*

- [x] **3.1 Kuis Diagnostik Level NTRP (5 Pertanyaan):**
  - Evaluasi mandiri durasi bermain, konsistensi reli, teknik servis, kontrol arah, dan pengalaman matchplay untuk menempatkan pengguna di jalur Pemula (1.0-2.5) atau Menengah (3.0-4.5).
- [x] **3.2 Ambidextrous Mode (Pemain Kidal / Southpaw):**
  - Toggle global yang secara reaktif membalik teks panduan kaki/tangan dan membalik seluruh grafis SVG anatomi secara horizontal (`scaleX(-1)`).
- [x] **3.3 Pilihan Gaya Backhand:** Pemilihan *Two-Handed (2HBH)* vs *One-Handed (1HBH)* untuk memfilter materi kurikulum dan drill yang relevan.
- [x] **3.4 Outdoor Sunlight Mode Toggle:** Pilihan instan tema *Dark Court* vs *Sunlight High-Contrast* di navbar utama.

---

## 🧘 Fase 4: Modul Pre-Hab & Panduan Peralatan (Gear Sanity)
*Pencegahan cedera dan optimalisasi raket sebelum pemain memukul bola.*

- [x] **4.1 Panduan Pemanasan Dinamis 5 Menit:**
  - Aktivasi Rotator Cuff (rotasi bahu internal/eksternal dinamis).
  - Mobilitas Thoracic Spine (rotasi tulang dada untuk unit turn maksimal).
  - Peregangan dinamis pergelangan tangan dan mobilitas panggul (*lunges*).
- [x] **4.2 Gear & String Sanity Guide:**
  - *The Index Finger Rule:* Panduan visual mengukur lingkar grip raket agar cengkeraman rileks.
  - *String Tension & Poly Warning:* Peringatan bahaya senar kaku polyester ditarik > 52 lbs pada pemula/menengah (pencegahan utama *tennis elbow*). Rekomendasi senar multifilament/hybrid ramah sendi.
- [x] **4.3 Adaptasi Karakter Permukaan Lapangan:** Penyesuaian gaya gerak kaki di lapangan semen (*hard court*) vs tanah liat/sintetis (*clay*).

---

## 🎓 Fase 5: Progressive Pathway Curriculum
*Kurikulum latihan berjenjang dengan penanda sarana fasilitas.*

- [x] **5.1 Jalur 4-Week Foundation Track (Pemula NTRP 1.0 – 2.5):**
  - Minggu 1: Grip Bevels (Continental, Eastern, Semi-Western) & Contact Point di depan pinggul.
  - Minggu 2: Split-step timing & Unit Turn bahu sebagai satu poros.
  - Minggu 3: Forehand racket drop (lag 90°) & ayunan vertikal Low-to-High.
  - Minggu 4: Servis Continental Trophy pose & Punch volley (tanpa backswing besar).
- [x] **5.2 Jalur 6-Week Kinetic Power Track (Menengah NTRP 3.0 – 4.5):**
  - Minggu 1-2: Open stance loading, hip-shoulder separation, & windshield wiper finish.
  - Minggu 3: Percabangan Backhand (Jalur khusus 1HBH ekstensi dada vs 2HBH rotasi panggul).
  - Minggu 4-5: Servis modern, shoulder-over-shoulder tilt, & pronasi lengan atas.
  - Minggu 6: Taktik Matchplay (Cross-court percentage & Serve + 1).
- [x] **5.3 Penanda Konteks Sarana:** Label pada setiap drill: `[Solo Shadow]`, `[Wall / Dinding]`, `[Feeder]`, atau `[Live Rally]`.
- [x] **5.4 Interactive Progress Tracking:** Checkbox checklist dengan persentase bar visual yang tersimpan otomatis di LocalStorage.
- [x] **5.5 Diagram Kinematik & Ilustrasi Visual Vektor (`src/components/LessonIllustration.tsx`):**
  - Diagram visual butt-cap 8-bevel raket (Continental, Eastern, Semi-Western).
  - Diagram geometri titik bentur (Contact Point) 30-45 cm di depan pinggul vs zona bahaya siku.
  - Diagram animasi dinamika pegas Split-Step (Ready -> Hop -> React).
  - Diagram rotasi Unit Turn bahu 90° dengan tangan non-dominan di leher raket.
  - Diagram lintasan Low-to-High dan Racket Drop forehand topspin.
  - Diagram mekanika Backhand 2HBH (tangan non-dominan pendorong utama).
  - Diagram Servis Trophy Pose sudut 90° siku sejajar bahu & ball toss di jam 1.
  - Diagram Punch Volley (racket head above wrist, no backswing block).
  - Diagram Open Stance loading phase (80% tumpuan kaki luar).
  - Diagram Racket Lag & Snap (butt-cap leading, pergelangan rileks 3/10).
  - Diagram Pronasi Servis rotasi internal 90°.
  - Diagram Geometri Lapangan (keunggulan 70% pukulan crosscourt).
  - Diagram Index Finger Rule pada raket grip sizing di Prehab.
  - Dukungan cermin horizontal (`scaleX(-1)`) instan saat mode Kidal aktif.

---

## 🧬 Fase 6: Interactive Biomechanics & Camera Mirror
*Membedah rantai kinetik dan memecahkan ilusi "Feel vs. Real".*

- [x] **6.1 Checkpoint Viewer 4-Fase:**
  - Fase 1: Unit Turn & Coiling
  - Fase 2: The Drop & Racket Lag
  - Fase 3: Contact Point 30–45 cm di depan tubuh
  - Fase 4: Extension & Follow-through
- [x] **6.2 Toggle "Mitos Klasik vs Realita Modern":** Komparasi interaktif membedah mitos usang vs teknik modern efisien.
- [x] **6.3 In-App Camera Mirror (WebRTC):**
  - Kamera selfie real-time tepat di samping diagram anatomi.
  - *Visual Grid Overlay:* Garis bantu vertikal dan horizontal untuk memeriksa posisi kepala, tekukan lutut, dan titik jangkauan raket.
  - Fallback Error Boundary jika kamera ditolak atau tidak tersedia.
  - Jaminan privasi 100% lokal (zero-upload).

---

## ⏱️ Fase 7: On-Court Drill Assistant
*Asisten audio dan penghitung target di tepi lapangan tenis.*

- [x] **7.1 Audio Split-Step Metronome:**
  - Pengaturan tempo (50 – 80 BPM).
  - Pilihan mode suara: Bip nada tinggi (880/1760 Hz) atau Aba-aba vokal (*"Ready... Split!"*).
- [x] **7.2 Shadow Swing HIIT Interval Timer:**
  - Mode latihan: 30 detik latihan eksplosif + 15 detik istirahat (8–12 set).
  - Efek suara peluit penanda mulai dan selesai ronde.
  - Otomatis mengaktifkan Screen Wake Lock.
- [x] **7.3 Interactive Court Target Scorekeeper:**
  - Diagram lapangan tenis SVG interaktif: *Zone A (Deep Crosscourt)*, *Zone B (Short Angle)*, *Zone C (Down The Line)*.
  - Tombol penghitung cepat jumlah bola masuk vs total bola (misal: 28/40 bola masuk target).

---

## 🧠 Fase 8: Mental Game & Matchplay Companion
*Membantu ketahanan mental antar poin dan kelancaran aturan main.*

- [x] **8.1 The 16-Second Between-Point Routine (Jim Loehr Framework):**
  - Timer countdown 20 detik antar poin dengan panduan 3 fase mental:
    1. Detik 0-5: Respon fisik positif (tegakkan punggung, raket di tangan non-dominan, napas dalam).
    2. Detik 6-12: Relaksasi, usap keringat, & membetulkan senar (*string straightening*).
    3. Detik 13-20: Tentukan rencana taktik servis/return berikutnya sebelum mengambil posisi.
- [x] **8.2 On-Court Score & Tiebreak Rotation Tracker:**
  - Penghitung skor game/set dengan tombol sentuh ekstra besar.
  - Menampilkan otomatis siapa giliran servis dan posisi lapangan (*Deuce* vs *Ad court*).
  - Peringatan otomatis ganti sisi lapangan saat tiebreak (*setiap kelipatan 6 poin*).

---

## 🔍 Fase 9: Fault Troubleshooter, Log Latihan, & Data Management
*Diagnosis mandiri kesalahan mekanik dan pencatatan latihan harian.*

- [x] **9.1 Biomechanical Fault Troubleshooter:**
  - Matriks diagnosis 6 kesalahan umum (bola out panjang, pukulan hampa tenaga, nyeri siku/tennis elbow, servis nyangkut net, pukulan terkena frame/shanking, servis centong).
  - Analisis rantai kinetik penyebab dan resep drill perbaikan terarah.
- [x] **9.2 Daily Practice Log Form & History:**
  - Input: Tanggal, Durasi (menit), Konteks (`Solo`, `Wall`, `Sparring`), Fokus Pukulan, Intensitas RPE (1-10), dan Catatan evaluasi pribadi.
  - Daftar riwayat latihan tersimpan rapi dan dapat ditinjau kapan saja.
- [x] **9.3 Data Portability & Safety Reset:**
  - Tombol Ekspor file `.json` dan Impor data cadangan.
  - Modal konfirmasi keamanan sebelum melakukan reset data agar tidak terhapus tidak sengaja.
- [x] **9.4 Shareable Workout Badge:** Tombol unduh gambar kartu infografis latihan untuk dibagikan ke WhatsApp / medsos.

---

## 🚀 Fase 10: QA, Uji Lapangan, & Peluncuran Resmi
*Pengujian performa, aksesibilitas, dan deployment akhir.*

- [x] **10.1 Sunlight & Ergonomics Testing:** Kontras warna `#CCFF00` dan `#0A192F`, ukuran touch-target >= 52px terpasang.
- [x] **10.2 Audio & Wake Lock Verification:** API sintesis bip, vokal, dan `navigator.wakeLock` teruji aman dengan fallback.
- [x] **10.3 Offline PWA Assets:** Service worker `public/sw.js` dan `manifest.webmanifest` terpasang.
- [x] **10.4 Production Build & Zero-Lint Check:** `npm run build` berhasil 100% tanpa error (bundle gzip JS 82 kB, CSS 5.7 kB).
- [x] **10.5 Deployment GitHub Pages:** Berhasil di-push ke branch `main` repositori `https://github.com/antonprafanto/acecoach`.

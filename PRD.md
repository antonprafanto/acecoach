# Product Requirement Document (PRD)
# AceCoach — Modern Tennis Pathway (Web App)

**Versi Dokumen:** 1.2.0 (The Definitive Master Edition)  
**Status:** Approved for Full Production  
**Lead Architect & Author:** AceCoach (PTR & USPTA Certified Professional, Modern Tennis Biomechanics Specialist)  
**Target Hosting:** GitHub Pages (Static SPA / Progressive Web App)  
**Target Audience:** Pemain Tenis Pemula (NTRP 1.0 – 2.5) & Menengah (NTRP 3.0 – 4.5)  

---

## 1. Executive Summary & Visi Produk

### 1.1 Visi
Menghadirkan pelatih saku digital berstandar dunia (PTR & USPTA) yang mampu mendampingi pemain secara mandiri langsung di tepi lapangan (*on-court companion*). Aplikasi ini mengajarkan mekanika tenis modern berbasis efisiensi rantai kinetik (*kinetic chain*), meminimalkan risiko cedera kronis (*tennis elbow* & *rotator cuff impingement*), dan mengeliminasi mitos teknik klasik usang melalui kurikulum latihan bertahap.

### 1.2 The "On-Court Reality" Problems
1. **The "Feel vs. Real" Illusion:** Pemain merasa gerakannya sudah benar, padahal realita mekanika tubuhnya keliru (misalnya mengira raket sudah *drop*, padahal masih tegak).
2. **Device Interruption di Lapangan:** Layar smartphone mati otomatis setelah 30–60 detik saat diletakkan di bangku lapangan, memutuskan audio timer dan ritme latihan.
3. **Keterbatasan Fasilitas/Partner:** Banyak pemain ingin berlatih mandiri tapi tidak memiliki rekan sparring atau mesin pelontar bola setiap hari.
4. **Pengabaian Pemain Kidal:** Sekitar 10–12% pemain adalah *left-handed*, namun hampir semua panduan instruksional ditulis murni untuk pemain bertangan kanan (*righty-biased*).
5. **Dilema Backhand:** Memaksakan teknik *Two-Handed Backhand* pada pengguna yang bermain *One-Handed Backhand* (atau sebaliknya), padahal rantai kinetiknya bertolak belakang.
6. **Kegagalan Peralatan (*Gear Mismatch*):** Pemula/menengah memaksakan senar kaku (*polyester*) dengan tarikan tinggi, yang mempercepat cedera siku terlepas dari perbaikan teknik.
7. **The Mental Collapse Between Points:** Pemain level 3.0–4.0 sering kehilangan pertandingan bukan karena pukulan buruk, melainkan ketiadaan rutinitas mental di jeda 20 detik antar poin (*16-second cure*).
8. **Kebingungan Aturan Pertandingan:** Pemain amatir kerap bingung rotasi servis saat tiebreak, sisi servis (*deuce* vs *ad court*), dan perpindahan lapangan.

### 1.3 Solusi Teknis (GitHub Pages Architecture)
Aplikasi web statis murni (*Client-Side Only*) tanpa backend server:
* **Zero Cost & Zero Data Leak:** Seluruh data riwayat latihan dan feed kamera cermin dieksekusi 100% lokal pada perangkat pengguna (*on-device privacy*).
* **Reliable Offline-First:** PWA (Service Worker) yang dapat di-*install* ke home screen dan bekerja penuh di lapangan tanpa sinyal internet.
* **Hash-Based Routing:** Menghilangkan masalah klasik error 404 pada SPA di GitHub Pages saat refresh halaman.

---

## 2. Landasan Teori & Filosofi Kepelatihan (The AceCoach Framework)

### 2.1 The 5 Controls of Tennis (PTR / USPTA Standard)
Setiap modul drill dan evaluasi performa diukur melalui 5 variabel pengontrol bola:
1. **Depth (Kedalaman):** Mengontrol bola agar mendarat di area 1.5–2 meter dari baseline lawan.
2. **Height (Ketinggian):** Mengatur lintasan bola melengkung di atas net (safety window 1–1.5 meter di atas net).
3. **Direction (Arah):** Kemampuan mengarahkan bola secara sadar (*cross-court* vs *down-the-line*).
4. **Speed (Kecepatan):** Mengatur tempo dan akselerasi kepala raket tanpa kehilangan keseimbangan.
5. **Spin (Putaran):** Penguasaan *heavy topspin* (rotasi maju) dan *underspin/slice* (rotasi mundur).

### 2.2 Modern Biomechanics & The Kinetic Chain
Tenaga pukulan tenis modern **bukan berasal dari kekuatan lengan/tangan**, melainkan akumulasi energi kinetik dari bawah ke atas:
$$\text{Ground Force (Kaki \& Lutut)} \rightarrow \text{Rotasi Panggul (Hips)} \rightarrow \text{Separasi Dada/Bahu (Torso)} \rightarrow \text{Lengan Rileks} \rightarrow \text{Racket Lag \& Snap} \rightarrow \text{Pronasi / Follow-through}$$

### 2.3 PTR Skill Progression Pyramid
$$\text{Shadow Swings (No Ball)} \rightarrow \text{Self/Hand Feed} \rightarrow \text{Racquet Feed / Wall} \rightarrow \text{Cooperative Rally} \rightarrow \text{Competitive Point Play}$$

---

## 3. User Personas & Adaptabilitas Pengguna

### Persona 1: "The Starter" (Pemula - NTRP 1.0 – 2.5)
* **Karakter:** Belajar tenis < 6 bulan, sering memukul menggunakan dorongan lengan (*arming the ball*), titik kontak bola sering di belakang badan, belum menguasai *split-step*.
* **Kebutuhan:** Pemahaman bevel grip, pembentukan refleks *unit turn*, latihan kontak bola di depan pinggul, dan drill mandiri di rumah/dinding.

### Persona 2: "The Plateau Climber" (Menengah - NTRP 3.0 – 4.5)
* **Karakter:** Reli konsisten pada kecepatan sedang, namun bola sering datar (*flat*), servis masih gaya *pancake/waiter's tray* tanpa pronasi, kesulitan menghadapi bola dalam/berat, emosi labil saat pertandingan sparring.
* **Kebutuhan:** Mekanika *loading open/semi-open stance*, akselerasi *racket lag & snap*, pronasi bahu internal pada servis, rutinitas psikologi antar poin, dan penempatan taktis di lapangan.

### Pengaturan Adaptasi Personal (Profile Settings)
1. **Hand Dominance:** Tangan Kanan (*Right-Handed*) ATAU Tangan Kiri (*Left-Handed*). Seluruh teks, animasi, dan diagram otomatis disesuaikan secara horizontal (*mirrored*).
2. **Backhand Style:** *Two-Handed (2HBH)* ATAU *One-Handed (1HBH)*.
3. **Current NTRP Level:** Kuis diagnostik 5 pertanyaan untuk menentukan titik awal kurikulum.
4. **Court Surface Focus:** *Hard Court* (pola footwork *plant-and-recover*) vs *Clay / Synthetic* (pola footwork *slide-and-recover*).

---

## 4. Arsitektur Teknis & Solusi Khas GitHub Pages

```
+-------------------------------------------------------------------------------------------------+
|                                    Client PWA (Single Page App)                                 |
|                         (Vite + React / HashRouter + Tailwind CSS)                              |
+-------------------------------------------------------------------------------------------------+
   |                    |                    |                   |               |              |
   v                    v                    v                   v               v              v
[Screen Wake Lock] [Web Speech / Audio] [WebRTC Mirror]   [HTML5 Canvas]  [LocalStorage] [Service Worker]
(Layar Tetap Nyala) (AudioContext Unlock)(Cermin Postur) (Shareable Card) (Backup/Restore)(Offline Cache)
```

### 4.1 Mengatasi Hambatan Teknis Spesifik Platform:
1. **GitHub Pages Routing (HashRouter):**
   * Menggunakan `HashRouter` (`/#/curriculum`, `/#/drills`) atau skrip `404.html SPA redirect` untuk memastikan halaman tidak menghasilkan error 404 saat di-*refresh* di GitHub Pages.
2. **iOS Safari Audio Unlock Flow:**
   * iOS Safari melarang audio otomatis (*autoplay restriction*). Aplikasi mengimplementasikan tombol splash pembuka *"Tap to Enter Court"* yang sekaligus menginisialisasi `AudioContext.resume()` saat sentuhan pertama.
3. **Screen Wake Lock API (`navigator.wakeLock`):**
   * Mencegah layar ponsel mati selama timer atau latihan aktif berjalan.
4. **Web Speech API (`window.speechSynthesis`):**
   * Sintesis vokal terintegrasi tanpa file audio eksternal (*"Ready... Split!... Turn!... Hit!"*).
5. **WebRTC Self-Check Mirror (`navigator.mediaDevices.getUserMedia`):**
   * Kamera selfie real-time dengan garis panduan (*visual grid overlay*). Zero-upload (100% lokal di memori browser).
6. **Social Share Card (HTML5 Canvas Engine):**
   * Mengonversi pencapaian latihan harian menjadi gambar infografis estetik (*JPEG/PNG*) secara instan di peramban untuk dibagikan ke WhatsApp atau Instagram Stories.

---

## 5. Rincian Modul Fitur Aplikasi

### Modul 1: Pre-Hab, Equipment Sanity, & Court Surface Guide
1. **5-Minute Dynamic Warmup & Mobility:**
   * *Rotator cuff activation* (rotasi bahu internal/eksternal).
   * *Thoracic spine mobility* (rotasi tulang dada untuk unit turn maksimal).
   * *Wrist dynamic stretches & hip lunges*.
2. **Gear & String Sanity Guide:**
   * *The Index Finger Rule:* Panduan visual mengukur lingkar grip raket.
   * *String Tension Warning:* Pemahaman bahaya senar *polyester* kaku ditarik > 52 lbs bagi pemula/menengah. Rekomendasi multifilament/hybrid.
3. **Court Surface Adaptations:**
   * Panduan penyesuaian pantulan bola dan teknik pengereman kaki di lapangan semen (*hard court*) vs tanah liat/rumput sintetis.

---

### Modul 2: Progressive Pathway Curriculum (Kurikulum Terstruktur)

Tiap latihan dilengkapi tag sarana: `[Solo Shadow]`, `[Wall / Dinding]`, `[Feeder / Ball Machine]`, `[Live Rally]`, serta **Diagram Kinematik Vektor SVG Interaktif** (`LessonIllustration.tsx`) yang dapat di-expand dengan dukungan otomatis cermin horizontal (`scaleX(-1)`) untuk pemain kidal (Southpaw).

#### Jalur Pemula: 4-Week Foundation Track
* **Minggu 1: Fondasi Pegangan & Titik Kontak (Grip & Contact Point)**
  * `[Solo Shadow]` Pengenalan Bevel Raket (Continental, Eastern, Semi-Western).
  * `[Wall / Dinding]` Sweet Spot & Contact Point 30 cm di depan pinggul.
  * `[Live Rally]` Mini-tennis konsistensi 20 reli di area servis box.
* **Minggu 2: Footwork & Unit Turn**
  * `[Solo Shadow]` Refleks *Split-step* dengan Audio Pacer.
  * `[Solo Shadow]` *Unit Turn* bahu (pinggul 45°, bahu 90° satu kesatuan poros).
  * `[Feeder]` Neutral stance hitting drill.
* **Minggu 3: Forehand & Pilihan Backhand (2HBH / 1HBH)**
  * `[Solo Shadow]` Forehand *Racket drop* membentuk sudut 90° (*lag*).
  * `[Wall / Dinding]` 2HBH: Tangan non-dominan mendorong bola; 1HBH: Menjaga posisi bahu samping (*stay sideways*).
  * `[Wall / Dinding]` 50 repetisi low-to-high stroke.
* **Minggu 4: Fondasi Servis & Net Volley**
  * `[Solo Shadow]` Grip Continental mutlak, *Trophy Pose*, & toss konsisten.
  * `[Feeder]` Punch volley (tanpa backswing, kepala raket di atas pergelangan tangan).

#### Jalur Menengah: 6-Week Kinetic Power & Matchplay Track
* **Minggu 1-2: Open Stance Forehand & Kinetic Chain Activation**
  * `[Solo Shadow]` *Coiling* tubuh, *loading* pada kaki luar (*outside leg*).
  * `[Live Rally]` Pelepasan tenaga rotasi panggul $\rightarrow$ dada $\rightarrow$ lengan rileks.
  * `[Wall / Dinding]` *Windshield wiper follow-through* untuk rotasi topspin curam.
* **Minggu 3: Backhand Power Phase (Cabang 1HBH vs 2HBH)**
  * Jalur 2HBH: Transisi *semi-open stance*, akselerasi bahu kanan melepaskan pukulan.
  * Jalur 1HBH: Ekstensi dada maksimal, penguncian pergelangan tangan tegak lurus saat kontak.
* **Minggu 4-5: Servis Modern & Pronasi Lengan Atas**
  * `[Solo Shadow]` *Shoulder-over-shoulder tilt* (sudut bahu meluncur naik).
  * `[Solo Shadow]` Latihan pronasi (tepi frame raket menuju bola $\rightarrow$ putar keluar saat kontak).
  * `[Live Rally]` *Leg drive* untuk melompat menangkap kontak pada titik tertinggi (*apex*).
* **Minggu 6: Match Tactics & Court Geometry**
  * `[Live Rally]` Pola reli *Cross-court percentage tennis* (melewati bagian net terendah).
  * `[Live Rally]` Taktik *Serve + 1* (eksekusi forehand agresif setelah servis).

---

### Modul 3: Interactive Biomechanics Breakdown & Mirror Mode
1. **Interactive Checkpoint Viewer:**
   * Mengurai 4 fase pukulan: *Unit Turn / Preparation* $\rightarrow$ *Drop & Lag* $\rightarrow$ *Contact Point* $\rightarrow$ *Follow-through & Recovery*.
   * Toggle **"Mitos Klasik vs Realita Modern"**.
2. **Ambidextrous (Mirror) Rendering:**
   * Mode kidal membalik seluruh anatomi dan posisi raket secara visual otomatis.
3. **In-App Camera Mirror (Feel vs. Real):**
   * Kamera selfie real-time dengan garis panduan bantu (*grid overlay*).

---

### Modul 4: On-Court Drill Assistant (Audio Pacer, Timer, & Target Map)
1. **Audio Split-Step Metronome:**
   * Aba-aba vokal (*"Ready... Split!"*) dan nada bip 880 Hz / 1760 Hz (50 – 80 BPM).
2. **Shadow Swing HIIT Interval Timer:**
   * Mode 30 detik latihan eksplosif + 15 detik istirahat (8–12 set) dengan *Keep Screen Awake*.
3. **Interactive Court Target Scorekeeper:**
   * Diagram lapangan tenis SVG dengan zona: *Zone A (Deep Crosscourt)*, *Zone B (Short Angle)*, *Zone C (Down The Line)*, lengkap dengan pencatat skor keberhasilan bola masuk.

---

### Modul 5: Mental Game & Matchplay Companion (Fitur Baru)
1. **The 16-Second Between-Point Routine (Jim Loehr Framework):**
   * Timer 20 detik antar poin dengan panduan fase mental:
     * *0-5s (Positive Physical Response):* Tegakkan punggung, raket di tangan non-dominan, napas dalam.
     * *6-12s (Relaxation & Toweling):* Mengelap keringat, membetulkan senar (*string straightening*).
     * *13-20s (Preparation & Plan):* Tentukan arah servis/return sebelum bola dimainkan.
2. **On-Court Score & Tiebreak Rotation Tracker:**
   * Pencatat skor game/set sederhana di tepi lapangan.
   * Memberitahukan otomatis: Siapa giliran servis, posisi servis (*Deuce* atau *Ad court*), dan peringatan perpindahan sisi lapangan saat tiebreak (*setiap kelipatan 6 poin*).

---

### Modul 6: Biomechanical Fault Troubleshooter (Pemeriksa Kesalahan Mandiri)

| Gejala Masalah di Lapangan | Analisis Biomekanik AceCoach | Resep Drill Perbaikan |
| :--- | :--- | :--- |
| **Bola sering terbang out panjang melewati baseline** | *Racket face* terbuka ke atas saat kontak, atau ayunan datar tanpa rotasi vertikal (*low-to-high*). | **Drill Wiper Over Fence `[Solo Shadow]`:** Latihan 25 shadow swing fokus memutar senar menghadap ke bawah setelah benturan. |
| **Pukulan terasa hampa tenaga meski mengayun sekuat tenaga** | Rantai kinetik putus: Lengan mengayun mendahului putaran pinggul (*arm-only hitting*). | **Drill Two-Step Medicine Ball `[Solo Shadow]`:** Rasakan panggul berputar terlebih dahulu, biarkan tangan tertinggal di belakang (*lag*). |
| **Siku luar terasa nyeri (Gejala Tennis Elbow)** | Kontak bola di belakang badan; pergelangan tangan tertekuk ke belakang menahan beban bola. | **Drill Contact Out Front Wall `[Wall / Dinding]`:** Pasang tanda di lantai 30 cm di depan kaki tumpuan; pertahankan kontak tepat di atasnya. |
| **Servis sering menyangkut di net bagian bawah** | Titik kontak terlalu rendah, atau tubuh menekuk ke depan sebelum kontak (*collapsing torso*). | **Drill High Reach Toss `[Solo Shadow]`:** Lempar toss dan tangkap bola di puncak tertinggi jangkauan tangan dan raket terentang. |
| **Pukulan sering mengenai frame raket (shanking)** | Kepala bergerak terlalu dini (menatap ke depan sebelum impact selesai) atau jarak kaki terlalu dekat. | **Drill 1-Second Still Eye `[Wall / Dinding]`:** Tahan pandangan mata ke titik tumbukan senar selama 1 detik penuh setelah bola lepas. |
| **Servis tidak bertenaga dan pergelangan tangan sakit** | Menggunakan grip forehand (servis centong) tanpa pronasi bahu internal. | **Drill Edge-to-Ball Toss `[Solo Shadow]`:** Gerakkan tepi frame raket menuju bola seolah membelah bola sebelum memutarnya keluar. |

---

### Modul 7: Daily Practice Log, Progression Tracker, & Social Share Card
1. **Checklist Keterampilan Terukur** berbasis level NTRP.
2. **Formulir Log Sesi Latihan:** Tanggal, Durasi, Konteks (`Solo`, `Wall`, `Sparring`), Fokus Pukulan, Intensitas RPE (1–10), dan Refleksi.
3. **Card Generator (Shareable Workout Badge):** Menghasilkan kartu visual siap *share* ke medsos secara instan berbasis HTML Canvas.
4. **Portabilitas Data:** Fitur Export JSON & Import JSON untuk backup penuh tanpa login server.

---

## 6. Desain Antarmuka & UX Lapangan (Sunlight Ergonomics)

1. **Sunlight High-Contrast Theme:**
   * *Background:* Charcoal Black (`#0B0F19`) untuk mode gelap atau Crisp Court White (`#FAFAFA`) untuk mode terang outdoor.
   * *Aksen Utama:* **Optic Tennis Yellow (`#CCFF00`)** — visibilitas maksimal di bawah terik sinar matahari langsung.
   * *Aksen Sekunder:* **Hard Court Royal Blue (`#1E40AF`)** dan **Clay Court Terracotta (`#EA580C`)**.
2. **Kenyamanan Sentuhan Tangan Berkeringat:**
   * Ukuran touch target tombol utama minimal **52px x 52px**.
   * Jarak antar elemen tombol minimal **16px** untuk mencegah salah pencet saat jari basah/berkeringat.
3. **Navigasi Tab Mobile-First:**
   * Bar navigasi bawah (*bottom bar*) berisi 5 menu utama:
     1. 🎓 **Kurikulum** (Pathway latihan mingguan & Pre-Hab)
     2. 🧬 **Biomekanik** (Anatomi & Cermin Kamera)
     3. ⏱️ **Drill & Audio** (Metronome, HIIT Pacer, & Court Target)
     4. 🧠 **Match & Mental** (Routine 16 Detik & Scorekeeper)
     5. 📊 **Log & Diagnostik** (Troubleshooter, Log, & Badge Generator)

---

## 7. Skema Data LocalStorage (Data Schema v1.2)

```json
{
  "acecoach_profile": {
    "version": "1.2.0",
    "handDominance": "right", 
    "backhandStyle": "two_handed", 
    "ntrpLevel": "2.5",
    "courtSurface": "hard",
    "joinedDate": "2026-09-09"
  },
  "acecoach_progress": {
    "completedLessons": [
      "b_w1_grip_continental",
      "b_w1_contact_point",
      "b_w2_split_step"
    ],
    "skillsMastered": [
      "skill_continental_serve",
      "skill_unit_turn_coiling"
    ]
  },
  "acecoach_logs": [
    {
      "id": "log_1725852400000",
      "date": "2026-09-09",
      "duration": 45,
      "context": "Wall",
      "focus": "Forehand Contact Point & Low-to-High",
      "rpe": 6,
      "notes": "Latihan dinding 100 bola. Contact point 30cm di depan pinggul membuat siku sangat nyaman."
    }
  ],
  "acecoach_settings": {
    "wakeLockEnabled": true,
    "voiceAudioEnabled": true,
    "audioVolume": 0.9,
    "highContrastOutdoor": true
  }
}
```

---

## 8. Deployment & CI/CD Pipeline (GitHub Pages Setup)

File alur kerja GitHub Actions `.github/workflows/deploy.yml` disiapkan untuk membangun proyek secara otomatis:

```yaml
name: Deploy AceCoach to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install Dependencies
        run: npm ci
      - name: Build Project
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 9. Kriteria Keberhasilan & Pengujian Kualitas (QA Acceptance Criteria)

1. **Uji Lapangan Outdoor:** Teks dan tombol terbaca jelas pada layar smartphone dengan tingkat kecerahan matahari siang hari tanpa silau yang mengganggu.
2. **Uji Ketahanan Layar:** Layar smartphone tetap menyala tanpa jeda (*no sleep*) selama mode timer/pacer aktif selama 15 menit terus-menerus.
3. **Uji Fungsionalitas Kidal:** Saat toggle *Left-Handed* diaktifkan, seluruh panduan orientasi tubuh dan gambar biomekanik bertransformasi menjadi perspektif kidal tanpa cacat teks.
4. **Uji Audio di iOS:** Suara bip dan aba-aba vokal dapat berbunyi lancar setelah interaksi splash screen pertama di peramban Safari iOS.
5. **Kecepatan & Privasi:** Tidak ada request data pengguna yang dikirim ke server pihak ketiga mana pun; ukuran bundle gzip di bawah 350 KB; dapat diakses instan secara offline.

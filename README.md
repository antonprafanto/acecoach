# 🎾 AceCoach — Modern Tennis Pathway (Web App)

> **Standard PTR & USPTA Coaching • Modern Biomechanics Specialist**  
> Aplikasi Web Program Latihan Tenis Mandiri untuk Pemula & Menengah (Offline-First PWA di GitHub Pages).

[![Deploy AceCoach to GitHub Pages](https://github.com/USERNAME/aplikasitenis/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/aplikasitenis/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-CCFF00)](https://web.dev/progressive-web-apps/)

---

## 🌟 Mengapa AceCoach Berbeda?

Banyak pemain tenis rekreasional terjebak dalam **mitos mekanika klasik** (menarik raket lurus, memukul di samping badan, atau mencentong bola dengan lengan) yang memicu cedera *tennis elbow* dan membatasi kekuatan pukulan. 

**AceCoach** dirancang sebagai asisten saku digital (*on-court companion*) yang mengajarkan efisiensi **Rantai Kinetik (*Kinetic Chain*)**:
$$\text{Ground Force} \rightarrow \text{Putaran Pinggul} \rightarrow \text{Separasi Dada/Bahu} \rightarrow \text{Lengan Rileks} \rightarrow \text{Racket Lag \& Snap} \rightarrow \text{Follow-through}$$

---

## 🚀 Fitur Unggulan

1. **🎓 Kurikulum Progresif Berjenjang:**
   * **4-Week Foundation Track (Pemula NTRP 1.0 – 2.5):** Grip bevel, Split-step, Unit turn, Contact point di depan pinggul.
   * **6-Week Kinetic Power Track (Menengah NTRP 3.0 – 4.5):** Open stance loading, Racket lag & snap, Pronasi servis, Matchplay tactics.
   * Tag Konteks Fasilitas: `[Solo Shadow]`, `[Wall / Dinding]`, `[Feeder]`, `[Live Rally]`.
   * Percabangan teknik: *Two-Handed (2HBH)* vs *One-Handed (1HBH)*.
2. **🧘 Pre-Hab & Equipment Sanity:**
   * Pemanasan dinamis 5 menit dengan timer per gerakan.
   * *The Index Finger Rule* untuk ukuran lingkar grip raket.
   * Peringatan bahaya senar *poly* keras (> 52 lbs) pencegah *tennis elbow*.
3. **🧬 Interactive Biomechanics & Camera Mirror:**
   * 4 Fase Anatomi dengan Diagram Kinematik SVG interaktif.
   * Toggle komparasi *Mitos Klasik vs Realita Modern*.
   * **In-App Selfie Mirror (WebRTC):** Cermin kamera depan HP dengan garis panduan bantu (*grid overlay*) untuk memecahkan ilusi *"Feel vs. Real"*. Privasi 100% on-device.
4. **⏱️ On-Court Drill Assistant:**
   * **Audio Split-Step Metronome (45–85 BPM):** Pilihan suara vokal sintetis atau nada bip tajam 1760 Hz.
   * **Shadow Swing HIIT Timer:** 30s Work / 15s Rest dengan suara peluit ganda.
   * **Court Target Scorekeeper:** Diagram lapangan tenis SVG dengan penghitung akurasi zona (Zone A Deep, Zone B Angle, Zone C DTL).
5. **🧠 Mental Game & Matchplay Companion:**
   * *The 16-Second Between-Point Routine (Jim Loehr):* Timer 20 detik penata psikologis antar poin.
   * *On-Court Score & Tiebreak Rotation Assistant:* Posisi servis (Deuce/Ad) dan peringatan ganti sisi tiebreak setiap 6 poin.
6. **🔍 Fault Troubleshooter & Practice Log:**
   * Matriks 6 diagnosa kesalahan umum mekanik beserta resep drill solusinya.
   * Formulir log latihan harian & generator badge infografis siap share ke WhatsApp/Instagram Story via HTML5 Canvas.
   * Fitur Ekspor & Impor cadangan data `.json`.
7. **☀️ Sunlight Ergonomics & Screen Wake Lock:**
   * Palet kontras tinggi outdoor (*Optic Tennis Yellow* `#CCFF00` & *Court Navy* `#0A192F`).
   * Tombol sentuh minimal 52px (ramah jari basah/keringat).
   * **Screen Wake Lock API:** Layar ponsel dijamin tidak akan mati/terkunci di bangku lapangan.
   * **Ambidextrous Mode:** Mendukung penuh pemain kidal (*left-handed*) dengan mirror rendering otomatis.

---

## 🛠️ Instalasi & Menjalankan Secara Lokal

Pastikan Anda telah menginstal **Node.js (v18+)** dan **npm**:

```bash
# 1. Clone repositori
git clone https://github.com/USERNAME/aplikasitenis.git
cd aplikasitenis

# 2. Install dependencies
npm install

# 3. Jalankan development server lokal
npm run dev

# 4. Build produksi
npm run build

# 5. Preview hasil build produksi
npm run preview
```

---

## 🌐 Cara Publikasi ke GitHub Pages (1-Click Automated CI/CD)

Proyek ini telah dilengkapi dengan GitHub Actions workflow `.github/workflows/deploy.yml`.

1. Buat repository baru di GitHub: `https://github.com/new`
2. Hubungkan dan push kode:
   ```bash
   git remote add origin https://github.com/USERNAME/aplikasitenis.git
   git branch -M main
   git push -u origin main
   ```
3. Buka repositori di browser $\rightarrow$ klik **Settings** $\rightarrow$ **Pages**.
4. Di bagian **Build and deployment > Source**, pilih **GitHub Actions**.
5. Tunggu 1–2 menit, web app Anda akan aktif di:
   ```
   https://USERNAME.github.io/aplikasitenis/
   ```

---

## 📜 Dokumen Desain & Rencana Kerja
* 📋 **[Product Requirement Document (PRD v1.2.0)](./PRD.md)**
* 📝 **[Task Tracker & Roadmap (TODO.md)](./TODO.md)**

---

**AceCoach** • *Elevating Tennis Through Modern Biomechanics & PTR/USPTA Standards.*

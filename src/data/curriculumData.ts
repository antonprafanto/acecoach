import { CurriculumLesson } from '../types';

export const CURRICULUM_DATA: CurriculumLesson[] = [
  // ================= PEMULA (4-WEEK FOUNDATION) =================
  {
    id: 'b_w1_grip',
    week: 1,
    level: 'beginner',
    title: 'Anatomi Grip & Bevel Raket',
    subtitle: 'Mengenal Bevel 1-8: Continental, Eastern, & Semi-Western',
    context: 'Solo Shadow',
    durationMinutes: 20,
    objective: 'Menemukan bevel raket secara instan dengan mata tertutup.',
    biomechanicsFocus: 'Posisi pangkal jari telunjuk (index knuckle) dan bantalan tumit tangan (heel pad) pada bevel raket.',
    kineticChainCheckpoint: 'Grip yang terlalu erat mengunci pergelangan tangan; pegang raket dengan skala kekencangan 4/10.',
    drills: [
      'Grip Switching Blindfolded: Putar raket di tangan, lalu cari Continental grip tanpa melihat (20 repetisi).',
      'Bounce on Frame: Memantulkan bola menggunakan tepi raket (frame edge) untuk melatih kontrol orientasi Continental.'
    ],
    repsOrSets: '3 set x 15 repetisi',
    proTipPTR: 'PTR Axiom: Cengkeraman yang benar adalah yang memungkinkan pergelangan tangan tetap fleksibel dan rileks.'
  },
  {
    id: 'b_w1_contact_point',
    week: 1,
    level: 'beginner',
    title: 'Titik Bentur (Contact Point) di Depan Pinggul',
    subtitle: 'Memukul bola 30-45 cm di depan tubuh untuk mencegah cidera siku',
    context: 'Wall / Dinding',
    durationMinutes: 30,
    objective: 'Memastikan seluruh tumbukan bola terjadi di depan kaki tumpuan.',
    biomechanicsFocus: 'Membentuk sudut siku sekitar 120-140° saat benturan, dengan senar raket tegak lurus lantai (perpendicular).',
    kineticChainCheckpoint: 'Jika memukul di belakang tubuh, rantai kinetik terputus dan beban bola ditanggung sendi siku (penyebab utama tennis elbow).',
    drills: [
      'Wall Catch & Hit: Lempar bola ke dinding, tangkap di titik kontak ideal, lalu dorong bola (25 repetisi).',
      'Frozen Contact Hold: Pukul bola pelan dan tahan posisi raket selama 2 detik tepat di titik kontak.'
    ],
    repsOrSets: '50 pukulan terarah',
    proTipPTR: 'Contact point yang konsisten menghasilkan kontrol kedalaman (Depth) yang terprediksi.'
  },
  {
    id: 'b_w2_split_step',
    week: 2,
    level: 'beginner',
    title: 'Split-Step & Ritme Kaki',
    subtitle: 'Lompatan kecil pegas tepat saat lawan menyentuh bola',
    context: 'Solo Shadow',
    durationMinutes: 25,
    objective: 'Mengaktifkan *stretch-shortening cycle* otot betis dan paha sebelum bergerak.',
    biomechanicsFocus: 'Mendarat dengan kedua kaki selebar bahu pada bagian depan telapak kaki (balls of the feet), lutut sedikit ditekuk.',
    kineticChainCheckpoint: 'Lompat 0.1 detik sebelum raket lawan mengenai bola; mendarat tepat saat arah bola terbaca.',
    drills: [
      'Audio Metronome Pacer: Bergerak ke kiri/kanan mengikuti aba-aba "Split!... Move!" dari aplikasi.',
      'Cone Reaction Drill: Split-step di tengah, lalu sentuh kerucut kiri atau kanan secepat mungkin.'
    ],
    repsOrSets: '4 ronde x 1 menit',
    proTipPTR: 'Pemain pemula yang menguasai split-step langsung meningkatkan kecepatan reaksi hingga 40%.'
  },
  {
    id: 'b_w2_unit_turn',
    week: 2,
    level: 'beginner',
    title: 'Unit Turn: Rotasi Bahu Satu Kesatuan',
    subtitle: 'Memutar dada dan bahu bersamaan, bukan menarik tangan ke belakang',
    context: 'Solo Shadow',
    durationMinutes: 25,
    objective: 'Mempersiapkan ayunan menggunakan otot besar punggung dan dada.',
    biomechanicsFocus: 'Tangan non-dominan memegang leher raket untuk memandu putaran bahu 90° menghadap pagar samping.',
    kineticChainCheckpoint: 'Coiling (memilin) batang tubuh menyimpan energi potensial elastis.',
    drills: [
      'Mirror Check Unit Turn: Periksa di cermin apakah nomor punggung sudah terlihat dari depan.',
      'Two-Handed Setup: Bawa raket ke samping dengan kedua tangan tetap menempel di raket sampai langkah kaki selesai.'
    ],
    repsOrSets: '3 set x 20 repetisi shadow',
    proTipPTR: 'Unit turn cepat memberi Anda 0.5 detik ekstra untuk mengatur langkah kaki ke bola.'
  },
  {
    id: 'b_w3_forehand_drop',
    week: 3,
    level: 'beginner',
    title: 'Modern Forehand: Drop & Low-to-High',
    subtitle: 'Gravitasi menurunkan kepala raket membentuk sudut 90° (Lag)',
    context: 'Wall / Dinding',
    durationMinutes: 30,
    objective: 'Menciptakan topspin alami melalui lintasan ayunan dari bawah ke atas.',
    biomechanicsFocus: 'Kepala raket jatuh di bawah ketinggian bola; pantat raket (butt-cap) mengarah ke depan.',
    kineticChainCheckpoint: 'Lag raket bukan ditarik paksa, melainkan hasil alami saat pinggul mulai berputar maju.',
    drills: [
      'Drop Ball Self-Feed: Jatuhkan bola sendiri di depan kaki, biarkan raket turun, lalu sikat bola ke atas (30 bola).',
      'Brush the Net: Latihan menyikat bagian atas net tanpa memukul tiang untuk merasakan lintasan vertikal.'
    ],
    repsOrSets: '4 set x 15 bola',
    proTipPTR: 'PTR 5 Controls: Kontrol Ketinggian (Height) ditentukan oleh sudut lintasan ayunan raket.'
  },
  {
    id: 'b_w3_backhand_foundation',
    week: 3,
    level: 'beginner',
    title: 'Fondasi Backhand (2HBH / 1HBH)',
    subtitle: 'Tangan kiri mendorong (2HBH) atau bahu samping terkunci (1HBH)',
    context: 'Wall / Dinding',
    durationMinutes: 30,
    objective: 'Menstabilkan pergelangan tangan saat benturan backhand.',
    biomechanicsFocus: '2HBH: Tangan non-dominan melakukan forehand dominan. 1HBH: Lengan tetap lurus, dada menghadap samping.',
    kineticChainCheckpoint: 'Transfer berat badan dari kaki belakang ke kaki depan saat kontak.',
    drills: [
      'Non-Dominant Only Hit (2HBH): Pukul 20 bola hanya menggunakan tangan kiri.',
      'Sideways Wall Hold (1HBH): Pertahankan bahu samping menghadap dinding selama benturan.'
    ],
    repsOrSets: '40 repetisi dinding',
    proTipPTR: 'Backhand modern mengandalkan stabilitas poros bahu, bukan sentakan pergelangan tangan.'
  },
  {
    id: 'b_w4_serve_trophy',
    week: 4,
    level: 'beginner',
    title: 'Fondasi Servis: Trophy Pose & Toss',
    subtitle: 'Lemparan bola konsisten dan postur patung piala yang seimbang',
    context: 'Solo Shadow',
    durationMinutes: 30,
    objective: 'Mencapai Trophy Pose stabil dengan raket grip Continental.',
    biomechanicsFocus: 'Tangan toss terangkat lurus ke jam 12-1; siku raket sejajar bahu; bahu belakang sedikit lebih rendah.',
    kineticChainCheckpoint: 'Tekukan lutut (knee flex) mulai menyimpan energi dorong ke atas.',
    drills: [
      'Toss & Catch: Lempar bola tanpa memukul; bola harus jatuh kembali tepat ke dalam lingkaran target di lantai (20x).',
      'Trophy Pose Hold: Tahan posisi Trophy Pose di depan cermin selama 5 detik, periksa kelurusan siku.'
    ],
    repsOrSets: '30 toss + 20 shadow swing',
    proTipPTR: '90% kegagalan servis pemula berakar dari toss yang tidak konsisten.'
  },
  {
    id: 'b_w4_punch_volley',
    week: 4,
    level: 'beginner',
    title: 'Net Play: Punch Volley & Block',
    subtitle: 'Menangkap bola di udara tanpa ayunan belakang (No Backswing)',
    context: 'Feeder',
    durationMinutes: 25,
    objective: 'Menggunakan kecepatan bola lawan untuk memantulkan volley stabil.',
    biomechanicsFocus: 'Kepala raket selalu di atas pergelangan tangan (racket head above wrist); langkah maju kaki berlawanan.',
    kineticChainCheckpoint: 'Tubuh bergerak menyongsong bola; gerakan memukul seperti memberi "high-five" pendek.',
    drills: [
      'Catch with Non-Dominant: Tangkap bola di depan dada sebelum memukul volley untuk melatih disiplin jarak.',
      'Punch Drill: Partner melempar bola dari jarak 4 meter, lakukan punch pendek ke sasaran kerucut.'
    ],
    repsOrSets: '3 set x 15 bola',
    proTipPTR: 'Volley adalah pukulan blok dan kompresi, bukan ayunan melingkar.'
  },

  // ================= MENENGAH (6-WEEK KINETIC POWER) =================
  {
    id: 'i_w1_open_stance_forehand',
    week: 1,
    level: 'intermediate',
    title: 'Open Stance Forehand & Loading Phase',
    subtitle: 'Memanfaatkan Ground Reaction Force dari kaki luar (Outside Leg)',
    context: 'Live Rally',
    durationMinutes: 35,
    objective: 'Mengisi tenaga pada kaki luar dan melepaskannya lewat rotasi panggul cepat.',
    biomechanicsFocus: 'Pembebanan 80% berat badan pada paha kaki dominan; rotasi panggul 45° mendahului tangan.',
    kineticChainCheckpoint: 'Separasi sudut antara pinggul dan bahu menciptakan efek regangan elastis (Hip-Shoulder Separation).',
    drills: [
      'Medicine Ball Throw: Lempar bola pemberat (1-2 kg) dari pinggul samping ke dinding tanpa melangkah.',
      'Open Stance Crosscourt Drill: Menerima bola lebar, tahan di kaki luar, ledakkan bola silang ke pojok dalam.'
    ],
    repsOrSets: '50 bola live rally',
    proTipPTR: 'Open stance menghemat waktu recovery 1 langkah penuh dibandingkan closed stance.'
  },
  {
    id: 'i_w2_racket_lag_snap',
    week: 2,
    level: 'intermediate',
    title: 'Akselerasi Racket Lag & Snap',
    subtitle: 'Pergelangan tangan rileks (Loose Wrist) untuk cambukan topspin maksimum',
    context: 'Wall / Dinding',
    durationMinutes: 30,
    objective: 'Mencapai kecepatan kepala raket (racket head speed) maksimal saat benturan.',
    biomechanicsFocus: 'Pergelangan tangan berada dalam posisi ekstensi 45-60° selama fase akselerasi dan menyapu bola vertikal.',
    kineticChainCheckpoint: 'Lengan berfungsi sebagai cambuk fleksibel; pegangan raket tetap rileks (skala 3/10).',
    drills: [
      'Whip Sound Shadow: Ayun raket di udara, dengarkan suara dengungan "whoosh" harus terdengar di titik kontak, bukan di belakang.',
      'Windshield Wiper Finish Drill: Menghasilkan putaran topspin deras yang melengkung tajam turun di baseline.'
    ],
    repsOrSets: '4 set x 20 repetisi',
    proTipPTR: 'Pemain profesional tidak mengayun lebih keras dengan otot tangan, mereka mengayun lebih rileks untuk membiarkan raket meluncur.'
  },
  {
    id: 'i_w3_backhand_power',
    week: 3,
    level: 'intermediate',
    title: 'Backhand Power & Drive (1HBH vs 2HBH)',
    subtitle: 'Cabang teknik khusus: Ekstensi dada (1HBH) vs Rotasi panggul (2HBH)',
    context: 'Live Rally',
    durationMinutes: 35,
    objective: 'Mengembangkan backhand bertenaga yang mampu menembus baseline lawan.',
    biomechanicsFocus: '1HBH: Mengunci pergelangan tangan tegak lurus dengan dada mengembang. 2HBH: Akselerasi bahu kanan melewati bola.',
    kineticChainCheckpoint: '1HBH butuh closed stance stabil; 2HBH dapat dimainkan dengan neutral hingga semi-open stance.',
    drills: [
      'Deep Crosscourt Exchange: Reli backhand-ke-backhand mengincar zona 2 meter dari baseline lawan (target 15 reli berturut-turut).',
      'Down-the-line Change of Direction: Mengubah arah bola silang menjadi pukulan lurus mematikan.'
    ],
    repsOrSets: '40 bola live drill',
    proTipPTR: 'Kedalaman (Depth) pada backhand adalah pertahanan terbaik melawan serangan lawan.'
  },
  {
    id: 'i_w4_serve_pronation',
    week: 4,
    level: 'intermediate',
    title: 'Modern Serve: Pronasi Lengan Atas & Leg Drive',
    subtitle: 'Internal shoulder rotation yang memutar tepi raket keluar saat kontak',
    context: 'Solo Shadow',
    durationMinutes: 40,
    objective: 'Menghilangkan servis centong/pancake dan menghasilkan tenaga dari dorongan kaki.',
    biomechanicsFocus: 'Shoulder-over-shoulder tilt: bahu kanan naik melewati bahu kiri; pronasi lengan bawah memutar raket 90°.',
    kineticChainCheckpoint: 'Kaki mendorong tubuh meluncur naik menyongsong bola di dalam garis baseline.',
    drills: [
      'Edge-to-Target Toss: Ayunkan tepi raket seolah membelah bola sebelum pergelangan tangan dan lengan memutar keluar.',
      'Baseline Hop Drill: Servis sambil mendarat di dalam lapangan 30-50 cm dengan kaki depan seimbang.'
    ],
    repsOrSets: '50 servis terukur',
    proTipPTR: 'Pronasi sejati tidak membuat pergelangan tangan sakit karena beban diserap oleh otot besar rotator cuff dan dada.'
  },
  {
    id: 'i_w5_serve_kick_slice',
    week: 5,
    level: 'intermediate',
    title: 'Variasi Servis: Slice Luar & Kick Serve',
    subtitle: 'Mengubah lintasan kontak dari jam 7-ke-1 (Kick) dan jam 9-ke-3 (Slice)',
    context: 'Feeder',
    durationMinutes: 35,
    objective: 'Menguasai variasi putaran servis untuk memaksa return lawan keluar lapangan.',
    biomechanicsFocus: 'Slice: Menggesek bagian luar bola untuk lengkungan menjauhi lawan. Kick: Ayunan dari belakang kepala ke atas.',
    kineticChainCheckpoint: 'Toss untuk Kick berada sedikit di belakang kepala (jam 11-12); toss untuk Slice di jam 1.',
    drills: [
      'Cone Can Knockdown: Tempatkan kaleng bola di sudut Deuce court, targetkan slice serve melengkung mengenainya.',
      'High Net Clearance Kick: Servis melewati tali 1 meter di atas net dan memantul di atas tinggi bahu penerima.'
    ],
    repsOrSets: '40 servis bergiliran',
    proTipPTR: 'Servis kedua dengan kick berat memberi margin keselamatan tertinggi dalam kompetisi resmi.'
  },
  {
    id: 'i_w6_matchplay_tactics',
    week: 6,
    level: 'intermediate',
    title: 'Court Geometry & Taktik Matchplay',
    subtitle: 'Cross-court percentage tennis dan formula "Serve + 1"',
    context: 'Live Rally',
    durationMinutes: 45,
    objective: 'Menerapkan biomekanik dalam pengambilan keputusan taktis di setiap reli.',
    biomechanicsFocus: 'Menjaga keseimbangan dinamis saat transisi dari bertahan (defense) ke menyerang (offense).',
    kineticChainCheckpoint: 'Recovery crossover step yang cepat setelah mengeksekusi pukulan sudut.',
    drills: [
      'Crosscourt Lockdown Game: Pertandingan poin hanya di setengah lapangan silang (bagian net paling rendah).',
      'Serve + 1 Pattern: Servis tajam ke luar lapangan, langsung selesaikan bola return dengan forehand agresif ke ruang kosong.'
    ],
    repsOrSets: '2 set pertandingan latihan atau 60 bola terkontrol',
    proTipPTR: 'Pemain pintar memukul 70% bolanya secara crosscourt karena jarak lapangan lebih panjang 1.3 meter dan net lebih rendah 15 cm di tengah!'
  }
];

export interface WarmupExercise {
  id: string;
  name: string;
  targetArea: string;
  durationSeconds: number;
  instructions: string;
  biomechanicalPurpose: string;
}

export const DYNAMIC_WARMUP: WarmupExercise[] = [
  {
    id: 'warmup_rotator_cuff',
    name: 'Rotasi Bahu Internal & Eksternal',
    targetArea: 'Rotator Cuff & Deltoid',
    durationSeconds: 60,
    instructions: 'Siku ditekuk 90° menempel di samping tubuh. Putar telapak tangan keluar dan ke dalam secara bergantian dengan ritme terkontrol (20 repetisi per sisi).',
    biomechanicalPurpose: 'Mempersiapkan tendon bahu untuk beban deselerasi tinggi saat melakukan servis dan forehand topspin.'
  },
  {
    id: 'warmup_thoracic_twist',
    name: 'Thoracic Spine Twist (Rotasi Dada)',
    targetArea: 'Tulang Belakang Dada (T-Spine) & Core',
    durationSeconds: 60,
    instructions: 'Letakkan raket melintang di belakang punggung dipegang kedua siku. Putar tubuh ke kiri dan kanan dengan pinggul tetap stabil menghadap ke depan.',
    biomechanicalPurpose: 'Meningkatkan rentang gerak rotasi unit turn tanpa membebani tulang belakang lumbar bagian bawah.'
  },
  {
    id: 'warmup_wrist_circles',
    name: 'Wrist Waves & Mobilisasi Pergelangan',
    targetArea: 'Sendi Pergelangan Tangan & Lengan Bawah',
    durationSeconds: 60,
    instructions: 'Jalin jari kedua tangan dan buat gerakan melingkar membentuk pola angka 8 halus, lalu balik arah putaran.',
    biomechanicalPurpose: 'Meningkatkan elastisitas cairan sinovial pergelangan tangan untuk akselerasi racket lag yang aman.'
  },
  {
    id: 'warmup_lunge_twist',
    name: 'Dynamic Lunges with Torso Reach',
    targetArea: 'Otot Paha, Glutes, & Panggul',
    durationSeconds: 60,
    instructions: 'Langkah maju satu kaki membentuk posisi lunge 90°, lalu putar torso ke arah paha kaki depan sambil merentangkan kedua tangan.',
    biomechanicalPurpose: 'Mengaktifkan otot tumpuan loading phase open stance dan melenturkan fleksor panggul.'
  },
  {
    id: 'warmup_lateral_split',
    name: 'Lateral Shuffles & Mini Split Hops',
    targetArea: 'Betis & Sistem Saraf Refleks Kaki',
    durationSeconds: 60,
    instructions: 'Lakukan gerakan geser ke samping (side-to-side shuffle) cepat sepanjang 4 meter, diakhiri dengan 5 lompatan kecil split-step.',
    biomechanicalPurpose: 'Memanaskan reflek saraf untuk reaksi split-step tepat saat bola lawan dipukul.'
  }
];

export const GEAR_SANITY_GUIDE = {
  gripRule: {
    title: 'The Index Finger Rule (Ukuran Lingkar Grip)',
    description: 'Pegang raket Anda dengan grip Eastern forehand biasa. Selipkan jari telunjuk tangan Anda yang satunya ke celah antara ujung jari manis dan bantalan telapak tangan.',
    verdict: 'Jika jari telunjuk Anda pas tanpa longgar dan tanpa menyentuh bantalan tangan, maka ukuran grip raket Anda tepat (misal: Grip 2 / 4 1/4 atau Grip 3 / 4 3/8). Jika terlalu longgar atau terlalu sempit, tangan akan mencengkeram terlalu tegang dan menyebabkan tennis elbow.'
  },
  stringWarning: {
    title: 'Peringatan Senar Polyester Keras (> 52 lbs)',
    description: 'Banyak pemain pemula/menengah memasang senar kopoliester (poly) kaku seperti para pemain ATP/WTA dengan tarikan 55+ lbs.',
    danger: 'Senar poly membutuhkan kecepatan ayunan di atas 110 km/jam untuk melengkung secara fleksibel. Pada kecepatan ayunan amatir, senar poly kaku bekerja seperti papan triplek yang memantulkan getaran impak langsung ke sendi siku dan bahu!',
    recommendation: 'Gunakan senar Multifilament (misal: Wilson NXT, Tecnifibre Biphase) atau Hybrid (Poly lembut di main 48 lbs, Multi di cross 52 lbs) untuk kenyamanan lengan maksimal.'
  },
  surfaceGuide: {
    title: 'Penyesuaian Karakter Permukaan Lapangan',
    hardCourt: 'Lapangan Semen (Hard Court): Pantulan bola tinggi dan terprediksi. Gerak kaki mengandalkan pola "Plant & Push" (tumpuan kokoh tanpa meluncur). Membutuhkan bantalan sepatu yang tebal.',
    clayCourt: 'Lapangan Tanah Liat / Pasir Sintetis (Clay): Pantulan bola lebih lambat dan tinggi dengan spin tajam. Gerak kaki mengandalkan pola "Slide into the Shot" (meluncur sebelum memukul).'
  }
};

export interface NTRPQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

export const NTRP_DIAGNOSTIC_QUIZ: NTRPQuestion[] = [
  {
    id: 1,
    question: 'Berapa lama Anda sudah bermain tenis secara rutin?',
    options: [
      { text: 'Kurang dari 6 bulan (Baru mulai belajar)', score: 1.5 },
      { text: '6 bulan s/d 1.5 tahun (Bisa bermain santai)', score: 2.5 },
      { text: '2 s/d 4 tahun (Sering sparring mingguan)', score: 3.5 },
      { text: 'Lebih dari 4 tahun (Berkompetisi di turnamen lokal)', score: 4.0 }
    ]
  },
  {
    id: 2,
    question: 'Bagaimana konsistensi reli baseline Anda saat kecepatan bola sedang?',
    options: [
      { text: 'Sering mati sendiri dalam 1-3 pukulan', score: 1.5 },
      { text: 'Bisa reli 5-10 bola jika arah bola tepat ke badan', score: 2.5 },
      { text: 'Konsisten 10+ bola dan bisa mengatur arah silang (crosscourt)', score: 3.5 },
      { text: 'Bisa mengontrol kedalaman, putaran topspin, dan pace saat tertekan', score: 4.0 }
    ]
  },
  {
    id: 3,
    question: 'Bagaimana teknik servis Anda saat ini?',
    options: [
      { text: 'Masih sering dobel fault, servis asal masuk melambung pelan', score: 1.5 },
      { text: 'Servis masuk konsisten tapi memakai grip forehand (mencentong bola)', score: 2.5 },
      { text: 'Sudah memakai grip Continental dan mulai bisa mengarahkan servis', score: 3.5 },
      { text: 'Menguasai pronasi bertenaga dan variasi servis slice/kick kedua', score: 4.0 }
    ]
  },
  {
    id: 4,
    question: 'Apakah Anda sudah melakukan "Split-Step" secara refleks sebelum lawan memukul bola?',
    options: [
      { text: 'Belum tahu apa itu split-step atau kaki sering diam mematung', score: 1.5 },
      { text: 'Tahu tapi sering lupa melakukannya di tengah reli', score: 2.5 },
      { text: 'Hampir selalu split-step tepat saat bola lawan disentuh', score: 3.5 },
      { text: 'Refleks split-step sempurna dan langsung recovery cepat setelah memukul', score: 4.0 }
    ]
  },
  {
    id: 5,
    question: 'Bagaimana penguasaan pukulan Backhand Anda?',
    options: [
      { text: 'Sangat menghindari bola backhand (selalu lari memutari bola)', score: 1.5 },
      { text: 'Bisa mengembalikan bola backhand pelan tapi sering mengambang di tengah', score: 2.5 },
      { text: 'Solid mengarahkan backhand dan bisa reli stabil', score: 3.5 },
      { text: 'Backhand bertenaga, bisa menyerang dan menghasilkan topspin/slice tajam', score: 4.0 }
    ]
  }
];

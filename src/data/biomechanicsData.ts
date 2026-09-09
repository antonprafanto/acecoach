import { BiomechanicsPhase } from '../types';

export const BIOMECHANICS_PHASES: BiomechanicsPhase[] = [
  {
    id: 'phase_unit_turn',
    name: 'Unit Turn & Coiling',
    title: 'Fase 1: Rotasi Torso & Persiapan',
    description: 'Bahu dan pinggul berputar bersama sebagai satu kesatuan poros, membawa raket ke posisi siap tanpa menarik tangan terpisah.',
    keyActionRighty: 'Tangan kiri tetap menempel pada leher raket, pinggul berputar 45°, bahu kiri menghadap net 90°.',
    keyActionLefty: 'Tangan kanan tetap menempel pada leher raket, pinggul berputar 45°, bahu kanan menghadap net 90°.',
    angleTarget: 'Rotasi Bahu 90° | Pinggul 45°',
    kineticChainRole: 'Menyimpan energi potensial elastis pada otot inti (core), punggung, dan paha.',
    mythVsModern: {
      myth: 'Mitos Klasik: "Tarik raket lurus ke belakang sejauh mungkin menggunakan kekuatan tangan."',
      reality: 'Realita Modern: "Putar seluruh tubuh bagian atas secara melingkar (unit turn). Tangan tetap berada di depan dada."',
      whyItMatters: 'Menarik tangan lurus ke belakang merusak timing dan memutus transfer tenaga dari putaran badan.'
    }
  },
  {
    id: 'phase_drop_lag',
    name: 'The Drop & Racket Lag',
    title: 'Fase 2: Penurunan Raket & Efek Cambuk',
    description: 'Gravitasi menurunkan kepala raket di bawah ketinggian bola yang datang, sementara pantat raket (butt cap) mulai meluncur mengarah ke bola.',
    keyActionRighty: 'Kepala raket jatuh di bawah pergelangan tangan, pergelangan tangan rileks membentuk sudut 90° ke belakang.',
    keyActionLefty: 'Kepala raket jatuh di bawah pergelangan tangan kiri, pergelangan tangan rileks membentuk sudut 90° ke belakang.',
    angleTarget: 'Sudut Pergelangan Tangan 90° (Lag)',
    kineticChainRole: 'Menciptakan efek cambuk (stretch-shortening cycle); pinggul mulai berputar maju mendahului tangan.',
    mythVsModern: {
      myth: 'Mitos Klasik: "Kunci pergelangan tangan dengan kaku agar raket tidak goyang."',
      reality: 'Realita Modern: "Pergelangan tangan harus sepenuhnya lentur dan rileks (loose wrist) agar raket tertinggal di belakang secara alami."',
      whyItMatters: 'Mengunci pergelangan tangan menghilangkan 40% kecepatan ayunan dan memicu radang tendon siku (tennis elbow).'
    }
  },
  {
    id: 'phase_contact',
    name: 'The Contact Point',
    title: 'Fase 3: Titik Bentur di Depan Tubuh',
    description: 'Tumbukan senar dengan bola terjadi 30–45 cm di depan pinggul depan, saat akselerasi kepala raket mencapai kecepatan puncak.',
    keyActionRighty: 'Kontak di depan kaki kiri (neutral stance) atau di depan pinggul kanan (open stance). Senar tegak lurus 90° atau sedikit tertutup 85°.',
    keyActionLefty: 'Kontak di depan kaki kanan (neutral stance) atau di depan pinggul kiri (open stance). Senar tegak lurus 90° atau sedikit tertutup 85°.',
    angleTarget: 'Jarak 30-45 cm di depan pinggul depan',
    kineticChainRole: 'Transfer energi kinetik dari tanah, pinggul, dan dada dilepaskan sepenuhnya ke bola.',
    mythVsModern: {
      myth: 'Mitos Klasik: "Pukul bola tepat di samping badanmu dan sentakkan pergelangan tangan."',
      reality: 'Realita Modern: "Kontak terjadi jauh di depan tubuh. Pergelangan tangan tidak menyentak, melainkan menyapu bola ke atas."',
      whyItMatters: 'Kontak di samping tubuh memaksa sendi siku menahan hentakan bola seberat 58 gram yang bergerak cepat.'
    }
  },
  {
    id: 'phase_follow_through',
    name: 'Extension & Windshield Wiper Finish',
    title: 'Fase 4: Ekstensi & Akhir Ayunan',
    description: 'Setelah benturan, raket memanjang menembus target sebelum berputar menyapu ke bawah bahu berlawanan (Windshield Wiper).',
    keyActionRighty: 'Siku kanan terangkat setinggi bahu, kepala raket berakhir di sisi kiri pinggul/ketiak kiri, dada menghadap lawan.',
    keyActionLefty: 'Siku kiri terangkat setinggi bahu, kepala raket berakhir di sisi kanan pinggul/ketiak kanan, dada menghadap lawan.',
    angleTarget: 'Siku setinggi bahu (Shoulder Height Finish)',
    kineticChainRole: 'Deselerasi aman: mendistribusikan energi sisa ayunan ke otot besar punggung (latissimus dorsi) dan bahu.',
    mythVsModern: {
      myth: 'Mitos Klasik: "Ayunan harus berakhir di atas bahu seperti mengalungkan syal."',
      reality: 'Realita Modern: "Pukulan topspin modern menggunakan finish wiper di antara bahu dan pinggul, dengan siku tinggi."',
      whyItMatters: 'Finish melingkar modern menghasilkan putaran topspin vertikal yang menjaga bola masuk tajam di dalam baseline.'
    }
  }
];

import { FaultDiagnostic } from '../types';

export const FAULT_DIAGNOSTICS: FaultDiagnostic[] = [
  {
    id: 'fault_fly_long',
    stroke: 'Forehand',
    symptom: 'Bola sering terbang liar melewati baseline lawan (Out Panjang)',
    biomechanicalCause: 'Sudut muka raket (racket face) terbuka menghadap langit saat kontak benturan, atau ayunan murni mendatar (flat) tanpa putaran topspin vertikal.',
    kineticChainFailure: 'Lengan mendorong ke depan tanpa ada penurunan kepala raket (racket drop) di bawah ketinggian bola sebelum kontak.',
    remedyDrill: {
      title: 'Drill Wiper Over The Fence',
      context: 'Solo Shadow',
      instructions: [
        'Bayangkan ada pagar setinggi pinggang di depan Anda.',
        'Turunkan kepala raket di bawah pagar, sentuh bola imajiner, lalu sapukan senar ke atas dan tutup ke bawah seperti kipas pembersih kaca mobil (windshield wiper).',
        'Fokuskan pada suara dengungan raket yang menyapu ke atas vertikal.'
      ],
      reps: '25 shadow swings perlahan di depan cermin'
    }
  },
  {
    id: 'fault_no_power',
    stroke: 'Forehand',
    symptom: 'Pukulan terasa hampa tenaga meski sudah mengayun sekuat tenaga',
    biomechanicalCause: 'Pukulan hanya mengandalkan tenaga otot lengan (arming the ball). Tubuh dan panggul tidak berputar atau mengayun terlambat.',
    kineticChainFailure: 'Rantai kinetik terputus: tidak ada transfer tenaga dari dorongan kaki (ground reaction force) dan rotasi panggul.',
    remedyDrill: {
      title: 'Drill Medicine Ball / Heavy Shadow Throw',
      context: 'Solo Shadow',
      instructions: [
        'Pegang bola pemberat atau raket dengan kedua tangan.',
        'Lakukan loading pada kaki luar, lalu dorong kaki dan putar panggul ke depan TERLEBIH DAHULU.',
        'Biarkan tangan tertinggal di belakang (lag) dan baru terlempar ke depan akibat putaran badan.'
      ],
      reps: '3 set x 12 repetisi dengan fokus rotasi panggul'
    }
  },
  {
    id: 'fault_tennis_elbow',
    stroke: 'General',
    symptom: 'Siku bagian luar terasa pegal atau nyeri menyengat (Gejala Tennis Elbow)',
    biomechanicalCause: 'Titik bentur bola (contact point) terjadi di belakang badan atau pergelangan tangan tertekuk mundur saat bola menghantam raket.',
    kineticChainFailure: 'Otot fleksor/ekstensor lengan bawah menanggung beban impak bola secara terisolasi tanpa perlindungan dari otot bahu dan dada.',
    remedyDrill: {
      title: 'Drill Contact Out Front Wall Check',
      context: 'Wall / Dinding',
      instructions: [
        'Letakkan tanda atau botol di lantai, tepat 35 cm di depan kaki tumpuan.',
        'Pukul bola pantulan dinding pelan saja, pastikan benturan terjadi tepat di atas botol penanda.',
        'Tahan raket diam (freeze) selama 2 detik di titik kontak untuk memprogram memori otot lengan tetap rileks.'
      ],
      reps: '30 pukulan pelan terkontrol'
    }
  },
  {
    id: 'fault_net_serve',
    stroke: 'Serve',
    symptom: 'Servis sering menyangkut di jaring net bagian tengah/bawah',
    biomechanicalCause: 'Titik kontak terlalu rendah karena lemparan bola (toss) kurang tinggi, atau badan menekuk ke depan sebelum raket menyentuh bola (collapsing chest).',
    kineticChainFailure: 'Hilangnya ekstensi bahu vertikal ke atas; kepala turun terlalu cepat untuk melihat hasil servis.',
    remedyDrill: {
      title: 'Drill High Reach & Toss Catch',
      context: 'Solo Shadow',
      instructions: [
        'Rentangkan raket lurus ke atas setinggi mungkin dengan grip Continental.',
        'Lakukan toss bola setinggi ujung atas raket ditambah 20 cm.',
        'Jangan memukul bola: tangkap bola dengan tangan kiri tepat di titik jangkauan tertinggi dan pertahankan kepala menatap ke atas.'
      ],
      reps: '20 lemparan toss konsisten'
    }
  },
  {
    id: 'fault_shanking',
    stroke: 'General',
    symptom: 'Bola sering mengenai bingkai raket (Shanking) atau pantulan tidak stabil',
    biomechanicalCause: 'Kepala dan mata bergerak menjauh dari bola sebelum kontak selesai, atau jarak kaki ke bola terlalu dekat/jauh (footwork spacing buruk).',
    kineticChainFailure: 'Ketiadaan micro-steps untuk menyesuaikan posisi raket terhadap bola; hilangnya penguncian visual titik kontak.',
    remedyDrill: {
      title: 'Drill 1-Second Still Eye',
      context: 'Wall / Dinding',
      instructions: [
        'Pukul bola ke dinding pelan.',
        'Saat bola membentur senar, pertahankan mata tetap memandang titik kosong bekas benturan selama 1 detik penuh setelah bola memantul pergi.',
        'Dilarang menoleh melihat dinding sampai follow-through selesai sempurna.'
      ],
      reps: '30 repetisi pantulan dinding fokus visual'
    }
  },
  {
    id: 'fault_pancake_serve',
    stroke: 'Serve',
    symptom: 'Servis lemah seperti menepuk kasur / mencentong nasi (Pancake Serve)',
    biomechanicalCause: 'Menggunakan grip forehand (Eastern/Semi-Western) pada servis, sehingga raket menghadap datar ke bola tanpa rotasi bahu internal (pronation).',
    kineticChainFailure: 'Hanya menggunakan tekukan pergelangan tangan bawah yang berbahaya bagi sendi dan membatasi kecepatan bola.',
    remedyDrill: {
      title: 'Drill Frame Edge-To-Ball Progression',
      context: 'Solo Shadow',
      instructions: [
        'Pegang raket mutlak dengan Continental Grip (Grip Bevel 2).',
        'Ayunkan raket ke atas dengan tepi bingkai raket (edge) membelah bola terlebih dahulu.',
        'Tepat di detik terakhir sebelum impact, putar lengan bawah dan telapak tangan ke arah luar (pronation).',
        'Lihat bahwa senar sekarang menghadap ke arah target secara natural.'
      ],
      reps: '3 set x 15 shadow servis pronasi'
    }
  }
];

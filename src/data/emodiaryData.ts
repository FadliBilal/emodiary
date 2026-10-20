import { MoodMeta, ESMTag, MoodEntry, DemoScenario, PsychoeducationModule, Psychologist } from '../types';

export const MOOD_DEFINITIONS: Record<string, MoodMeta> = {
  radiant: {
    key: 'radiant',
    label: 'Sangat Baik & Berenergi',
    subLabel: 'Merasa bersemangat, lega, dan siap menjalani hari',
    score: 5,
    colorHex: '#0F766E',
    bgHex: '#F0FDFA',
    borderHex: '#CCFBF1',
    textHex: '#0F766E',
    emoji: '',
    ariaLabel: 'Mood Sangat Baik'
  },
  calm: {
    key: 'calm',
    label: 'Tenang & Terkendali',
    subLabel: 'Pikiran jernih, emosi stabil, dan tidak terburu-buru',
    score: 4,
    colorHex: '#0F766E',
    bgHex: '#F0FDFA',
    borderHex: '#CCFBF1',
    textHex: '#0F766E',
    emoji: '',
    ariaLabel: 'Mood Tenang'
  },
  neutral: {
    key: 'neutral',
    label: 'Biasa Saja',
    subLabel: 'Menjalani rutinitas biasa tanpa ada hal yang membebani',
    score: 3,
    colorHex: '#64748B',
    bgHex: '#F8FAFC',
    borderHex: '#E2E8F0',
    textHex: '#334155',
    emoji: '',
    ariaLabel: 'Mood Biasa Saja'
  },
  drained: {
    key: 'drained',
    label: 'Lelah & Capek',
    subLabel: 'Energi habis, susah fokus, dan butuh istirahat',
    score: 2,
    colorHex: '#64748B',
    bgHex: '#F8FAFC',
    borderHex: '#E2E8F0',
    textHex: '#334155',
    emoji: '',
    ariaLabel: 'Mood Lelah'
  },
  overwhelmed: {
    key: 'overwhelmed',
    label: 'Kewalahan & Tertekan',
    subLabel: 'Beban menumpuk, cemas berlebih, atau sulit bernapas lega',
    score: 1,
    colorHex: '#E11D48',
    bgHex: '#FFF1F2',
    borderHex: '#FFE4E6',
    textHex: '#9F1239',
    emoji: '',
    ariaLabel: 'Mood Kewalahan'
  }
};

export const ESM_EMOTION_TAGS: ESMTag[] = [
  { id: 'anxious', label: 'Cemas & Gelisah', category: 'emotion' },
  { id: 'overwhelmed_feeling', label: 'Pikiran Buntu', category: 'emotion' },
  { id: 'fear_of_failure', label: 'Takut Gagal', category: 'emotion' },
  { id: 'lonely', label: 'Merasa Sendirian', category: 'emotion' },
  { id: 'frustrated', label: 'Kesal / Frustrasi', category: 'emotion' },
  { id: 'grateful', label: 'Bersyukur', category: 'emotion' },
  { id: 'relieved', label: 'Lega', category: 'emotion' },
  { id: 'hopeful', label: 'Mulai Ada Harapan', category: 'emotion' },
];

export const ESM_CONTEXT_TAGS: ESMTag[] = [
  { id: 'thesis_deadline', label: 'Skripsi & Tugas Akhir', category: 'context' },
  { id: 'sleep_deprived', label: 'Kurang Tidur (<4 jam)', category: 'somatic' },
  { id: 'academic_exam', label: 'Ujian / Presentasi', category: 'context' },
  { id: 'family_pressure', label: 'Tuntutan Keluarga', category: 'context' },
  { id: 'career_future', label: 'Masa Depan & Pekerjaan', category: 'context' },
  { id: 'physical_exhaustion', label: 'Badan Pegal & Dada Sesak', category: 'somatic' },
];

export const RAKA_LONGITUDINAL_ENTRIES: MoodEntry[] = [
  {
    id: 'entry-raka-1',
    timestamp: '2026-10-14 09:30',
    dateFormatted: '14 Okt',
    dayLabel: 'Rabu',
    timeLabel: '09:30 WIB',
    mood: 'neutral',
    score: 3,
    emotionTags: ['Tenang'],
    contextTags: ['Kuliah Rutin'],
    textNote: 'Kuliah pagi tadi lancar. Ada beberapa materi pemrograman yang agak berat tapi masih bisa kuikuti dengan baik.',
    sourceType: 'text',
    sleepHours: 6.5,
    extractedThemes: ['Kuliah'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-raka-2',
    timestamp: '2026-10-15 22:45',
    dateFormatted: '15 Okt',
    dayLabel: 'Kamis',
    timeLabel: '22:45 WIB',
    mood: 'neutral',
    score: 3,
    emotionTags: ['Pikiran Buntu'],
    contextTags: ['Skripsi & Tugas Akhir'],
    textNote: 'Dosen pembimbing minta ganti metode analisis data di bab 3. Masih bingung cari jurnal baru, tapi besok dicicil lagi.',
    sourceType: 'text',
    sleepHours: 5.5,
    extractedThemes: ['Bimbingan skripsi'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-raka-3',
    timestamp: '2026-10-16 23:50',
    dateFormatted: '16 Okt',
    dayLabel: 'Jumat',
    timeLabel: '23:50 WIB',
    mood: 'drained',
    score: 2,
    emotionTags: ['Kesal / Frustrasi', 'Cemas & Gelisah'],
    contextTags: ['Skripsi & Tugas Akhir', 'Kurang Tidur (<4 jam)'],
    textNote: 'Dua hari berturut-turut di perpustakaan sampai malam. Mata perih, pundak kaku, kepikiran apakah bisa ikut sidang semester ini.',
    sourceType: 'text',
    sleepHours: 4.0,
    extractedThemes: ['Kelelahan'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-raka-4',
    timestamp: '2026-10-17 02:15',
    dateFormatted: '17 Okt',
    dayLabel: 'Sabtu',
    timeLabel: '02:15 WIB',
    mood: 'drained',
    score: 2,
    emotionTags: ['Merasa Sendirian'],
    contextTags: ['Kurang Tidur (<4 jam)', 'Tuntutan Keluarga'],
    textNote: 'Ibu telepon tanya kapan kira-kira wisuda. Rasanya langsung tertekan dan gak bisa tidur sampai jam 2 pagi.',
    sourceType: 'voice',
    voiceDetails: {
      durationSeconds: 38,
      transcript: 'Ibu tadi tanya kabar skripsi... rasanya campur aduk banget. Gak mau ngecewain orang tua, tapi otak rasanya stuck dan bingung harus cerita ke siapa.',
      isSimulated: false,
      waveformSamples: [15, 30, 45, 60, 40, 25, 50, 70, 85, 60, 40, 30]
    },
    sleepHours: 3.5,
    extractedThemes: ['Keluarga'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-raka-5',
    timestamp: '2026-10-18 23:10',
    dateFormatted: '18 Okt',
    dayLabel: 'Minggu',
    timeLabel: '23:10 WIB',
    mood: 'overwhelmed',
    score: 1,
    emotionTags: ['Cemas & Gelisah', 'Takut Gagal'],
    contextTags: ['Skripsi & Tugas Akhir', 'Kurang Tidur (<4 jam)'],
    textNote: 'Draft bab 4 dicoret banyak sama dospem dan disuruh rombak ulang. Rasanya putus asa dan capek banget.',
    sourceType: 'text',
    sleepHours: 3.0,
    extractedThemes: ['Revisi ditolak'],
    persistenceRiskFlag: true
  },
  {
    id: 'entry-raka-6',
    timestamp: '2026-10-19 01:45',
    dateFormatted: '19 Okt',
    dayLabel: 'Senin',
    timeLabel: '01:45 WIB',
    mood: 'overwhelmed',
    score: 1,
    emotionTags: ['Pikiran Buntu', 'Takut Gagal'],
    contextTags: ['Skripsi & Tugas Akhir', 'Kurang Tidur (<4 jam)'],
    textNote: 'Dada sesak tiap kali buka laptop. Jantung berdegup kencang, niat ngetik tapi cuma menatap layar kosong berjam-jam.',
    sourceType: 'voice',
    voiceDetails: {
      durationSeconds: 42,
      transcript: 'Jujur aku ngerasa buntu banget... tiap kali mau buka file bab 4, dada rasanya sesek dan tanganku gemetar. Takut banget kalau semester ini gagal.',
      isSimulated: false,
      waveformSamples: [20, 35, 60, 80, 95, 70, 55, 40, 65, 90, 85, 75]
    },
    sleepHours: 3.0,
    extractedThemes: ['Kepanikan'],
    persistenceRiskFlag: true
  },
  {
    id: 'entry-raka-7',
    timestamp: '2026-10-20 20:30',
    dateFormatted: '20 Okt',
    dayLabel: 'Hari Ini',
    timeLabel: '20:30 WIB',
    mood: 'overwhelmed',
    score: 1,
    emotionTags: ['Cemas & Gelisah', 'Pikiran Buntu'],
    contextTags: ['Skripsi & Tugas Akhir', 'Kurang Tidur (<4 jam)'],
    textNote: 'Udah hari keempat berturut-turut rasanya berat banget. Gak nafsu makan dan gak ada tenaga buat keluar kamar kos. Butuh tempat cerita yang aman.',
    sourceType: 'voice',
    voiceDetails: {
      durationSeconds: 46,
      transcript: 'Hari ini bener-bener gak ada energi buat keluar kamar kos. Revisi belum kusentuh sama sekali. Aku sadar pola tidurku udah hancur dan aku gak bisa handle ini sendirian lagi...',
      isSimulated: false,
      waveformSamples: [25, 40, 65, 85, 100, 90, 75, 60, 50, 80, 95, 70]
    },
    sleepHours: 2.5,
    extractedThemes: ['Butuh bantuan'],
    persistenceRiskFlag: true
  }
];

export const NADIA_LONGITUDINAL_ENTRIES: MoodEntry[] = [
  {
    id: 'entry-nadia-1',
    timestamp: '2026-10-14 21:00',
    dateFormatted: '14 Okt',
    dayLabel: 'Rabu',
    timeLabel: '21:00 WIB',
    mood: 'drained',
    score: 2,
    emotionTags: ['Cemas & Gelisah', 'Takut Gagal'],
    contextTags: ['Masa Depan & Pekerjaan'],
    textNote: 'Wawancara kerja kedua belum ada kabar baik. Mulai minder melihat teman-teman seangkatan yang sudah mulai bekerja.',
    sourceType: 'text',
    sleepHours: 5.0,
    extractedThemes: ['Kecemasan kerja'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-nadia-2',
    timestamp: '2026-10-15 22:30',
    dateFormatted: '15 Okt',
    dayLabel: 'Kamis',
    timeLabel: '22:30 WIB',
    mood: 'neutral',
    score: 3,
    emotionTags: ['Pikiran Buntu'],
    contextTags: ['Masa Depan & Pekerjaan'],
    textNote: 'Mencoba rehat seharian gak buka media sosial. Rasanya agak lebih tenang dan gak gampang membandingkan diri.',
    sourceType: 'text',
    sleepHours: 6.0,
    extractedThemes: ['Detoks medsos'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-nadia-3',
    timestamp: '2026-10-16 19:40',
    dateFormatted: '16 Okt',
    dayLabel: 'Jumat',
    timeLabel: '19:40 WIB',
    mood: 'calm',
    score: 4,
    emotionTags: ['Mulai Ada Harapan'],
    contextTags: ['Badan Pegal & Dada Sesak'],
    textNote: 'Latihan napas 4-7-8 yang ada di EmoDiary sangat membantu pas dada mulai berdegup kencang tadi sore.',
    sourceType: 'voice',
    voiceDetails: {
      durationSeconds: 32,
      transcript: 'Tadi sore pas jalan santai di dekat kampus sambil coba latihan napas, pikiran yang tadinya riuh mendadak tenang. Rasanya lega banget.',
      isSimulated: false,
      waveformSamples: [10, 25, 40, 50, 45, 30, 20, 35, 45, 50]
    },
    sleepHours: 7.0,
    extractedThemes: ['Relaksasi napas'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-nadia-4',
    timestamp: '2026-10-17 21:15',
    dateFormatted: '17 Okt',
    dayLabel: 'Sabtu',
    timeLabel: '21:15 WIB',
    mood: 'calm',
    score: 4,
    emotionTags: ['Lega', 'Bersyukur'],
    contextTags: ['Masa Depan & Pekerjaan'],
    textNote: 'Mengobrol dengan teman lama, ternyata mereka juga merasakan kebingungan yang sama di masa awal lulus kuliah.',
    sourceType: 'text',
    sleepHours: 7.5,
    extractedThemes: ['Dukungan teman'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-nadia-5',
    timestamp: '2026-10-18 20:00',
    dateFormatted: '18 Okt',
    dayLabel: 'Minggu',
    timeLabel: '20:00 WIB',
    mood: 'calm',
    score: 4,
    emotionTags: ['Mulai Ada Harapan'],
    contextTags: ['Masa Depan & Pekerjaan'],
    textNote: 'Mulai merapikan portofolio lamaran kerja. Mengubah pola pikir dari "aku gagal" jadi "aku sedang belajar dan berproses".',
    sourceType: 'text',
    sleepHours: 7.0,
    extractedThemes: ['Pikiran positif'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-nadia-6',
    timestamp: '2026-10-19 21:40',
    dateFormatted: '19 Okt',
    dayLabel: 'Senin',
    timeLabel: '21:40 WIB',
    mood: 'radiant',
    score: 5,
    emotionTags: ['Bersyukur', 'Lega'],
    contextTags: ['Masa Depan & Pekerjaan'],
    textNote: 'Alhamdulillah, dapat undangan wawancara tahap lanjutan! Rasa cemas berubah jadi semangat positif.',
    sourceType: 'voice',
    voiceDetails: {
      durationSeconds: 35,
      transcript: 'Alhamdulillah, hari ini dapat kabar baik! Undangan wawancara masuk. Aku merasa siap dan catatan harian selama seminggu ini bantu aku mengenal kekuatanku.',
      isSimulated: false,
      waveformSamples: [20, 45, 70, 85, 90, 75, 60, 70, 85, 80]
    },
    sleepHours: 7.5,
    extractedThemes: ['Kabar baik'],
    persistenceRiskFlag: false
  },
  {
    id: 'entry-nadia-7',
    timestamp: '2026-10-20 18:30',
    dateFormatted: '20 Okt',
    dayLabel: 'Hari Ini',
    timeLabel: '18:30 WIB',
    mood: 'radiant',
    score: 5,
    emotionTags: ['Bersyukur'],
    contextTags: ['Masa Depan & Pekerjaan'],
    textNote: 'Kondisi emosi stabil dan tenang. Latihan rutin mencatat perasaan di EmoDiary bantu aku mengenali tanda-tanda stres sebelum membesar.',
    sourceType: 'text',
    sleepHours: 8.0,
    extractedThemes: ['Stabil & tenang'],
    persistenceRiskFlag: false
  }
];

export const DEMO_SCENARIOS: Record<string, DemoScenario> = {
  raka: {
    id: 'raka',
    name: 'Raka Pratama',
    age: 19,
    role: 'Mahasiswa Teknik Informatika (Semester 7)',
    institution: 'Universitas 17 Agustus 1945 Surabaya',
    personaDescription: 'Sedang pusing revisi skripsi bab 4, sering begadang (tidur kurang dari 3 jam), dan takut mengecewakan orang tua. Catatan mood menunjukkan rasa tertekan selama 5 hari berturut-turut.',
    clinicalRiskLevel: 'elevated',
    riskBadgeText: 'Perlu Teman Cerita (Sudah 5 Hari Tertekan)',
    consecutiveNegativeDays: 5,
    primaryPatternHighlight: 'Sering merasa sangat cemas saat larut malam (di atas jam 11 malam) ketika kurang tidur dan memikirkan revisi skripsi.',
    suggestedAction: 'Dianjurkan ngobrol santai dengan konselor kampus di Gedung Graha Wiyata Untag Surabaya.',
    initialEntries: RAKA_LONGITUDINAL_ENTRIES
  },
  nadia: {
    id: 'nadia',
    name: 'Nadia Salsabila',
    age: 21,
    role: 'Fresh Graduate Ilmu Komunikasi',
    institution: 'Universitas 17 Agustus 1945 Surabaya',
    personaDescription: 'Sempat cemas saat melamar pekerjaan setelah lulus kuliah. Berhasil merasa jauh lebih tenang setelah rutin latihan pernapasan santai dan menulis jurnal harian.',
    clinicalRiskLevel: 'low',
    riskBadgeText: 'Kondisi Membaik & Stabil',
    consecutiveNegativeDays: 0,
    primaryPatternHighlight: 'Perasaan membaik dari lelah menjadi bersemangat setelah membatasi waktu layar dan rajin latihan napas.',
    suggestedAction: 'Terus pertahankan kebiasaan baik mencatat perasaan setiap hari.',
    initialEntries: NADIA_LONGITUDINAL_ENTRIES
  },
  sandbox: {
    id: 'sandbox',
    name: 'Coba Sendiri (Sandbox Juri)',
    age: 20,
    role: 'Ruang Uji Coba Langsung',
    institution: 'Universitas 17 Agustus 1945 Surabaya',
    personaDescription: 'Tempat juri atau pengguna mencoba langsung mengetik atau merekam suara baru untuk melihat bagaimana aplikasi ini bekerja secara nyata.',
    clinicalRiskLevel: 'moderate',
    riskBadgeText: 'Mode Uji Coba Langsung',
    consecutiveNegativeDays: 2,
    primaryPatternHighlight: 'Aplikasi siap membaca catatanmu dan memberikan tanggapan yang menenangkan.',
    suggestedAction: 'Tulis atau rekam perasaanmu sekarang untuk melihat respons otomatis aplikasi.',
    initialEntries: [
      {
        id: 'sandbox-1',
        timestamp: '2026-10-19 14:00',
        dateFormatted: '19 Okt',
        dayLabel: 'Kemarin',
        timeLabel: '14:00 WIB',
        mood: 'neutral',
        score: 3,
        emotionTags: ['Tenang'],
        contextTags: ['Ujian / Sidang'],
        textNote: 'Contoh catatan awal: Mempersiapkan materi presentasi di depan dewan juri.',
        sourceType: 'text',
        sleepHours: 6.5,
        extractedThemes: ['Persiapan'],
        persistenceRiskFlag: false
      },
      {
        id: 'sandbox-2',
        timestamp: '2026-10-20 10:15',
        dateFormatted: '20 Okt',
        dayLabel: 'Hari Ini',
        timeLabel: '10:15 WIB',
        mood: 'drained',
        score: 2,
        emotionTags: ['Cemas & Gelisah'],
        contextTags: ['Ujian / Sidang', 'Kurang Tidur (<4 jam)'],
        textNote: 'Menjelang presentasi rasanya deg-degan, ingin memastikan semuanya berjalan lancar.',
        sourceType: 'text',
        sleepHours: 4.5,
        extractedThemes: ['Deg-degan'],
        persistenceRiskFlag: false
      }
    ]
  }
};

export const PSYCHOEDUCATION_MODULES: PsychoeducationModule[] = [
  {
    id: 'cbt-catastrophizing',
    title: 'Ketika Pikiran Mengira Hal Terburuk Pasti Terjadi',
    badge: 'Tips Mengelola Pikiran',
    category: 'CBT Cognitive Reframing',
    estimatedReadTime: '2 menit baca',
    summary: 'Seringkali satu revisi dosen membuat kita merasa masa depan hancur. Ini cara sederhana agar tidak mudah panik.',
    keyTakeaway: 'Satu revisi bukanlah tanda kita gagal, melainkan bagian wajar dalam proses belajar.',
    targetMoods: ['overwhelmed', 'drained'],
    articleSections: [
      {
        heading: 'Mengapa Otak Kita Gampang Panik?',
        paragraphs: [
          'Saat lelah, otak kita sering otomatis membayangkan skenario terburuk: "Kalau bab 4 ini ditolak lagi, aku pasti gak lulus, bikin malu orang tua, hidupku berantakan."',
          'Kenyataannya, pikiran itu baru sekadar rasa takut, bukan kenyataan yang pasti terjadi.'
        ]
      },
      {
        heading: '3 Pertanyaan Sederhana untuk Menenangkan Diri',
        paragraphs: [
          '1. Apakah ada bukti nyata bahwa aku pasti gagal total?',
          '2. Kalau temanku mengalami revisi yang sama, apakah aku akan mencapnya sebagai orang gagal?',
          '3. Apa satu hal kecil yang bisa kukerjakan selama 15 menit ke depan?'
        ]
      }
    ]
  },
  {
    id: 'somatic-breathing-478',
    title: 'Latihan Napas 4-7-8 untuk Redakan Dada Sesak & Cemas',
    badge: 'Latihan Relaksasi',
    category: 'Somatic Grounding',
    estimatedReadTime: '2 menit latihan',
    summary: 'Cara bernapas sederhana yang terbukti ampuh menurunkan detak jantung cepat dan rasa panik sebelum ujian atau saat susah tidur.',
    keyTakeaway: 'Menghembuskan napas lebih panjang dari tarikan napas memberi sinyal ke tubuh bahwa kita saat ini aman.',
    targetMoods: ['overwhelmed', 'drained'],
    interactiveType: 'breathing',
    articleSections: [
      {
        heading: 'Bagaimana Cara Kerjanya?',
        paragraphs: [
          'Tarik napas 4 detik lewat hidung, tahan 7 detik dengan santai, lalu hembuskan perlahan 8 detik lewat mulut.',
          'Ulangi 3 sampai 4 kali. Latihan ini langsung membantu detak jantung kembali tenang dan meredakan ketegangan di leher serta dada.'
        ]
      }
    ]
  },
  {
    id: 'sleep-rhythm-hygiene',
    title: 'Mengapa Begadang Malah Bikin Tugas Terasa Makin Berat?',
    badge: 'Kebiasaan Tidur Sehat',
    category: 'Sleep & Rhythm',
    estimatedReadTime: '2 menit baca',
    summary: 'Kurang tidur membuat otak lebih cepat tersinggung, gampang putus asa, dan sulit berpikir jernih.',
    keyTakeaway: 'Tidur cukup bukan buang-buang waktu, melainkan cara agar otak bisa bekerja cerdas esok hari.',
    targetMoods: ['drained', 'neutral'],
    articleSections: [
      {
        heading: 'Efek Nyata Kurang Tidur',
        paragraphs: [
          'Saat kurang tidur, kritik kecil dari dosen yang sebenarnya biasa saja akan terasa seperti bencana besar.',
          'Tidur 6-7 jam membantu pikiran kita kembali jernih untuk menyelesaikan revisi tanpa drama kepanikan.'
        ]
      }
    ]
  }
];

export const VERIFIED_PSYCHOLOGISTS: Psychologist[] = [
  {
    id: 'retno-palupi',
    name: 'Dra. Retno Palupi, M.Psi., Psikolog',
    credentials: 'Psikolog Konseling Mahasiswa & Pendidikan',
    institution: 'Pusat Layanan Konseling Universitas 17 Agustus 1945 Surabaya',
    sippkLicense: 'SIPPK: 198204-Psi-2018 (HIMPSI Jatim)',
    specialties: ['Stres Skripsi & Kuliah', 'Mengelola Emosi', 'Kecemasan Ujian'],
    therapeuticApproach: 'Percakapan Solutif & Terarah',
    consultationTypes: ['Tatap Muka di Kampus Untag (Gedung Graha Wiyata Lt. 2)', 'Konseling Online Terproteksi'],
    rating: 4.9,
    consultationCount: 428,
    feeInfo: 'Gratis untuk Mahasiswa Aktif Untag Surabaya',
    availableSlots: ['Kamis, 22 Okt • 10:00 WIB', 'Jumat, 23 Okt • 13:30 WIB'],
    avatarInitial: 'RP',
    avatarBg: '#0F766E',
    isUntagPartner: true
  },
  {
    id: 'fikri-andriansyah',
    name: 'Fikri Andriansyah, M.Psi., Psikolog',
    credentials: 'Psikolog Spesialis Dewasa Muda & Karier',
    institution: 'RS Jiwa Menur Surabaya & Mitra Konseling EmoDiary',
    sippkLicense: 'SIPPK: 201911-Psi-KL-091',
    specialties: ['Kecemasan Karier & Masa Depan', 'Rasa Rendah Diri', 'Kepanikan'],
    therapeuticApproach: 'Penerimaan & Latihan Keberanian',
    consultationTypes: ['Konseling Online Terproteksi'],
    rating: 4.8,
    consultationCount: 310,
    feeInfo: 'Subsidi Mahasiswa: Rp 75.000 / Sesi',
    availableSlots: ['Rabu, 21 Okt • 19:00 WIB', 'Jumat, 23 Okt • 16:00 WIB'],
    avatarInitial: 'FA',
    avatarBg: '#0F766E',
    isUntagPartner: false
  }
];

export const CRISIS_HOTLINES = [
  {
    name: 'Layanan Bantuan Darurat Kesehatan Jiwa (LISA Kemenkes)',
    phone: '119 (Tekan 8)',
    desc: 'Layanan krisis 24 jam bebas pulsa seluruh Indonesia',
    status: 'Buka 24 Jam • Bebas Pulsa'
  },
  {
    name: 'Pusat Bimbingan & Konseling Mahasiswa Untag Surabaya',
    phone: '0812-3456-7890 (WhatsApp Kemahasiswaan)',
    desc: 'Layanan konseling kampus di Gedung Graha Wiyata Lantai 2',
    status: 'Senin - Jumat • 08:00 - 16:00 WIB'
  }
];

export const SCIENTIFIC_PAPER_FOUNDATIONS = [
  {
    citation: 'Bakker, D., & Rickard, N. (2018)',
    title: 'Engagement with a mental health app (MoodPrism) for youth',
    journal: 'Computers in Human Behavior',
    contribution: 'Metode pencatatan mood harian yang ringan tanpa membebani pikiran pengguna muda.'
  },
  {
    citation: 'Fitzpatrick, K. K., et al. (2017)',
    title: 'Delivering CBT to young adults using an automated conversational agent',
    journal: 'JMIR Mental Health',
    contribution: 'Prinsip tanya-jawab santai untuk membantu mengenali pikiran yang keliru tanpa menggantikan dokter.'
  },
  {
    citation: 'World Health Organization (WHO, 2021)',
    title: 'Ethics and governance of artificial intelligence for health',
    journal: 'WHO Guidance',
    contribution: 'Prinsip etika agar AI selalu berada di bawah pengawasan manusia dan menjaga penuh privasi pengguna.'
  }
];

export const COMPETITION_TEAM_METADATA = {
  institution: 'Universitas 17 Agustus 1945 Surabaya (Untag Surabaya)',
  year: '2026',
  subTheme: '',
  paperTitle: 'EMODIARY: Platform Digital Konseling dan Layanan Dukungan Psikologis Terintegrasi Berbasis Artificial Intelligence Beretika',
  authors: [
    { name: 'Inka Sukma Melati', role: 'Desain Produk & Alur Pengguna' },
    { name: 'Linda Anas Tasya Oktaviani', role: 'Riset Etika Psikologi & Panduan Relaksasi' },
    { name: 'Nauvan Toriq Dwi Putrantoko', role: 'Pengembangan Sistem & Analitik Mood' },
    { name: 'Arinil Hidayah Burhanuddin', role: 'Tata Kelola Data & Kerahasiaan Pengguna' }
  ]
};

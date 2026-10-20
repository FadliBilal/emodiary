import React from 'react';
import { MoodEntry, DemoScenario } from '../../types';
import { MOOD_DEFINITIONS } from '../../data/emodiaryData';
import { ArrowRight, Wind, ShieldCheck, HeartHandshake, Sparkles, TrendingUp, BookOpen } from 'lucide-react';

interface UnifiedJourneyViewProps {
  scenario: DemoScenario;
  entries: MoodEntry[];
  consecutiveNegativeDays: number;
  onNavigateToTab: (tab: 'record' | 'understand' | 'support' | 'connect') => void;
  onOpenBreathingModal: () => void;
}

export const UnifiedJourneyView: React.FC<UnifiedJourneyViewProps> = ({
  scenario,
  entries,
  consecutiveNegativeDays,
  onNavigateToTab,
  onOpenBreathingModal,
}) => {
  const latestEntry = entries[entries.length - 1] || entries[0];
  const latestMoodMeta = MOOD_DEFINITIONS[latestEntry?.mood] || MOOD_DEFINITIONS.neutral;
  const isElevatedRisk = consecutiveNegativeDays >= 4;

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
      {/* Persona Context & Header */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Contoh Profil:</span>
          <strong className="text-slate-900 font-semibold">{scenario.name}</strong>
          <span>•</span>
          <span className="truncate max-w-[200px] sm:max-w-none">{scenario.role}</span>
          <span>•</span>
          <span
            className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${
              isElevatedRisk
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-teal-50 text-teal-700 border border-teal-200'
            }`}
          >
            {scenario.riskBadgeText}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight break-words">
          Alur Terpadu Pendampingan Mental Mahasiswa
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-3xl break-words">
          Empat langkah terhubung untuk mencurahkan perasaan harian, mengenali pola stres yang sering muncul, menenangkan pikiran, hingga terhubung dengan konselor kampus saat kamu membutuhkan teman bicara.
        </p>
      </div>

      {/* 4-Step Intuitive Stepper Cards (Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 w-full min-w-0">
        <button
          onClick={() => onNavigateToTab('record')}
          className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 text-left transition-all group shadow-xs hover:shadow-md cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
              Langkah 1
            </span>
            <BookOpen className="w-4 h-4 text-teal-600 shrink-0" />
          </div>
          <span className="font-bold text-sm sm:text-base text-slate-900 block group-hover:text-teal-700 transition-colors">
            Catat Perasaan
          </span>
          <span className="text-xs text-slate-500 mt-1 block">
            {latestMoodMeta.label.split('&')[0]} ({latestEntry?.score}/5)
          </span>
        </button>

        <button
          onClick={() => onNavigateToTab('understand')}
          className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 text-left transition-all group shadow-xs hover:shadow-md cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
              Langkah 2
            </span>
            <TrendingUp className="w-4 h-4 text-teal-600 shrink-0" />
          </div>
          <span className="font-bold text-sm sm:text-base text-slate-900 block group-hover:text-teal-700 transition-colors">
            Lihat Pola Mingguan
          </span>
          <span className="text-xs text-slate-500 mt-1 block">
            {consecutiveNegativeDays > 0
              ? `${consecutiveNegativeDays} hari merasa berat`
              : 'Pola perasaan terpantau stabil'}
          </span>
        </button>

        <button
          onClick={() => onNavigateToTab('support')}
          className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 text-left transition-all group shadow-xs hover:shadow-md cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
              Langkah 3
            </span>
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
          </div>
          <span className="font-bold text-sm sm:text-base text-slate-900 block group-hover:text-teal-700 transition-colors">
            Teman Refleksi & Napas
          </span>
          <span className="text-xs text-slate-500 mt-1 block">
            Tanya jawab jernih & relaksasi
          </span>
        </button>

        <button
          onClick={() => onNavigateToTab('connect')}
          className={`p-4 sm:p-5 lg:p-6 rounded-2xl border text-left transition-all group shadow-xs hover:shadow-md cursor-pointer min-h-[44px] ${
            isElevatedRisk
              ? 'bg-rose-50/70 border-rose-200 hover:border-rose-400'
              : 'bg-white border-slate-200 hover:border-teal-600'
          }`}
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span
              className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                isElevatedRisk ? 'text-rose-700 bg-rose-100/80' : 'text-teal-700 bg-teal-50'
              }`}
            >
              Langkah 4
            </span>
            <HeartHandshake
              className={`w-4 h-4 shrink-0 ${isElevatedRisk ? 'text-rose-600' : 'text-teal-600'}`}
            />
          </div>
          <span className="font-bold text-sm sm:text-base text-slate-900 block group-hover:text-rose-600 transition-colors">
            Bantuan Konselor
          </span>
          <span className="text-xs text-slate-500 mt-1 block">
            {isElevatedRisk ? 'Konselor Untag Siap Mendampingi' : 'Pemantauan Mandiri'}
          </span>
        </button>
      </div>

      {/* Main Focus Spotlight Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 shadow-xs w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 sm:pb-5">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-teal-700 block">
              Ringkasan Kondisi Terkini
            </span>
            <h3 className="font-bold text-lg sm:text-xl text-slate-900 mt-0.5 truncate">
              Catatan Terakhir: {scenario.name}
            </h3>
          </div>

          <button
            onClick={() => onNavigateToTab('understand')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 self-start sm:self-auto bg-teal-50 px-3.5 py-2 rounded-xl border border-teal-100 transition-colors cursor-pointer min-h-[44px]"
          >
            <span>Lihat Grafik Perjalanan Lengkap</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* 3 Metric Cards (Mobile: 1 col, Tablet/Desktop: 3 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs w-full min-w-0">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1 min-w-0">
            <span className="text-slate-500 block text-xs">Perasaan Terakhir</span>
            <strong className="text-base sm:text-lg text-slate-900 block truncate">
              {latestMoodMeta.label}
            </strong>
            <span className="text-[11px] text-slate-500 block">Skor {latestEntry?.score} dari 5</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1 min-w-0">
            <span className="text-slate-500 block text-xs">Durasi Merasa Berat</span>
            <strong
              className={`text-base sm:text-lg block truncate ${
                isElevatedRisk ? 'text-rose-600' : 'text-teal-700'
              }`}
            >
              {consecutiveNegativeDays > 0
                ? `${consecutiveNegativeDays} Hari Berturut-turut`
                : 'Kondisi Stabil'}
            </strong>
            <span className="text-[11px] text-slate-500 block truncate">
              {isElevatedRisk
                ? 'Sudah >4 hari berturut lelah'
                : 'Masih dalam batas wajar'}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1 min-w-0">
            <span className="text-slate-500 block text-xs">Waktu Tidur Semalam</span>
            <strong className="text-base sm:text-lg text-slate-900 block">
              {latestEntry?.sleepHours || 4} Jam
            </strong>
            <span className="text-[11px] text-slate-500 block truncate">
              {(latestEntry?.sleepHours || 4) < 5
                ? 'Kurang dari tidur sehat (7-8 jam)'
                : 'Waktu tidur cukup baik'}
            </span>
          </div>
        </div>

        {/* Recent Journal Quote */}
        <div className="space-y-1.5 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Kutipan Catatan Terakhir:
          </span>
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-800 italic break-words">
            "{latestEntry?.textNote}"
          </div>
        </div>

        {/* CTA Escalation */}
        {isElevatedRisk ? (
          <div className="p-4 sm:p-6 rounded-2xl bg-rose-50/80 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-xs">
            <div className="space-y-1 max-w-xl min-w-0">
              <span className="font-bold text-rose-800 text-sm sm:text-base block">
                Kami Siap Mendampingimu (Konseling Kampus Bebas Biaya)
              </span>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-words">
                Sudah beberapa hari ini pikiranmu terasa cukup berat. Kamu tidak harus memikul semuanya sendirian. Konselor kampus Untag Surabaya di Gedung Graha Wiyata Lt. 2 siap mendengarkan tanpa menghakimi.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('connect')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm shrink-0 transition-all shadow-xs min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              Lihat Jadwal & Lembar Ringkasan
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2.5 text-slate-600 min-w-0">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
              <span className="text-xs sm:text-sm">Perasaanmu terpantau stabil minggu ini. Terus jaga waktu istirahatmu ya!</span>
            </div>
            <button
              onClick={onOpenBreathingModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 self-start sm:self-auto border border-teal-200 min-h-[44px] cursor-pointer"
            >
              <Wind className="w-4 h-4 shrink-0" />
              <span>Latihan Napas Santai 4-7-8</span>
            </button>
          </div>
        )}
      </div>

      {/* Prominent Next Step Navigation Bar at the Bottom */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-slate-200 w-full min-w-0">
        <span className="text-xs text-slate-500 text-center sm:text-left">
          Langkah 1 dari 4: Mulai alur pendampingan dengan mencatat perasaanmu hari ini
        </span>

        <button
          onClick={() => onNavigateToTab('record')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <span>Mulai Langkah 1: Catat Perasaanmu</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};

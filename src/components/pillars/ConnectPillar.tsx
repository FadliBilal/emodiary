import React, { useState } from 'react';
import { Psychologist, ConsentExportState, MoodEntry } from '../../types';
import { VERIFIED_PSYCHOLOGISTS } from '../../data/emodiaryData';
import { FileText, Calendar, Lock, PhoneCall, ExternalLink, ShieldCheck, ArrowLeft, RotateCcw } from 'lucide-react';

interface ConnectPillarProps {
  entries: MoodEntry[];
  consecutiveNegativeDays: number;
  onOpenClinicalSummary: (options: ConsentExportState) => void;
  onSelectPsychologistForBooking: (psychologist: Psychologist) => void;
  onNavigateToTab?: (tab: 'journey' | 'support') => void;
}

export const ConnectPillar: React.FC<ConnectPillarProps> = ({
  entries,
  consecutiveNegativeDays,
  onOpenClinicalSummary,
  onSelectPsychologistForBooking,
  onNavigateToTab,
}) => {
  const [consentOptions, setConsentOptions] = useState<ConsentExportState>({
    includeMoodTrajectory: true,
    includeStressorTags: true,
    includeSleepCorrelation: true,
    includePersistenceRiskScore: true,
    includeRawDiaryNotes: false, // Default false to strictly preserve privacy
    notesToPsychologist: 'Saya mengalami kesulitan tidur dan merasa sangat tertekan dengan revisi skripsi.',
  });

  const toggleOption = (key: keyof ConsentExportState) => {
    if (typeof consentOptions[key] === 'boolean') {
      setConsentOptions((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
      {/* Modern Header with 1-Sentence Guide */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block">
          Langkah 4 dari 4: Bantuan Profesional & Konseling
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight break-words">
          Terhubung dengan Psikolog & Konselor (Talk to a Professional)
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-3xl break-words">
          Jika beban terasa terlalu berat untuk dipikul sendiri, konselor di kampus Untag Surabaya siap mendampingimu secara gratis dan terjamin kerahasiaannya.
        </p>
      </div>

      {/* Main Grid: Stacked until lg (1024px) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
        {/* Left: Consent Briefing (5 cols on lg, full width on mobile/tablet) */}
        <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 text-xs sm:text-sm shadow-sm w-full min-w-0">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-teal-700 block">
              Privasi Terjamin & Berizin
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-0.5 break-words">
              Lembar Ringkasan untuk Konselor (1 Halaman)
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed break-words">
              Pilih data yang kamu izinkan untuk dibagikan kepada konselor agar kamu tidak perlu lelah menceritakan semuanya dari awal.
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors min-h-[44px]">
              <input
                type="checkbox"
                checked={consentOptions.includeMoodTrajectory}
                onChange={() => toggleOption('includeMoodTrajectory')}
                className="mt-1 accent-teal-700 w-4 h-4 cursor-pointer shrink-0"
              />
              <div className="min-w-0">
                <span className="font-semibold text-slate-900 block text-xs sm:text-sm">
                  Grafik Naik-Turun Perasaan 7 Hari
                </span>
                <span className="text-xs text-slate-500 block break-words">
                  Hanya grafik skor angka tanpa menampilkan isi catatan harian
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors min-h-[44px]">
              <input
                type="checkbox"
                checked={consentOptions.includeStressorTags}
                onChange={() => toggleOption('includeStressorTags')}
                className="mt-1 accent-teal-700 w-4 h-4 cursor-pointer shrink-0"
              />
              <div className="min-w-0">
                <span className="font-semibold text-slate-900 block text-xs sm:text-sm">
                  Topik Pemicu Stres (Skripsi, Tidur, dll.)
                </span>
                <span className="text-xs text-slate-500 block break-words">
                  Label pemicu tanpa membuka detail ceritamu
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors min-h-[44px]">
              <input
                type="checkbox"
                checked={consentOptions.includeSleepCorrelation}
                onChange={() => toggleOption('includeSleepCorrelation')}
                className="mt-1 accent-teal-700 w-4 h-4 cursor-pointer shrink-0"
              />
              <div className="min-w-0">
                <span className="font-semibold text-slate-900 block text-xs sm:text-sm">
                  Rata-rata Waktu & Jam Tidur
                </span>
                <span className="text-xs text-slate-500 block break-words">
                  Membantu konselor memahami tingkat kelelahan fisikmu
                </span>
              </div>
            </label>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
              <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span className="break-words">
                <strong>Catatan Pribadi Tetap Terkunci:</strong> Tulisan curhat dan rekaman suaramu tidak akan pernah dibagikan kepada psikolog atau siapa pun.
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenClinicalSummary(consentOptions)}
            className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs min-h-[44px] cursor-pointer"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Lihat Pratinjau Lembar Ringkasan</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>
        </div>

        {/* Right: Directory (7 cols on lg, full width on mobile/tablet) */}
        <div className="lg:col-span-7 space-y-4 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Konselor Kampus & Psikolog Berlisensi
            </h3>
            <span className="text-teal-700 font-semibold flex items-center gap-1.5 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Layanan Resmi Untag Surabaya</span>
            </span>
          </div>

          <div className="space-y-4 w-full min-w-0">
            {VERIFIED_PSYCHOLOGISTS.map((psy) => (
              <div
                key={psy.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-7 space-y-3.5 sm:space-y-4 text-xs sm:text-sm hover:border-slate-300 transition-all shadow-sm w-full min-w-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                  <div className="min-w-0">
                    <h4 className="font-bold text-base sm:text-lg text-slate-900">{psy.name}</h4>
                    <span className="text-slate-600 text-xs sm:text-sm block mt-0.5">{psy.credentials}</span>
                    <span className="text-slate-500 text-xs block mt-0.5 font-medium">
                      {psy.institution}
                    </span>
                  </div>
                  <span className="text-[11px] text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md font-mono shrink-0 border border-teal-100 font-semibold self-start">
                    {psy.sippkLicense.split('(')[0]}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                  <div className="break-words">
                    <span className="text-slate-500">Keahlian:</span>{' '}
                    <strong className="text-slate-900">{psy.specialties.join(', ')}</strong>
                  </div>
                  <div className="text-teal-800">
                    <span className="text-slate-500">Biaya Konsultasi:</span>{' '}
                    <strong className="text-teal-900 font-bold">{psy.feeInfo}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-slate-500">
                    Jadwal terdekat: <strong className="text-slate-900">{psy.availableSlots[0]}</strong>
                  </span>
                  <button
                    onClick={() => onSelectPsychologistForBooking(psy)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs min-h-[44px] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Jadwalkan Konsultasi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-slate-600 w-full min-w-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="break-words">Butuh bantuan darurat saat ini? Hotline Bebas Pulsa 24 Jam:</span>
            </div>
            <a href="tel:119" className="font-bold text-rose-600 hover:underline min-h-[36px] flex items-center shrink-0">
              119 (Tekan 8)
            </a>
          </div>
        </div>
      </div>

      {/* Prominent Next Step Navigation Bar at the Bottom */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 w-full min-w-0">
        <button
          onClick={() => (onNavigateToTab ? onNavigateToTab('support') : null)}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Kembali ke Langkah 3: Teman Cerita & Napas</span>
        </button>

        <button
          onClick={() => (onNavigateToTab ? onNavigateToTab('journey') : null)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 shrink-0" />
          <span>Selesai: Kembali ke Ringkasan Alur Lengkap</span>
        </button>
      </div>
    </div>
  );
};

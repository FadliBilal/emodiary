import React from 'react';
import { ConsentExportState, MoodEntry, DemoScenario } from '../../types';
import { FileText, Printer, Download, Lock } from 'lucide-react';

interface ClinicalSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: DemoScenario;
  entries: MoodEntry[];
  consentOptions: ConsentExportState;
}

export const ClinicalSummaryModal: React.FC<ClinicalSummaryModalProps> = ({
  isOpen,
  onClose,
  scenario,
  entries,
  consentOptions,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const displayedEntries = entries.slice(-7);
  const avgSleep = (
    displayedEntries.reduce((acc, c) => acc + (c.sleepHours || 5), 0) / displayedEntries.length
  ).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-[95vw] sm:w-full max-w-lg sm:max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl text-slate-900 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
          <div className="flex items-center gap-2 text-teal-700 min-w-0">
            <FileText className="w-4 h-4 shrink-0" />
            <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
              Pratinjau Lembar Ringkasan Konseling (1 Halaman)
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 border border-slate-200 transition-all min-h-[38px] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Cetak / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-base font-bold text-slate-400 hover:text-slate-800 p-1 min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Tutup"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Document Sheet */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 space-y-3.5 sm:space-y-4 text-xs w-full min-w-0">
          <div className="border-b border-slate-900 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 block">
                Pusat Layanan Bimbingan & Konseling Mahasiswa
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                LEMBAR RINGKASAN KONDISI MAHASISWA
              </h3>
            </div>
            <div className="text-[11px] text-slate-500 sm:text-right">
              Universitas 17 Agustus 1945 Surabaya
            </div>
          </div>

          {/* Demographics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Nama Mahasiswa</span>
              <strong className="text-slate-900 truncate block">{scenario.name}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Usia</span>
              <span>{scenario.age} Tahun</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Kampus</span>
              <span>Untag Surabaya</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Periode Pantauan</span>
              <span>7 Hari Terakhir</span>
            </div>
          </div>

          {/* Mood 7 Days */}
          {consentOptions.includeMoodTrajectory && (
            <div className="space-y-1.5">
              <span className="font-bold text-[11px] uppercase tracking-wider text-slate-600 block">
                1. Skor Perasaan 7 Hari Terakhir (Skala 1 - 5)
              </span>
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
                {displayedEntries.map((e, idx) => (
                  <div key={idx} className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block">{e.dayLabel.slice(0, 3)}</span>
                    <strong
                      className={`text-[11px] sm:text-xs block ${
                        e.score <= 2 ? 'text-rose-600 font-bold' : 'text-slate-900'
                      }`}
                    >
                      {e.score}/5
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stressors & Sleep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
            {consentOptions.includeStressorTags && (
              <div className="space-y-1">
                <span className="font-bold text-[11px] uppercase tracking-wider text-slate-600 block">
                  2. Pemicu Stres yang Sering Terjadi
                </span>
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Skripsi & Revisi:</span>
                    <strong className="text-rose-600">5 kali (80%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Kurang Tidur (&lt;4 Jam):</span>
                    <strong className="text-rose-600">4 kali (71%)</strong>
                  </div>
                </div>
              </div>
            )}

            {consentOptions.includeSleepCorrelation && (
              <div className="space-y-1">
                <span className="font-bold text-[11px] uppercase tracking-wider text-slate-600 block">
                  3. Pola & Jam Istirahat
                </span>
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Rata-rata Waktu Tidur:</span>
                    <strong className="text-rose-600">{avgSleep} Jam / Malam</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu Rentan:</span>
                    <strong>23:00 - 02:30 WIB</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {consentOptions.notesToPsychologist && (
            <div className="space-y-1">
              <span className="font-bold text-[11px] uppercase tracking-wider text-slate-600 block">
                4. Catatan Pengantar dari Mahasiswa
              </span>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 italic break-words">
                "{consentOptions.notesToPsychologist}"
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2 leading-relaxed">
            <Lock className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
            <span className="break-words">
              Catatan harian privat dan rekaman suara mahasiswa tetap dirahasiakan dan tidak dicantumkan di lembar ini.
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 flex items-center justify-center gap-1.5 shadow-xs font-medium min-h-[44px] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

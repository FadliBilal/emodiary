import React from 'react';
import {
  COMPETITION_TEAM_METADATA,
  SCIENTIFIC_PAPER_FOUNDATIONS
} from '../../data/emodiaryData';
import { Award, BookOpen, Users, AlertCircle, ShieldCheck } from 'lucide-react';

interface JudgePitchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JudgePitchDrawer: React.FC<JudgePitchDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-full sm:max-w-lg lg:max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 shadow-2xl flex flex-col justify-between text-xs sm:text-sm text-slate-900">
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 text-teal-700 min-w-0">
              <Award className="w-5 h-5 shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-sm sm:text-base text-slate-900 block truncate">
                  Info Lomba & Tim Peneliti
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium block truncate">
                  Universitas 17 Agustus 1945 Surabaya (2026)
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-base font-bold text-slate-400 hover:text-slate-800 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Tutup Panel Info"
            >
              ✕
            </button>
          </div>

          {/* Paper Info */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug break-words">
              {COMPETITION_TEAM_METADATA.paperTitle}
            </h3>
            <span className="text-xs text-slate-500 block font-medium">
              {COMPETITION_TEAM_METADATA.institution}
            </span>
          </div>

          {/* The Empirical Problem: SKI 2023 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Latar Belakang Masalah (Data SKI 2023)</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs break-words">
              Prevalensi depresi pada usia 15–24 tahun di Indonesia mencapai <strong>2.0%</strong>, namun hanya <strong>10.4%</strong> yang mencari bantuan profesional. Sebanyak <strong>89.6%</strong> berjuang dalam diam karena stigma malu, biaya, dan tidak menyadari bahwa diri mereka sedang butuh bantuan.
            </p>
          </div>

          {/* The Novelty: 4-Pillar Continuous Loop */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2.5">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Solusi EMODIARY: Alur 4 Langkah Berkelanjutan</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <div className="break-words">
                <strong className="text-slate-900">1. Catat (Record):</strong> Mahasiswa mencurahkan isi hati lewat tulisan atau rekaman suara tanpa takut dihakimi.
              </div>
              <div className="break-words">
                <strong className="text-slate-900">2. Pahami (Understand):</strong> Grafik sederhana 7 hari yang memperlihatkan pola waktu lelah dan memberi tanda bila stres berlangsung lebih dari 4 hari berturut-turut.
              </div>
              <div className="break-words">
                <strong className="text-slate-900">3. Dukung (Support):</strong> Teman cerita AI dengan pertanyaan reflektif untuk menjernihkan pikiran serta latihan pernapasan rileks 4-7-8.
              </div>
              <div className="break-words">
                <strong className="text-slate-900">4. Terhubung (Connect):</strong> Menghubungkan langsung ke konselor kampus Untag Surabaya dengan lembar ringkasan 1 halaman atas izin mahasiswa, tanpa membuka catatan buku harian privatnya.
              </div>
            </div>
          </div>

          {/* Authors */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 shrink-0" />
              <span>Tim Pengembang (Untag Surabaya)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {COMPETITION_TEAM_METADATA.authors.map((a, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                  <strong className="text-slate-900 block truncate">{a.name}</strong>
                  <span className="text-slate-500 text-[11px] block truncate">{a.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Papers */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Rujukan Ilmiah Utama</span>
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              {SCIENTIFIC_PAPER_FOUNDATIONS.map((p, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 break-words">
                  <strong className="text-slate-900">{p.citation}</strong>: {p.contribution}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            Tutup Panel Info
          </button>
        </div>
      </div>
    </div>
  );
};

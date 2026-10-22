import React, { useState } from 'react';
import { UserAgeCategory, ThemeMode } from '../../types';
import { ShieldCheck, ArrowRight, ArrowLeft, Check, Sparkles, HeartHandshake, AlertCircle } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  theme: ThemeMode;
  initialAgeCategory: UserAgeCategory;
  onComplete: (ageCategory: UserAgeCategory) => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  theme,
  initialAgeCategory,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAge, setSelectedAge] = useState<UserAgeCategory>(initialAgeCategory || '18-21');
  const [hasAgreed, setHasAgreed] = useState(true);

  if (!isOpen) return null;

  const ageOptions: {
    id: UserAgeCategory;
    title: string;
    stage: string;
    description: string;
    icon: string;
  }[] = [
    {
      id: 'under-18',
      title: '< 18 Tahun',
      stage: 'Remaja / Sekolah',
      description: 'Menjaga semangat belajar, pertemanan, dan transisi menuju kedewasaan.',
      icon: '🌱',
    },
    {
      id: '18-21',
      title: '18 – 21 Tahun',
      stage: 'Mahasiswa Awal (Semester 1–4)',
      description: 'Adaptasi dunia perkuliahan, padatnya tugas, dan dinamika pertemanan kampus.',
      icon: '🎓',
    },
    {
      id: '22-24',
      title: '22 – 24 Tahun',
      stage: 'Mahasiswa Akhir & Skripsi',
      description: 'Menghadapi revisi skripsi, magang, ujian akhir, serta persiapan karier masa depan.',
      icon: '📚',
    },
    {
      id: 'above-24',
      title: '> 24 Tahun',
      stage: 'Umum & Pascasarjana',
      description: 'Menyeimbangkan tuntutan karier, studi lanjut, keluarga, dan kesehatan pikiran.',
      icon: '🌿',
    },
  ];

  const handleFinish = () => {
    onComplete(selectedAge);
  };

  const isGreen = theme === 'green';
  const primaryBtnClass = isGreen
    ? 'bg-[#115E59] hover:bg-[#0F766E] text-white'
    : 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white';
  const badgeClass = isGreen
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
    : 'bg-purple-50 text-purple-800 border-purple-200';
  const activeBorderClass = isGreen
    ? 'border-[#115E59] bg-emerald-50/40 ring-1 ring-[#115E59]'
    : 'border-[#6D28D9] bg-purple-50/40 ring-1 ring-[#6D28D9]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${badgeClass}`}>
              E
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 block leading-tight">EMODIARY</span>
              <span className="text-[11px] text-slate-500">Pendamping Kesehatan Emosional Mahasiswa</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? primaryBtnClass : 'bg-slate-100 text-slate-600'}`}>
              1
            </span>
            <span className="text-slate-300">―</span>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? primaryBtnClass : 'bg-slate-100 text-slate-600'}`}>
              2
            </span>
          </div>
        </div>

        {/* STEP 1: Tinjauan Usia (Flo Health Style) */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="space-y-1.5">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border inline-block ${badgeClass}`}>
                Langkah 1 dari 2: Tinjauan Usia
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Pilih Kelompok Usiamu
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Informasi ini membantu EmoDiary menyajikan bahasa dan pendampingan yang pas dengan fase keseharianmu.
              </p>
            </div>

            {/* Age Selection Cards */}
            <div className="space-y-2.5">
              {ageOptions.map((opt) => {
                const isSelected = selectedAge === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedAge(opt.id)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 min-h-[56px] ${
                      isSelected
                        ? activeBorderClass
                        : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5 select-none">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-slate-900 block truncate">
                          {opt.title}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                          {opt.stage}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                    <div className="mt-1 shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? isGreen
                              ? 'bg-[#115E59] border-[#115E59] text-white'
                              : 'bg-[#6D28D9] border-[#6D28D9] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Navigation */}
            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${primaryBtnClass}`}
              >
                <span>Lanjut ke Penjelasan Aplikasi</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Disclaimer Etika & Batasan Medis (Non-Diagnostik) */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="space-y-1.5">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border inline-block ${badgeClass}`}>
                Langkah 2 dari 2: Etika & Batasan Medis
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Penting Diketahui Sebelum Mulai
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                EmoDiary dirancang sebagai ruang aman dan mandiri untuk kesehatan emosionalmu.
              </p>
            </div>

            {/* 3 Clear Disclaimer Points */}
            <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <strong className="text-xs sm:text-sm text-slate-900 block font-bold">
                    Bukan Pengganti Diagnosis Dokter / Psikolog
                  </strong>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    EmoDiary adalah sarana mandiri untuk mencatat perasaan dan melatih pernapasan. Aplikasi ini tidak memberikan diagnosis medis, resep obat, atau terapi klinis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2.5 border-t border-slate-200/80">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <strong className="text-xs sm:text-sm text-slate-900 block font-bold">
                    Data 100% Aman & Privat di Perambanmu
                  </strong>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Seluruh catatan harian dan rekaman suaramu disimpan secara lokal di perangkat ini, tidak dibagikan ke pihak mana pun tanpa izin eksplisit darimu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2.5 border-t border-slate-200/80">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <strong className="text-xs sm:text-sm text-slate-900 block font-bold">
                    Konselor Kampus Siap Membantu
                  </strong>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Jika kamu merasa beban pikiran sudah berlangsung berhari-hari, konselor kampus Untag Surabaya di Gedung Graha Wiyata Lt. 2 siap mendengarkan secara gratis.
                  </p>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
                className="mt-0.5 accent-teal-700 w-4 h-4 cursor-pointer shrink-0"
              />
              <span className="text-xs text-slate-700 leading-relaxed">
                Saya mengerti bahwa EmoDiary adalah pendamping refleksi mandiri, dan saya siap menggunakan aplikasi ini secara sadar dan bijak.
              </span>
            </label>

            {/* Navigation Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Ubah Pilihan Usia</span>
              </button>

              <button
                type="button"
                disabled={!hasAgreed}
                onClick={handleFinish}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
                  hasAgreed ? primaryBtnClass : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Mulai Masuk ke EmoDiary</span>
                <Sparkles className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

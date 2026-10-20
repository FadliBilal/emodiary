import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface EthicalPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicalPrivacyModal: React.FC<EthicalPrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-[95vw] sm:w-full max-w-xl max-h-[85vh] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl text-xs sm:text-sm text-slate-900 mx-auto">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5 text-teal-700 min-w-0">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 truncate">
                Keamanan Data & Panduan Etika
              </h3>
              <span className="text-[11px] sm:text-xs text-slate-500 block truncate">
                Sesuai Panduan Etika AI WHO (2021) & UU Perlindungan Data Pribadi (UU PDP)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-base font-bold text-slate-400 hover:text-slate-800 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* 6 Core Principles in Plain Indonesian */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 block">
            Komitmen Utama untuk Kenyamanan & Keamananmu
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>1. Kendali Penuh di Tanganmu</span>
              </strong>
              <p className="text-slate-600 leading-relaxed break-words">
                AI di sini bukan dokter atau pengganti psikolog. Kamu yang selalu memegang kendali atas apa yang ingin diceritakan.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>2. Aman Tanpa Penghakiman</span>
              </strong>
              <p className="text-slate-600 leading-relaxed break-words">
                Ruang curhat bebas dari vonis atau cap medis. Kamu bebas meluapkan pikiran apa pun dengan aman.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>3. Transparan & Masuk Akal</span>
              </strong>
              <p className="text-slate-600 leading-relaxed break-words">
                Jika aplikasi menyarankan untuk mengobrol dengan konselor, alasannya dijelaskan secara terbuka dan jelas.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>4. Didampingi Ahli Kampus</span>
              </strong>
              <p className="text-slate-600 leading-relaxed break-words">
                Dikembangkan dan diawasi bersama akademisi Fakultas Teknik & Fakultas Psikologi Untag Surabaya.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>5. Gratis untuk Mahasiswa</span>
              </strong>
              <p className="text-slate-600 leading-relaxed break-words">
                Layanan konseling di Pusat Konseling Untag Surabaya bebas biaya bagi seluruh mahasiswa aktif.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>6. Ringan & Cepat Diakses</span>
              </strong>
              <p className="text-slate-600 leading-relaxed break-words">
                Aplikasi dirancang ringan dan hemat kuota agar mudah digunakan di perangkat ponsel maupun laptop.
              </p>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1.5 text-xs">
          <span className="font-bold text-teal-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Kerahasiaan Catatan Buku Harianmu</span>
          </span>
          <p className="text-slate-700 leading-relaxed break-words">
            Catatan harian dan rekaman suaramu tersimpan secara privat di perambanmu. Data catatan curhatmu tidak pernah dijual, tidak dibagikan ke pihak ketiga, dan tidak digunakan untuk melatih model kecerdasan buatan luar.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};

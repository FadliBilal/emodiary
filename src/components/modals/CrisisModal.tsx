import React from 'react';
import { CRISIS_HOTLINES } from '../../data/emodiaryData';
import { PhoneCall } from 'lucide-react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-[95vw] sm:w-full max-w-sm max-h-[85vh] overflow-y-auto p-4 sm:p-6 space-y-4 shadow-2xl text-xs sm:text-sm text-slate-900 mx-auto">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-rose-600 min-w-0">
            <PhoneCall className="w-5 h-5 shrink-0" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate">
              Hotline Tanggap Krisis 24 Jam
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-base font-bold text-slate-400 hover:text-slate-800 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-words">
          Jika kamu atau rekanmu mengalami dorongan melukai diri atau rasa cemas berlebih yang sangat berat, jangan ragu untuk segera menghubungi layanan bantuan darurat berikut:
        </p>

        <div className="space-y-2.5">
          {CRISIS_HOTLINES.map((h, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block text-xs sm:text-sm">{h.name}</strong>
              <span className="text-slate-500 text-xs block break-words">{h.desc}</span>
              <a
                href={`tel:${h.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center text-xs sm:text-sm font-bold text-rose-600 hover:underline min-h-[36px]"
              >
                Telepon: {h.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

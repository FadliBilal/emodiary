import React, { useState } from 'react';
import { Psychologist } from '../../types';
import confetti from 'canvas-confetti';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  psychologist: Psychologist | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, psychologist }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultationMode, setConsultationMode] = useState<string>('Tatap Muka di Kampus Untag Surabaya');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingReference, setBookingReference] = useState<string>('');

  if (!isOpen || !psychologist) return null;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `UNTAG-EMO-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingReference(refCode);
    setBookingConfirmed(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // fallback
    }
  };

  const handleClose = () => {
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-[95vw] sm:w-full max-w-md max-h-[85vh] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-2xl text-slate-900 mx-auto">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3 text-xs">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-teal-700 block">
              Konseling Psikologis
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-0.5 truncate">
              {psychologist.name}
            </h3>
            <span className="text-[11px] text-slate-500 block truncate">{psychologist.credentials}</span>
          </div>

          <button
            onClick={handleClose}
            className="text-base font-bold text-slate-400 hover:text-slate-800 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {bookingConfirmed ? (
          <div className="space-y-4 text-center py-2 text-xs">
            <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-lg text-slate-900">
                Jadwal Konsultasi Terkonfirmasi
              </h4>
              <p className="text-xs text-slate-500">
                Konfirmasi telah dikirimkan ke email mahasiswa.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">No. Referensi:</span>
                <strong className="font-mono text-slate-900">{bookingReference}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Waktu Sesi:</span>
                <strong className="text-slate-900">{selectedSlot || psychologist.availableSlots[0]}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Metode:</span>
                <span className="text-slate-900 font-medium">{consultationMode}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              Kembali ke Alur
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-2 text-[10px]">
                Pilih Jadwal yang Tersedia:
              </label>
              <div className="space-y-2">
                {psychologist.availableSlots.map((slot, idx) => {
                  const isChecked = selectedSlot === slot || (!selectedSlot && idx === 0);
                  return (
                    <label
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all min-h-[44px] ${
                        isChecked
                          ? 'bg-teal-50/60 border-teal-600 text-teal-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                        <span>{slot}</span>
                      </div>
                      <input
                        type="radio"
                        name="slot"
                        checked={isChecked}
                        onChange={() => setSelectedSlot(slot)}
                        className="accent-teal-700 w-4 h-4 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-500 mb-2 text-[10px]">
                Mode Konsultasi:
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 min-h-[44px]">
                  <input
                    type="radio"
                    name="mode"
                    checked={consultationMode.includes('Tatap Muka')}
                    onChange={() => setConsultationMode('Tatap Muka di Kampus Untag Surabaya')}
                    className="mt-0.5 accent-teal-700 w-4 h-4 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 block text-xs sm:text-sm">
                      Tatap Muka di Kampus Untag Surabaya
                    </span>
                    <span className="text-[11px] text-slate-500 block break-words">
                      Gedung Graha Wiyata Lt. 2 (Bebas Biaya Mahasiswa).
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 min-h-[44px]">
                  <input
                    type="radio"
                    name="mode"
                    checked={consultationMode.includes('Tele-Konseling')}
                    onChange={() => setConsultationMode('Tele-Konseling Video Terenkripsi')}
                    className="mt-0.5 accent-teal-700 w-4 h-4 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 block text-xs sm:text-sm">
                      Tele-Konseling Video Terenkripsi
                    </span>
                    <span className="text-[11px] text-slate-500 block break-words">
                      Tautan video aman dikirim ke email terdaftar.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 mt-2 shadow-xs min-h-[44px] cursor-pointer"
            >
              <span>Konfirmasi Sesi Konseling</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

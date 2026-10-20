import React, { useState, useEffect, useRef } from 'react';
import { Wind, Play, Pause, RotateCcw, ShieldCheck } from 'lucide-react';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

export const BreathingModal: React.FC<BreathingModalProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      setPhase('idle');
      setSecondsLeft(4);
      setCompletedCycles(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        if (phase === 'inhale') {
          setPhase('hold');
          return 7;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 8;
        } else if (phase === 'exhale') {
          setCompletedCycles((c) => c + 1);
          setPhase('inhale');
          return 4;
        } else {
          setPhase('inhale');
          return 4;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase]);

  if (!isOpen) return null;

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setSecondsLeft(4);
  };

  const handlePause = () => setIsActive(false);

  const handleReset = () => {
    setIsActive(false);
    setPhase('idle');
    setSecondsLeft(4);
    setCompletedCycles(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: 'Tarik Napas Perlahan (4 Detik)',
          sub: 'Tarik udara lembut melalui hidung, biarkan rongga perut mengembang santai.',
          scale: 'scale-125',
          circleBg: 'bg-teal-700',
          ringColor: 'border-teal-400/30'
        };
      case 'hold':
        return {
          title: 'Tahan Napas Lembut (7 Detik)',
          sub: 'Biarkan tubuh menyerap oksigen tanpa menegangkan bahu atau leher.',
          scale: 'scale-125',
          circleBg: 'bg-teal-800',
          ringColor: 'border-teal-500/40'
        };
      case 'exhale':
        return {
          title: 'Hembuskan Panjang (8 Detik)',
          sub: 'Keluarkan napas perlahan lewat bibir untuk menenangkan denyut jantung.',
          scale: 'scale-90',
          circleBg: 'bg-slate-700',
          ringColor: 'border-slate-400/30'
        };
      default:
        return {
          title: 'Latihan Relaksasi Napas 4-7-8',
          sub: 'Duduk tegak dengan rileks, letakkan tangan di atas pangkuan dan bernapas wajar.',
          scale: 'scale-100',
          circleBg: 'bg-teal-700',
          ringColor: 'border-teal-400/20'
        };
    }
  };

  const instruction = getPhaseInstruction();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-[95vw] sm:w-full max-w-md max-h-[85vh] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-5 shadow-2xl flex flex-col items-center text-center mx-auto">
        {/* Header */}
        <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
          <span className="font-bold text-sm text-slate-900">
            Panduan Pernapasan 4-7-8
          </span>
          <button
            onClick={onClose}
            className="text-base font-bold text-slate-400 hover:text-slate-800 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Phase Titles */}
        <div className="space-y-1.5 min-w-0">
          <h3 className="font-bold text-lg sm:text-xl text-slate-900 transition-all break-words">
            {instruction.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed break-words">
            {instruction.sub}
          </p>
        </div>

        {/* Interactive Breathing Visualizer */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center my-2 sm:my-3">
          <div
            className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${instruction.ringColor} ${
              phase === 'hold' ? 'animate-pulse' : ''
            }`}
          />
          <div
            className={`absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full opacity-20 transition-transform duration-1000 ${instruction.circleBg} ${instruction.scale}`}
          />
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full text-white flex flex-col items-center justify-center shadow-md transition-transform duration-1000 z-10 ${instruction.circleBg} ${instruction.scale}`}
          >
            {isActive ? (
              <>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {secondsLeft}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 mt-0.5">
                  Detik
                </span>
              </>
            ) : (
              <Wind className="w-8 h-8 opacity-90" />
            )}
          </div>
        </div>

        {/* Cycle Count */}
        <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
          Siklus selesai: <strong className="text-slate-900">{completedCycles} dari 4</strong> siklus
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs min-h-[44px] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{phase === 'idle' ? 'Mulai Latihan' : 'Lanjutkan'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px] cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Jeda</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            title="Ulangi dari awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
          <span>Latihan relaksasi ilmiah terbukti membantu menenangkan pikiran.</span>
        </div>
      </div>
    </div>
  );
};

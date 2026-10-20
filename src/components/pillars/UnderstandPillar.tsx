import React, { useState } from 'react';
import { MoodEntry } from '../../types';
import { ArrowRight, ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface UnderstandPillarProps {
  entries: MoodEntry[];
  consecutiveNegativeDays: number;
  clinicalRiskLevel: 'low' | 'moderate' | 'elevated';
  onNavigateToTab: (tab: 'record' | 'support' | 'connect') => void;
}

export const UnderstandPillar: React.FC<UnderstandPillarProps> = ({
  entries,
  consecutiveNegativeDays,
  clinicalRiskLevel,
  onNavigateToTab,
}) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(entries.length - 1);
  const displayedEntries = entries.slice(-7);

  const averageScore = (
    displayedEntries.reduce((acc, c) => acc + c.score, 0) / displayedEntries.length
  ).toFixed(1);

  const averageSleep = (
    displayedEntries.reduce((acc, c) => acc + (c.sleepHours || 6), 0) / displayedEntries.length
  ).toFixed(1);

  const isElevated = consecutiveNegativeDays >= 4;

  const width = 640;
  const height = 210;
  const padX = 40;
  const padY = 30;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const points = displayedEntries.map((e, idx) => {
    const x = padX + (idx / Math.max(1, displayedEntries.length - 1)) * innerW;
    const norm = (e.score - 1) / 4;
    const y = padY + innerH - norm * innerH;
    return { x, y, entry: e, idx };
  });

  const makeCurve = (pts: typeof points) => {
    if (pts.length <= 1) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const curvePath = makeCurve(points);
  const thresholdY = padY + innerH - ((2.0 - 1) / 4) * innerH;

  const activeEntry =
    selectedNodeIndex !== null && displayedEntries[selectedNodeIndex]
      ? displayedEntries[selectedNodeIndex]
      : displayedEntries[displayedEntries.length - 1];

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
      {/* Modern Header with 1-Sentence Guide */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block">
          Langkah 2 dari 4: Pola Emosi Mingguan
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight break-words">
          Grafik Perjalanan Mood Mingguan (Weekly Mood Journey)
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-3xl break-words">
          Pantau naik-turunnya perasaan selama seminggu terakhir dan kenali pemicu yang paling sering membuatmu lelah.
        </p>
      </div>

      {/* Main Grid: Stacked until lg (1024px) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
        {/* Left: SVG Chart (7 cols on lg, full width on mobile/tablet) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5 w-full min-w-0">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 shadow-sm w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-3 sm:pb-4">
              <span className="font-bold text-sm sm:text-base text-slate-900">
                Grafik Perasaan 7 Hari Terakhir
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-rose-500 inline-block"></span>
                <span>Garis merah: Batas lelah / butuh jeda</span>
              </span>
            </div>

            {/* SVG Chart with Responsive Aspect Ratio & ViewBox scaling */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[300px] overflow-hidden flex items-center justify-center">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full select-none"
              >
                {[5, 4, 3, 2, 1].map((lvl) => {
                  const y = padY + innerH - ((lvl - 1) / 4) * innerH;
                  return (
                    <g key={lvl}>
                      <line
                        x1={padX}
                        y1={y}
                        x2={width - padX}
                        y2={y}
                        stroke="#F1F5F9"
                        strokeWidth="1"
                      />
                      <text
                        x={padX - 8}
                        y={y + 3}
                        textAnchor="end"
                        fontSize="9"
                        fill="#94A3B8"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {lvl}
                      </text>
                    </g>
                  );
                })}

                {/* Distress threshold line */}
                <line
                  x1={padX}
                  y1={thresholdY}
                  x2={width - padX}
                  y2={thresholdY}
                  stroke="#E11D48"
                  strokeDasharray="4 4"
                  strokeWidth="1.2"
                  opacity="0.8"
                />

                {/* Curve */}
                {curvePath && (
                  <path
                    d={curvePath}
                    fill="none"
                    stroke="#0F766E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Points */}
                {points.map((pt) => {
                  const isSel = selectedNodeIndex === pt.idx;
                  const isLow = pt.entry.score <= 2;
                  return (
                    <g
                      key={pt.entry.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedNodeIndex(pt.idx)}
                    >
                      {isSel && (
                        <circle cx={pt.x} cy={pt.y} r="11" fill="#0F766E" opacity="0.15" />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSel ? '5.5' : '4'}
                        fill={isLow ? '#E11D48' : '#0F766E'}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <text
                        x={pt.x}
                        y={height - padY + 16}
                        textAnchor="middle"
                        fontSize="10"
                        fill={isSel ? '#0F172A' : '#64748B'}
                        fontWeight={isSel ? 'bold' : 'normal'}
                      >
                        {pt.entry.dayLabel.slice(0, 3)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="text-[11px] sm:text-xs text-slate-500 text-center">
              Sentuh titik hari pada grafik untuk melihat rincian catatan harian di bawah.
            </div>

            {/* 3 Metric Figures */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3 border-t border-slate-100 text-xs w-full min-w-0">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 text-center border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Rata-Rata Mood</span>
                <strong className="text-base text-slate-900 block mt-0.5">{averageScore} / 5</strong>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 text-center border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Rata-Rata Tidur</span>
                <strong className="text-base text-slate-900 block mt-0.5">{averageSleep} Jam</strong>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 text-center border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Hari Merasa Berat</span>
                <strong
                  className={`text-base block mt-0.5 ${isElevated ? 'text-rose-600' : 'text-teal-700'}`}
                >
                  {consecutiveNegativeDays > 0 ? `${consecutiveNegativeDays} Hari` : '0 Hari'}
                </strong>
              </div>
            </div>
          </div>

          {/* Inspected Node Quote */}
          {activeEntry && (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-7 space-y-2.5 shadow-sm w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-sm sm:text-base text-slate-900">
                  Catatan {activeEntry.dayLabel} ({activeEntry.dateFormatted} • {activeEntry.timeLabel})
                </span>
                <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-lg font-medium self-start sm:self-auto">
                  Tidur {activeEntry.sleepHours || 4} jam
                </span>
              </div>

              <p className="italic text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 break-words">
                "{activeEntry.textNote}"
              </p>

              <div className="text-xs text-slate-500 flex flex-wrap gap-1.5">
                <span className="font-semibold text-slate-700">Pemicu yang dicatat:</span>
                {activeEntry.contextTags.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Right: Insights & Escalation (5 cols on lg, full width on mobile/tablet) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-5 w-full min-w-0">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-7 space-y-3.5 shadow-sm w-full min-w-0">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-2.5">
              Tema Perasaan yang Terdeteksi (What You've Been Feeling)
            </h3>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                Sering Cemas & Tertekan di Larut Malam
              </span>
              <p className="text-slate-600 leading-relaxed text-xs break-words">
                Sebagian besar catatan saat kamu merasa tertekan dibuat di atas jam 11 malam saat waktu tidur kurang dari 4 jam. Kurang tidur membuat pikiran lebih mudah cemas dan cepat lelah.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                Pemicu Utama: Skripsi & Revisi Dosen
              </span>
              <p className="text-slate-600 leading-relaxed text-xs break-words">
                Kekhawatiran soal revisi bab 4 muncul berulang kali. Ingat untuk memberi jeda istirahat pada tubuhmu agar energimu pulih sebelum kembali mengerjakan revisi.
              </p>
            </div>
          </div>

          {/* Persistence Alert */}
          <div
            className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-6 lg:p-7 space-y-3.5 shadow-sm w-full min-w-0 ${
              isElevated ? 'bg-rose-50/80 border-rose-200' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-bold text-sm sm:text-base flex items-center gap-2 ${
                  isElevated ? 'text-rose-700' : 'text-teal-700'
                }`}
              >
                {isElevated ? (
                  <>
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>Perhatian: Sudah 5 Hari Merasa Berat</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Kondisi Emosi Terkendali</span>
                  </>
                )}
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm break-words">
              {isElevated
                ? 'Perasaan lelah dan tertekan sudah berlangsung lebih dari 4 hari berturut-turut. Tidak apa-apa untuk meminta bantuan. Konselor kampus Untag Surabaya siap mendengarkan tanpa menghakimi.'
                : 'Pola perasaanmu berada dalam batas wajar. Lanjutkan mencatat secara rutin untuk menjaga kestabilan pikiran.'}
            </p>

            {isElevated && (
              <button
                onClick={() => onNavigateToTab('connect')}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs min-h-[44px] cursor-pointer"
              >
                <span>Lihat Jadwal Konselor Kampus Untag</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Prominent Next Step Navigation Bar at the Bottom */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 w-full min-w-0">
        <button
          onClick={() => onNavigateToTab('record')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Kembali ke Langkah 1: Catat Mood</span>
        </button>

        <button
          onClick={() => onNavigateToTab('support')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <span>Lanjut ke Langkah 3: Teman Refleksi Ceritamu (Your Reflective Companion)</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { MoodState, MoodEntry } from '../../types';
import { MOOD_DEFINITIONS, ESM_CONTEXT_TAGS } from '../../data/emodiaryData';
import { Mic, MicOff, PenTool, Sparkles, Check, Clock, Play, Pause, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface RecordPillarProps {
  entries: MoodEntry[];
  onAddEntry: (newEntry: MoodEntry) => void;
  onNavigateToTab: (tab: 'journey' | 'understand' | 'support' | 'connect') => void;
}

export const RecordPillar: React.FC<RecordPillarProps> = ({
  entries,
  onAddEntry,
  onNavigateToTab,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodState>('overwhelmed');
  const [selectedContexts, setSelectedContexts] = useState<string[]>([
    'Skripsi & Tugas Akhir',
    'Kurang Tidur (<4 jam)',
  ]);
  const [journalText, setJournalText] = useState<string>('');
  const [entryMode, setEntryMode] = useState<'voice' | 'text'>('voice');
  const [sleepHours, setSleepHours] = useState<number>(3.5);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isSimulatingStream, setIsSimulatingStream] = useState<boolean>(false);
  const [audioTranscript, setAudioTranscript] = useState<string>('');
  const [savedSuccessToast, setSavedSuccessToast] = useState<string | null>(null);
  const [playingEntryId, setPlayingEntryId] = useState<string | null>(null);

  const timerRef = useRef<any>(null);
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (speechRecognitionRef.current) speechRecognitionRef.current.stop();
    };
  }, []);

  const toggleContextTag = (label: string) => {
    setSelectedContexts((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const handleStartRealRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      handleSimulateVoiceDemo();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'id-ID';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordingSeconds(0);
        timerRef.current = setInterval(() => {
          setRecordingSeconds((prev: number) => prev + 1);
        }, 1000);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setAudioTranscript(currentTranscript.trim());
      };

      recognition.onerror = () => {
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      handleSimulateVoiceDemo();
    }
  };

  const handleStopRecording = () => {
    if (speechRecognitionRef.current) speechRecognitionRef.current.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSimulateVoiceDemo = () => {
    if (isSimulatingStream || isRecording) return;

    setIsSimulatingStream(true);
    setIsRecording(true);
    setRecordingSeconds(0);
    setAudioTranscript('');

    const demoWords = [
      'Jujur,', 'malam', 'ini', 'pikiranku', 'terasa', 'berat', 'banget...',
      'Dua', 'hari', 'ini', 'dosen', 'minta', 'revisi', 'bab', 'empat', 'secara', 'total.',
      'Aku', 'sudah', 'begadang', 'sampai', 'jam', '3', 'pagi,', 'tapi', 'rasanya', 'seperti',
      'jalan', 'di', 'tempat.', 'Dada', 'terasa', 'sesak', 'dan', 'aku', 'takut',
      'kalau', 'semester', 'ini', 'aku', 'mengecewakan', 'orang', 'tuaku...'
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < demoWords.length) {
        setAudioTranscript((prev) => (prev ? prev + ' ' : '') + demoWords[i]);
        setRecordingSeconds((s) => s + 1);
        i++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
        setIsSimulatingStream(false);
        setSelectedMood('overwhelmed');
        setSelectedContexts(['Skripsi & Tugas Akhir', 'Kurang Tidur (<4 jam)', 'Tuntutan Keluarga']);
      }
    }, 130);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const noteContent =
      entryMode === 'voice'
        ? audioTranscript || 'Catatan rekaman suara mahasiswa.'
        : journalText;

    if (!noteContent.trim() && entryMode === 'text') {
      alert('Silakan tuliskan apa yang sedang kamu rasakan terlebih dahulu.');
      return;
    }

    const now = new Date();
    const dateFormatted = `${now.getDate()} Okt`;
    const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')} WIB`;

    const newEntry: MoodEntry = {
      id: `entry-${Date.now()}`,
      timestamp: `${now.getFullYear()}-10-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`,
      dateFormatted,
      dayLabel: 'Hari Ini',
      timeLabel: timeFormatted,
      mood: selectedMood,
      score: MOOD_DEFINITIONS[selectedMood].score,
      emotionTags: ['Refleksi Mandiri'],
      contextTags: selectedContexts.length ? selectedContexts : ['Aktivitas Harian'],
      textNote: noteContent,
      sourceType: entryMode,
      sleepHours: sleepHours,
      voiceDetails:
        entryMode === 'voice'
          ? {
              durationSeconds: recordingSeconds > 0 ? recordingSeconds : 35,
              transcript: noteContent,
              isSimulated: isSimulatingStream,
              waveformSamples: [20, 45, 65, 80, 70, 50, 40, 60, 85, 90, 75, 55],
            }
          : undefined,
      extractedThemes: ['Catatan Terkini'],
      persistenceRiskFlag: MOOD_DEFINITIONS[selectedMood].score <= 2,
    };

    onAddEntry(newEntry);
    setSavedSuccessToast('Catatan berhasil tersimpan dengan aman.');
    setTimeout(() => setSavedSuccessToast(null), 3000);

    setJournalText('');
    setAudioTranscript('');
    setRecordingSeconds(0);
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
      {/* Modern Header with 1-Sentence Guide */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block">
          Langkah 1 dari 4: Mood Diary
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight break-words">
          Catat Apa yang Kamu Rasakan Hari Ini
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-3xl break-words">
          Ceritakan apa yang sedang kamu rasakan hari ini melalui tulisan singkat atau rekaman suara tanpa rasa takut dihakimi.
        </p>
      </div>

      {/* Main Grid: Stacked vertically until lg (1024px) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
        {/* Form Workspace (7 cols on lg, 1 col on mobile/tablet) */}
        <div className="lg:col-span-7 space-y-4 w-full min-w-0">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 shadow-sm w-full min-w-0"
          >
            {/* 1. Mood Spectrum Selection */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs sm:text-sm font-bold text-slate-900">
                  1. Bagaimana perasaanmu sekarang?
                </label>
                <span className="text-xs font-semibold text-teal-700">
                  {MOOD_DEFINITIONS[selectedMood]?.label}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {Object.values(MOOD_DEFINITIONS).map((m) => {
                  const isSelected = selectedMood === m.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setSelectedMood(m.key as MoodState)}
                      className={`p-2 sm:py-3 sm:px-2 rounded-xl sm:rounded-2xl text-center transition-all border min-h-[52px] sm:min-h-[64px] flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-[11px] sm:text-xs leading-tight text-center break-words">
                        {m.label.split('&')[0].trim()}
                      </div>
                      <div
                        className={`text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 font-medium ${
                          isSelected ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        Skor {m.score}
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-slate-500">
                {MOOD_DEFINITIONS[selectedMood]?.subLabel}
              </p>
            </div>

            {/* 2. Context Stressors & Sleep Duration */}
            <div className="pt-4 sm:pt-5 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900">
                  2. Apa yang sedang terjadi & waktu tidurmu?
                </label>

                <div className="flex items-center gap-2 text-xs text-slate-800 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto min-h-[38px]">
                  <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>Tidur semalam:</span>
                  <select
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="2.5">2.5 jam</option>
                    <option value="3.5">3.5 jam</option>
                    <option value="4.0">4 jam</option>
                    <option value="5.5">5.5 jam</option>
                    <option value="6.5">6.5 jam</option>
                    <option value="7.5">7.5 jam</option>
                    <option value="8.0">8 jam+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {ESM_CONTEXT_TAGS.map((tag) => {
                  const active = selectedContexts.includes(tag.label);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleContextTag(tag.label)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all min-h-[38px] flex items-center cursor-pointer ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900 font-medium'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Dual-Mode Journaling */}
            <div className="pt-4 sm:pt-5 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-900">
                  3. Ceritakan sesukamu
                </label>

                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setEntryMode('voice')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 min-h-[36px] cursor-pointer ${
                      entryMode === 'voice'
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>Rekam Suara</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEntryMode('text')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 min-h-[36px] cursor-pointer ${
                      entryMode === 'text'
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>Ketik Teks</span>
                  </button>
                </div>
              </div>

              {entryMode === 'voice' ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {isRecording ? (
                        <button
                          type="button"
                          onClick={handleStopRecording}
                          className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-sm animate-pulse cursor-pointer shrink-0 min-h-[48px]"
                          title="Klik untuk berhenti merekam"
                        >
                          <MicOff className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleStartRealRecording}
                          className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-sm cursor-pointer shrink-0 min-h-[48px]"
                          title="Klik untuk mulai merekam suara"
                        >
                          <Mic className="w-5 h-5" />
                        </button>
                      )}

                      <div className="text-xs min-w-0">
                        <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {isRecording
                            ? `Merekam (${recordingSeconds} detik)...`
                            : 'Tekan mikrofon untuk bicara'}
                        </div>
                        <span className="text-[11px] text-slate-500 block truncate">
                          Diproses langsung secara privat
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSimulateVoiceDemo}
                      disabled={isRecording}
                      className="w-full sm:w-auto text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 transition-all font-medium flex items-center justify-center gap-2 shadow-xs min-h-[44px] cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-teal-700 shrink-0" />
                      <span>Uji Coba Rekaman Demo</span>
                    </button>
                  </div>

                  {/* Waveform Bars */}
                  <div className="h-10 bg-white rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 border border-slate-200 w-full overflow-hidden">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const heights = [
                        20, 45, 80, 95, 60, 30, 50, 85, 70, 40, 25, 60, 90, 75, 40, 20, 50,
                        80, 60, 30, 45, 20, 35, 55,
                      ];
                      const h = isRecording
                        ? heights[(i + recordingSeconds * 2) % heights.length]
                        : 15;
                      return (
                        <div
                          key={i}
                          className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                            isRecording ? 'bg-teal-700' : 'bg-slate-200'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      );
                    })}
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 min-h-[60px] leading-relaxed break-words">
                    {audioTranscript || (
                      <span className="text-slate-400 italic">
                        Hasil suara yang kamu ucapkan akan otomatis tertulis di sini...
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <textarea
                  rows={4}
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Tulis apa saja yang sedang berkecamuk di pikiranmu hari ini tanpa ragu..."
                  className="w-full p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 leading-relaxed placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white transition-all break-words"
                />
              )}
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Tersimpan aman di perambanmu, tidak bisa diakses orang lain.</span>
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                Simpan Catatan ke Buku Harian
              </button>
            </div>
          </form>

          {/* Success Toast */}
          {savedSuccessToast && (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{savedSuccessToast}</span>
              </span>
              <button
                onClick={() => onNavigateToTab('understand')}
                className="underline font-bold text-teal-900 hover:text-teal-700 self-end sm:self-auto cursor-pointer"
              >
                Lihat di Grafik
              </button>
            </div>
          )}
        </div>

        {/* Right: Timeline (5 cols on lg, full width on mobile/tablet) */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-4 w-full min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Catatan Sebelumnya ({entries.length})
            </h3>
            <span className="text-xs text-slate-500">Urut dari terbaru</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {entries
              .slice()
              .reverse()
              .map((entry) => {
                const isPlaying = playingEntryId === entry.id;

                return (
                  <div
                    key={entry.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 text-xs hover:border-slate-300 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{entry.dayLabel}</span>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 block">
                          {entry.dateFormatted} • {entry.timeLabel}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] sm:text-[11px] font-bold text-slate-700">
                        Skor {entry.score} / 5
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 break-words">
                      "{entry.textNote}"
                    </p>

                    {entry.sourceType === 'voice' && (
                      <button
                        type="button"
                        onClick={() => setPlayingEntryId(isPlaying ? null : entry.id)}
                        className="text-xs text-teal-700 hover:underline flex items-center gap-1.5 font-semibold min-h-[36px] cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlaying ? 'Jeda Suara' : 'Dengarkan Rekaman Suara'}</span>
                      </button>
                    )}

                    <div className="flex flex-wrap gap-1.5 text-[10px] sm:text-[11px] text-slate-500">
                      {entry.contextTags.map((c, i) => (
                        <span
                          key={i}
                          className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Prominent Next Step Navigation Bar at the Bottom */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 w-full min-w-0">
        <button
          onClick={() => onNavigateToTab('journey')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Kembali ke Alur Lengkap</span>
        </button>

        <button
          onClick={() => onNavigateToTab('understand')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <span>Lanjut ke Langkah 2: Lihat Pola Perasaan (Weekly Mood Journey)</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
};

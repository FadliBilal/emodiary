import React, { useState, useEffect, useRef } from 'react';
import { MoodState, MoodEntry, ThemeMode } from '../../types';
import { MOOD_DEFINITIONS, ESM_CONTEXT_TAGS } from '../../data/emodiaryData';
import { X, Mic, MicOff, PenTool, Sparkles, Clock, ShieldCheck, Check } from 'lucide-react';

interface QuickMoodModalProps {
  isOpen: boolean;
  theme: ThemeMode;
  onClose: () => void;
  onAddEntry: (entry: MoodEntry) => void;
}

export const QuickMoodModal: React.FC<QuickMoodModalProps> = ({
  isOpen,
  theme,
  onClose,
  onAddEntry,
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

  const timerRef = useRef<any>(null);
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (speechRecognitionRef.current) speechRecognitionRef.current.stop();
    };
  }, []);

  if (!isOpen) return null;

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
    }, 120);
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
      emotionTags: ['Refleksi Cepat'],
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
    setSavedSuccessToast('Catatan berhasil tersimpan ke grafik perjalananmu.');

    setTimeout(() => {
      setSavedSuccessToast(null);
      onClose();
    }, 1200);
  };

  const isGreen = theme === 'green';
  const primaryBtnClass = isGreen
    ? 'bg-[#115E59] hover:bg-[#0F766E] text-white'
    : 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto p-5 sm:p-7 space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">
              Catatan Cepat Harian
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
              Bagaimana Perasaanmu Sekarang?
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Mood Spectrum Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                1. Pilih Skala Perasaan
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
                    className={`p-2 rounded-xl sm:rounded-2xl text-center transition-all border min-h-[52px] sm:min-h-[58px] flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? isGreen
                          ? 'bg-[#115E59] text-white border-[#115E59] shadow-sm'
                          : 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-[11px] sm:text-xs leading-tight text-center break-words">
                      {m.label.split('&')[0].trim()}
                    </div>
                    <div
                      className={`text-[9px] sm:text-[10px] mt-0.5 font-medium ${
                        isSelected ? 'text-slate-200' : 'text-slate-400'
                      }`}
                    >
                      Skor {m.score}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Sleep Hours & Stressor Tags */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                2. Apa yang sedang terjadi?
              </label>

              <div className="flex items-center gap-2 text-xs text-slate-800 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
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

            <div className="flex flex-wrap gap-1.5">
              {ESM_CONTEXT_TAGS.slice(0, 6).map((tag) => {
                const active = selectedContexts.includes(tag.label);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleContextTag(tag.label)}
                    className={`text-xs px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? isGreen
                          ? 'bg-[#115E59] text-white border-[#115E59] font-medium'
                          : 'bg-[#6D28D9] text-white border-[#6D28D9] font-medium'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Dual-Mode Voice / Text */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                3. Curahkan Perasaanmu
              </label>

              <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setEntryMode('voice')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    entryMode === 'voice'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>Suara</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEntryMode('text')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    entryMode === 'text'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>Ketik</span>
                </button>
              </div>
            </div>

            {entryMode === 'voice' ? (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    {isRecording ? (
                      <button
                        type="button"
                        onClick={handleStopRecording}
                        className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center animate-pulse cursor-pointer shrink-0"
                        title="Klik untuk berhenti"
                      >
                        <MicOff className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartRealRecording}
                        className={`w-10 h-10 rounded-full text-white flex items-center justify-center transition-all cursor-pointer shrink-0 ${primaryBtnClass}`}
                        title="Klik untuk merekam"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                    )}

                    <div className="text-xs">
                      <div className="font-semibold text-slate-900">
                        {isRecording ? `Merekam (${recordingSeconds}s)...` : 'Tekan mic untuk bicara'}
                      </div>
                      <span className="text-[10px] text-slate-500">Diproses privat di peramban</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateVoiceDemo}
                    disabled={isRecording}
                    className="text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 transition-all font-medium flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>Uji Coba Rekaman Suara</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 min-h-[50px] leading-relaxed">
                  {audioTranscript || (
                    <span className="text-slate-400 italic">
                      Ucapkan suaramu atau klik tombol simulasi di atas...
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <textarea
                rows={3}
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Tuliskan apa yang kamu rasakan hari ini..."
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white transition-all"
              />
            )}
          </div>

          {/* Success Toast */}
          {savedSuccessToast && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{savedSuccessToast}</span>
            </div>
          )}

          {/* Submit Actions */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <span className="hidden sm:inline">Tersimpan privat di perambanmu</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium cursor-pointer"
              >
                Batal
              </button>

              <button
                type="submit"
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${primaryBtnClass}`}
              >
                Simpan Mood
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

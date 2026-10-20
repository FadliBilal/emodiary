import React, { useState, useEffect } from 'react';
import { MoodEntry, ReflectiveMessage, PsychoeducationModule } from '../../types';
import { PSYCHOEDUCATION_MODULES } from '../../data/emodiaryData';
import { Wind, Send, ShieldCheck, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';

interface SupportPillarProps {
  latestEntry?: MoodEntry;
  onOpenBreathingModal: () => void;
  onNavigateToConnect: () => void;
  onNavigateToTab?: (tab: 'understand' | 'connect') => void;
}

export const SupportPillar: React.FC<SupportPillarProps> = ({
  latestEntry,
  onOpenBreathingModal,
  onNavigateToConnect,
  onNavigateToTab,
}) => {
  const [messages, setMessages] = useState<ReflectiveMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModule, setSelectedModule] = useState<PsychoeducationModule | null>(null);

  useEffect(() => {
    const entrySnippet = latestEntry?.textNote
      ? `"${latestEntry.textNote.slice(0, 80)}..."`
      : 'catatan harianmu';

    const defaultInitialPrompt =
      latestEntry?.mood === 'overwhelmed' || latestEntry?.mood === 'drained'
        ? `Halo, aku membaca catatanmu tentang ${entrySnippet}. Aku melihat kamu sedang memikul beban berat dan waktu tidur yang sangat minim. Saat pikiran "aku pasti gagal" itu muncul malam ini, apa bagian tersulit yang paling kamu khawatirkan?`
        : `Halo! Kondisi perasaanmu terlihat tenang dan stabil hari ini. Apa satu hal kecil yang ingin kamu syukuri untuk menjaga ketenangan ini?`;

    setMessages([
      {
        id: 'msg-init',
        sender: 'ai',
        text: defaultInitialPrompt,
        timestamp: 'Terkini',
        suggestedQuickReplies: [
          'Aku merasa buntu dan takut mengecewakan orang tua',
          'Dada rasanya sesak, pandu aku atur napas dulu',
          'Bantu aku bagi tugas skripsi jadi langkah kecil 15 menit',
          'Apakah wajar merasa tertinggal dibanding teman?'
        ]
      }
    ]);
  }, [latestEntry]);

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim()) return;

    const userMsg: ReflectiveMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: content,
      timestamp: 'Baru saja'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let quickChips: string[] = [];
      const lower = content.toLowerCase();

      if (lower.includes('napas') || lower.includes('sesak') || lower.includes('panik')) {
        aiReply =
          'Saat dada terasa sesak atau pikiran berputar kencang, tubuhmu sedang mengirim sinyal stres. Mari kita berhenti berpikir sejenak dan atur napas. Apakah kamu ingin membuka panduan pernapasan 4-7-8 untuk meredakan ketegangan tubuh sekarang?';
        quickChips = ['Buka Panduan Napas 4-7-8', 'Aku sudah sedikit lebih tenang'];
      } else if (lower.includes('orang tua') || lower.includes('kecewa') || lower.includes('keluarga')) {
        aiReply =
          'Kekhawatiran mengecewakan keluarga memang sering jadi beban terberat bagi mahasiswa. Tapi coba kita pikirkan: Apakah keinginan terbesar mereka adalah melihatmu berhasil secara sehat, atau melihatmu menderita sampai tidak bisa tidur? Kalau kamu menceritakan rasa lelahmu dengan jujur, kira-kira apa yang akan mereka katakan?';
        quickChips = ['Mereka mungkin cemas tapi tetap peduli', 'Bagaimana cara membicarakan ini dengan tenang?'];
      } else if (lower.includes('langkah') || lower.includes('skripsi') || lower.includes('revisi') || lower.includes('bagi')) {
        aiReply =
          'Jangan tuntut dirimu untuk menyelesaikan semua revisi malam ini. Coba pilih 1 bagian paling kecil, misalnya membaca 1 masukan dosen selama 15 menit saja tanpa harus langsung sempurna. Bagaimana menurutmu?';
        quickChips = ['Membaca masukan dospem di paragraf 1', 'Merumuskan 1 pertanyaan klarifikasi'];
      } else {
        aiReply =
          'Terima kasih sudah mau berbagi dengan jujur. Ketika rasa cemas itu datang, coba kita pisahkan: mana hal yang benar-benar bisa kita kendalikan hari ini, dan mana yang masih berupa ketakutan masa depan? Apa satu hal kecil yang ada dalam kuasamu saat ini?';
        quickChips = ['Fokus pada hal yang bisa kukerjakan hari ini', 'Latihan relaksasi napas'];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          timestamp: 'Baru saja',
          suggestedQuickReplies: quickChips
        }
      ]);
      setIsTyping(false);
    }, 550);
  };

  const handleChipClick = (chip: string) => {
    if (chip.includes('Napas 4-7-8') || chip.includes('napas')) {
      onOpenBreathingModal();
    } else {
      handleSendMessage(chip);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
      {/* Modern Header with 1-Sentence Guide */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block">
          Langkah 3 dari 4: Dukungan Emosional
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight break-words">
          Teman Refleksi Ceritamu (Your Reflective Companion)
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-3xl break-words">
          Ajak bicara pikiran yang membingungkan untuk menemukan sudut pandang baru, atau lakukan latihan pernapasan untuk meredakan dada yang sesak.
        </p>
      </div>

      {/* Main Grid: Stacked until lg (1024px) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
        {/* Left: Chat View (7 cols on lg, full width on mobile/tablet) */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-sm w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-3 text-xs">
            <span className="font-bold text-sm text-slate-900">
              Ruang Refleksi Pikiran (Teman Cerita)
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Bukan pengganti dokter • Percakapan privat</span>
            </span>
          </div>

          <div className="space-y-3.5 sm:space-y-4 max-h-[420px] sm:max-h-[480px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5 text-xs sm:text-sm`}
              >
                <div
                  className={`p-3.5 sm:p-5 rounded-2xl leading-relaxed max-w-[90%] sm:max-w-[85%] break-words ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-900 border border-slate-200'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {msg.suggestedQuickReplies && msg.suggestedQuickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 max-w-[95%]">
                    {msg.suggestedQuickReplies.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(chip)}
                        className="text-xs bg-slate-50 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 transition-all font-medium text-left min-h-[38px] flex items-center cursor-pointer break-words"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="text-xs text-slate-400 italic p-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"></span>
                <span>Sedang menyusun tanggapan...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-3 border-t border-slate-100"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik apa saja yang ingin kamu ceritakan..."
              className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white transition-all min-h-[44px]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-30 transition-all shadow-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
              title="Kirim pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Somatic Pacer & Psychoeducation (5 cols on lg, full width on mobile/tablet) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-5 w-full min-w-0">
          <div className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-7 space-y-3 text-xs w-full min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                <Wind className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Latihan Tarik Napas 4-7-8</span>
              </span>
              <span className="text-[10px] bg-teal-50 text-teal-700 px-2.5 py-1 rounded-md border border-teal-200 font-bold shrink-0">
                2 Menit
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm break-words">
              Membantu menenangkan detak jantung, meredakan sesak di dada, dan membuat pikiran rileks sebelum tidur atau saat cemas.
            </p>

            <button
              onClick={onOpenBreathingModal}
              className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              Mulai Latihan Napas Interaktif (2 Menit)
            </button>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-7 space-y-3 shadow-sm text-xs w-full min-w-0">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Tips & Bacaan Praktis Mahasiswa</span>
            </h3>

            <div className="space-y-2.5">
              {PSYCHOEDUCATION_MODULES.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-600 transition-all cursor-pointer space-y-1 min-h-[44px] flex flex-col justify-center"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-teal-700">{mod.badge}</span>
                    <span>{mod.estimatedReadTime}</span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug break-words">
                    {mod.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Next Step Navigation Bar at the Bottom */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 w-full min-w-0">
        <button
          onClick={() => (onNavigateToTab ? onNavigateToTab('understand') : null)}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Kembali ke Langkah 2: Lihat Pola</span>
        </button>

        <button
          onClick={onNavigateToConnect}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          <span>Lanjut ke Langkah 4: Terhubung dengan Psikolog & Konselor (Talk to a Professional)</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>

      {/* Reading Modal (Responsive viewport fit) */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-[95vw] sm:w-full max-w-lg max-h-[85vh] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 shadow-xl text-slate-900 mx-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-teal-700 font-bold block">
                  {selectedModule.badge}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-1 break-words">
                  {selectedModule.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="text-base font-bold text-slate-400 hover:text-slate-800 p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-teal-50 border border-teal-100 text-xs sm:text-sm text-teal-900 font-medium leading-relaxed break-words">
              "{selectedModule.keyTakeaway}"
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed break-words">
              {selectedModule.articleSections.map((sec, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h5 className="font-bold text-slate-900">{sec.heading}</h5>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedModule(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                Tutup Bacaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

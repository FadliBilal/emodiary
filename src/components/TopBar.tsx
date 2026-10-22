import React, { useState } from 'react';
import { DemoScenarioId, ThemeMode } from '../types';
import { ChevronDown, Award, Plus, Sparkles, HelpCircle } from 'lucide-react';

interface TopBarProps {
  activeScenarioId: DemoScenarioId;
  onScenarioChange: (scenario: DemoScenarioId) => void;
  activeTab: 'journey' | 'record' | 'understand' | 'support' | 'connect';
  onTabChange: (tab: 'journey' | 'record' | 'understand' | 'support' | 'connect') => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenQuickMood: () => void;
  onOpenOnboarding: () => void;
  onOpenPitchDrawer: () => void;
  onOpenEthicsModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeScenarioId,
  onScenarioChange,
  activeTab,
  onTabChange,
  theme,
  onToggleTheme,
  onOpenQuickMood,
  onOpenOnboarding,
  onOpenPitchDrawer,
}) => {
  const [isScenarioDropdownOpen, setIsScenarioDropdownOpen] = useState(false);

  const scenarioNames: Record<DemoScenarioId, string> = {
    raka: 'Raka (Stres Skripsi)',
    nadia: 'Nadia (Cemas Karier)',
    sandbox: 'Uji Coba Langsung'
  };

  const tabs: { id: 'journey' | 'understand' | 'support' | 'connect' | 'record'; label: string }[] = [
    { id: 'journey', label: 'Alur Lengkap' },
    { id: 'understand', label: '1. Pola Mingguan' },
    { id: 'support', label: '2. Teman Cerita & Napas' },
    { id: 'connect', label: '3. Bantuan Konselor' },
    { id: 'record', label: 'Buku Harian' },
  ];

  const isGreen = theme === 'green';
  const brandBg = isGreen ? 'bg-[#115E59]' : 'bg-[#6D28D9]';
  const brandActive = isGreen ? 'text-[#115E59]' : 'text-[#6D28D9]';
  const quickBtnClass = isGreen
    ? 'bg-[#115E59] hover:bg-[#0F766E] text-white shadow-xs'
    : 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-xs';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full max-w-[100vw]">
      {/* Top Main Bar: Brand + Navigation + Action Controls */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2.5 sm:gap-3 min-w-0">
        
        {/* Brand Left */}
        <button
          onClick={() => onTabChange('journey')}
          className="flex items-center gap-2.5 text-left hover:opacity-90 transition-opacity shrink-0 cursor-pointer min-h-[44px]"
          aria-label="Kembali ke Alur Lengkap EmoDiary"
        >
          <div className={`w-9 h-9 rounded-xl ${brandBg} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 transition-colors`}>
            E
          </div>
          <div className="leading-tight hidden sm:block">
            <span className="font-bold text-base tracking-tight text-slate-900 block">
              EMODIARY
            </span>
            <span className="text-[11px] text-slate-500 font-medium block whitespace-nowrap">
              Untag Surabaya 2026
            </span>
          </div>
        </button>

        {/* Center: Clean Core Process Tabs (Desktop >= 1024px) */}
        <nav className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 text-xs shrink-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`px-3 py-2 rounded-lg transition-all font-medium whitespace-nowrap cursor-pointer min-h-[36px] flex items-center ${
                activeTab === t.id
                  ? `bg-white ${brandActive} shadow-xs font-bold`
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Right Section: Quick Action, Theme Switcher, Persona, Info */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Quick Check-in Button (Flo Health Style Action) */}
          <button
            onClick={onOpenQuickMood}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${quickBtnClass}`}
            title="Catat perasaanmu hari ini dalam 10 detik"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Catat Mood</span>
            <span className="sm:hidden text-[11px]">Mood</span>
          </button>

          {/* Theme Toggle Pill (Soft Green 🌿 / Soft Lavender 🪻) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-all cursor-pointer min-h-[40px]"
            title={`Ganti tema warna tampilan (Sekarang: ${isGreen ? 'Soft Green' : 'Soft Lavender'})`}
          >
            <span className="text-sm select-none">{isGreen ? '🌿' : '🪻'}</span>
            <span className="hidden md:inline text-[11px] font-semibold text-slate-600">
              {isGreen ? 'Hijau' : 'Lavender'}
            </span>
          </button>

          {/* Flo Onboarding / Tinjau Usia Trigger Button */}
          <button
            onClick={onOpenOnboarding}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-all flex items-center gap-1 cursor-pointer min-h-[40px]"
            title="Buka kembali tinjauan usia & disclaimer etika Flo-style"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hidden xl:inline text-[11px]">Tinjauan Usia</span>
          </button>

          {/* Persona Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsScenarioDropdownOpen(!isScenarioDropdownOpen)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-medium text-slate-800 transition-all whitespace-nowrap cursor-pointer min-h-[40px]"
              aria-label="Ganti Profil Mahasiswa"
            >
              <span className={`w-2 h-2 rounded-full ${isGreen ? 'bg-[#115E59]' : 'bg-[#6D28D9]'} shrink-0`}></span>
              <span className="max-w-[70px] sm:max-w-[120px] truncate text-[11px] sm:text-xs">
                {scenarioNames[activeScenarioId].split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </button>

            {isScenarioDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 text-xs space-y-1">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pilih Contoh Mahasiswa
                </div>
                {(['raka', 'nadia', 'sandbox'] as DemoScenarioId[]).map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      onScenarioChange(id);
                      setIsScenarioDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer min-h-[40px] ${
                      activeScenarioId === id
                        ? isGreen
                          ? 'bg-emerald-50 text-[#115E59] font-semibold'
                          : 'bg-purple-50 text-[#6D28D9] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{scenarioNames[id]}</span>
                    {activeScenarioId === id && <span className="font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Lomba Button */}
          <button
            onClick={onOpenPitchDrawer}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            title="Info Lomba & Tim Peneliti Untag Surabaya 2026"
          >
            <Award className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="hidden sm:inline text-[11px]">Info Tim</span>
          </button>
        </div>
      </div>

      {/* Row 2: Fluid Horizontally Scrollable Pill Bar on Mobile/Tablet (< 1024px) */}
      <div className="lg:hidden border-t border-slate-200/90 bg-slate-50/95 py-2 px-3 sm:px-4">
        <div className="flex items-center overflow-x-auto no-scrollbar gap-2 snap-x">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all snap-start min-h-[38px] flex items-center justify-center cursor-pointer ${
                activeTab === t.id
                  ? `bg-white ${brandActive} shadow-xs font-bold border border-slate-200`
                  : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

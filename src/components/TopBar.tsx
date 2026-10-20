import React, { useState } from 'react';
import { DemoScenarioId } from '../types';
import { ChevronDown, Award } from 'lucide-react';

interface TopBarProps {
  activeScenarioId: DemoScenarioId;
  onScenarioChange: (scenario: DemoScenarioId) => void;
  activeTab: 'journey' | 'record' | 'understand' | 'support' | 'connect';
  onTabChange: (tab: 'journey' | 'record' | 'understand' | 'support' | 'connect') => void;
  onOpenPitchDrawer: () => void;
  onOpenEthicsModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeScenarioId,
  onScenarioChange,
  activeTab,
  onTabChange,
  onOpenPitchDrawer,
}) => {
  const [isScenarioDropdownOpen, setIsScenarioDropdownOpen] = useState(false);

  const scenarioNames: Record<DemoScenarioId, string> = {
    raka: 'Raka (Stres Skripsi)',
    nadia: 'Nadia (Cemas Karier)',
    sandbox: 'Uji Coba Langsung'
  };

  const tabs: { id: 'journey' | 'record' | 'understand' | 'support' | 'connect'; label: string }[] = [
    { id: 'journey', label: 'Alur Lengkap' },
    { id: 'record', label: '1. Catat' },
    { id: 'understand', label: '2. Pola' },
    { id: 'support', label: '3. Teman Cerita' },
    { id: 'connect', label: '4. Konseling' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full max-w-[100vw]">
      {/* Top Main Bar: Brand + Controls */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 min-w-0">
        {/* Brand Left */}
        <button
          onClick={() => onTabChange('journey')}
          className="flex items-center gap-2.5 text-left hover:opacity-90 transition-opacity shrink-0 cursor-pointer min-h-[44px]"
          aria-label="Kembali ke Alur Lengkap EmoDiary"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            E
          </div>
          <div className="leading-tight">
            <span className="font-bold text-base tracking-tight text-slate-900 block">
              EMODIARY
            </span>
            <span className="text-[11px] text-slate-500 font-medium block whitespace-nowrap">
              Untag Surabaya 2026
            </span>
          </div>
        </button>

        {/* Center: Clean Single-Line Tabs (Laptop & Desktop >= 1024px) */}
        <nav className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 text-xs shrink-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`px-3.5 py-2 rounded-lg transition-all font-medium whitespace-nowrap cursor-pointer min-h-[36px] flex items-center ${
                activeTab === t.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Right Section: Scenario Switcher & Info Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Persona Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsScenarioDropdownOpen(!isScenarioDropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-medium text-slate-800 transition-all whitespace-nowrap cursor-pointer min-h-[44px]"
              aria-label="Ganti Profil Mahasiswa"
            >
              <span className="w-2 h-2 rounded-full bg-[#0F766E] shrink-0"></span>
              <span className="max-w-[110px] sm:max-w-[140px] truncate">{scenarioNames[activeScenarioId]}</span>
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
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                      activeScenarioId === id
                        ? 'bg-teal-50 text-[#0F766E] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{scenarioNames[id]}</span>
                    {activeScenarioId === id && <span className="text-[#0F766E] font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Button */}
          <button
            onClick={onOpenPitchDrawer}
            className="px-3 sm:px-3.5 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
            title="Info Lomba & Tim Peneliti Untag Surabaya 2026"
          >
            <Award className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Info Lomba & Tim</span>
            <span className="sm:hidden">Info</span>
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
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all snap-start min-h-[44px] flex items-center justify-center cursor-pointer ${
                activeTab === t.id
                  ? 'bg-white text-slate-900 shadow-xs font-bold border border-slate-200'
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

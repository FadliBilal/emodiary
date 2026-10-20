import React from 'react';
import { useEmoDiary } from './hooks/useEmoDiary';
import { TopBar } from './components/TopBar';
import { RecordPillar } from './components/pillars/RecordPillar';
import { UnderstandPillar } from './components/pillars/UnderstandPillar';
import { SupportPillar } from './components/pillars/SupportPillar';
import { ConnectPillar } from './components/pillars/ConnectPillar';
import { UnifiedJourneyView } from './components/pillars/UnifiedJourneyView';
import { JudgePitchDrawer } from './components/modals/JudgePitchDrawer';
import { EthicalPrivacyModal } from './components/modals/EthicalPrivacyModal';
import { BreathingModal } from './components/modals/BreathingModal';
import { ClinicalSummaryModal } from './components/modals/ClinicalSummaryModal';
import { BookingModal } from './components/modals/BookingModal';
import { CrisisModal } from './components/modals/CrisisModal';

export function App() {
  const {
    activeScenarioId,
    setActiveScenarioId,
    activeTab,
    setActiveTab,
    currentScenario,
    entries,
    consecutiveNegativeDays,
    addEntry,
    isPitchOpen,
    setIsPitchOpen,
    isEthicsOpen,
    setIsEthicsOpen,
    isCrisisOpen,
    setIsCrisisOpen,
    isBreathingOpen,
    setIsBreathingOpen,
    summaryOptions,
    setSummaryOptions,
    selectedPsychologist,
    setSelectedPsychologist,
  } = useEmoDiary();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden w-full max-w-[100vw]">
      {/* Streamlined Serene Header */}
      <TopBar
        activeScenarioId={activeScenarioId}
        onScenarioChange={(id) => {
          setActiveScenarioId(id);
          if (id === 'sandbox') setActiveTab('record');
        }}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenPitchDrawer={() => setIsPitchOpen(true)}
        onOpenEthicsModal={() => setIsEthicsOpen(true)}
      />

      {/* Main Content Workspace with Fluid Responsive Sizing & min-w-0 Shrink Protection */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 min-w-0">
        {activeTab === 'journey' && (
          <UnifiedJourneyView
            scenario={currentScenario}
            entries={entries}
            consecutiveNegativeDays={consecutiveNegativeDays}
            onNavigateToTab={setActiveTab}
            onOpenBreathingModal={() => setIsBreathingOpen(true)}
          />
        )}

        {activeTab === 'record' && (
          <RecordPillar
            entries={entries}
            onAddEntry={addEntry}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'understand' && (
          <UnderstandPillar
            entries={entries}
            consecutiveNegativeDays={consecutiveNegativeDays}
            clinicalRiskLevel={currentScenario.clinicalRiskLevel}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'support' && (
          <SupportPillar
            latestEntry={entries[entries.length - 1]}
            onOpenBreathingModal={() => setIsBreathingOpen(true)}
            onNavigateToConnect={() => setActiveTab('connect')}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'connect' && (
          <ConnectPillar
            entries={entries}
            consecutiveNegativeDays={consecutiveNegativeDays}
            onOpenClinicalSummary={(opts) => setSummaryOptions(opts)}
            onSelectPsychologistForBooking={(p) => setSelectedPsychologist(p)}
            onNavigateToTab={setActiveTab}
          />
        )}
      </main>

      {/* Clean Modern Footnote */}
      <footer className="border-t border-slate-200 py-5 px-4 text-center text-xs text-slate-500 bg-white w-full max-w-[100vw]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium text-slate-700">
            Universitas 17 Agustus 1945 Surabaya • Inovasi Kesehatan Mental Digital 2026
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEthicsOpen(true)}
              className="hover:text-slate-900 underline transition-colors cursor-pointer min-h-[36px] flex items-center"
            >
              Panduan Etika WHO 2021
            </button>
            <span>•</span>
            <button
              onClick={() => setIsPitchOpen(true)}
              className="hover:text-slate-900 underline transition-colors cursor-pointer min-h-[36px] flex items-center"
            >
              Info Lomba & Tim
            </button>
            <span>•</span>
            <button
              onClick={() => setIsCrisisOpen(true)}
              className="text-rose-600 hover:underline font-semibold cursor-pointer min-h-[36px] flex items-center"
            >
              Hotline Krisis 119
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-overs */}
      <JudgePitchDrawer
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
      />

      <EthicalPrivacyModal
        isOpen={isEthicsOpen}
        onClose={() => setIsEthicsOpen(false)}
      />

      <BreathingModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      <ClinicalSummaryModal
        isOpen={summaryOptions !== null}
        onClose={() => setSummaryOptions(null)}
        scenario={currentScenario}
        entries={entries}
        consentOptions={
          summaryOptions || {
            includeMoodTrajectory: true,
            includeStressorTags: true,
            includeSleepCorrelation: true,
            includePersistenceRiskScore: true,
            includeRawDiaryNotes: false,
            notesToPsychologist: ''
          }
        }
      />

      <BookingModal
        isOpen={selectedPsychologist !== null}
        onClose={() => setSelectedPsychologist(null)}
        psychologist={selectedPsychologist}
      />

      <CrisisModal
        isOpen={isCrisisOpen}
        onClose={() => setIsCrisisOpen(false)}
      />
    </div>
  );
}

export default App;

import { useState, useMemo, useCallback } from 'react';
import { DemoScenarioId, MoodEntry, DemoScenario, ConsentExportState, Psychologist } from '../types';
import { DEMO_SCENARIOS } from '../data/emodiaryData';

export function useEmoDiary() {
  const [activeScenarioId, setActiveScenarioId] = useState<DemoScenarioId>('raka');
  const [scenarios, setScenarios] = useState<Record<string, DemoScenario>>(DEMO_SCENARIOS);
  const [activeTab, setActiveTab] = useState<'journey' | 'record' | 'understand' | 'support' | 'connect'>('journey');

  // Modals
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isEthicsOpen, setIsEthicsOpen] = useState(false);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [summaryOptions, setSummaryOptions] = useState<ConsentExportState | null>(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);

  const currentScenario = scenarios[activeScenarioId] || scenarios.raka;
  const entries = currentScenario.initialEntries;

  // Calculate consecutive negative days (Score <= 2)
  const consecutiveNegativeDays = useMemo(() => {
    let count = 0;
    for (let i = entries.length - 1; i >= 0; i--) {
      if (entries[i].score <= 2) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [entries]);

  // Add new mood entry
  const addEntry = useCallback((newEntry: MoodEntry) => {
    setScenarios((prev) => {
      const scenario = prev[activeScenarioId];
      const updatedEntries = [...scenario.initialEntries, newEntry];

      let count = 0;
      for (let i = updatedEntries.length - 1; i >= 0; i--) {
        if (updatedEntries[i].score <= 2) count++;
        else break;
      }

      return {
        ...prev,
        [activeScenarioId]: {
          ...scenario,
          initialEntries: updatedEntries,
          consecutiveNegativeDays: count,
          clinicalRiskLevel: count >= 4 ? 'elevated' : count >= 2 ? 'moderate' : 'low',
          riskBadgeText: count >= 4 ? 'Distres Persisten Terdeteksi' : 'Fluktuasi Terpantau'
        }
      };
    });
  }, [activeScenarioId]);

  // Reset current scenario to baseline
  const resetScenario = useCallback(() => {
    setScenarios((prev) => ({
      ...prev,
      [activeScenarioId]: { ...DEMO_SCENARIOS[activeScenarioId] }
    }));
  }, [activeScenarioId]);

  return {
    activeScenarioId,
    setActiveScenarioId,
    activeTab,
    setActiveTab,
    currentScenario,
    entries,
    consecutiveNegativeDays,
    addEntry,
    resetScenario,
    // Modals
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
  };
}

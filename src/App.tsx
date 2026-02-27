import { useCallback, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { MainLayout } from './components/layout/MainLayout';
import { StatusBar } from './components/layout/StatusBar';
import { CustomerPanel } from './components/customer/CustomerPanel';
import { AgentCollaborationPanel } from './components/agents/AgentCollaborationPanel';
import { SettingsModal } from './components/shared/SettingsModal';
import { useSessionStore, useUIStore } from './store';
import { runOrchestrator } from './services/orchestrator';
import { createAIProvider } from './services/ai';

export default function App() {
  const { selectedScenarioId, mode } = useSessionStore();
  const { apiKey } = useUIStore();

  const aiProvider = useMemo(() => {
    if (mode === 'live' && apiKey) {
      return createAIProvider(apiKey);
    }
    return null;
  }, [mode, apiKey]);

  const handleSendMessage = useCallback((text: string) => {
    if (!selectedScenarioId) return;
    runOrchestrator(selectedScenarioId, text, aiProvider);
  }, [selectedScenarioId, aiProvider]);

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Header />
      <MainLayout
        left={<CustomerPanel onSendMessage={handleSendMessage} />}
        right={<AgentCollaborationPanel />}
      />
      <StatusBar />
      <SettingsModal />
    </div>
  );
}

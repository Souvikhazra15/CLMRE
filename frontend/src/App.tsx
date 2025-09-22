import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LoginForm } from './components/auth/LoginForm';
import { Overview } from './components/dashboard/Overview';
import { DataIngestion } from './components/dashboard/DataIngestion';
import { AITools } from './components/dashboard/AITools';
import { CorrelationEngine } from './components/dashboard/CorrelationEngine';
import { VirtualAssistant } from './components/dashboard/VirtualAssistant';
import { CompanyVerification } from './components/dashboard/CompanyVerification';
import { MarineMaps } from './components/dashboard/MarineMaps';

function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'data-ingestion':
        return <DataIngestion />;
      case 'ai-tools':
        return <AITools />;
      case 'correlation':
        return <CorrelationEngine />;
      case 'assistant':
        return <VirtualAssistant />;
      case 'verification':
        return <CompanyVerification />;
      case 'maps':
        return <MarineMaps />;
      case 'datasets':
        return (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Approved Datasets</h3>
            <p className="text-slate-400">Access to approved marine datasets for pharmaceutical research.</p>
          </div>
        );
      case 'research':
        return (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Research Tools</h3>
            <p className="text-slate-400">Specialized tools for marine biotechnology research.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Policy Reports</h3>
            <p className="text-slate-400">Generate policy reports based on marine data insights.</p>
          </div>
        );
      case 'oversight':
        return (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Data Oversight</h3>
            <p className="text-slate-400">Monitor data usage and access patterns.</p>
          </div>
        );
      case 'education':
        return (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Educational Content</h3>
            <p className="text-slate-400">Learn about marine biodiversity and conservation.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Settings</h3>
            <p className="text-slate-400">Manage your account and preferences.</p>
          </div>
        );
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
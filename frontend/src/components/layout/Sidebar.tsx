import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Database, 
  Brain, 
  BarChart3, 
  MessageCircle, 
  Map, 
  Settings,
  Shield,
  Users,
  FileText,
  Eye
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'overview', label: 'Overview', icon: BarChart3 },
      { id: 'maps', label: 'Marine Maps', icon: Map },
    ];

    switch (user?.role) {
      case 'scientist':
        return [
          ...baseItems,
          { id: 'data-ingestion', label: 'Data Ingestion', icon: Database },
          { id: 'ai-tools', label: 'AI Tools', icon: Brain },
          { id: 'correlation', label: 'Correlation Engine', icon: BarChart3 },
          { id: 'assistant', label: 'Virtual Assistant', icon: MessageCircle },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'government':
        return [
          ...baseItems,
          { id: 'verification', label: 'Company Verification', icon: Shield },
          { id: 'reports', label: 'Policy Reports', icon: FileText },
          { id: 'oversight', label: 'Data Oversight', icon: Eye },
        ];
      case 'company':
        return [
          ...baseItems,
          { id: 'datasets', label: 'Approved Datasets', icon: Database },
          { id: 'research', label: 'Research Tools', icon: Brain },
        ];
      case 'public':
        return [
          ...baseItems,
          { id: 'education', label: 'Educational Content', icon: Users },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-slate-900/50 border-r border-slate-700 h-[calc(100vh-4rem)]">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
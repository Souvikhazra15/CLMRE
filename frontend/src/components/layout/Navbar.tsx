import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';
import { Moon, Sun, User, LogOut, Waves } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Waves className="h-8 w-8 text-cyan-400" />
            <div>
              <h1 className="text-xl font-bold text-white">Marine Data Hub</h1>
              <p className="text-xs text-slate-400">CMLRE Research Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-400" />}
            </button>

            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-lg">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-white">{user.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
                <Button variant="ghost" onClick={logout} size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
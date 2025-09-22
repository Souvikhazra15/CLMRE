import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Marine Researcher',
    email: 'scientist@cmlre.gov.in',
    role: 'scientist',
    department: 'Marine Biology',
    organization: 'CMLRE'
  },
  {
    id: '2',
    name: 'Policy Officer',
    email: 'gov@moes.gov.in',
    role: 'government',
    department: 'Marine Policy',
    organization: 'MoES India'
  },
  {
    id: '3',
    name: 'Pharma Research Lead',
    email: 'research@biocorp.com',
    role: 'company',
    organization: 'BioCorp Pharmaceuticals',
    verified: true
  },
  {
    id: '4',
    name: 'Public User',
    email: 'user@example.com',
    role: 'public'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
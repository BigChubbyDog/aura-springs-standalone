'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  getCurrentUser, 
  isAuthenticated as checkAuth,
  hasRole,
  hasAnyRole,
  getUserDisplayName,
  getUserEmail,
  ROLES,
  buildLoginUrl,
  buildLogoutUrl
} from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isWorker: boolean;
  isCustomer: boolean;
  displayName: string;
  email: string | null;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  login: (provider: 'AZURE_AD' | 'GITHUB', redirectTo?: string) => void;
  logout: (redirectTo?: string) => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount and when needed
  const fetchUser = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    
    // Check for auth changes when window regains focus
    const handleFocus = () => {
      fetchUser();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Login function
  const login = (provider: 'AZURE_AD' | 'GITHUB', redirectTo?: string) => {
    const loginUrl = buildLoginUrl(provider, redirectTo || window.location.pathname);
    window.location.href = loginUrl;
  };

  // Logout function
  const logout = (redirectTo?: string) => {
    const logoutUrl = buildLogoutUrl(redirectTo);
    window.location.href = logoutUrl;
  };

  // Context value
  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: checkAuth(user),
    isAdmin: hasRole(user, ROLES.ADMIN),
    isWorker: hasRole(user, ROLES.WORKER),
    isCustomer: hasRole(user, ROLES.CUSTOMER) || checkAuth(user),
    displayName: getUserDisplayName(user),
    email: getUserEmail(user),
    hasRole: (role: string) => hasRole(user, role),
    hasAnyRole: (roles: string[]) => hasAnyRole(user, roles),
    login,
    logout,
    refresh: fetchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protected components
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles?: string[]
) {
  return function ProtectedComponent(props: P) {
    const { user, loading, hasAnyRole, login } = useAuth();
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      );
    }
    
    if (!user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-8">Please log in to access this page.</p>
          <div className="flex gap-4">
            <button
              onClick={() => login('AZURE_AD')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login with Microsoft
            </button>
            <button
              onClick={() => login('GITHUB')}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              Login with GitHub
            </button>
          </div>
        </div>
      );
    }
    
    if (requiredRoles && !hasAnyRole(requiredRoles)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}
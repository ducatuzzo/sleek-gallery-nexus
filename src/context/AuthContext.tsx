
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name?: string) => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [pendingTwoFactor, setPendingTwoFactor] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const checkAuth = () => {
      const storedUser = localStorage.getItem('v4s_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('v4s_user');
        }
      }
      setIsInitialized(true);
    };

    checkAuth();
  }, []);

  // Mock login function - In a real app, this would be an API call
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user authentication - In a real app, validate credentials server-side
      if (email && password) {
        // This is just a mock user for demonstration
        const mockUser = { id: '1', email };
        
        // Store the user temporarily until 2FA is verified
        setPendingTwoFactor(mockUser);
        
        // Don't set the user yet, wait for 2FA verification
        // setUser(mockUser);
        // localStorage.setItem('v4s_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call to verify 2FA code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate the code server-side
      // For demo purposes, we'll accept any 6-digit code
      const isValidCode = /^\d{6}$/.test(code);
      
      if (isValidCode && pendingTwoFactor) {
        // Success! Complete the login process
        setUser(pendingTwoFactor);
        localStorage.setItem('v4s_user', JSON.stringify(pendingTwoFactor));
        setPendingTwoFactor(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('2FA verification failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('v4s_user');
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this data to your server
      const newUser = { id: Date.now().toString(), email, name };
      setPendingTwoFactor(newUser);
      
      // Don't set the user yet, wait for 2FA setup and verification
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isInitialized,
        login,
        logout,
        register,
        verifyTwoFactor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

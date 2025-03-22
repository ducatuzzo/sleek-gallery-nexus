
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAuth, setPendingAuth] = useState<{ email: string; password: string } | null>(null);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // In a real app, this would interact with a backend auth service
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password and set pending auth
      // In a real app, validate credentials with backend
      setPendingAuth({ email, password });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed and set pending auth
      // In a real app, register user with backend
      setPendingAuth({ email, password });
      
      toast({
        title: 'Account created',
        description: 'Please verify with the code sent to your device',
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'Could not create account',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!pendingAuth) {
        return false;
      }
      
      // For demo purposes, accept any 6-digit code
      // In a real app, validate 2FA code with backend
      if (code.length === 6 && /^\d+$/.test(code)) {
        const newUser = {
          id: Math.random().toString(36).substring(2, 15),
          email: pendingAuth.email,
          name: pendingAuth.email.split('@')[0], // Use email username as name
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setPendingAuth(null);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${newUser.name}!`,
        });
        
        return true;
      }
      
      toast({
        title: 'Verification failed',
        description: 'Invalid verification code',
        variant: 'destructive',
      });
      
      return false;
    } catch (error) {
      console.error('2FA verification error:', error);
      toast({
        title: 'Verification failed',
        description: 'Could not verify code',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        login,
        register,
        logout,
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

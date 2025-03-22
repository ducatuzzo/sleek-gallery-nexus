
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login, register, verifyTwoFactor, isLoading } = useAuth();
  const { t } = useLanguage();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setTwoFactorCode('');
    setShowTwoFactor(false);
    setError(null);
    setIsLoginMode(true);
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (showTwoFactor) {
        // Handle 2FA verification
        const success = await verifyTwoFactor(twoFactorCode);
        if (success) {
          handleClose();
        } else {
          setError('Invalid verification code');
        }
      } else if (isLoginMode) {
        // Handle login
        const success = await login(email, password);
        if (success) {
          setShowTwoFactor(true);
        }
      } else {
        // Handle registration
        if (password.length < 8) {
          setError('Password must be at least 8 characters');
          return;
        }
        const success = await register(email, password, name);
        if (success) {
          setShowTwoFactor(true);
        }
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleClose}>
      {/* Modal backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal content */}
      <div 
        className="relative w-full max-w-md p-6 mx-4 bg-black border border-white/10 rounded-2xl shadow-2xl animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            {showTwoFactor 
              ? t('verify') 
              : isLoginMode 
                ? t('login') 
                : t('register')}
          </h2>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-ducati/10 border border-ducati/20 text-ducati rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {showTwoFactor ? (
            // 2FA verification form
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="twoFactorCode">
                {t('twoFactorCode')}
              </label>
              <input
                id="twoFactorCode"
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder="000000"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-ducati focus:border-transparent text-white"
                required
                maxLength={6}
                pattern="\d{6}"
              />
              <p className="mt-2 text-sm text-gray-400">
                Enter the 6-digit verification code from your authenticator app.
              </p>
            </div>
          ) : (
            // Login or Register form
            <>
              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-ducati focus:border-transparent text-white"
                    required={!isLoginMode}
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
                  {t('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-ducati focus:border-transparent text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                  {t('password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-ducati focus:border-transparent text-white"
                  required
                  minLength={8}
                />
              </div>
            </>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-ducati hover:bg-ducati-dark text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ducati focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                {showTwoFactor ? t('verify') : isLoginMode ? t('login') : t('register')}
              </>
            ) : (
              showTwoFactor ? t('verify') : isLoginMode ? t('login') : t('register')
            )}
          </button>
          
          {!showTwoFactor && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={toggleMode}
                className="text-sm text-ducati hover:underline focus:outline-none"
              >
                {isLoginMode ? 'Create an account' : 'Already have an account?'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

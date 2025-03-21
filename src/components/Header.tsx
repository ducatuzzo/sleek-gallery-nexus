
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import WeatherWidget from './WeatherWidget';
import LanguageSwitcher from './LanguageSwitcher';
import LoginModal from './LoginModal';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-glass backdrop-blur-md shadow-sm' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            V4S.ch
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <WeatherWidget />
            
            <LanguageSwitcher />

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-glass rounded-full px-4 py-2 hover:bg-opacity-20 transition-all"
                >
                  {t('dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-glass rounded-full px-4 py-2 hover:bg-opacity-20 transition-all"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <button
                onClick={openLoginModal}
                className="bg-ducati text-white rounded-full px-5 py-2 hover:bg-ducati-dark transition-colors shadow-button"
              >
                {t('login')}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full bg-glass backdrop-blur-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-glass backdrop-blur-xl p-4 flex flex-col space-y-4 animate-slide-down border-t border-white border-opacity-10">
            <WeatherWidget />
            
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="w-full text-center bg-glass rounded-full px-4 py-3 hover:bg-opacity-20 transition-all"
                >
                  {t('dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-glass rounded-full px-4 py-3 hover:bg-opacity-20 transition-all"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <button
                onClick={openLoginModal}
                className="w-full text-center bg-ducati text-white rounded-full px-5 py-3 hover:bg-ducati-dark transition-colors shadow-button"
              >
                {t('login')}
              </button>
            )}
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Header;

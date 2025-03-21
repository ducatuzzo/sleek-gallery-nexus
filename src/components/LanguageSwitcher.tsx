
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang: 'de' | 'en' | 'it') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-glass rounded-full px-4 py-2 flex items-center space-x-2 text-sm hover:bg-opacity-20 transition-all"
        aria-label={t('language')}
      >
        <Languages className="h-4 w-4" />
        <span>{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-glass backdrop-blur-lg rounded-lg shadow-lg overflow-hidden z-50 animate-zoom-in">
          <div className="py-1">
            <button
              onClick={() => handleLanguageChange('de')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-between ${
                language === 'de' ? 'font-medium bg-white bg-opacity-10' : ''
              }`}
            >
              <span>{t('germanLanguage')}</span>
              {language === 'de' && <span>✓</span>}
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-between ${
                language === 'en' ? 'font-medium bg-white bg-opacity-10' : ''
              }`}
            >
              <span>{t('englishLanguage')}</span>
              {language === 'en' && <span>✓</span>}
            </button>
            <button
              onClick={() => handleLanguageChange('it')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-between ${
                language === 'it' ? 'font-medium bg-white bg-opacity-10' : ''
              }`}
            >
              <span>{t('italianLanguage')}</span>
              {language === 'it' && <span>✓</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

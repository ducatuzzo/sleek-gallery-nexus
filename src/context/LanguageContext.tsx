
import { createContext, useContext, useState, ReactNode } from 'react';

// Language translations
const translations = {
  en: {
    welcomeTitle: 'The Ultimate Riding Experience',
    welcomeSubtitle: 'Discover the pure thrill of a Ducati V4S - where technology meets passion.',
    dashboard: 'Dashboard',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    weather: 'Weather',
    contact: 'Contact',
    photoAlbum: 'Photo Album',
    dragAndDrop: 'Drag and drop your photos here or click to browse',
    createAlbum: 'Create Album',
    email: 'Email',
    password: 'Password',
    verify: 'Verify',
    twoFactorCode: 'Verification Code',
    language: 'Language',
    germanLanguage: 'German',
    englishLanguage: 'English',
    italianLanguage: 'Italian',
  },
  de: {
    welcomeTitle: 'Das ultimative Fahrerlebnis',
    welcomeSubtitle: 'Entdecke den puren Nervenkitzel einer Ducati V4S - wo Technologie auf Leidenschaft trifft.',
    dashboard: 'Dashboard',
    logout: 'Abmelden',
    login: 'Anmelden',
    register: 'Registrieren',
    weather: 'Wetter',
    contact: 'Kontakt',
    photoAlbum: 'Fotoalbum',
    dragAndDrop: 'Ziehe deine Fotos hierher oder klicke zum Durchsuchen',
    createAlbum: 'Album erstellen',
    email: 'E-Mail',
    password: 'Passwort',
    verify: 'Verifizieren',
    twoFactorCode: 'Verifizierungscode',
    language: 'Sprache',
    germanLanguage: 'Deutsch',
    englishLanguage: 'Englisch',
    italianLanguage: 'Italienisch',
  },
  it: {
    welcomeTitle: 'L\'esperienza di guida definitiva',
    welcomeSubtitle: 'Scopri l\'emozione pura di una Ducati V4S - dove la tecnologia incontra la passione.',
    dashboard: 'Dashboard',
    logout: 'Disconnetti',
    login: 'Accedi',
    register: 'Registrati',
    weather: 'Meteo',
    contact: 'Contatto',
    photoAlbum: 'Album fotografico',
    dragAndDrop: 'Trascina qui le tue foto o clicca per sfogliare',
    createAlbum: 'Crea album',
    email: 'Email',
    password: 'Password',
    verify: 'Verifica',
    twoFactorCode: 'Codice di verifica',
    language: 'Lingua',
    germanLanguage: 'Tedesco',
    englishLanguage: 'Inglese',
    italianLanguage: 'Italiano',
  },
};

type Language = 'en' | 'de' | 'it';
type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Detect browser language or use stored preference
  const getBrowserLanguage = (): Language => {
    const storedLanguage = localStorage.getItem('language') as Language | null;
    
    if (storedLanguage && ['en', 'de', 'it'].includes(storedLanguage)) {
      return storedLanguage;
    }
    
    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'de' || browserLang === 'it') ? browserLang as Language : 'en';
  };
  
  const [language, setLanguage] = useState<Language>(getBrowserLanguage);
  
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

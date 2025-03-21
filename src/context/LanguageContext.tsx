
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'de' | 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Translations for each language
const translations: Record<Language, Record<string, string>> = {
  de: {
    welcomeTitle: 'Willkommen',
    welcomeSubtitle: 'Entdecken Sie die Ducati Panigale V4S',
    login: 'Anmelden',
    register: 'Registrieren',
    weather: 'Wetter in Zollikofen',
    photoAlbum: 'Fotoalbum',
    hobbies: 'Hobbys',
    professional: 'Beruflich',
    contact: 'Kontakt',
    email: 'E-Mail',
    password: 'Passwort',
    twoFactorCode: '2FA Code',
    verify: 'Bestätigen',
    logout: 'Abmelden',
    uploadPhotos: 'Fotos hochladen',
    createAlbum: 'Album erstellen',
    dragAndDrop: 'Ziehen Sie Ihre Bilder hierher oder klicken Sie, um auszuwählen',
    temperature: 'Temperatur',
    condition: 'Wetterlage',
    language: 'Sprache',
    germanLanguage: 'Deutsch',
    englishLanguage: 'Englisch',
    italianLanguage: 'Italienisch',
    dashboard: 'Dashboard',
    welcomeBack: 'Willkommen zurück',
    continueToSite: 'Zur Website',
  },
  en: {
    welcomeTitle: 'Welcome',
    welcomeSubtitle: 'Discover the Ducati Panigale V4S',
    login: 'Login',
    register: 'Register',
    weather: 'Weather in Zollikofen',
    photoAlbum: 'Photo Album',
    hobbies: 'Hobbies',
    professional: 'Professional',
    contact: 'Contact',
    email: 'Email',
    password: 'Password',
    twoFactorCode: '2FA Code',
    verify: 'Verify',
    logout: 'Logout',
    uploadPhotos: 'Upload Photos',
    createAlbum: 'Create Album',
    dragAndDrop: 'Drag and drop your images here or click to select',
    temperature: 'Temperature',
    condition: 'Condition',
    language: 'Language',
    germanLanguage: 'German',
    englishLanguage: 'English',
    italianLanguage: 'Italian',
    dashboard: 'Dashboard',
    welcomeBack: 'Welcome back',
    continueToSite: 'Continue to site',
  },
  it: {
    welcomeTitle: 'Benvenuto',
    welcomeSubtitle: 'Scopri la Ducati Panigale V4S',
    login: 'Accesso',
    register: 'Registrati',
    weather: 'Meteo a Zollikofen',
    photoAlbum: 'Album fotografico',
    hobbies: 'Hobby',
    professional: 'Professionale',
    contact: 'Contatto',
    email: 'Email',
    password: 'Password',
    twoFactorCode: 'Codice 2FA',
    verify: 'Verifica',
    logout: 'Disconnetti',
    uploadPhotos: 'Carica foto',
    createAlbum: 'Crea album',
    dragAndDrop: 'Trascina e rilascia qui le tue immagini o clicca per selezionare',
    temperature: 'Temperatura',
    condition: 'Condizione',
    language: 'Lingua',
    germanLanguage: 'Tedesco',
    englishLanguage: 'Inglese',
    italianLanguage: 'Italiano',
    dashboard: 'Dashboard',
    welcomeBack: 'Bentornato',
    continueToSite: 'Continua al sito',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to detect browser language, fallback to 'de'
  const detectBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    
    if (browserLang === 'de') return 'de';
    if (browserLang === 'it') return 'it';
    if (browserLang === 'en') return 'en';
    
    return 'de'; // Default to German
  };

  const [language, setLanguageState] = useState<Language>(() => {
    // Check if language is saved in localStorage
    const savedLang = localStorage.getItem('v4s_language') as Language;
    return savedLang || detectBrowserLanguage();
  });

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('v4s_language', lang);
  };

  // Function to get translation
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Update HTML lang attribute when language changes
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

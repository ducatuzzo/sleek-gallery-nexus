
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 py-12 bg-black text-white overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col space-y-4">
            <div className="text-2xl font-bold tracking-tight">V4S.ch</div>
            <p className="text-sm text-gray-400 max-w-xs">
              A premium website dedicated to passion, precision, and performance.
              Inspired by the Ducati Panigale V4S.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">{t('contact')}</h3>
            <div className="flex flex-col space-y-3">
              <a 
                href="mailto:info@v4s.ch" 
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={16} />
                <span>info@v4s.ch</span>
              </a>
              <a 
                href="tel:+41123456789" 
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={16} />
                <span>+41 12 345 67 89</span>
              </a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white bg-opacity-10 rounded-lg px-4 py-2 text-sm 
                           border border-white border-opacity-10 focus:outline-none 
                           focus:ring-2 focus:ring-ducati focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-ducati text-white rounded-lg px-4 py-2 text-sm 
                          hover:bg-ducati-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-white border-opacity-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            &copy; {currentYear} V4S.ch. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

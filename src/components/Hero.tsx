
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        // Parallax effect on scroll
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Image URL for the Ducati Panigale V4S
  const imageUrl = "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop";
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        ref={heroRef} 
        className="absolute inset-0 w-full h-full bg-black"
      >
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={imageUrl}
            alt="Ducati Panigale V4S"
            className="w-full h-full object-cover object-center"
            onLoad={handleImageLoad}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black animate-pulse" />
        )}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4 z-10">
        <div className="text-center animate-fadeInUp opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <div className="inline-block px-3 py-1 mb-6 border border-white/20 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">
            V4S.ch
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
            {t('welcomeTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-xl mx-auto">
            {t('welcomeSubtitle')}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-indicator">
          <ChevronDown size={32} className="text-white/70" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

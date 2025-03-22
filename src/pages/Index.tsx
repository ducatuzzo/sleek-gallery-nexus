
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const Index = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Create refs for fade-in animations
  const { ref: featureRef, inView: featureInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: specRef, inView: specInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: quoteRef, inView: quoteInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Ducati specs
  const specs = [
    { label: 'Engine', value: 'Desmosedici Stradale V4 (90° V)' },
    { label: 'Displacement', value: '1,103 cc' },
    { label: 'Power', value: '214 hp (158 kW) @ 13,000 rpm' },
    { label: 'Torque', value: '124 Nm (91.5 lb-ft) @ 10,000 rpm' },
    { label: 'Dry Weight', value: '175 kg (386 lb)' },
    { label: 'Top Speed', value: '299+ km/h (186+ mph)' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section 
          ref={featureRef}
          className={`py-24 px-4 transition-opacity duration-1000 ${
            featureInView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ducati Panigale V4S</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                The pinnacle of Ducati superbike development, representing the closest connection to MotoGP engineering.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-ducati/10 text-ducati rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Unmatched Performance</h3>
                <p className="text-gray-400">
                  The V4S delivers extraordinary performance with advanced electronics and aerodynamic design.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-ducati/10 text-ducati rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Racing Technology</h3>
                <p className="text-gray-400">
                  Directly derived from MotoGP experience, the V4S incorporates cutting-edge racing solutions.
                </p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-ducati/10 text-ducati rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Italian Craftsmanship</h3>
                <p className="text-gray-400">
                  Meticulously crafted with attention to every detail, embodying Italian passion and design excellence.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Specifications Section with Image */}
        <section className="py-16 px-4 bg-black">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div 
                ref={specRef}
                className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-transform duration-1000 ${
                  specInView ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'
                }`}
              >
                <div className={`transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <img
                    src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop"
                    alt="Ducati Motorcycle"
                    className="w-full h-auto rounded-2xl"
                    onLoad={handleImageLoad}
                  />
                </div>
                
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-white/5 animate-pulse rounded-2xl" />
                )}
              </div>
              
              {/* Specifications */}
              <div 
                className={`transition-transform duration-1000 ${
                  specInView ? 'translate-x-0 opacity-100' : 'translate-x-[50px] opacity-0'
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Technical Specifications</h2>
                
                <div className="space-y-6">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-ducati rounded-full" style={{ width: `${100 - (index * 10)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section 
          ref={quoteRef}
          className={`py-24 px-4 bg-black text-white transition-opacity duration-1000 ${
            quoteInView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <svg className="w-12 h-12 text-ducati mx-auto mb-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            
            <blockquote className="text-2xl md:text-4xl font-light italic mb-8 leading-relaxed">
              "When you buy a Ducati, you're buying into a lifestyle, a tradition of excellence, and a legacy of racing dominance."
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-1 bg-ducati mr-4"></div>
              <cite className="not-italic font-medium text-lg">Claudio Domenicali, CEO Ducati</cite>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

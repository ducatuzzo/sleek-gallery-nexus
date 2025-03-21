
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PhotoAlbum from '../components/PhotoAlbum';
import { ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'photos' | 'hobbies' | 'professional'>('photos');

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isInitialized, navigate]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ducati"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // This will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Dashboard Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {t('welcomeBack')}{user?.name ? `, ${user.name}` : ''}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {t('continueToSite')}
            </p>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="mb-8 flex justify-center">
            <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'photos'
                    ? 'bg-ducati text-white shadow-sm'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t('photoAlbum')}
              </button>
              <button
                onClick={() => setActiveTab('hobbies')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'hobbies'
                    ? 'bg-ducati text-white shadow-sm'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t('hobbies')}
              </button>
              <button
                onClick={() => setActiveTab('professional')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'professional'
                    ? 'bg-ducati text-white shadow-sm'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t('professional')}
              </button>
            </div>
          </div>
          
          {/* Content based on active tab */}
          <div className="animate-fade-in">
            {activeTab === 'photos' && (
              <PhotoAlbum />
            )}
            
            {activeTab === 'hobbies' && (
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">{t('hobbies')}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Motorcycling */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-3">Motorcycling</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Passionate about riding Ducati motorcycles on both track and road. Regularly attend track days and motorcycle events.
                    </p>
                    <div className="flex justify-end">
                      <button className="flex items-center text-ducati hover:underline">
                        <span>More about motorcycling</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Photography */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-3">Photography</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Capturing the beauty of motorcycles, racing, and scenic routes. Specializing in action and detail photography.
                    </p>
                    <div className="flex justify-end">
                      <button className="flex items-center text-ducati hover:underline">
                        <span>View photography work</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Travel */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-3">Travel</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Exploring scenic routes and destinations by motorcycle. From Alpine passes to coastal roads around Europe.
                    </p>
                    <div className="flex justify-end">
                      <button className="flex items-center text-ducati hover:underline">
                        <span>Explore travel stories</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Technical Modifications */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-3">Technical Modifications</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Customizing and upgrading motorcycles. Working with performance parts and aesthetic modifications.
                    </p>
                    <div className="flex justify-end">
                      <button className="flex items-center text-ducati hover:underline">
                        <span>View modifications</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'professional' && (
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">{t('professional')}</h2>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-bold mb-3">LinkedIn Profile</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Connect with me professionally on LinkedIn to see my work experience, skills, and recommendations.
                  </p>
                  <div className="flex justify-center mt-4">
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] transition-colors flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      View LinkedIn Profile
                    </a>
                  </div>
                </div>
                
                {/* Embedded LinkedIn iFrame - In a real project, this would use LinkedIn's API */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="aspect-[4/3] w-full bg-white p-4 rounded-lg shadow-sm">
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <p className="text-center">
                        LinkedIn content would be embedded here using the LinkedIn API.<br />
                        For privacy and security reasons, a direct integration is recommended<br />
                        rather than an iframe in a production environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

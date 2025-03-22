
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PhotoAlbum from '../components/PhotoAlbum';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {user?.name || 'User'}
              </h1>
              <p className="text-gray-400">
                Your private dashboard on V4S.ch
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Photo Album */}
              <section>
                <PhotoAlbum />
              </section>
              
              {/* Hobby Section */}
              <section className="bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-10">
                <h2 className="text-2xl font-bold mb-4">Hobby</h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    Motorcycling is more than just a hobby - it's a passion that fuels the soul. 
                    The Ducati Panigale V4S represents the pinnacle of Italian engineering, 
                    combining raw power with precision handling.
                  </p>
                  <p>
                    When I'm not riding, I enjoy photography, capturing moments of speed, 
                    design and the beautiful Swiss landscapes.
                  </p>
                </div>
              </section>
              
              {/* Professional Section */}
              <section className="bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-10">
                <h2 className="text-2xl font-bold mb-4">Professional</h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    With over 15 years of experience in technology, I specialize in 
                    system architecture and digital innovation. Currently working with 
                    cutting-edge technologies to build scalable solutions.
                  </p>
                  <div className="mt-4">
                    <iframe 
                      src="https://www.linkedin.com/embed/feed/update/urn:li:share:7077231819443363840" 
                      height="450" 
                      width="100%" 
                      frameBorder="0" 
                      allowFullScreen 
                      title="Embedded LinkedIn Post"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

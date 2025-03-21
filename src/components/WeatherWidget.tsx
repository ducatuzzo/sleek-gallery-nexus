
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Cloud, CloudRain, Sun, CloudLightning, CloudSnow, Thermometer } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        // API key for OpenWeatherMap (in a real app, use environment variables)
        const apiKey = 'YOUR_API_KEY';
        const city = 'Zollikofen';
        
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].description,
          icon: data.weather[0].icon,
        });
        
        setError(null);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Failed to load weather data');
        
        // For demo purposes, set mock data when API key is not available
        setWeather({
          temp: 22,
          condition: 'clear sky',
          icon: '01d',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-6 w-6 text-blue-400" />;
    
    // Map weather icon codes to Lucide icons
    const iconCode = weather.icon;
    
    if (iconCode.includes('01')) {
      return <Sun className="h-6 w-6 text-amber-400 animate-pulse-subtle" />;
    } else if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) {
      return <Cloud className="h-6 w-6 text-blue-400" />;
    } else if (iconCode.includes('09') || iconCode.includes('10')) {
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    } else if (iconCode.includes('11')) {
      return <CloudLightning className="h-6 w-6 text-purple-500" />;
    } else if (iconCode.includes('13')) {
      return <CloudSnow className="h-6 w-6 text-blue-200" />;
    } else {
      return <Cloud className="h-6 w-6 text-blue-400" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-glass rounded-full px-4 py-2 flex items-center space-x-2 animate-pulse">
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="bg-glass rounded-full px-4 py-2 flex items-center space-x-2 text-sm opacity-70">
        {t('weather')} ⚠️
      </div>
    );
  }

  return (
    <div className="bg-glass rounded-full px-4 py-2 flex items-center space-x-3 text-sm animate-fade-in backdrop-blur-md">
      <div className="flex items-center">
        {getWeatherIcon()}
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{t('weather')}</span>
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <Thermometer className="h-3 w-3 mr-1" />
            {weather?.temp}°C
          </span>
          <span className="text-xs opacity-80 capitalize">{weather?.condition}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;


import { useState, useRef, ChangeEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UploadCloud, Plus, X, Trash2, FolderPlus, Image } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  name: string;
}

interface Album {
  id: string;
  name: string;
  photos: Photo[];
}

const PhotoAlbum = () => {
  const { t } = useLanguage();
  const [albums, setAlbums] = useState<Album[]>([
    { id: '1', name: 'Ducati', photos: [] },
  ]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const simulateUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const totalSteps = 10;
      let currentStep = 0;
      
      // Create an object URL for the file
      const url = URL.createObjectURL(file);
      
      // Simulate progress updates
      const interval = setInterval(() => {
        currentStep++;
        setUploadProgress(Math.round((currentStep / totalSteps) * 100));
        
        if (currentStep === totalSteps) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(null);
            resolve(url);
          }, 500);
        }
      }, 200);
    });
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!selectedAlbum) return;
    
    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      await handleFiles(files);
    }
  };

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedAlbum) return;
    
    const { files } = e.target;
    if (files && files.length > 0) {
      await handleFiles(files);
    }
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFiles = async (files: FileList) => {
    if (!selectedAlbum) return;
    
    const newPhotos: Photo[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const url = await simulateUpload(file);
        
        newPhotos.push({
          id: Date.now().toString() + i,
          url,
          name: file.name,
        });
      }
    }
    
    if (newPhotos.length > 0) {
      const updatedAlbums = albums.map((album) => {
        if (album.id === selectedAlbum.id) {
          return {
            ...album,
            photos: [...album.photos, ...newPhotos],
          };
        }
        return album;
      });
      
      setAlbums(updatedAlbums);
      // Update the selected album
      const updatedSelectedAlbum = updatedAlbums.find((album) => album.id === selectedAlbum.id);
      if (updatedSelectedAlbum) {
        setSelectedAlbum(updatedSelectedAlbum);
      }
    }
  };

  const handleCreateAlbum = () => {
    if (newAlbumName.trim()) {
      const newAlbum: Album = {
        id: Date.now().toString(),
        name: newAlbumName.trim(),
        photos: [],
      };
      
      setAlbums([...albums, newAlbum]);
      setNewAlbumName('');
      setShowCreateAlbum(false);
      setSelectedAlbum(newAlbum);
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    if (!selectedAlbum) return;
    
    const updatedAlbums = albums.map((album) => {
      if (album.id === selectedAlbum.id) {
        return {
          ...album,
          photos: album.photos.filter((photo) => photo.id !== photoId),
        };
      }
      return album;
    });
    
    setAlbums(updatedAlbums);
    
    // Update the selected album
    const updatedSelectedAlbum = updatedAlbums.find((album) => album.id === selectedAlbum.id);
    if (updatedSelectedAlbum) {
      setSelectedAlbum(updatedSelectedAlbum);
    }
    
    // If the deleted photo was the selected one, clear the selection
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(null);
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold">{t('photoAlbum')}</h2>
          
          {/* Album selector */}
          <div className="flex-1 flex flex-wrap items-center gap-2">
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbum(album)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedAlbum?.id === album.id
                    ? 'bg-ducati text-white'
                    : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {album.name}
              </button>
            ))}
            
            {showCreateAlbum ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                  placeholder="Album name"
                  className="px-3 py-1 rounded-l-full text-sm border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-ducati"
                  autoFocus
                />
                <button
                  onClick={handleCreateAlbum}
                  className="px-3 py-1 rounded-r-full bg-ducati text-white text-sm font-medium hover:bg-ducati-dark transition-colors"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => setShowCreateAlbum(false)}
                  className="ml-1 p-1 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCreateAlbum(true)}
                className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
              >
                <FolderPlus size={16} />
                <span>{t('createAlbum')}</span>
              </button>
            )}
          </div>
        </div>
        
        {selectedAlbum ? (
          <>
            {/* Upload area */}
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleClickUpload}
              className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-ducati bg-ducati/5'
                  : 'border-gray-300 dark:border-gray-700 hover:border-ducati hover:bg-ducati/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              
              <div className="flex flex-col items-center justify-center space-y-3">
                <UploadCloud 
                  size={40} 
                  className={`${isDragging ? 'text-ducati' : 'text-gray-400'}`} 
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('dragAndDrop')}
                </p>
              </div>
              
              {uploadProgress !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                  <div className="w-2/3 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-ducati h-2.5 transition-all duration-200 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Photo gallery */}
            {selectedAlbum.photos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {selectedAlbum.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                  >
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onClick={() => setSelectedPhoto(photo)}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePhoto(photo.id);
                        }}
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 py-12 text-gray-500 dark:text-gray-400">
                <Image size={48} className="opacity-30" />
                <p>No photos in this album yet</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-12 text-gray-500 dark:text-gray-400">
            <FolderPlus size={48} className="opacity-30" />
            <p>Select or create an album to get started</p>
          </div>
        )}
      </div>
      
      {/* Photo preview modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.name}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoAlbum;

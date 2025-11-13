import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AlbumPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [album, setAlbum] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      fetchAlbum();
    }
  }, [slug]);

  useEffect(() => {
    let interval;
    if (slideshowActive && album?.photos.length > 0) {
      interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % album.photos.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [slideshowActive, album]);

  const fetchAlbum = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${slug}`
      );
      setAlbum(res.data);
      setIsPasswordProtected(res.data.isPasswordProtected);
      if (!res.data.isPasswordProtected) {
        setIsVerified(true);
      }
    } catch (err) {
      setError('Album not found or has been deleted');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${slug}/verify`,
        { password }
      );
      setIsVerified(true);
      setError('');
    } catch (err) {
      setError('Invalid password');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (photoIndex) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${slug}/track-download/${photoIndex}`
      );
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  };

  if (loading && !album) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-bold">Loading album...</div>
      </div>
    );
  }

  if (error && !album) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!album) return null;

  if (isPasswordProtected && !isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-center">{album.albumTitle}</h1>
          <p className="text-gray-600 text-center mb-6">This album is password protected</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Unlocking...' : 'Unlock Album'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{album.albumTitle}</h1>
        <p className="text-gray-600 mb-6">
          📸 Album for <span className="font-semibold">{album.clientName}</span>
        </p>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSlideshowActive(!slideshowActive)}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            {slideshowActive ? '⏸ Stop Slideshow' : '▶ Slideshow'}
          </button>
        </div>

        {slideshowActive ? (
          <div className="bg-black rounded overflow-hidden mb-8">
            <div className="relative w-full h-96 md:h-[500px]">
              <img
                src={album.photos[currentSlideIndex]?.url}
                alt="Slideshow"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <button
                  onClick={() =>
                    setCurrentSlideIndex(
                      (prev) => (prev - 1 + album.photos.length) % album.photos.length
                    )
                  }
                  className="bg-white bg-opacity-50 px-3 py-1 rounded hover:bg-opacity-75"
                >
                  ← Prev
                </button>
                <span className="text-white">
                  {currentSlideIndex + 1} / {album.photos.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentSlideIndex((prev) => (prev + 1) % album.photos.length)
                  }
                  className="bg-white bg-opacity-50 px-3 py-1 rounded hover:bg-opacity-75"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {album.photos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(idx)}
                className="cursor-pointer overflow-hidden rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={photo.url}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-48 object-cover hover:scale-105 transition"
                />
              </div>
            ))}
          </div>
        )}

        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={album.photos[selectedPhoto]?.url}
                alt="Full view"
                className="w-full"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-4">
                <button
                  onClick={() =>
                    setSelectedPhoto((prev) => (prev - 1 + album.photos.length) % album.photos.length)
                  }
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                >
                  ← Prev
                </button>
                <a
                  href={album.photos[selectedPhoto]?.url}
                  download
                  onClick={() => handleDownload(selectedPhoto)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  ⬇ Download
                </a>
                <button
                  onClick={() =>
                    setSelectedPhoto((prev) => (prev + 1) % album.photos.length)
                  }
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                >
                  Next →
                </button>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

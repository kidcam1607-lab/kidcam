'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoGallery from '@/components/PhotoGallery';

export default function AlbumPage({ params }) {
  const [album, setAlbum] = useState(null);
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    viewAlbum();
  }, []);

  const viewAlbum = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/albums/view/${params.slug}`,
        { password: unlocked ? password : undefined }
      );
      setAlbum(response.data);
      setUnlocked(true);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('This album is password protected');
      } else {
        setError(err.response?.data?.message || 'Album not found');
      }
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    viewAlbum();
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!unlocked && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handlePasswordSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">🔒 Password Protected</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600">
            Unlock
          </button>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </form>
      </div>
    );
  }

  if (!album) return <div className="text-center mt-20">Album not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{album.clientName}'s Album</h1>
        {album.description && <p className="text-gray-600 mb-6">{album.description}</p>}
        <PhotoGallery photos={album.photos} />
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminNav from '@/components/AdminNav';
import AlbumForm from '@/components/AlbumForm';

export default function DashboardPage() {
  const [albums, setAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/');
    else fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/albums`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlbumCreated = () => {
    setShowForm(false);
    fetchAlbums();
  };

  const copyToClipboard = (albumId, albumLink) => {
    navigator.clipboard.writeText(albumLink);
    setCopiedId(albumId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteAlbum = async (id) => {
    if (!confirm('Delete this album?')) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchAlbums();
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition mb-6"
        >
          + New Album
        </button>

        {showForm && <AlbumForm onSuccess={handleAlbumCreated} />}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading albums...</p>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-500 text-lg">No albums yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map(album => (
              <div key={album._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                {album.coverImage && (
                  <img src={album.coverImage} alt={album.clientName} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-xl font-bold mb-2">{album.clientName}</h3>
                <p className="text-gray-600 mb-4">{album.photos.length} photos</p>

                <button
                  onClick={() => copyToClipboard(album._id, album.albumLink)}
                  className={`${copiedId === album._id ? 'bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg mb-2 w-full transition font-medium`}
                >
                  {copiedId === album._id ? '✓ Copied!' : 'Copy Link'}
                </button>

                <button
                  onClick={() => router.push(`/album/${album.albumSlug}/upload`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg mb-2 w-full hover:bg-yellow-600 transition font-medium"
                >
                  Upload Photos
                </button>

                <button
                  onClick={() => deleteAlbum(album._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

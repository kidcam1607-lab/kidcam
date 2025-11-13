import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [albums, setAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [uploadingAlbumId, setUploadingAlbumId] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    albumTitle: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/albums`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlbums(res.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
  };

  const handleCreateAlbum = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/albums/create`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({ clientName: '', albumTitle: '', password: '' });
      setShowForm(false);
      fetchAlbums();
    } catch (error) {
      console.error('Error creating album:', error);
      alert('Failed to create album');
    }
  };

  const handleUploadPhotos = async (e, albumId) => {
    const files = e.target.files;
    if (files.length === 0) return;

    try {
      const token = localStorage.getItem('adminToken');
      const formDataUpload = new FormData();
      for (let file of files) {
        formDataUpload.append('photos', file);
      }

      setUploadingAlbumId(albumId);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/albums/${albumId}/upload`,
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploadingAlbumId(null);
      fetchAlbums();
    } catch (error) {
      console.error('Error uploading photos:', error);
      setUploadingAlbumId(null);
      alert('Failed to upload photos');
    }
  };

  const handleDeleteAlbum = async (id) => {
    if (!confirm('Are you sure you want to delete this album?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/albums/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAlbums();
    } catch (error) {
      console.error('Error deleting album:', error);
      alert('Failed to delete album');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              router.push('/admin/login');
            }}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded mb-8 hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Create New Album'}
        </button>

        {showForm && (
          <div className="bg-white p-6 rounded shadow mb-8">
            <input
              type="text"
              placeholder="Client Name *"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Album Title"
              value={formData.albumTitle}
              onChange={(e) =>
                setFormData({ ...formData, albumTitle: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password (optional)"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateAlbum}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Create Album
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div key={album._id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              {album.coverImage && (
                <img
                  src={album.coverImage}
                  alt="Cover"
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{album.clientName}</h3>
              <p className="text-gray-600 mb-2 text-sm">{album.albumTitle}</p>
              <p className="text-xs text-blue-600 mb-4 break-all bg-gray-50 p-2 rounded">
                {`${typeof window !== 'undefined' ? window.location.origin : ''}/album/${album.albumSlug}`}
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Upload Photos ({album.photos.length})
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleUploadPhotos(e, album._id)}
                  disabled={uploadingAlbumId === album._id}
                  className="w-full border p-2 rounded text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/manage/${album._id}`}>
                  <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
                    Manage
                  </button>
                </Link>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${typeof window !== 'undefined' ? window.location.origin : ''}/album/${album.albumSlug}`
                    )
                  }
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => handleDeleteAlbum(album._id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminNav from '@/components/AdminNav';
import UploadPhotos from '@/components/UploadPhotos';

export default function UploadPage({ params }) {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    fetchAlbum();
  }, []);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/albums`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      const foundAlbum = response.data.find(a => a.albumSlug === params.slug);
      setAlbum(foundAlbum);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!album) return <div className="text-center mt-20">Album not found</div>;

  return (
    <div>
      <AdminNav />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">{album.clientName}</h1>
        <p className="text-gray-600 mb-6">Currently has {album.photos.length} photos</p>

        <UploadPhotos albumId={album._id} onSuccess={fetchAlbum} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Current Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {album.photos.map((photo, idx) => (
              <img key={idx} src={photo} alt={`Photo ${idx + 1}`} className="w-full h-32 object-cover rounded-lg shadow-lg" />
            ))}
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

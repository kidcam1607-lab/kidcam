import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ManageAlbum() {
  const router = useRouter();
  const { id } = router.query;
  const [album, setAlbum] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photos, setPhotos] = useState([]);
  const [draggedPhoto, setDraggedPhoto] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAlbum();
      fetchAnalytics();
    }
  }, [id]);

  const fetchAlbum = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/albums/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlbum(res.data);
      setPhotos(res.data.photos);
      setEmail(res.data.clientEmail || '');
      setPhone(res.data.clientPhone || '');
    } catch (error) {
      console.error('Error fetching album:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/albums/${id}/analytics`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnalytics(res.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchQRCode = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sharing/${id}/qrcode`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQrCode(res.data.qrCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleReorder = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/albums/${id}/reorder`,
        { photoOrder: photos.map((_, i) => i) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Photos reordered successfully');
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  const handleDeletePhoto = async (index) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/albums/${id}/photo/${index}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAlbum();
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sharing/${id}/send-email`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  const handleWhatsAppShare = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sharing/${id}/whatsapp-link?phone=${phone}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.open(res.data.whatsappLink, '_blank');
    } catch (error) {
      console.error('Error creating WhatsApp link:', error);
    }
  };

  if (!album) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold mb-8">{album.albumTitle}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Photos */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Photos ({photos.length})</h2>
            <div className="bg-white p-6 rounded shadow mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    draggable
                    onDragStart={() => setDraggedPhoto(idx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const newPhotos = [...photos];
                      const temp = newPhotos[draggedPhoto];
                      newPhotos[draggedPhoto] = newPhotos[idx];
                      newPhotos[idx] = temp;
                      setPhotos(newPhotos);
                    }}
                    className="relative group cursor-move"
                  >
                    <img
                      src={photo.url}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 rounded">
                      <button
                        onClick={() => handleDeletePhoto(idx)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleReorder}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Save Order
              </button>
            </div>
          </div>

          {/* Right Column - Analytics & Sharing */}
          <div>
            {/* Analytics */}
            {analytics && (
              <div className="bg-white p-6 rounded shadow mb-6">
                <h3 className="text-xl font-bold mb-4">📊 Analytics</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Views:</strong> {analytics.totalViews}
                  </p>
                  <p className="text-gray-700">
                    <strong>Downloads:</strong> {analytics.totalDownloads}
                  </p>
                </div>
              </div>
            )}

            {/* QR Code */}
            <div className="bg-white p-6 rounded shadow mb-6">
              <h3 className="text-xl font-bold mb-4">📱 QR Code</h3>
              {qrCode ? (
                <div>
                  <img src={qrCode} alt="QR Code" className="w-40 h-40 mx-auto" />
                  <a
                    href={qrCode}
                    download="album-qr.png"
                    className="block mt-4 text-center bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Download QR Code
                  </a>
                </div>
              ) : (
                <button
                  onClick={fetchQRCode}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Generate QR Code
                </button>
              )}
            </div>

            {/* Email Sharing */}
            <div className="bg-white p-6 rounded shadow mb-6">
              <h3 className="text-xl font-bold mb-4">✉️ Email</h3>
              <input
                type="email"
                placeholder="Client email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
              <button
                onClick={handleSendEmail}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Send Email Link
              </button>
            </div>

            {/* WhatsApp Sharing */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-4">💬 WhatsApp</h3>
              <input
                type="tel"
                placeholder="Phone (+91)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
              <button
                onClick={handleWhatsAppShare}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Share on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

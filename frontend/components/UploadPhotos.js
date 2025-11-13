'use client';
import { useState } from 'react';
import axios from 'axios';

export default function UploadPhotos({ albumId, onSuccess }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('photos', file));

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload/${albumId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setProgress(percent);
          },
        }
      );

      setFiles([]);
      setProgress(0);
      onSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.response?.data?.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">📤 Upload Photos</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-3 mb-4 border rounded-lg cursor-pointer"
      />

      <p className="text-sm text-gray-600 mb-4">{files.length} file(s) selected</p>

      {progress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-lg h-2">
            <div
              className="bg-blue-500 h-2 rounded-lg transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}%</p>
        </div>
      )}

      <button
        type="submit"
        disabled={uploading || files.length === 0}
        className="w-full bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600 transition disabled:bg-gray-400"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

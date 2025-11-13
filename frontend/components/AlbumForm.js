'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AlbumForm({ onSuccess }) {
  const [clientName, setClientName] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/albums`, {
        clientName,
        password,
        description,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setClientName('');
      setPassword('');
      setDescription('');
      onSuccess();
    } catch (error) {
      console.error('Error creating album:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Create New Album</h2>

      <input
        type="text"
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Album Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        {loading ? 'Creating...' : 'Create Album'}
      </button>
    </form>
  );
}

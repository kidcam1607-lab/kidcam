import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [studioName, setStudioName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister
        ? { email, password, studioName }
        : { email, password };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        payload
      );
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isRegister ? 'Sign Up' : 'Admin Login'}
        </h1>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Studio Name"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              className="w-full border p-3 mb-4 rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 mb-6 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-bold"
          >
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="w-full mt-4 text-blue-600 underline"
        >
          {isRegister
            ? 'Already have an account? Login'
            : 'Create new account'}
        </button>
      </div>
    </div>
  );
}

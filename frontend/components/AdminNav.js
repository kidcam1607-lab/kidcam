'use client';
import { useRouter } from 'next/navigation';

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">🎥 KidCam Studio</h1>
          <p className="text-blue-200 text-sm">Professional Photo Albums</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

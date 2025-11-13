import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-5xl font-bold mb-6">KidCam</h1>
      <p className="text-2xl mb-12">Professional Client Photo Album System</p>
      <div className="flex gap-4">
        <Link href="/admin/login">
          <button className="bg-white text-blue-600 px-8 py-3 rounded font-bold hover:bg-gray-100">
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
}

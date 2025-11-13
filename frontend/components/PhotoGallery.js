'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function PhotoGallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedPhoto(photo)}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedPhoto} alt="Full view" className="max-w-full max-h-[85vh] object-contain" />
            
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>

            <a
              href={selectedPhoto}
              download
              className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';

// React component to display a team member card
function TeamCards({ name, position, img }) {
  // State to handle image load failure
  const [imageError, setImageError] = useState(false);

  // Called when image fails to load
  const handleImageError = () => {
    console.error('Failed to load image:', img);
    setImageError(true);
  };

  // Called when image loads successfully
  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-transparent text-white transform transition duration-300 hover:scale-105 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] w-full max-w-2xl mx-auto">
      
      {/* Left side: Name and position */}
      <div className="flex flex-col items-center justify-center px-6 py-5 bg-gray-900 bg-opacity-80 text-center flex-[1.2]">
        <div className="font-bold text-lg sm:text-xl md:text-2xl mb-2">{name}</div>
        <p className="text-sm sm:text-base">{position}</p>
      </div>

      {/* Right side: Image */}
      <div className="flex-[1.8] relative">
        {imageError || !img ? (
          // Fallback when image is missing or failed to load
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        ) : (
          // Render the image if available and loaded
          <img
            className="w-full h-64 object-cover"
            src={img}
            alt={name}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
      </div>
    </div>
  );
}

export default TeamCards;

"use client";

import { useState } from "react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

// React component to display a team member card
function TeamCards({ name, position, img, priority = false }) {
  // State to handle image load failure
  const [imageError, setImageError] = useState(false);

  // Called when image fails to load
  const handleImageError = () => {
    console.error("Failed to load image:", img);
    setImageError(true);
  };

  // Called when image loads successfully
  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="group relative w-full overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full mx-auto">
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700 z-20"></div>

      {/* Image Area */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
        {imageError || !img ? (
          // Fallback when image is missing or failed to load
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-100">
            <svg
              className="w-16 h-16 mx-auto mb-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className="text-sm font-medium">No Image</p>
          </div>
        ) : (
          // Render the image if available and loaded
          <Image
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            src={optimizeCloudinaryUrl(img, { width: 500, height: 600 })}
            alt={name || "Team Member"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}

        {/* Soft bottom-up gradient over the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      </div>

      {/* Content Area overlapped onto the image */}
      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end text-left z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-extrabold text-2xl sm:text-3xl text-white mb-1.5 drop-shadow-md line-clamp-2">
          {name || "Unknown"}
        </h3>

        {/* Position badge */}
        <div className="flex items-center">
          <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-red-50 px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-colors duration-300 group-hover:bg-red-600 group-hover:border-red-500">
            {position || "Team Member"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TeamCards;

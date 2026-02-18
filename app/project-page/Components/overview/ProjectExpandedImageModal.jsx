"use client";

import { X } from "lucide-react";

const ExpandedImageModal = ({ expandedImage, closeImageExpanded }) => {
  return (
    <>
      {/* Render modal only if expandedImage is set */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          {/* Close button on top-right corner */}
          <button
            onClick={closeImageExpanded}
            className="absolute top-6 right-6 bg-gray-800 text-white p-3 rounded-full z-10 hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image container with max width and height */}
          <div className="relative w-full max-w-6xl h-[90vh]">
            {/* Image itself */}
            <img
              src={
                expandedImage?.url ||
                "https://placehold.co/600x400?text=Coming+Soon"
              }
              alt={expandedImage?.description || "Expanded Image"}
              className="w-full h-full object-contain"
            />

            {/* Image description below the image, centered */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-white"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpandedImageModal;

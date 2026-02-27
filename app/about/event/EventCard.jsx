import React, { useState } from "react";
import { X, Calendar, MapPin, Users, Camera } from "lucide-react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

const EventCard = ({ event, priority = false }) => {
  const [showImages, setShowImages] = useState(false);

  // Optimize Cloudinary URL with transformations
  const optimizeImageUrl = (url) =>
    optimizeCloudinaryUrl(url, { width: 600, height: 400 });

  // Fallback image - using a reliable source
  const fallbackImage = "https://placehold.co/600x400?text=Event+Image";

  return (
    <>
      {/* Inline styles for animations since styled-jsx isn't available */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from { 
              opacity: 0; 
              transform: scale(0.9) translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: scale(1) translateY(0); 
            }
          }
          
          .custom-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          
          .custom-scale-in {
            animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .custom-line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>

      <div className="group relative w-full">
        {/* Main Card */}
        <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative overflow-hidden w-full">
            <div className="aspect-[4/3] relative">
              <Image
                className={
                  "object-cover transition-transform duration-700 group-hover:scale-105"
                }
                src={
                  event.coverImage
                    ? optimizeImageUrl(event.coverImage)
                    : fallbackImage
                }
                alt={event.title || "Event image"}
                fill
                sizes="(max-width: 640px) 90vw, 320px"
                quality={75}
                priority={priority}
                loading={priority ? undefined : "lazy"}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-80 transition-opacity duration-300" />

              {/* Photo Count Badge */}
              {event.images && event.images.length > 0 && (
                <button
                  onClick={(e) => {
                    console.log("Photo button clicked!"); // Debug log
                    e.stopPropagation();
                    setShowImages(true);
                  }}
                  className="absolute top-4 right-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:bg-gray-700 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-1.5 shadow-lg z-10"
                >
                  <Camera className="h-3.5 w-3.5" />
                  View Photos
                </button>
              )}
            </div>

            {/* Title Overlay onto Image */}
            <div className="absolute bottom-0 left-0 w-full p-5 flex items-end">
              <h3 className="font-bold text-lg leading-tight text-white custom-line-clamp-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                {event.title || "Untitled Event"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal - Debug: showImages = {showImages ? 'true' : 'false'} */}
      {showImages && event.images && event.images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 custom-fade-in"
          onClick={() => {
            console.log("Modal backdrop clicked - closing modal");
            setShowImages(false);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl border border-gray-100 custom-scale-in flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-gray-900 to-black px-6 sm:px-8 py-6 text-white relative shrink-0">
              <button
                onClick={() => {
                  console.log("Close button clicked");
                  setShowImages(false);
                }}
                className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-200 z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-xl sm:text-2xl font-bold pr-16 line-clamp-1">
                {event.title || "Event Gallery"}
              </h3>
              <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide">
                {event.images.length} PHOTO{event.images.length > 1 ? "S" : ""}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto grow bg-gray-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.images.map((url, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-48"
                  >
                    <Image
                      src={optimizeImageUrl(url)}
                      alt={`Event image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                      loading="lazy"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Photo {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;

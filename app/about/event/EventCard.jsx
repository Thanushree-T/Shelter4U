import React, { useState } from "react";
import { X, Calendar, MapPin, Users, Camera } from "lucide-react";

const EventCard = ({ event }) => {
  const [showImages, setShowImages] = useState(false);

  // Optimize Cloudinary URL with transformations
  const optimizeImageUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    const parts = url.split("/upload/");
    return `${parts[0]}/upload/w_600,h_400,c_fill,q_auto,f_auto/${parts[1]}`;
  };

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

      <div className="group relative max-w-xs">
        {/* Main Card */}
        <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-red-900 shadow-md transition-all duration-500 transform hover:-translate-y-2 border border-red-100/50">
          
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img
                className={"w-full h-full object-cover transition-all duration-700 group-hover:scale-110"}
                src={event.coverImage ? optimizeImageUrl(event.coverImage) : fallbackImage}
                alt={event.title || "Event image"}
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Photo Count Badge */}
              {event.images && event.images.length > 0 && (
                <button
                  onClick={(e) => {
                    console.log('Photo button clicked!'); // Debug log
                    e.stopPropagation();
                    setShowImages(true);
                  }}
                  className="absolute top-4 right-4 bg-gray-900 hover:bg-gray-700 backdrop-blur-sm text-white px-3 py-2 rounded-2xl text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg z-10"
                >
                  <Camera className="h-4 w-4" />
                  {/* {event.images.length} */}
                  View All Photos
                </button>
              )}
              
            </div>
          </div>

          {/* Content */}
          <div className="p-6 relative">
            {/* Title */}
            <h3 className="font-bold text-xl text-white mb-3 custom-line-clamp-2 duration-300">
              {event.title || "Untitled Event"}
            </h3>
          </div>
        </div>
      </div>

      {/* Enhanced Modal - Debug: showImages = {showImages ? 'true' : 'false'} */}
      {showImages && event.images && event.images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 custom-fade-in"
          onClick={() => {
            console.log('Modal backdrop clicked - closing modal');
            setShowImages(false);
          }}
        >
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl border border-red-100/50 custom-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gray-900 px-8 py-6 text-white relative overflow-hidden">
              <button
                onClick={() => {
                  console.log('Close button clicked');
                  setShowImages(false);
                }}
                className="cursor-pointer absolute top-6 right-6 text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 z-10"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-bold pr-16">{event.title || "Event"} Gallery</h3>
              <p className="text-red-100 mt-1">{event.images.length} photo{event.images.length > 1 ? 's' : ''}</p>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/5 rounded-full blur-xl" />
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.images.map((url, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src={optimizeImageUrl(url)}
                      alt={`Event image ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
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

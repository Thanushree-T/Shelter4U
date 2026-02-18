"use client";
import { Expand } from "lucide-react";

const ProjectGallery = ({ galleryImages = [], openImageExpanded }) => {
  return (
    // Container for the entire gallery section
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-8 text-gray-900">
        Project Gallery
      </h2>

      {/* Grid layout for displaying images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden h-64 cursor-pointer"
            // Open modal or expand image on click
            onClick={() => openImageExpanded(image)}
          >
            {/* Gallery Image */}
            <img
              src={
                image?.url || "https://placehold.co/600x400?text=Coming+Soon"
              }
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay for image description */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-end p-5 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Expand icon in the top-right corner */}
            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all">
              <Expand className="h-5 w-5 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;

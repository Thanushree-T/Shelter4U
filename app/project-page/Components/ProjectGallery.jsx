"use client";
import { Expand } from "lucide-react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

const ProjectGallery = ({ galleryImages = [], openImageExpanded }) => {
  return (
    // Container for the entire gallery section
    <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100 animate-fade-in">
      <h2 className="text-xl font-bold mb-2.5 text-gray-900 tracking-tight">
        Project Gallery
      </h2>

      {/* Grid layout for displaying images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative h-28 sm:h-36 rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300 group"
            // Open modal or expand image on click
            onClick={() => openImageExpanded(image)}
          >
            {/* Gallery Image */}
            <Image
              src={
                optimizeCloudinaryUrl(image?.url, {
                  width: 600,
                  height: 400,
                }) || "https://placehold.co/600x400?text=Coming+Soon"
              }
              alt="Gallery image"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
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

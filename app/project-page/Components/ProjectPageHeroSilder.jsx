"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

const ProjectHeroSlider = ({
  project,
  prevImage,
  nextImage,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  return (
    <div className="relative w-full h-full group bg-gray-50">
      {/* Slider Viewport */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={
            optimizeCloudinaryUrl(
              project?.coverImages?.[currentImageIndex]?.url,
              { width: 1000, height: 600 },
            ) || "https://placehold.co/600x400?text=Coming+Soon"
          }
          alt={
            project?.coverImages?.[currentImageIndex]?.description ||
            project?.projectName ||
            "Property image"
          }
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
          className="object-cover transition-opacity duration-300"
        />

        {/* Counter Tag */}
        {project?.coverImages && project.coverImages.length > 0 && (
          <span className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1 shadow-md">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M4 4h16v12H4V4zm2 2v8h12V6H6zm3 2l2.5 3 1.5-1.5L16 12H8l1-4z" />
            </svg>
            {project.coverImages.length} Photos
          </span>
        )}

        {/* Navigation arrows (shown on group hover) */}
        {project?.coverImages?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 text-white transition-all cursor-pointer shadow-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 text-white transition-all cursor-pointer shadow-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
            </button>

            {/* Pagination dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
              {project?.coverImages?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-red-600 w-3.5 sm:w-4"
                      : "bg-white/60 hover:bg-white w-1.5"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectHeroSlider;

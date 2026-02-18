"use client";

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const ProjectHeroSlider = ({
  project,
  prevImage,
  nextImage,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  // Format number to Indian currency units (Lacs/Cr)
  const formatToIndianUnits = (num) => {
    if (!num || num <= 0) return "On Request";
    if (num >= 1e7) {
      return `₹ ${(num / 1e7).toFixed(2)} Cr onwards`;
    } else if (num >= 1e5) {
      return `₹ ${(num / 1e5).toFixed(2)} Lac onwards`;
    } else {
      return num.toLocaleString("en-IN");
    }
  };

  return (
    // Wrapper container for the hero slider
    <div className="relative w-[85vw] rounded-2xl overflow-hidden m-auto mt-10 shadow-lg shadow-zinc-950">
      {/* Image container */}
      <div className="h-[70vh] w-full overflow-hidden relative">
        {/* Display current image or fallback */}
        <img
          src={
            project.coverImages[currentImageIndex]?.url ||
            "https://placehold.co/600x400?text=Coming+Soon"
          }
          alt={
            project.coverImages[currentImageIndex]?.description ||
            "Expanded Image"
          }
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Left navigation arrow */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/40 transition-all"
        >
          <ChevronLeft className="h-8 w-8 text-white" strokeWidth={2} />
        </button>

        {/* Right navigation arrow */}
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/40 transition-all"
        >
          <ChevronRight className="h-8 w-8 text-white" strokeWidth={2} />
        </button>

        {/* Image indicators (dots) */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {project.coverImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all hidden sm:flex ${
                index === currentImageIndex ? "bg-red-500 w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Text overlay content (bottom area) */}
      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-6 sm:pb-8 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="max-w-2xl">
            {/* Display project type tags */}
            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.projectType) &&
                project.projectType.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-full bg-black/10 backdrop-blur-sm text-white text-[12px] sm:text-sm font-medium border border-white/20"
                  >
                    {type}
                  </span>
                ))}
            </div>

            {/* Display possession status tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.isArray(project.projectSpecification) &&
                [
                  ...new Set(
                    project.projectSpecification.map((spec) => spec.status)
                  ),
                ].map((status) => (
                  <span
                    key={status}
                    className="px-3 py-1 mb-3 rounded-full bg-black/10 backdrop-blur-sm text-white text-[12px] sm:text-sm font-medium border border-white/20"
                  >
                    {status}
                  </span>
                ))}
            </div>

            {/* Project name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight tracking-tight">
              {project.projectName}
            </h1>

            {/* Price display */}
            <div className="text-lg sm:text-xl font-bold text-white mb-1">
              {Array.isArray(project.projectSpecification) &&
              project.projectSpecification.length > 0 ? (
                <>
                  {formatToIndianUnits(project.projectSpecification[0]?.price)}{" "}
                </>
              ) : (
                <p className="text-sm font-medium text-gray-300">On Request</p>
              )}
            </div>

            {/* Location display */}
            <div className="flex items-center text-white/90">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" strokeWidth={2} />
              <span className="text-sm sm:text-base">
                {project.area?.name}, {project.city?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeroSlider;

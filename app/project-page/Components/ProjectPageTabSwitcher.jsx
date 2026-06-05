"use client";

const ProjectTabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-3">
      {/* Navigation container for tab buttons */}
      <nav className="flex lg:justify-start overflow-x-auto no-scrollbar space-x-1 bg-gray-100 p-1 rounded-xl md:justify-center">
        {/* Overview Tab Button */}
        <button
          onClick={() => setActiveTab("overview")}
          className={`${
            activeTab === "overview"
              ? "bg-white text-red-600 shadow-sm" // Active tab styling
              : "text-gray-500 hover:text-gray-800 hover:bg-white/40" // Inactive tab styling
          } whitespace-nowrap py-1.5 px-3.5 md:py-2 md:px-6 rounded-lg font-semibold text-xs md:text-sm transition-all duration-150`}
        >
          Overview
        </button>

        {/* Amenities Tab Button */}
        <button
          onClick={() => setActiveTab("amenities")}
          className={`${
            activeTab === "amenities"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-800 hover:bg-white/40"
          } whitespace-nowrap py-1.5 px-3.5 md:py-2 md:px-6 rounded-lg font-semibold text-xs md:text-sm transition-all duration-150`}
        >
          Amenities
        </button>

        {/* Gallery Tab Button */}
        <button
          onClick={() => setActiveTab("gallery")}
          className={`${
            activeTab === "gallery"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-800 hover:bg-white/40"
          } whitespace-nowrap py-1.5 px-3.5 md:py-2 md:px-6 rounded-lg font-semibold text-xs md:text-sm transition-all duration-150`}
        >
          Gallery
        </button>

        {/* Location Tab Button */}
        <button
          onClick={() => setActiveTab("location")}
          className={`${
            activeTab === "location"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-800 hover:bg-white/40"
          } whitespace-nowrap py-1.5 px-3.5 md:py-2 md:px-6 rounded-lg font-semibold text-xs md:text-sm transition-all duration-150`}
        >
          Location
        </button>

        {/* Specifications Tab Button */}
        <button
          onClick={() => setActiveTab("specifications")}
          className={`${
            activeTab === "specifications"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-gray-800 hover:bg-white/40"
          } whitespace-nowrap py-1.5 px-3.5 md:py-2 md:px-6 rounded-lg font-semibold text-xs md:text-sm transition-all duration-150`}
        >
          Price Breakup
        </button>
      </nav>
    </div>
  );
};

export default ProjectTabSwitcher;

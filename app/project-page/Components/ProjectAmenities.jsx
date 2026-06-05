"use client";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const AmenitiesSection = ({ project, showAllAmenities, toggleAmenities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100 animate-fade-in">
      {/* Section Heading */}
      <h2 className="text-xl font-bold mb-2.5 text-gray-900 tracking-tight">Amenities</h2>

      {/* Amenities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
        {(showAllAmenities
          ? project.amenities // Show all if toggled on
          : project.amenities.slice(0, 12)
        ) // Otherwise show only first 12
          .map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors border border-gray-200"
            >
              {/* Check icon inside red background */}
              <div className="bg-red-100 p-1.5 sm:p-2 rounded-lg shrink-0">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" strokeWidth={3} />
              </div>
              {/* Amenity label */}
              <span className="text-gray-800 font-semibold text-xs sm:text-sm break-words leading-tight">
                {amenity}
              </span>
            </div>
          ))}
      </div>

      {/* Toggle Button: Show All / Show Less */}
      {Array.isArray(project.amenities) && project.amenities.length > 12 ? (
        <button
          onClick={toggleAmenities}
          className="mt-4 text-red-600 hover:text-red-700 font-semibold flex items-center justify-center gap-2 text-sm"
        >
          {showAllAmenities ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span>Show All Amenities</span>
            </>
          )}
        </button>
      ) : null}
    </div>
  );
};

export default AmenitiesSection;


"use client";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const AmenitiesSection = ({ project, showAllAmenities, toggleAmenities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold mb-8 text-gray-900">Amenities</h2>

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(
          showAllAmenities
            ? project.amenities                // Show all if toggled on
            : project.amenities.slice(0, 12)  // Otherwise show only first 12
        ).map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors border border-gray-200"
          >
            {/* Check icon inside red background */}
            <div className="bg-red-100 p-2 rounded-lg">
              <Check className="h-5 w-5 text-red-600" strokeWidth={3} />
            </div>
            {/* Amenity label */}
            <span className="text-gray-800 font-medium text-sm">
              {amenity}
            </span>
          </div>
        ))}
      </div>

      {/* Toggle Button: Show All / Show Less */}
      {Array.isArray(project.amenities) && project.amenities.length > 12 ? (
        <button
          onClick={toggleAmenities}
          className="mt-6 text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-2"
        >
          {showAllAmenities ? (
            <>
              <ChevronUp className="h-5 w-5" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-5 w-5" />
              <span>Show All Amenities</span>
            </>
          )}
        </button>
      ) : null}
    </div>
  );
};

export default AmenitiesSection;

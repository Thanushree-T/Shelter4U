"use client";

import { Home, Ruler, Calendar, Building, IndianRupeeIcon, User } from "lucide-react";
import { useState, useEffect } from "react";

const ProjectHighlights = ({ project }) => {
  const [unit, setUnit] = useState("");

  // Helper function to convert numbers to Indian currency format (Cr/Lac)
  const formatToIndianUnits = (num) => {
    if (!num || num <= 0 ) return "On Request";
    if (num >= 1e7) {
      return `${(num / 1e7).toFixed(2)} Cr`;
    } else if (num >= 1e5) {
      return `${(num / 1e5).toFixed(2)} Lac`;
    } else {
      return num.toLocaleString("en-IN");
    }
  };

  // Format minimum and maximum prices using helper
  const minPrice = formatToIndianUnits(project?.minPrice);
  const maxPrice = formatToIndianUnits(project?.maxPrice);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-8 text-gray-900">
        Project Highlights
      </h2>
      {/* Grid layout for all highlight items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        
        {/* Unit Types */}
        <div className="flex items-start gap-5 p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
            <Home className="h-6 w-6 text-red-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-medium text-base text-gray-900">Unit Types</h3>
            <p className="text-gray-600 mt-2 text-sm">
              {[
                ...new Set(
                  project?.projectSpecification.map((spec) => spec?.unitType  || "On Request")
                ),
              ].join(", ")}
            </p>
          </div>
        </div>

        {/* Area Range */}
        <div className="flex items-start gap-5 p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
            <Ruler className="h-6 w-6 text-red-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-medium text-base text-gray-900">Area Range</h3>
            <p className="text-gray-600 mt-2 text-sm">
              {project?.minSize} - {project?.maxSize} {project?.projectSpecification[0]?.measurementUnit || ""}
            </p>
          </div>
        </div>

        {/* Possession Status */}
        <div className="flex items-start gap-5 p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
            <Calendar className="h-6 w-6 text-red-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-medium text-base text-gray-900">
              Possession Status
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              {[
                ...new Set(
                  project?.projectSpecification.map((spec) => spec?.status || "On Request")
                ),
              ].join(", ")}
            </p>
          </div>
        </div>

        {/* RERA Number */}
        <div className="flex items-start gap-5 p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
            <Building className="h-6 w-6 text-red-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-medium text-base text-gray-900">RERA Number</h3>
            <p className="text-gray-600 mt-2 text-sm">{project?.reraNumber || "On Request"}</p>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex items-start gap-5 p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
            <IndianRupeeIcon className="h-6 w-6 text-red-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-medium text-base text-gray-900">Price Range</h3>
            <p className="text-gray-600 mt-2 text-sm">
              {minPrice === "On Request" && maxPrice === "On Request"
                ? "On Request" : (
                  <>{minPrice} &nbsp; - &nbsp; {maxPrice}</>
                )}
            </p>
          </div>
        </div>

        {/* Builder Name */}
        <div className="flex items-start gap-5 p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
            <User className="h-6 w-6 text-red-600" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-medium text-base text-gray-900">Builder</h3>
            <p className="text-gray-600 mt-2 text-sm">
              {project?.builder?.name || "Unknown Builder"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHighlights;

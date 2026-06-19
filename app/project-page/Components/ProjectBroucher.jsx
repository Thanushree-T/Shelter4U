"use client";

import { View } from "lucide-react";

const ProjectBrochure = ({ project, setShowFullForm }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-4.5 border border-gray-100">
      {/* Section heading */}
      <h3 className="font-bold text-base text-gray-900 mb-2">
        Project Brochure
      </h3>

      {/* Brochure information block */}
      <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-200">
        {/* Icon */}
        <div className="bg-red-100 p-2.5 rounded-xl shrink-0">
          <View className="h-5.5 w-5.5 text-red-600" strokeWidth={1.5} />
        </div>

        {/* Project name and city */}
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-gray-900 text-sm truncate">
            {project?.projectName || "Brochure"}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {project?.city?.name}
          </div>
        </div>
      </div>

      {/* Button to open brochure modal/form */}
      <button
        onClick={() => setShowFullForm(true)}
        className="cursor-pointer mt-2.5 w-full border-2 border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2.5 text-sm sm:text-base"
      >
        <View className="h-5 w-5 hover:cursor-pointer" />
        <span>View Brochure</span>
      </button>
    </div>
  );
};

export default ProjectBrochure;

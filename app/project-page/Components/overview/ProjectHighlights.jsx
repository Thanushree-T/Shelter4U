"use client";

import { Home, Ruler, Calendar, Building, IndianRupeeIcon, User } from "lucide-react";

const ProjectHighlights = ({ project }) => {
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

  const highlights = [
    {
      icon: Home,
      label: "Unit Types",
      value: [
        ...new Set(
          project?.projectSpecification?.map((spec) => spec?.unitType || "On Request") || []
        ),
      ].join(", "),
    },
    {
      icon: Ruler,
      label: "Area Range",
      value: `${project?.minSize} - ${project?.maxSize} ${project?.projectSpecification?.[0]?.measurementUnit || "sqft"}`,
    },
    {
      icon: Calendar,
      label: "Possession Status",
      value: [
        ...new Set(
          project?.projectSpecification?.map((spec) => spec?.status || "On Request") || []
        ),
      ].join(", "),
    },
    {
      icon: Building,
      label: "RERA Number",
      value: project?.reraNumber || "On Request",
    },
    {
      icon: IndianRupeeIcon,
      label: "Price Range",
      value: minPrice === "On Request" && maxPrice === "On Request"
        ? "On Request"
        : `${minPrice} - ${maxPrice}`,
    },
    {
      icon: User,
      label: "Builder",
      value: project?.builder?.name || "Unknown Builder",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100">
      <h2 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
        Project Highlights
      </h2>
      {/* High-density grid layout for Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3.5 gap-y-3.5 sm:gap-x-6 sm:gap-y-5">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 min-w-0">
              <div className="bg-red-50 p-1.5 sm:p-2 rounded-xl text-red-600 shrink-0">
                <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider leading-none">
                  {item.label}
                </p>
                <p className="text-sm font-black text-gray-800 mt-1 leading-tight break-words" title={item.value}>
                  {item.value || "On Request"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectHighlights;

"use client";

import Link from "next/link";
import {
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

// CareerCard component to display a job position in a card format
const CareerCard = ({
  position, // Job title or position name
  employeesNeeded, // Number of openings
  location, // Job location
  qualification, // Required qualifications
  experience, // Years of experience needed
  active, // Boolean flag to show/hide the card
  id, // Unique job ID for routing
}) => {
  // Do not render the card if the job is not active
  if (!active) return null;

  return (
    <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
      {/* Decorative gradient top edge */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>

      {/* Job Position Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
          {position}
        </h2>
      </div>

      {/* Job Details Section - Pills format */}
      <div className="flex flex-wrap gap-3 mb-8 flex-grow">
        <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-100">
          <MapPin size={16} className="text-red-500" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-100">
          <Briefcase size={16} className="text-red-500" />
          <span>{experience} year(s)</span>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-100">
          <GraduationCap size={16} className="text-red-500" />
          <span className="line-clamp-1">{qualification}</span>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-100">
          <Users size={16} className="text-red-500" />
          <span>{employeesNeeded} opening(s)</span>
        </div>
      </div>

      {/* Link to job application details */}
      <div className="mt-auto pt-4 border-t border-gray-50">
        <Link
          href={`/about/career/${id}`}
          className="group/btn inline-flex items-center justify-between w-full px-5 py-3 text-base font-semibold text-gray-900 bg-white border-2 border-gray-100 rounded-2xl hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
        >
          <span>View Details</span>
          <div className="bg-gray-100 p-1.5 rounded-full group-hover/btn:bg-red-50 group-hover/btn:text-red-600 transition-colors duration-200">
            <ChevronRight
              size={18}
              className="transform group-hover/btn:translate-x-0.5 transition-transform"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CareerCard;

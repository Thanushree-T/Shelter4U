"use client";

import { MessageSquare } from "lucide-react";

// Reusable component to show an inquiry card with a call-to-action button
const ProjectInquiryCard = ({ setShowFullForm }) => {
  return (
    // Card container with rounded corners, border, and shadow
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="p-3.5 sm:p-4.5">
        {/* Top section with icon and heading */}
        <div className="text-center mb-3">
          {/* Icon inside a red circular background */}
          <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2.5">
            <MessageSquare className="h-5 w-5 text-red-600" />
          </div>

          {/* Heading and subheading */}
          <h3 className="text-base font-semibold text-gray-900">
            Interested in this property?
          </h3>
          <p className="text-gray-500 text-sm">Get more information</p>
        </div>

        {/* CTA button to open the enquiry form */}
        <button
          onClick={() => setShowFullForm(true)}
          className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Enquire Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectInquiryCard;

"use client";

import { MessageSquare } from "lucide-react";

// Reusable component to show an inquiry card with a call-to-action button
const ProjectInquiryCard = ({ setShowFullForm }) => {
  return (
    // Card container with rounded corners, border, and shadow
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6">
        {/* Top section with icon and heading */}
        <div className="text-center mb-6">
          {/* Icon inside a red circular background */}
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="h-6 w-6 text-red-600" />
          </div>

          {/* Heading and subheading */}
          <h3 className="text-lg font-semibold text-gray-900">
            Interested in this property?
          </h3>
          <p className="text-gray-500 text-sm">Get more information</p>
        </div>

        {/* CTA button to open the enquiry form */}
        <button
          onClick={() => setShowFullForm(true)}
          className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
        >
          <MessageSquare className="h-5 w-5" />
          <span>Enquire Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectInquiryCard;

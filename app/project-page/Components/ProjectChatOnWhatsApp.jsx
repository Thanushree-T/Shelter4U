"use client";
import { FaWhatsapp, FaArrowRight, FaComments } from "react-icons/fa";

const ProjectChatOnWhatsApp = ({ project }) => {
  const whatsappNumber = "919714512452";

  // Generate dynamic message based on project details
  const generateWhatsAppMessage = () => {
    const projectName = project?.projectName || "Property";
    const city = project?.city?.name || "";
    const location = project?.area.name || "";

    return encodeURIComponent(
      `Hello! I'm interested in ${projectName}${city ? ` in ${city}` : ""}${
        location ? `, ${location}` : ""
      }. Could you please share more details about this property?`
    );
  };

  // Open WhatsApp chat in new tab
  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    // Main card container with background and hover effects
    <div className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-2xl border-2 border-green-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">

      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/30 to-emerald-100/30 rounded-full translate-y-12 -translate-x-12"></div>
      
      {/* Content wrapper */}
      <div className="relative p-8">

        {/* Header section with icon and title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaComments className="h-6 w-6 text-white" />
            </div>
            {/* Online pulse indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          {/* Textual info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Let's Chat!</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Connect instantly via WhatsApp for personalized property assistance</p>
          </div>
        </div>

        {/* Availability and response indicator */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-6 border border-green-100">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online Now</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <span>Avg. response: 2 min</span>
          </div>
        </div>

        {/* WhatsApp chat button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-full group/btn bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-700 hover:via-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-2xl transition-all duration-300 font-semibold text-base shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 relative overflow-hidden"
        >
          {/* Animated button background sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          
          {/* Button content */}
          <div className="relative flex items-center justify-center gap-3">
            <FaWhatsapp className="h-6 w-6 group-hover/btn:rotate-12 transition-transform duration-300" />
            <span>Start WhatsApp Chat</span>
            <FaArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </div>
        </button>

        {/* Trust indicator section */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-green-600 text-lg mb-1">⚡</div>
            <p className="text-xs text-gray-600 font-medium">Instant<br/>Connect</p>
          </div>
          <div className="text-center">
            <div className="text-emerald-600 text-lg mb-1">🔐</div>
            <p className="text-xs text-gray-600 font-medium">100%<br/>Secure</p>
          </div>
          <div className="text-center">
            <div className="text-green-600 text-lg mb-1">🎯</div>
            <p className="text-xs text-gray-600 font-medium">Expert<br/>Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectChatOnWhatsApp;

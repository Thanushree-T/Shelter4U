'use client';

import React from "react";
import Marquee from "react-fast-marquee"; // For horizontal scrolling animation
import Image from "next/image";

const HomeFifthSection = ({ data }) => {
  // Ensure data is a valid array before mapping
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center justify-center mb-12">
          <p className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2 text-center">
            Our Authorized Data
          </p>
        </div>

        {/* Horizontal Marquee Scrolling Brand/Logo Images */}
        <Marquee speed={130} gradient={false}>
          {safeData?.map((partner, index) => (
            <div
              key={partner?._id || index}
              className="inline-flex items-center justify-center mx-2"
            >
              {/* Logo Image Container */}
              <div className="relative h-32 w-56">
                <Image
                  src={partner?.img} // Partner logo image
                  alt={partner?.title || `partner-${index}`} // Accessible alt text
                  fill // Uses layout fill to cover the container
                  className="object-contain" // Maintains image aspect ratio
                  sizes="(max-width: 768px) 150px, 224px" // Responsive size hint
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default HomeFifthSection;

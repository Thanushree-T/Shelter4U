"use client";

import React from "react";
import { FaQuoteRight, FaUserAlt } from "react-icons/fa";

const HomeFourthSection = ({ data }) => {
  return (
    <div className="w-full bg-gray-100 py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid gap-12 items-center px-4 lg:grid-cols-2">
        
        {/* Left Side - Testimonials List */}
        <div className="space-y-6 order-2 md:order-1 flex flex-col items-start">
          {data?.section.map((testimonial, index) => {
            // Highlight the second testimonial (index === 1)
            const isActive = index === 1;

            return (
              <div
                key={index}
                className={`relative flex items-start space-x-4 p-4 w-full md:w-[70%] transition-all duration-300
                ${
                  isActive
                    ? "bg-white shadow-lg border-l-[6px] border-red-500 translate-x-0 md:translate-x-24"
                    : "bg-transparent border border-gray-300 border-l-4 border-l-gray-300"
                } rounded-sm`}
              >
                {/* Quotation Icon in Top Right */}
                <FaQuoteRight
                  className={`absolute top-3 right-3 text-xl ${
                    isActive ? "text-red-500" : "text-gray-300"
                  }`}
                />

                {/* User Avatar Icon */}
                <FaUserAlt className="text-white bg-red-500 border border-red-500 w-20 h-20 md:w-[88px] md:h-[88px] rounded-full flex-shrink-0 p-4" />

                {/* Testimonial Text Block */}
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {testimonial?.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {testimonial?.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side - Section Title & Description */}
        <div className="space-y-6 order-1 md:order-2 text-center md:text-left">
          <p className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {data?.title}
          </p>
          <p className="text-gray-600">{data?.para}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeFourthSection;

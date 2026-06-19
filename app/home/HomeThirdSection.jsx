"use client"; // Enables use of client-only features in Next.js

import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import { MdOutlineArrowDropDown, MdChecklistRtl } from "react-icons/md";

// Accordion component used to render multiple collapsible sections
const CustomAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0); // Track which accordion item is open

  // Handle case when there is no valid section data
  if (!items?.section || items?.section.length === 0) {
    return <p>No sections available</p>;
  }

  return (
    <div className="mt-4 md:mt-8 space-y-3 md:space-y-5">
      {items.section.map((item, i) => (
        <div
          key={i}
          className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
            i === openIndex ? "shadow-lg" : ""
          }`}
        >
          {/* Accordion Header */}
          <button
            className="w-full flex items-center p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)} // Toggle accordion open/closed
          >
            {/* Left Icon */}
            <div className="p-2 bg-red-50 rounded-lg">
              <MdChecklistRtl className="text-red-600" size={20} />
            </div>

            {/* Title */}
            <span className="text-sm sm:text-base font-medium text-gray-900 flex-grow text-center">
              {item?.title}
            </span>

            {/* Dropdown Arrow */}
            <div className="p-2 bg-red-50 rounded-lg">
              <MdOutlineArrowDropDown
                size={20}
                className={`text-red-600 transition-transform duration-300 ${
                  i === openIndex ? "rotate-180" : "" // Rotate arrow if open
                }`}
              />
            </div>
          </button>

          {/* Accordion Body - Conditionally Rendered */}
          {i === openIndex && (
            <div className="p-3 md:p-4 text-sm sm:text-base text-gray-600">
              {item?.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main section component
export default function HomeThirdSection({ data }) {
  return (
    <section className="w-full mt-4 mb-4 md:mt-10 md:mb-10 py-4 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Image Section (Right on large screens) */}
        <div className="hidden md:block w-full lg:w-1/2 custom-center">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }} // Start animation off-screen
            animate={{ x: 0, opacity: 1 }} // Animate to visible state
            transition={{ duration: 2, type: "ease" }} // Smooth transition
            className="w-full max-w-[35rem] h-[37rem] overflow-hidden rounded-t-[20rem] relative z-20 mx-auto flex justify-center items-center"
          >
            <div className="w-full h-full flex items-center justify-center relative">
              <Image
                src={
                  optimizeCloudinaryUrl(data?.img, {
                    width: 700,
                    height: 900,
                  }) || "/NewLogo.png"
                } // Fallback image
                alt="company"
                fill // Fill the container
                className="object-cover"
                style={{ objectPosition: "center 20%" }} // Slight top crop
                priority // Load early for performance
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>

        {/* Text + Accordion Section (Left on large screens) */}
        <div className="w-full lg:w-1/2 flex flex-col gap-2 md:gap-4">
          {/* Title */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            <span className="text-red-600">{data?.redTxt}</span>{" "}
            {data?.blackTxt}
          </p>

          {/* Paragraph */}
          <p className="text-gray-600 text-sm sm:text-base">{data?.para}</p>

          {/* Accordion component */}
          <CustomAccordion items={data} />
        </div>
      </div>
    </section>
  );
}

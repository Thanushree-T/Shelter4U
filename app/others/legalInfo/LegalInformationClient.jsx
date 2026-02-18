// app/about/legal/LegalInformationClient.jsx
"use client";

import React from "react";
import { Lock } from "lucide-react"; // Icon for visual representation
import { motion } from "framer-motion"; // Animation library

export default function LegalInformationClient({ data }) {
  return (
    // Animated wrapper using Framer Motion for fade-in effect
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial animation state (invisible and shifted up)
      animate={{ opacity: 1, y: 0 }} // Final animation state (visible and in position)
      transition={{ duration: 0.5 }} // Animation duration
      className="min-h-screen bg-gray-100 flex flex-col items-center"
    >
      {/* Hero Section */}
      <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-4xl">
        {/* Lock icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 rounded-full p-3">
            <Lock className="text-white" size={32} />
          </div>
        </div>

        {/* Main Heading */}
        <p className="text-2xl font-bold text-white">
          {data?.hero?.heading || "Legal Information"}
        </p>
      </div>

      {/* Content Sections */}
      <div className="w-[80%] px-6 py-8">
        {data?.sections?.map((section, index) => (
          <div key={index} className="space-y-4 mb-10">
            {/* Section Title */}
            <p className="text-3xl font-bold text-navy-blue mb-6">
              {section.title}
            </p>

            {/* Section Content */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {/* Render non-empty paragraphs */}
              {section.paragraphs?.some((para) => para.trim() !== "") &&
                section.paragraphs
                  .filter((para) => para.trim() !== "")
                  .map((para, i) => <p key={i}>{para}</p>)}

              {/* Render non-empty bullet list items */}
              {section.bullets?.some((item) => item.trim() !== "") && (
                <ul className="list-decimal pl-6 space-y-2">
                  {section.bullets
                    .filter((item) => item.trim() !== "")
                    .map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
            </div>

            {/* Divider */}
            <hr className="text-gray-300" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

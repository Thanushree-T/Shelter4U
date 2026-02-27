"use client";

import React from "react";
import { Target } from "lucide-react";

export default function VisionMissionClient({ data }) {
  // Fallback if no data is provided
  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 font-bold">No data found.</p>
      </div>
    );
  }

  // Destructure hero and sections from the received data
  const { hero, sections } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-20">
      {/* Premium Hero Header Section */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 sm:py-24 text-center flex flex-col justify-center rounded-3xl shadow-2xl border border-gray-800">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-red-800/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex justify-center mb-6">
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-4 shadow-lg shadow-red-500/30 transform hover:scale-105 transition-transform duration-300">
                <Target className="text-white" size={36} strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 tracking-tight px-4">
              {hero?.heading || "Our Vision & Mission"}
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 font-medium">
              The values and purpose that guide everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="w-[80%] px-6 py-8 space-y-10">
        {sections?.map((section, idx) => (
          <div key={idx} className="space-y-4">
            {/* Section title */}
            <p className="text-3xl font-bold text-navy-blue">{section.title}</p>

            {/* Optional vision/mission statements */}
            {section.visionMissionText?.map((text, tIdx) => (
              <p key={tIdx} className="text-xl font-semibold text-navy-blue">
                {text}
              </p>
            ))}

            {/* Filter and render non-empty paragraphs */}
            {section.paragraphs?.some((para) => para.trim() !== "") && (
              <>
                {section.paragraphs
                  .filter((para) => para.trim() !== "")
                  .map((para, i) => (
                    <p
                      key={i}
                      className="text-navy-blue"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}
              </>
            )}

            {/* Filter and render non-empty bullet list items */}
            {section.bullets?.some((item) => item.trim() !== "") && (
              <ul className="list-disc pl-6 space-y-2">
                {section.bullets
                  .filter((item) => item.trim() !== "")
                  .map((item, j) => (
                    <li
                      key={j}
                      className="text-navy-blue"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

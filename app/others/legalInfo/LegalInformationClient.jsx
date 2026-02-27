// app/about/legal/LegalInformationClient.jsx
"use client";

import React from "react";
import { Lock } from "lucide-react";

export default function LegalInformationClient({ data }) {
  return (
    // Animated wrapper using Framer Motion for fade-in effect
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-20">
      {/* Premium Hero Section */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 sm:py-24 text-center flex flex-col justify-center rounded-3xl shadow-2xl border border-gray-800">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-red-800/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex justify-center mb-6">
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-4 shadow-lg shadow-red-500/30 transform hover:scale-105 transition-transform duration-300">
                <Lock className="text-white" size={36} strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 pb-4 tracking-tight px-4">
              {data?.hero?.heading || "Legal Information"}
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 font-medium">
              Important legal terms, disclosures, and compliance information.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-7xl px-10 sm:px-12 lg:px-14 py-10">
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
                    .map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                </ul>
              )}
            </div>

            {/* Divider */}
            <hr className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

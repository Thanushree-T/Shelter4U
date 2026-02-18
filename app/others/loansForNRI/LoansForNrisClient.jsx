// app/about/loan/LoansForNrisClient.jsx
"use client";

import React from "react";
import { Lock } from "lucide-react"; // Icon used in the hero section
import { motion } from "framer-motion"; // Animation library for entry transitions

const LoansForNrisClient = ({ data }) => {
  const { hero, sections } = data;

  return (
    // Wrapper with fade-in and slide-up animation on mount
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Start hidden and above
      animate={{ opacity: 1, y: 0 }}   // Animate to visible and neutral Y position
      transition={{ duration: 0.5 }}   // Animation duration
      className="min-h-screen bg-gray-100 flex flex-col items-center"
    >
      {/* Hero Section */}
      {hero?.heading && hero.heading.trim() !== "" && (
        <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-3xl">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-800 rounded-full p-3">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{hero.heading}</p>
        </div>
      )}

      {/* Dynamic Content Sections */}
      {sections && sections.length > 0 && (
        <div className="w-[80%] px-6 py-8 space-y-10">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              
              {/* Section Title */}
              {section.title?.trim() && (
                <p className="text-3xl font-bold text-navy-blue">
                  {section.title}
                </p>
              )}

              {/* Optional Emphasis Text (e.g. Vision / Mission) */}
              {section.visionMissionText
                ?.filter((t) => t.trim())
                .map((text, i) => (
                  <p key={i} className="text-xl font-semibold text-navy-blue">
                    {text}
                  </p>
                ))}

              {/* Paragraphs (rich HTML content allowed) */}
              {section.paragraphs
                ?.filter((p) => p.trim())
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}

              {/* Bullet Points */}
              {section.bullets?.filter((b) => b.trim()).length > 0 && (
                <ul className="list-disc pl-6 space-y-2">
                  {section.bullets
                    .filter((b) => b.trim())
                    .map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                </ul>
              )}

              {/* Tables (with optional headers and HTML-safe cells) */}
              {section.table?.map((tableData, tableIdx) =>
                tableData.headers?.some((h) => h.trim()) ? (
                  <div key={tableIdx} className="overflow-x-auto mt-6">
                    <table className="min-w-full bg-white rounded-xl shadow-lg">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-900 to-black text-white">
                          {tableData.headers.map((header, hIdx) => (
                            <th
                              key={hIdx}
                              className="text-left px-6 py-4 font-semibold"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.rows?.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-6 py-4 border-b text-gray-700"
                                dangerouslySetInnerHTML={{ __html: cell }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null
              )}

              {/* Additional Content (below the main sections) */}
              {section.additionalContent
                ?.filter((p) => p.trim())
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-700 leading-relaxed mt-6"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default LoansForNrisClient;

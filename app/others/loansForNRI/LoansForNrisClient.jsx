// app/about/loan/LoansForNrisClient.jsx
"use client";

import React from "react";
import { Landmark } from "lucide-react";

const LoansForNrisClient = ({ data }) => {
  const { hero, sections } = data;
  return (
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
                <Landmark className="text-white" size={36} strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 pb-4 tracking-tight px-4">
              {hero?.heading || "Loans for NRIs"}
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 font-medium">
              Tailored home loan solutions designed for Non-Resident Indians.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Content Sections */}
      {sections && sections.length > 0 && (
        <div className="w-full max-w-7xl px-10 sm:px-12 lg:px-14 py-10 space-y-10">
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
                            className={
                              rIdx % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
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
                ) : null,
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
    </div>
  );
};

export default LoansForNrisClient;

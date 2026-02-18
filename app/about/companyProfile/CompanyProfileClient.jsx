'use client';

// Import Lock icon from lucide-react for header visual
import { Lock } from 'lucide-react';
// Import motion from framer-motion for entrance animation
import { motion } from 'framer-motion';

// Main component to render company profile sections with animation
const CompanyProfileClient = ({ data }) => {
  return (
    // Animated container with slide-in effect
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex flex-col items-center"
    >
      {/* Hero section with gradient background and centered content */}
      <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-4xl">
        <div className="flex justify-center mb-4">
          {/* Icon container */}
          <div className="bg-gray-800 rounded-full p-3">
            <Lock className="text-white" size={32} />
          </div>
        </div>
        {/* Hero heading text */}
        <p className="text-2xl font-bold text-white">{data.hero.heading}</p>
      </div>

      {/* Content body with sections */}
      <div className="w-[80%] px-6 py-8">
        {data.sections.map((section, idx) => (
          <div key={idx} className="mb-10">
            {/* Section title */}
            <p className="text-3xl font-bold text-navy-blue mb-6">{section.title}</p>

            {/* Paragraph and bullet containers */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {/* Render non-empty paragraphs */}
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

              {/* Render non-empty bullet list items */}
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
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Export component for external use
export default CompanyProfileClient;

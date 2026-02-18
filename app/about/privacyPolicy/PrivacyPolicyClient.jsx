'use client'; // Enables client-side rendering for this component in Next.js

// Importing Lock icon for UI decoration
import { Lock } from 'lucide-react';
// Importing framer-motion for animation effects
import { motion } from 'framer-motion';

// Main functional component that receives `data` prop and renders privacy policy content
const PrivacyPolicyClient = ({ data }) => {
  return (
    // Animated container that fades in and slides up on render
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Start: invisible and shifted upward
      animate={{ opacity: 1, y: 0 }}   // End: fully visible and in place
      transition={{ duration: 0.5 }}   // Animation duration
      className="min-h-screen bg-gray-100 flex flex-col items-center" // Centered layout with light background
    >
      {/* Hero Section with background gradient and icon */}
      <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-4xl">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 rounded-full p-3">
            <Lock className="text-white" size={32} /> {/* Decorative lock icon */}
          </div>
        </div>
        {/* Heading from data prop or fallback */}
        <p className="text-2xl font-bold text-white">{data.hero?.heading || 'Privacy Policy'}</p>
      </div>

      {/* Content section containing all paragraphs and bullets */}
      <div className="w-[80%] px-6 py-8">
        {data.sections.map((section, index) => (
          <div key={index} className="space-y-4 mb-10">
            {/* Section title */}
            <p className="text-3xl font-bold text-navy-blue mb-6">{section.title}</p>

            {/* Paragraph and list content */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {/* Render non-empty paragraphs if any */}
              {section.paragraphs?.some((para) => para.trim() !== "") && (
                <>
                  {section.paragraphs
                    .filter((para) => para.trim() !== "")
                    .map((para, i) => (
                      <p
                        key={i}
                        className="text-navy-blue"
                        dangerouslySetInnerHTML={{ __html: para }} // Allows HTML formatting
                      />
                    ))}
                </>
              )}

              {/* Render non-empty bullet points if any */}
              {section.bullets?.some((item) => item.trim() !== "") && (
                <ul className="list-decimal pl-6 space-y-2">
                  {section.bullets
                    .filter((item) => item.trim() !== "")
                    .map((item, j) => (
                      <li
                        key={j}
                        className="text-navy-blue"
                        dangerouslySetInnerHTML={{ __html: item }} // Allows HTML inside bullets
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

// Exporting the component for use in other files
export default PrivacyPolicyClient;

import React from 'react';

/**
 * Skeleton loading component for the Company Profile page.
 * It mimics the layout with a hero section and several content sections,
 * using pulsing placeholders to indicate that content is loading.
 */
const loading = () => {
  return (
    // Main container mimicking the layout of the final page
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero section skeleton */}
      <div className="w-[80%] h-[30vh] bg-gray-300 animate-pulse py-6 flex flex-col justify-center items-center mt-10 rounded-2xl">
        {/* Icon placeholder */}
        <div className="bg-gray-400 rounded-full h-14 w-14 mb-4"></div>
        {/* Heading placeholder */}
        <div className="h-7 bg-gray-400 rounded-md w-1/2"></div>
      </div>

      {/* Content body skeleton */}
      <div className="w-[80%] px-6 py-8">
        {/* Loop to create a few placeholder sections to represent the list */}
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="mb-10 animate-pulse">
            {/* Section title placeholder */}
            <div className="h-8 bg-gray-400 rounded-md w-2/5 mb-6"></div>

            {/* Paragraphs and bullets container placeholder */}
            <div className="space-y-4">
              {/* Paragraph placeholders with varying widths for a natural look */}
              <div className="h-4 bg-gray-300 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-11/12"></div>
              <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
              
              {/* Spacer to simulate the gap before the bullet list */}
              <div className="h-6"></div>

              {/* Bullet list placeholders, indented to mimic a real list */}
              <div className="pl-6 space-y-3">
                <div className="h-4 bg-gray-300 rounded-md w-full"></div>
                <div className="h-4 bg-gray-300 rounded-md w-11/12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
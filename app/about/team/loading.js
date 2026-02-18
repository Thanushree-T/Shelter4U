// app/team/loading.jsx

import React from 'react';

/**
 * A skeleton placeholder for an individual team member card.
 * It mimics the two-part layout (text and image) with animated placeholders.
 */
const TeamCardSkeleton = () => (
  <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-gray-200 shadow-lg w-full max-w-2xl mx-auto animate-pulse">
    {/* Left side skeleton: Name and position */}
    <div className="flex flex-col items-center justify-center px-6 py-5 bg-gray-300 flex-[1.2]">
      <div className="h-6 bg-gray-400 rounded-md w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-400 rounded-md w-1/2"></div>
    </div>

    {/* Right side skeleton: Image */}
    <div className="flex-[1.8] bg-gray-400 h-64 w-full"></div>
  </div>
);

/**
 * Loading skeleton for the main Team page.
 * This component provides a visual placeholder that includes a hero section
 * and a grid of team card skeletons.
 */
const loading = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero section skeleton */}
      <div className="w-[80%] h-[30vh] bg-gray-300 animate-pulse py-6 flex flex-col justify-center items-center mt-10 rounded-3xl">
        {/* Placeholder for the Globe icon */}
        <div className="bg-gray-400 rounded-full h-14 w-14 mb-4"></div>
        {/* Placeholder for the hero heading */}
        <div className="h-7 bg-gray-400 rounded-md w-1/3"></div>
      </div>

      {/* Cards Grid Section Skeleton */}
      <div className="flex items-center justify-center mt-8 mb-12 w-full">
        <div className="w-[80%] grid grid-cols-1 [@media(min-width:1040px)]:grid-cols-2 gap-10">
          {/* Render 4 skeleton cards to represent a loading list */}
          {[...Array(4)].map((_, idx) => (
            <TeamCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
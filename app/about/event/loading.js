// app/events/loading.jsx

import React from 'react';

/**
 * A skeleton placeholder for an individual event card.
 * It mimics the card's structure, including the image, badge, and title,
 * using animated gray boxes.
 */
const EventCardSkeleton = () => (
  <div className="relative max-w-xs animate-pulse">
    <div className="relative bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-md">
      {/* Image Container Skeleton */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] relative bg-gray-300">
          {/* Photo Count Badge Skeleton */}
          <div className="absolute top-4 right-4 bg-gray-400 h-9 w-36 rounded-2xl"></div>
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="p-6 relative">
        {/* Title Skeleton (two lines) */}
        <div className="h-6 bg-gray-400 rounded w-full mb-3"></div>
        <div className="h-6 bg-gray-400 rounded w-3/4"></div>
      </div>
    </div>
  </div>
);

/**
 * Loading skeleton for the main Events page.
 * This component provides a visual placeholder that includes a hero section
 * and a grid of event card skeletons, matching the final layout.
 */
const loading = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section Skeleton */}
      <div className="w-[80%] h-[30vh] bg-gray-300 animate-pulse flex flex-col justify-center items-center mt-10 rounded-3xl">
        {/* Placeholder for the Lock icon */}
        <div className="bg-gray-400 rounded-full h-14 w-14 mb-4"></div>
        {/* Placeholder for the hero heading */}
        <div className="h-7 bg-gray-400 rounded-md w-1/3"></div>
      </div>

      {/* Event Cards Grid Skeleton */}
      <div className="p-10 m-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-7xl mx-auto">
          {/* Render multiple skeleton cards to represent a loading list (e.g., 6) */}
          {[...Array(6)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
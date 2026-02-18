'use client'; // Enables client-side rendering in Next.js 13+ App Router

import React from 'react';
// Importing an icon component (Lock) from lucide-react to visually enhance the UI
import { Lock } from 'lucide-react';
// Importing a reusable EventCard component to render individual event details
import EventCard from './EventCard';
// Importing motion from framer-motion for smooth entrance animations
import { motion } from 'framer-motion';

export default function EventClient({ events }) {
  return (
    // Wrapper div with motion animation: fades in and slides up on mount
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Starts invisible and slightly above
      animate={{ opacity: 1, y: 0 }}   // Ends fully visible and at normal position
      transition={{ duration: 0.5 }}   // Transition timing
      className="min-h-screen bg-gray-100 flex flex-col items-center" // Full-height layout with background and centering
    >
      {/* Hero Section */}
      <div className="w-[80%] h-[30vh] bg-gradient-to-r from-gray-900 to-black py-6 text-center flex flex-col justify-center mt-10 rounded-4xl">
        {/* Lock Icon wrapper for visual emphasis */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 rounded-full p-3">
            <Lock className="text-white" size={32} />
          </div>
        </div>
        {/* Title text for the section */}
        <p className="text-2xl font-bold text-white">Event Gallery</p>
      </div>

      {/* Event Cards */}
      <div className="p-10 m-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* If no events exist, show fallback text */}
          {events?.length === 0 ? (
            <p className="text-gray-600 text-lg">No events found.</p>
          ) : (
            // Render each event using the EventCard component
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}
        </div>
      </div>
    </motion.div>
  );
}

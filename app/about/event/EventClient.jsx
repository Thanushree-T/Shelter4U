"use client"; // Enables client-side rendering in Next.js 13+ App Router

import React from "react";
import { Image as ImageIcon } from "lucide-react";
import EventCard from "./EventCard";

export default function EventClient({ events }) {
  return (
    // Wrapper div with motion animation: fades in and slides up on mount
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-20">
      {/* Hero section with icon and title */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 sm:py-24 text-center flex flex-col justify-center rounded-3xl shadow-2xl border border-gray-800">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-red-800/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex justify-center mb-6">
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-4 shadow-lg shadow-red-500/30 transform hover:scale-105 transition-transform duration-300">
                <ImageIcon className="text-white" size={36} strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 tracking-tight px-4">
              Event Gallery
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 font-medium">
              Discover our latest events, celebrations, and property launches.
            </p>
          </div>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* If no events exist, show fallback text */}
          {events?.length === 0 ? (
            <p className="col-span-full text-gray-500 text-center text-lg py-12">
              No events found.
            </p>
          ) : (
            // Render each event using the EventCard component
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}
        </div>
      </div>
    </div>
  );
}

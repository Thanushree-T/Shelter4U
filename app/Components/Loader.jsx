import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Animated Rings */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute w-full h-full border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute w-16 h-16 border-4 border-r-red-400 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
          {/* Optional: Add Logo or Icon in center */}
          <div className="w-8 h-8 bg-red-600/20 rounded-full animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <p className="text-red-600 font-semibold tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;

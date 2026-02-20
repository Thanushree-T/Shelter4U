"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="max-w-md w-full text-center space-y-8 p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertCircle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            500
          </h1>
          <h2 className="text-2xl font-bold text-gray-800">
            Something went wrong!
          </h2>
          <p className="text-gray-500 leading-relaxed">
            An unexpected error occurred. We have been notified and are working
            to fix it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            <RefreshCcw className="w-5 h-5" />
            Try again
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-200 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Go home
          </Link>
        </div>

        <div className="text-sm text-gray-400 pt-4">
          If the problem persists, please contact support.
        </div>
      </div>
    </div>
  );
}

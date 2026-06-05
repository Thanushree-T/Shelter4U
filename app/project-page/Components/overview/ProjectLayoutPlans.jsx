"use client";
import { Expand } from "lucide-react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

const LayoutPlans = ({ project, setShowFullForm }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-3.5 sm:p-5 border border-gray-100">
      {/* Section title */}
      <h2 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
        Layout Plans
      </h2>

      {/* Grid for displaying layout plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project?.layoutPlans?.map((plan, index) => (
          <div
            key={index}
            // Each card has border and hover effects
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            // On click, trigger the function to show expanded/full layout
            onClick={() => {
              setShowFullForm(true);
            }}
          >
            {/* Image container */}
            <div className="h-44 sm:h-52 md:h-64 relative">
              {/* Plan image */}
              <Image
                src={
                  optimizeCloudinaryUrl(plan?.url, {
                    width: 600,
                    height: 400,
                  }) || "https://placehold.co/600x400?text=Coming+Soon"
                }
                alt={plan?.type || "Layout plan"}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay with plan description */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 sm:p-5">
                <div>
                  <h3 className="font-bold text-white text-base">
                    {plan?.description}
                  </h3>
                </div>
              </div>

              {/* Expand icon on the top-right corner */}
              <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all">
                <Expand className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutPlans;

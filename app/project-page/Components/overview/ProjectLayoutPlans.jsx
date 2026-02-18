"use client";
import { Expand } from "lucide-react";

const LayoutPlans = ({ project, setShowFullForm }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      {/* Section title */}
      <h2 className="text-2xl font-semibold mb-8 text-gray-900">
        Layout Plans
      </h2>

      {/* Grid for displaying layout plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {project.layoutPlans.map((plan, index) => (
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
            <div className="h-64 relative">
              {/* Plan image */}
              <img
                src={
                  plan.url ||
                  "https://placehold.co/600x400?text=Coming+Soon"
                }
                alt={plan.type}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay with plan description */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="font-bold text-white text-lg">
                    {plan.description}
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

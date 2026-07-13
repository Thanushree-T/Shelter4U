import { models, connectToDBs } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import HomeHeroSection from "./home/HomeHeroSection.jsx";
import HomeSecondSection from "./home/HomeSecondSection.jsx";
import HomeThirdSection from "./home/HomeThirdSection.jsx";
import HomeFourthSection from "./home/HomeFourthSection.jsx";
import HomeFifthSection from "./home/HomeFifthSection.jsx";
import Recommended from "./home/Recommended.jsx";
import ExploreByLocalities from "./home/ExploreByLocalities.jsx";
import PropertyOptions from "./home/PropertyOptions.jsx";
import FAQ from "./home/FAQ.jsx";
import { Suspense } from "react";
import { headers } from "next/headers";
import BlogSection from "./home/BlogSection";

// Skeleton shown only while Recommended listings are loading
const RecommendedSkeleton = ({ showOwnerTab = true }) => (
  <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white select-none">
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation Skeleton */}
      <div className="flex border-b border-gray-200 gap-6 mb-5 relative">
        <div className="pb-2 text-base font-extrabold border-b-2 border-slate-900 text-slate-900">
          New Projects
        </div>
        {showOwnerTab && (
          <div className="pb-2 text-base font-extrabold border-b-2 border-transparent text-slate-300">
            Owner Properties
          </div>
        )}
      </div>

      {/* Description row skeleton */}
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between mb-5">
        <div className="h-3.5 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-3.5 bg-gray-200 rounded w-20 animate-pulse" />
      </div>

      {/* Grid of 4 Horizontal Card Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden w-full border border-gray-100 h-full animate-pulse min-h-[180px]"
          >
            {/* Left Section (Image placeholder) */}
            <div className="w-full sm:w-[40%] shrink-0 h-44 sm:h-auto bg-gray-200 min-h-[160px]" />

            {/* Right Section (Details placeholders) */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Badge/Tag */}
                <div className="h-3.5 bg-gray-200 rounded w-16" />
                {/* Title */}
                <div className="h-4.5 bg-gray-300 rounded w-3/4" />
                {/* Locality info lines */}
                <div className="space-y-2 pt-1">
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="h-4.5 bg-gray-300 rounded w-1/4" />
                <div className="h-3 bg-gray-300 rounded w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Force dynamic rendering so that new direct owner property approvals are visible in real-time
export const dynamic = "force-dynamic";

const {
  HomeFirstSection: HomeFirstSectionModel,
  HomeSecondSection: HomeSecondSectionModel,
  HomeThirdSection: HomeThirdSectionModel,
  HomeFourthSection: HomeFourthSectionModel,
  HomeFifthSection: HomeFifthSectionModel,
  Project,
  Area,
} = models;

export const metadata = {
  // Title inherits from layout default
  keywords: [
    "zero brokerage properties",
    "affordable flats in Ahmedabad",
    "Gandhinagar real estate",
    "zero brokerage property",
    "property in budget",
    "properties in Gandhinagar",
    "properties in Ahmedabad",
    "affordable housing projects in Ahmedabad",
    "verified real estate listings",
    "buy house in Ahmedabad",
    "buy house in Gandhinagar",
    "flats without brokerage",
    "Shelter4U real estate",
    "perfect project hub",
    "property search India",
  ],
  openGraph: {
    title: "Top Recommended Projects | Shelter4U",
    description:
      "Explore affordable, verified real estate listings from top builders. Flats available in Ahmedabad & Gandhinagar with zero brokerage.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shelter4U Recommended Properties",
      },
    ],
  },
  alternates: { canonical: "/" },
};

// Main Home Page — all DB queries run in parallel, ISR (1 hour)
export default async function HomePage() {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/json/blog.json`, {
    cache: "no-store",
  });

  const blogs = await res.json();
  await connectToDBs();
  let homeFirstSectionData = null;
  let homeSecondSectionData = null;
  let homeThirdSectionData = null;
  let homeFourthSectionData = null;
  let homeFifthSectionData = [];
  let recommendedProjects = [];
  let topLocalityData = [];
  let ownerProperties = [];

  try {
    const [
      homeFirstArr,
      homeSecondArr,
      homeThirdArr,
      homeFourthArr,
      homeFifthArr,
      recommended,
      topAreaIds,
      ownerProps,
    ] = await Promise.all([
      // Static sections — fetched once per ISR cycle, served from static cache
      HomeFirstSectionModel.findOne().lean(),
      HomeSecondSectionModel.findOne().lean(),
      HomeThirdSectionModel.findOne().lean(),
      HomeFourthSectionModel.findOne().lean(),
      HomeFifthSectionModel.find().lean(),
      // Listings — updated every hour via page revalidate
      Project.find({ isRecommended: true })
        .populate("area", ["_id", "name"])
        .populate("builder", ["_id", "name"])
        .populate("state", ["_id", "name"])
        .populate("city", ["_id", "name"])
        .sort({ createdAt: -1 })
        .lean(),
      // Top 5 localities by project count
      Project.aggregate([
        { $match: { area: { $exists: true, $ne: null } } },
        { $group: { _id: "$area", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
      models.Property.find({ approvalStatus: "Approved" })
        .populate("area", ["_id", "name"])
        .populate("city", ["_id", "name"])
        .populate("state", ["_id", "name"])
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    homeFirstSectionData = serializeMongo(homeFirstArr || null);
    homeSecondSectionData = serializeMongo(homeSecondArr || null);
    homeThirdSectionData = serializeMongo(homeThirdArr || null);
    homeFourthSectionData = serializeMongo(homeFourthArr || null);
    homeFifthSectionData = serializeMongo(homeFifthArr ?? []);
    recommendedProjects = serializeMongo(recommended ?? []);
    ownerProperties = serializeMongo(ownerProps ?? []);

    // Build locality data: for each top area, fetch area name + its projects
    if (topAreaIds && topAreaIds.length > 0) {
      const areaIds = topAreaIds.map((a) => a._id);

      const [areasArr, localityProjectsArr] = await Promise.all([
        Area.find({ _id: { $in: areaIds } }).lean(),
        Project.find({ area: { $in: areaIds } })
          .populate("area", ["_id", "name"])
          .populate("builder", ["_id", "name"])
          .select(["projectName", "slug", "minPrice", "area", "builder", "_id"])
          .lean(),
      ]);

      // Map area _id → name
      const areaMap = {};
      areasArr.forEach((a) => {
        areaMap[a._id.toString()] = a.name;
      });

      // Build per-area project lists, preserving the sorted order from topAreaIds
      topLocalityData = topAreaIds
        .map((topArea) => {
          const areaIdStr = topArea._id.toString();
          const areaProjects = localityProjectsArr.filter(
            (p) => p.area && p.area._id && p.area._id.toString() === areaIdStr,
          );
          return {
            areaId: areaIdStr,
            areaName: areaMap[areaIdStr] || "Unknown",
            projects: areaProjects,
          };
        })
        .filter((loc) => loc.areaName !== "Unknown");

      topLocalityData = serializeMongo(topLocalityData);
    }
  } catch (e) {
    console.error("Error loading Home data:", e);
  }

  return (
    <>
      <HomeHeroSection data={homeFirstSectionData} />
      <Suspense
        fallback={
          <RecommendedSkeleton showOwnerTab={ownerProperties.length > 0} />
        }
      >
        <Recommended
          projects={recommendedProjects}
          properties={ownerProperties}
        />
      </Suspense>
      <ExploreByLocalities localityData={topLocalityData} />
      <PropertyOptions />
      {/* <FAQ /> */}
      <BlogSection blogs={blogs} />
      <HomeSecondSection data={homeSecondSectionData} />
      <HomeThirdSection data={homeThirdSectionData} />
      <HomeFourthSection data={homeFourthSectionData} />
      <HomeFifthSection data={homeFifthSectionData} />
    </>
  );
}

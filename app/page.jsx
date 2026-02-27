import { models } from "@/lib/connections.js";
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

// Skeleton shown only while Recommended listings are loading
const RecommendedSkeleton = () => (
  <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-gray-300 rounded w-1/6 mt-2 md:mt-0 animate-pulse" />
      </div>
      <div className="h-8 bg-gray-400 rounded w-1/2 mb-6 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-4 space-y-4 animate-pulse"
          >
            <div className="h-48 bg-gray-200 rounded-lg" />
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-300 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Page revalidates every hour — triggers ISR for listings
export const revalidate = 3600;

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
  let homeFirstSectionData = null;
  let homeSecondSectionData = null;
  let homeThirdSectionData = null;
  let homeFourthSectionData = null;
  let homeFifthSectionData = [];
  let recommendedProjects = [];
  let topLocalityData = [];

  try {
    const [
      homeFirstArr,
      homeSecondArr,
      homeThirdArr,
      homeFourthArr,
      homeFifthArr,
      recommended,
      topAreaIds,
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
    ]);

    homeFirstSectionData = serializeMongo(homeFirstArr || null);
    homeSecondSectionData = serializeMongo(homeSecondArr || null);
    homeThirdSectionData = serializeMongo(homeThirdArr || null);
    homeFourthSectionData = serializeMongo(homeFourthArr || null);
    homeFifthSectionData = serializeMongo(homeFifthArr ?? []);
    recommendedProjects = serializeMongo(recommended ?? []);

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
      <Suspense fallback={<RecommendedSkeleton />}>
        <Recommended projects={recommendedProjects} />
      </Suspense>
      <ExploreByLocalities localityData={topLocalityData} />
      <PropertyOptions />
      <FAQ />
      <HomeSecondSection data={homeSecondSectionData} />
      <HomeThirdSection data={homeThirdSectionData} />
      <HomeFourthSection data={homeFourthSectionData} />
      <HomeFifthSection data={homeFifthSectionData} />
    </>
  );
}

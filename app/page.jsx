import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import HomeFirstSection from "./home/HomeFirstSection.jsx";
import HomeSecondSection from "./home/HomeSecondSection.jsx";
import HomeThirdSection from "./home/HomeThirdSection.jsx";
import HomeFourthSection from "./home/HomeFourthSection.jsx";
import HomeFifthSection from "./home/HomeFifthSection.jsx";
import Recommended from "./home/Recommended.jsx";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const {
  HomeFirstSection: HomeFirstSectionModel,
  HomeSecondSection: HomeSecondSectionModel,
  HomeThirdSection: HomeThirdSectionModel,
  HomeFourthSection: HomeFourthSectionModel,
  HomeFifthSection: HomeFifthSectionModel,
  Project,
} = models;

// Static metadata — no DB call needed here
export const metadata = {
  title: "Shelter4U",
  description:
    "Discover the best zero brokerage flats, affordable properties, and premium projects by top builders in Ahmedabad, Gandhinagar, Pune, and Mumbai.",
  keywords: [
    "zero brokerage properties",
    "affordable flats in Ahmedabad",
    "premium projects in Pune",
    "Gandhinagar real estate",
    "verified properties Mumbai",
    "zero brokerage property",
    "property in budget",
    "properties in Gandhinagar",
    "properties in Pune",
    "properties in Mumbai",
    "properties in Ahmedabad",
    "affordable housing projects in Ahmedabad",
    "verified real estate listings",
    "buy house in Ahmedabad",
    "low budget property in Mumbai",
    "flats without brokerage",
    "Shelter4U real estate",
    "perfect project hub",
    "property search India",
  ],
  openGraph: {
    title: "Top Recommended Projects | Shelter4U",
    description:
      "Explore affordable, verified real estate listings from top builders. Flats available in Ahmedabad, Gandhinagar, Pune, and Mumbai with zero brokerage.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shelter4U Recommended Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Builder Projects in India | Shelter4U",
    description:
      "Recommended real estate from Shelter4U. Builder projects with zero brokerage across India.",
    images: ["/logo.png"],
  },
  alternates: { canonical: "https://shelter4u.in" },
  robots: { index: true, follow: true, nocache: false },
};

// Main Home Page — all DB queries run in parallel
export default async function HomePage() {
  let homeFirstSectionData = null;
  let homeSecondSectionData = null;
  let homeThirdSectionData = null;
  let homeFourthSectionData = null;
  let homeFifthSectionData = [];
  let recommendedProjects = [];

  try {
    const [
      homeFirstArr,
      homeSecondArr,
      homeThirdArr,
      homeFourthArr,
      homeFifthArr,
      recommended,
    ] = await Promise.all([
      HomeFirstSectionModel.find().lean(),
      HomeSecondSectionModel.find().lean(),
      HomeThirdSectionModel.find().lean(),
      HomeFourthSectionModel.find().lean(),
      HomeFifthSectionModel.find().lean(),
      Project.find({ isRecommended: true })
        .populate("area", ["_id", "name"])
        .populate("builder", ["_id", "name"])
        .populate("state", ["_id", "name"])
        .populate("city", ["_id", "name"])
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    homeFirstSectionData = serializeMongo(homeFirstArr[0] || null);
    homeSecondSectionData = serializeMongo(homeSecondArr[0] || null);
    homeThirdSectionData = serializeMongo(homeThirdArr[0] || null);
    homeFourthSectionData = serializeMongo(homeFourthArr[0] || null);
    homeFifthSectionData = serializeMongo(homeFifthArr ?? []);
    recommendedProjects = serializeMongo(recommended ?? []);
  } catch (e) {
    console.error("Error loading Home data:", e);
  }

  return (
    <>
      <HomeFirstSection data={homeFirstSectionData} />
      <Suspense fallback={<div>Loading...</div>}>
        <Recommended projects={recommendedProjects} />
      </Suspense>
      <HomeSecondSection data={homeSecondSectionData} />
      <HomeThirdSection data={homeThirdSectionData} />
      <HomeFourthSection data={homeFourthSectionData} />
      <HomeFifthSection data={homeFifthSectionData} />
    </>
  );
}

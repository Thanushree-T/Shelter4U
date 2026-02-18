import { models } from "@/lib/connections.js";
import VisionMissionClient from "./VissionMissionClient.jsx";

const { VisionMission } = models;

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: "Our Vision and Mission | Shelter4U",
    description:
      "Discover the vision and mission that drive Shelter4U to provide top-quality real estate services with zero brokerage. Learn what guides our purpose.",
    keywords: [
      "Shelter4U vision",
      "Shelter4U mission",
      "real estate company goals",
      "property company values",
      "zero brokerage real estate",
      "Shelter4U India",
    ],
    openGraph: {
      title: "Our Vision and Mission | Shelter4U",
      description:
        "Learn about Shelter4U's vision and mission behind transforming the property buying experience across India.",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Shelter4U Vision and Mission",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Vision and Mission | Shelter4U",
      description:
        "We aim to provide affordable, transparent, and accessible real estate solutions across India.",
      images: ["/logo.png"],
    },
    alternates: { canonical: "https://shelter4u.in/about/visionMission" },
    robots: { index: true, follow: true, nocache: false },
  };
}

export default async function VisionMissionPage() {
  try {
    const visionMissionArr = await VisionMission.find().lean();
    const visionData = visionMissionArr?.[0] || null;
    return <VisionMissionClient data={visionData} />;
  } catch (error) {
    console.error("VisionMission fetch error:", error.message);
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 font-bold">
          Failed to load vision &amp; mission data.
        </p>
      </div>
    );
  }
}

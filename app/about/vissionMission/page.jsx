// import dynamic from "next/dynamic";

// const VisionMissionClient = dynamic(() => import("./VissionMissionClient.jsx"), {
//   ssr: true,
//   loading: () => <p className="text-center text-gray-500">Loading Vision & Mission...</p>,
// });

import VisionMissionClient from "./VissionMissionClient.jsx";

export const dynamic = 'force-dynamic';

//  Static SEO Tags
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
    alternates: {
      canonical: "https://shelter4u.in/about/visionMission",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  };
}

export default async function VisionMissionPage() {
  const API = process.env.NEXT_PUBLIC_BASE_URL || "";

  try {
    const res = await fetch(`${API}/api/about/vissionMission`, { cache: 'no-store' });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    const visionData = data?.visionMission?.[0];

    return <VisionMissionClient data={visionData} />;
  } catch (error) {
    console.error("VisionMission fetch error:", error.message);
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 font-bold">
          Failed to load vision & mission data.
        </p>
      </div>
    );
  }
}

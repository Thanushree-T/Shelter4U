import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";
import CareerClient from "./CareerClient";

const { Career } = models;

// Careers are CMS content — revalidate every 24 hours
export const revalidate = 86400;

export const metadata = {
  title: "Careers | Shelter4U",
  description:
    "Explore career opportunities at Shelter4U. Join our team and help transform the real estate experience in India.",
  keywords: [
    "Shelter4U careers",
    "real estate jobs India",
    "property company jobs",
    "join Shelter4U",
  ],
  openGraph: {
    title: "Careers | Shelter4U",
    description:
      "Build your career with Shelter4U - India's trusted zero-brokerage real estate platform.",
    url: "https://shelter4u.in/about/career",
    images: [
      { url: "/logo.png", width: 1200, height: 630, alt: "Shelter4U Careers" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Shelter4U",
    description:
      "Join the Shelter4U team and help people find their dream homes across India.",
    images: ["/logo.png"],
  },
  alternates: { canonical: "https://shelter4u.in/about/career" },
  robots: { index: true, follow: true },
};

export default async function CareerPage() {
  try {
    const careers = await Career.find({ active: true }).lean();
    return <CareerClient careers={serializeMongo(careers)} />;
  } catch (error) {
    console.error("Error fetching careers:", error);
    return <CareerClient careers={[]} />;
  }
}

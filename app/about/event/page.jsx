import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import EventClient from "./EventClient.jsx";

const { Event } = models;

// Events are CMS content — revalidate every 24 hours (ISR)
export const revalidate = 86400;

export async function generateMetadata() {
  return {
    title: "Events | Shelter4U",
    description:
      "Explore Shelter4U's latest events and initiatives in the real estate sector. Stay updated with our community engagement, launches, and celebrations.",
    keywords: [
      "Shelter4U events",
      "real estate events",
      "property launch events",
      "Shelter4U gatherings",
      "real estate exhibitions",
      "Shelter4U community activities",
    ],
    openGraph: {
      title: "Events | Shelter4U",
      description:
        "Check out Shelter4U's recent and upcoming events. Discover how we engage with clients and the real estate community.",
      url: "https://shelter4u.in/about/event",
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Shelter4U Event Banner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Shelter4U Events",
      description:
        "Discover exciting events and property launches hosted by Shelter4U.",
      images: ["/logo.png"],
    },
    alternates: { canonical: "https://shelter4u.in/about/event" },
    robots: { index: true, follow: true },
  };
}

export default async function EventPage() {
  try {
    const events = await Event.find().lean();
    return <EventClient events={serializeMongo(events)} />;
  } catch (error) {
    console.error("Error fetching events:", error);
    return <EventClient events={[]} />;
  }
}

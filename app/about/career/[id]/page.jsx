// app/about/career/[id]/page.jsx
import { models } from "@/lib/connections.js";
import ViewDetailCareer from "./ViewDetailCareer.jsx";

const { Career } = models;

// ISR: revalidate career detail pages every 24 hours
export const revalidate = 86400;

// Pre-generate all career detail pages at build time so the <link rel="canonical">
// is always inside <head> — fixing Screaming Frog's "Canonicals: Outside <head>" issue.
export async function generateStaticParams() {
  try {
    const careers = await Career.find({}, "_id").lean();
    return careers.map((c) => ({ id: c._id.toString() }));
  } catch (error) {
    console.error("Error generating static params for careers:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Career Detail | Shelter4U`,
    description:
      "Explore this career opportunity at Shelter4U and apply to join our growing real estate team.",
    robots: { index: true, follow: true },
    // Relative canonical — Next.js uses metadataBase to construct the absolute URL
    alternates: { canonical: `/about/career/${id}` },
  };
}

export default async function CareerDetailPage({ params }) {
  const { id } = await params;

  return <ViewDetailCareer id={id} />;
}

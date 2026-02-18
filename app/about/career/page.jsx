// app/about/career/page.jsx

import CareerClient from "./CareerClient";



// // SEO metadata using the shared careers data
// export async function generateMetadata() {
//   const careers = await careersPromise;

//   const topPositions = careers.map((job) => job.position);

//   const dynamicKeywords = topPositions.flatMap((pos) => [
//     `${pos} jobs at Shelter4U`,
//     `${pos} opening in real estate`,
//     `${pos} career opportunity`,
//     `${pos} hiring Shelter4U`,
//   ]);

//   return {
//     title: "Careers at Shelter4U | Explore Job Openings",
//     description: `Join Shelter4U for roles in real estate, technology, and sales. Current openings include: ${topPositions.join(", ")}.`,
//     keywords: [
//       "Shelter4U careers",
//       "real estate jobs India",
//       "property sales hiring",
//       "zero brokerage platform jobs",
//       "real estate openings Ahmedabad",
//       "tech jobs in real estate",
//       ...dynamicKeywords,
//     ],
//     openGraph: {
//       title: "We're Hiring | Shelter4U Careers",
//       description: `Explore job opportunities like ${topPositions.join(", ")} at Shelter4U.`,
//       url: "https://shelter4u.in/about/career",
//       images: [
//         {
//           url: "/logo.png",
//           width: 1200,
//           height: 630,
//           alt: "Shelter4U Hiring Banner",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Join the Shelter4U Team | Careers",
//       description: `Shelter4U is hiring for ${topPositions.join(", ")} and more. Apply today.`,
//       images: ["/logo.png"],
//     },
//     alternates: {
//       canonical: "https://shelter4u.in/about/career",
//     },
//     robots: {
//       index: true,
//       follow: true,
//       nocache: false,
//     },
//   };
// }

// Actual Page Component
export default async function CareerPage() {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
   const res = await fetch(`${baseUrl}/api/about/career`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch careers");
  }

  const data = await res.json();
  return <CareerClient careers={data.career} />;
}

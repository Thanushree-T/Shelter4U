import TeamClient from './TeamClient';

//SEO Tags
export async function generateMetadata() {
  return {
    title: "Meet Our Team | Shelter4U",
    description:
      "Get to know the passionate and experienced team behind Shelter4U. Our real estate experts are here to help you find your dream home.",
    keywords: [
      "Shelter4U team",
      "real estate experts",
      "property consultants India",
      "meet our team Shelter4U",
      "real estate professionals",
      "Shelter4U staff",
    ],
    openGraph: {
      title: "Meet Our Team | Shelter4U",
      description:
        "Discover the professionals making real estate easy at Shelter4U. We're a team driven by integrity and transparency.",
      url: "https://shelter4u.in/about/team",
      type: "profile",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Shelter4U Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Shelter4U Team | Real Estate Experts",
      description:
        "The Shelter4U team is here to guide you in your property journey. Get to know the faces behind the service.",
      images: ["/logo.png"],
    },
    alternates: {
      canonical: "https://shelter4u.in/about/team",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default async function TeamPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${baseUrl}/api/about/team`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch team members');
  }

  const data = await res.json();

  return <TeamClient teamMembers={data.team || []} />;
}

import CompanyProfileClient from './CompanyProfileClient';

export const dynamic = 'force-dynamic';

export default async function CompanyProfilePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const res = await fetch(`${baseUrl}/api/about/companyProfile`, { cache: 'no-store' });


  if (!res.ok) {
      throw new Error('Failed to fetch company profile');
  }
  const data = await res.json();

  return <CompanyProfileClient data={data.companyProfile} />;
}

export const generateMetadata = () => ({
  title: "Company Profile | Shelter4U",
  description:
    "Learn about Shelter4U - India's trusted real estate platform offering zero brokerage properties in Ahmedabad, Gandhinagar, Pune, and Mumbai.",
  keywords: [
    "Shelter4U company profile",
    "real estate company in India",
    "zero brokerage real estate",
    "property buying in Ahmedabad",
    "trusted property dealers Pune",
    "affordable housing Mumbai",
    "real estate platform Gandhinagar",
    "buy property online India",  
  ],
  openGraph: {
    title: "Company Profile | Shelter4U",
    description:
      "Know more about Shelter4U's mission and services. We bring you verified, affordable, and zero brokerage properties.",
    url: "https://shelter4u.in/about/companyProfile",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Shelter4U Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shelter4U Company Profile",
    description:
      "Discover Shelter4U, a real estate platform focused on zero brokerage housing solutions in major Indian cities.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://shelter4u.in/about/companyProfile",
  },
  robots: {
      index: true,      
      follow: true,      
      nocache: false,    
  },

});




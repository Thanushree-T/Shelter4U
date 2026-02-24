import InquiryClient from "./InquiryClient";

// Inquiry page is fully static UI (form only, no DB data needed at render time)
export const revalidate = false;

export const metadata = {
  title: "Inquiry | Shelter4U",
  description:
    "Submit an inquiry to Shelter4U. Our expert team will contact you shortly to assist with your real estate needs.",
  keywords: [
    "Shelter4U inquiry",
    "real estate inquiry",
    "property inquiry India",
    "contact Shelter4U",
  ],
  openGraph: {
    title: "Inquiry | Shelter4U",
    description:
      "Have questions about a property? Submit an inquiry and our expert team will get back to you.",
    url: "/Inquiry",
    type: "website",
    images: [
      { url: "/logo.png", width: 1200, height: 630, alt: "Shelter4U Inquiry" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inquiry | Shelter4U",
    description: "Contact Shelter4U. Our expert will contact you shortly.",
    images: ["/logo.png"],
  },
  alternates: { canonical: "/Inquiry" },
  robots: { index: true, follow: true },
};

export default function InquiryPage() {
  return <InquiryClient />;
}

import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";
import ContactUsClient from "./ContactUsClient";

const { Footer } = models;

// Contact info (phone, email, address) is static — ISR every 24 hours
export const revalidate = 86400;

export const metadata = {
  title: "Contact Us | Shelter4U",
  description:
    "Reach out to Shelter4U for all your real estate needs. Contact us via phone, email, or visit our office for property assistance and zero-brokerage services.",
  keywords: [
    "Contact Shelter4U",
    "Shelter4U phone",
    "Shelter4U email",
    "real estate contact",
    "Shelter4U India",
    "property contact page",
  ],
  openGraph: {
    title: "Contact Us",
    description:
      "Get in touch with Shelter4U. We're here to help you with all your real estate needs. Zero brokerage and expert assistance guaranteed.",
    url: "/contactus",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shelter4U Contact Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Shelter4U",
    description:
      "Need help with buying or selling property? Contact Shelter4U for fast, transparent, and zero-brokerage services.",
    images: ["/logo.png"],
  },
  alternates: { canonical: "/contactus" },
  robots: { index: true, follow: true },
};

export default async function ContactPage() {
  let contactData = null;
  try {
    const footer = await Footer.findOne().lean();
    contactData = serializeMongo(footer);
  } catch (err) {
    console.error("Error fetching contact data:", err);
  }
  return <ContactUsClient data={contactData} />;
}

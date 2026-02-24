import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import LegalInformationClient from "./LegalInformationClient.jsx";

const { LegalInformation } = models;

// Static CMS content — revalidate every 24 hours (ISR)
export const revalidate = 86400;

export const metadata = {
  title: "Legal Information | Shelter4U",
  description:
    "Read the legal information and guidelines from Shelter4U — India's trusted zero brokerage real estate platform.",
  keywords: [
    "legal information",
    "real estate legal",
    "Shelter4U legal",
    "property guidelines India",
  ],
  openGraph: {
    title: "Legal Information | Shelter4U",
    description:
      "Understand the legal terms and conditions related to Shelter4U real estate services.",
    url: "/others/legalInfo",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Shelter4U" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Information | Shelter4U",
    images: ["/logo.png"],
  },
  alternates: { canonical: "/others/legalInfo" },
  robots: { index: true, follow: true },
};

export default async function LegalPage() {
  const legalInformation = await LegalInformation.findOne().lean();

  if (!legalInformation) {
    throw new Error("Legal information not found");
  }

  return <LegalInformationClient data={serializeMongo(legalInformation)} />;
}

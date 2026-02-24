import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import LoansForNrisClient from "./LoansForNrisClient";

const { LoanForNRI } = models;

// Static CMS content — revalidate every 24 hours (ISR)
export const revalidate = 86400;

export const metadata = {
  title: "Loans for NRIs | Shelter4U",
  description:
    "Explore home loan options available for Non-Resident Indians (NRIs) through Shelter4U — your trusted zero brokerage real estate partner.",
  keywords: [
    "NRI home loans",
    "loans for NRI India",
    "NRI real estate",
    "Shelter4U NRI loans",
    "property loans NRI",
  ],
  openGraph: {
    title: "Loans for NRIs | Shelter4U",
    description:
      "Find the best home loan options for NRIs looking to invest in Indian real estate through Shelter4U.",
    url: "/others/loansForNRI",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Shelter4U" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loans for NRIs | Shelter4U",
    images: ["/logo.png"],
  },
  alternates: { canonical: "/others/loansForNRI" },
  robots: { index: true, follow: true },
};

export default async function LoansForNrisPage() {
  const loanForNRI = await LoanForNRI.findOne().lean();

  if (!loanForNRI) {
    throw new Error("Loan for NRI data not found");
  }

  return <LoansForNrisClient data={serializeMongo(loanForNRI)} />;
}

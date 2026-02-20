import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import LoansForNrisClient from "./LoansForNrisClient";

const { LoanForNRI } = models;

// Static CMS content — revalidate every 24 hours (ISR)
export const revalidate = 86400;

export default async function LoansForNrisPage() {
  const loanForNRI = await LoanForNRI.findOne().lean();

  if (!loanForNRI) {
    throw new Error("Loan for NRI data not found");
  }

  return <LoansForNrisClient data={serializeMongo(loanForNRI)} />;
}

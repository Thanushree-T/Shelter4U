import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import LoansForNrisClient from "./LoansForNrisClient";

const { LoanForNRI } = models;

// Static CMS content — revalidate every 24 hours (ISR)
export const revalidate = 86400;

export default async function LoansForNrisPage() {
  try {
    const loanForNRI = await LoanForNRI.findOne().lean();
    return <LoansForNrisClient data={serializeMongo(loanForNRI)} />;
  } catch (error) {
    console.error("Error fetching loan data:", error);
    return <LoansForNrisClient data={null} />;
  }
}

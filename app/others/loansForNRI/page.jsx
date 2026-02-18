import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import LoansForNrisClient from "./LoansForNrisClient";

const { LoanForNRI } = models;

export const dynamic = "force-dynamic";

export default async function LoansForNrisPage() {
  try {
    const loanForNRI = await LoanForNRI.findOne().lean();
    return <LoansForNrisClient data={serializeMongo(loanForNRI)} />;
  } catch (error) {
    console.error("Error fetching loan data:", error);
    return <LoansForNrisClient data={null} />;
  }
}

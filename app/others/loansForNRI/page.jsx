// app/about/loan/page.jsx
import LoansForNrisClient from "./LoansForNrisClient";

export const dynamic = 'force-dynamic';

export default async function LoansForNrisPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${baseUrl}/api/others/loansForNRI`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch loan data");
  }

  const data = await res.json();

  return <LoansForNrisClient data={data.loanForNRI} />;
}
// app/about/legal/page.jsx
import LegalInformationClient from "./LegalInformationClient.jsx";

export const dynamic = 'force-dynamic';

export default async function LegalPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${baseUrl}/api/others/LegalInfo`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch legal information");
  }

  const data = await res.json();
  return <LegalInformationClient data={data.legalInformation} />;
}

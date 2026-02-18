import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import LegalInformationClient from "./LegalInformationClient.jsx";

const { LegalInformation } = models;

export const dynamic = "force-dynamic";

export default async function LegalPage() {
  try {
    const legalInformation = await LegalInformation.findOne().lean();
    return <LegalInformationClient data={serializeMongo(legalInformation)} />;
  } catch (error) {
    console.error("Error fetching legal information:", error);
    return <LegalInformationClient data={null} />;
  }
}

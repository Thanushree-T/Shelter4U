import { models } from "@/lib/connections.js";
import { serializeMongo } from "@/lib/utils";

import CareerClient from "./CareerClient";

const { Career } = models;

export default async function CareerPage() {
  try {
    const careers = await Career.find({ active: true }).lean();
    return <CareerClient careers={serializeMongo(careers)} />;
  } catch (error) {
    console.error("Error fetching careers:", error);
    return <CareerClient careers={[]} />;
  }
}

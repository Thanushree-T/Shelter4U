import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const { LegalInformation } = models;

export async function GET() {
  try {
    const legalInformation = await LegalInformation.findOne().lean();
    return NextResponse.json(
      { success: true, legalInformation },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching legal information:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

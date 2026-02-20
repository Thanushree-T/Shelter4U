import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const { Event } = models;

export async function GET() {
  try {
    const event = await Event.find().lean();
    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

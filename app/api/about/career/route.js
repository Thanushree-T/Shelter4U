import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";


const { Career } = models;

export async function GET() {
  try {
    const career = await Career.find({active: true});
    console.log("Career listings fetched successfully:", career);
    return NextResponse.json({ success: true, career }, { status: 200 });
  } catch (error) {
    console.error("Error fetching career listings:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

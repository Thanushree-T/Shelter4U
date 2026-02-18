import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const { Inquiry } = models;

export async function POST(req) {
  try {
    const body = await req.json(); 
    await Inquiry.create(body);  
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

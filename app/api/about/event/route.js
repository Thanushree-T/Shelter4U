import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const {Event} = models;

export async function GET() {
    console.log("hello")
    try {
        const event= await Event.find();
        console.log("Event data fetched successfully:", event);
        return NextResponse.json({ success: true, event }, { status: 200 });
    } catch (error) {
        console.error("Error fetching company profile:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
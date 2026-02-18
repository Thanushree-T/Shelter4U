import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const {Team} = models;

export async function GET() {
    
    try {
        const team= await Team.find();
        return NextResponse.json({ success: true, team }, { status: 200 });
    } catch (error) {
        console.error("Error fetching company profile:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
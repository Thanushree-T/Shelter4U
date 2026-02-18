import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const {Footer} = models;

export async function GET() {
    try {
        const footer= await Footer.findOne();
        return NextResponse.json({ success: true, footer }, { status: 200 });
    } catch (error) {
        console.error("Error fetching company profile:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
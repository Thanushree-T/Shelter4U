import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const {PrivacyPolicy} = models;

export async function GET() {
    
    try {
        const privacyPolicy = await PrivacyPolicy.findOne();
        return NextResponse.json({ success: true, privacyPolicy }, { status: 200 });
    } catch (error) {
        console.error("Error fetching company profile:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
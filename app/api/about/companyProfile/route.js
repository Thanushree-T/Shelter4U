import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
const {CompanyProfile} = models;

export async function GET() {
    try {
        const companyProfile = await CompanyProfile.findOne();
        return NextResponse.json({ success: true, companyProfile }, { status: 200 });
    } catch (error) {
        console.error("Error fetching company profile:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
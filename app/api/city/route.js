import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";

const { City } = models;

export async function GET(req) {
    try {
        const cities = await City.find();
        return NextResponse.json(cities);
    } catch (error) {
        console.error("Error fetching cities:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";

const {
  HomeFirstSection,
  HomeSecondSection,
  HomeThirdSection,
  HomeFourthSection,
  HomeFifthSection,
} = models;

export async function GET() {
  try {
    const [
      HomeFirstSectionData,
      HomeSecondSectionData,
      HomeThirdSectionData,
      HomeFourthSectionData,
      HomeFifthSectionData,
    ] = await Promise.all([
      HomeFirstSection.find().lean(),
      HomeSecondSection.find().lean(),
      HomeThirdSection.find().lean(),
      HomeFourthSection.find().lean(),
      HomeFifthSection.find().lean(),
    ]);

    const finalData = {
      HomeFirstSectionData,
      HomeSecondSectionData,
      HomeThirdSectionData,
      HomeFourthSectionData,
      HomeFifthSectionData,
    };

    return NextResponse.json({ success: true, finalData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching home sections:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

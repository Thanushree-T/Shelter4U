import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { models, connectToDBs } from "@/lib/connections.js";

const { Property } = models;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectToDBs();
    const body = await req.json();

    const {
      title,
      description,
      bhkType,
      price,
      size,
      bedrooms,
      bathrooms,
      propertyType,
      address,
      city,
      state,
      area,
      ownerName,
      ownerPhone,
      ownerEmail,
      coverImageBase64,
      galleryImagesBase64 = [],
      // New fields:
      propertySubtype,
      propertyStage,
      furnishingStatus,
      ageOfConstruction,
      societyName,
      floorNo,
      totalFloors,
      landmark,
      pinCode,
      areaType,
      areaUnit,
      priceNegotiable,
      maintenanceCharges,
      maintenanceType,
      ownershipType,
      balconies,
      parkingSpaces,
      liftsOnFloor,
      unitsOnFloor,
      overlookingView = [],
      videoLink,
      amenities = [],
    } = body;

    let images = [];
    
    // Upload Cover Image
    if (coverImageBase64) {
      const uploadRes = await cloudinary.uploader.upload(coverImageBase64, {
        folder: "properties",
      });
      images.push({
        url: uploadRes.secure_url,
        description: "Cover Image",
      });
    }

    // Upload Gallery Images
    if (galleryImagesBase64 && galleryImagesBase64.length > 0) {
      const uploadPromises = galleryImagesBase64.map((imgBase64, idx) =>
        cloudinary.uploader.upload(imgBase64, {
          folder: "properties",
        }).then((res) => ({
          url: res.secure_url,
          description: `Gallery Image ${idx + 1}`,
        }))
      );
      const galleryUploads = await Promise.all(uploadPromises);
      images = [...images, ...galleryUploads];
    }

    // Create property document
    const newProperty = await Property.create({
      title,
      description,
      bhkType,
      price: Number(price),
      size: Number(size),
      bedrooms: Number(bedrooms || 1),
      bathrooms: Number(bathrooms || 1),
      propertyType,
      location: {
        address,
        city: "", // we save names or leave empty since we populate relational fields
        state: "",
      },
      area: area || undefined,
      city: city || undefined,
      state: state || undefined,
      ownerName,
      ownerPhone,
      ownerEmail,
      images,
      approvalStatus: "Pending",
      status: "Available",
      amenities: Array.isArray(amenities) ? amenities : [],
      // New optional fields:
      propertySubtype,
      propertyStage,
      furnishingStatus,
      ageOfConstruction,
      societyName,
      floorNo,
      totalFloors: totalFloors ? Number(totalFloors) : undefined,
      landmark,
      pinCode,
      areaType,
      areaUnit: areaUnit || "Sq-Ft",
      priceNegotiable: priceNegotiable === true || priceNegotiable === "true",
      maintenanceCharges: maintenanceCharges ? Number(maintenanceCharges) : undefined,
      maintenanceType,
      ownershipType,
      balconies: balconies ? Number(balconies) : undefined,
      parkingSpaces: parkingSpaces ? Number(parkingSpaces) : undefined,
      liftsOnFloor: liftsOnFloor ? Number(liftsOnFloor) : undefined,
      unitsOnFloor: unitsOnFloor ? Number(unitsOnFloor) : undefined,
      overlookingView: Array.isArray(overlookingView) ? overlookingView : [],
      videoLink,
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error) {
    console.error("Error submitting property on Next.js side:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

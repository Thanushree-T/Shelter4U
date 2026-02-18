import { NextResponse } from "next/server";
import { models } from "@/lib/connections.js";
import { v2 as cloudinary } from "cloudinary";

const { Career, ApplyJob } = models;

// --- Cloudinary Configuration ---
// This configures the Cloudinary instance with your credentials.
// It will automatically use the environment variables we set up.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};


// This GET request is from your original code, kept for completeness.
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: "Career ID is required" }, { status: 400 });
    }
    const career = await Career.findById(id);
    if (!career) {
      return NextResponse.json({ message: "Career not found" }, { status: 404 });
    }
    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.error("Error fetching career:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


// --- THE NEW POST REQUEST HANDLER ---

/**
 * This is our "middleware-like" helper function.
 * It takes a file buffer and uploads it to Cloudinary.
 * It's wrapped in a Promise to work nicely with async/await.
 * @param {Buffer} buffer The file buffer to upload.
 * @param {string} folder The folder in Cloudinary to upload the file to.
 * @returns {Promise<object>} A promise that resolves with the Cloudinary upload result.
 */
async function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        // You can add more options here, e.g., resource_type: "auto"
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );
    // We write the buffer to the stream to upload it
    uploadStream.end(buffer);
  });
}

export async function POST(req) {
  try {
    // 1. Parse the multipart form data
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const about = formData.get("about");
    const job = formData.get("job"); // This is the job ID
    const resumeFile = formData.get("resume"); // This is the File object

    // 2. Validate required fields
    if (!name || !email || !mobile || !job || !resumeFile) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, mobile, job, resume)" },
        { status: 400 }
      );
    }
    
    // 3. Handle the file upload using our helper function
    // Convert the resume file to a buffer
    const resumeBytes = await resumeFile.arrayBuffer();
    const resumeBuffer = Buffer.from(resumeBytes);

    // Call our "middleware" to upload to Cloudinary
    // We'll store resumes in a "job_applications/resumes" folder on Cloudinary
    const uploadResult = await uploadToCloudinary(resumeBuffer, "job_applications/resumes");
    
    // The secure_url is the public URL of the uploaded file on Cloudinary
    const resumeUrl = uploadResult.secure_url;
    
    if (!resumeUrl) {
        throw new Error("Cloudinary upload failed, URL not returned.");
    }

    // 4. Create the application in the database with the Cloudinary URL
    const applicationData = {
      name,
      email,
      mobile,
      about,
      job, // Assumes 'job' is the ObjectId of the Career
      resume: resumeUrl, // Save the Cloudinary URL to the 'resume' field
    };

    const application = await ApplyJob.create(applicationData);

    // Populate the 'job' field to return the full job details
    await application.populate("job");

    // 5. Send a success response
    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in createApplication:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}






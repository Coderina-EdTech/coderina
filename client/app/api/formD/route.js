import { NextResponse } from "next/server";
import FormData from "../../models/formsDatas";
import { ObjectId } from "mongodb";

import connectDB from "../../lib/dbConnect";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Retrieve all blog posts
    const forms = await FormData.find({});

    // Return the response with the blogs and their total count
    return NextResponse.json(
      { success: true, data: forms, totalBlogs: forms.length },
      { status: 200 }
    );
  } catch (error) {
    console.log("Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

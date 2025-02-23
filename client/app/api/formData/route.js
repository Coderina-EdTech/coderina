import connectDB from "../../lib/dbConnect";
import FormData from "../../models/formsDatas";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// POST Route: Add data

// Valid Sections
const validSections = ["FLL", "COUCH", "ACC", "ACW"];

// POST Route: Add data
export async function POST(req) {
  try {
    // Ensure the database connection is established
    await connectDB();

    const { section, ...data } = await req.json();
    console.log("Section:", section);
    console.log("Data:", data);

    // Validate the section
    if (!validSections.includes(section)) {
      return NextResponse.json(
        { success: false, message: "Invalid section provided." },
        { status: 400 }
      );
    }

    // Ensure the section data exists
    if (!data[section]) {
      return NextResponse.json(
        { success: false, message: `No data found for section: ${section}` },
        { status: 400 }
      );
    }

    // Prepare registration data
    const formData = { section, ...data };

    // Save registration data to MongoDB
    const form = new FormData(formData);
    await form.save();

    return NextResponse.json(
      { success: true, message: "Form data saved successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.log("Form Error:", error);
    return NextResponse.json(
      { success: false, message: "Error saving form data." },
      { status: 500 }
    );
  }
}

// GET Route: Retrieve data

export async function GET(req) {
  try {
    // Extract the section from the request query
    const url = new URL(req.url);
    const section = url.searchParams.get("section");

    // Ensure the section is valid
    if (!section || !["FLL", "COUCH", "ACC", "ACW"].includes(section)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing section parameter" },
        { status: 400 }
      );
    }
    await dbConnect();
    const form = await FormData.find({ section }).lean();

    if (!form || form.length === 0) {
      return NextResponse.json(
        { success: false, message: `No data found for section: ${section}` },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: form }, { status: 200 });
  } catch (error) {
    console.log("Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE Route: Delete data by ID

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const result = await FormData.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "message not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "message deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

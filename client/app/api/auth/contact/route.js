import ContactUs from "../../../models/contactModal";
import dbConnect from "../../../lib/dbConnect"; // Utility for DB connection
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    const { name, email, subject, message, reason, otherReason} =
      await req.json();

    // Prepare registration data
    const formData = {
      name,
      email,
      subject,
      message,
      reason,
      otherReason: reason === "Other" ? otherReason : null,
    };

    // Save registration data to MongoDB
    const contact = new ContactUs(formData);
    await contact.save();
    console.log("message successful");

    return NextResponse.json(
      { success: true, message: "mesage sent successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("message Error:", error);
    return NextResponse.json(
      { message: "Error saving message", error: error.message },
      { status: 500 } // Changed to 500 for server errors
    );
  }
}

// get

export async function GET() {
  try {
    await dbConnect();
    const contact = await ContactUs.find({});
    return NextResponse.json({ success: true, data: contact }, { status: 200 });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// delete

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

    const result = await ContactUs.deleteOne({ _id: new ObjectId(id) });

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

import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnect";
import users from "../../../models/user"; // The provided user model
import sharp from "sharp";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
connectDB(); // Ensure database connection

// Fetch user by ID

export async function GET(req, { params }) {
  console.log("Params:", params);
  try {
    const { id } = await params;

    const user = await users.findById(id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log(user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching user: ${error.message}` },
      { status: 500 }
    );
  }
}

// // Update user profile by ID
export async function PATCH(req, { params }) {
  console.log("Params received:", params);

  try {
    const id = await params?.id;
    console.log("Extracted ID:", id);
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    console.log("Processing update for user:", id);

    const formData = await req.formData();

    const updates = {};
    ["username", "email", "address", "phone"].forEach((field) => {
      const value = formData.get(field);
      if (value) updates[field] = value;
    });

    // Ensure the "public/uploads" directory exists
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const profilePicture = formData.get("profilePicture");
    if (profilePicture && profilePicture.name) {
      const buffer = Buffer.from(await profilePicture.arrayBuffer());
      const optimizedImage = await sharp(buffer)
        .resize(150, 150)
        .jpeg({ quality: 80 })
        .toBuffer();

      // ✅ Save inside "public/uploads"
      const imagePath = path.join(uploadsDir, `${id}-profile.jpg`);
      fs.writeFileSync(imagePath, optimizedImage);

      // ✅ Store correct path for next/image
      updates.profilePicture = `/uploads/${id}-profile.jpg`;
    }

    const user = await users.findByIdAndUpdate(id, updates, { new: true });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User updated successfully:", user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error updating user:", error);
    return NextResponse.json(
      { error: `Error updating user: ${error.message}` },
      { status: 500 }
    );
  }
}

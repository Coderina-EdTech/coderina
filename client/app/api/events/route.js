import { NextResponse } from "next/server";
import connectDB from "../../lib/dbConnect";
import Events from "../../models/events";

// GET method - Retrieve events
export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const event = await Events.findById(id);
      if (!event) {
        return NextResponse.json(
          { success: false, message: "Event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: event }, { status: 200 });
    }

    const events = await Events.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: events }, { status: 200 });
  } catch (error) {
    console.log("Error fetching events:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

// POST method - Add a new event
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { color, startDate, endDate, title, startTime, endTime, location } =
      body;
    if (!color || !startDate || !title || !startTime || !endTime || !location) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const newEvent = new Events({
      color,
      startDate,
      endDate: endDate || null, // Assign null if endDate is not provided
      title,
      startTime,
      endTime,
      location,
    });
    await newEvent.save();

    return NextResponse.json(
      { success: true, message: "Event created successfully.", data: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

// DELETE method - Remove an event
export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Event ID is required." },
        { status: 400 }
      );
    }

    const deletedEvent = await Events.findByIdAndDelete(id);
    if (!deletedEvent) {
      return NextResponse.json(
        { success: false, message: "Event not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Event deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

// PATCH method - Update an event
export async function PATCH(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const updates = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Event ID is required." },
        { status: 400 }
      );
    }

    const updatedEvent = await Events.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return NextResponse.json(
        { success: false, message: "Event not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Event updated successfully.",
        data: updatedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

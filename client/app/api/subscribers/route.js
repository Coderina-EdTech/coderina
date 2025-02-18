import { MongoClient, ObjectId } from "mongodb";
import sendEmail from "../../utils/sendEmail";
// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

const connectToDatabase = async () => {
  const client = await MongoClient.connect(MONGODB_URI);
  return client.db(MONGODB_DB);
};

// Named export for handling POST requests
export async function POST(req) {
  const db = await connectToDatabase();
  const collection = db.collection("subscribers");

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
      });
    }

    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      return new Response(
        JSON.stringify({ error: "Email already subscribed." }),
        { status: 400 }
      );
    }

    // Add the new email
    await collection.insertOne({ email, subscribedAt: new Date() });

    // Send welcome email
    const subject = "Welcome to Coderina Newsletter!";
    const message = `Hello ${email},\n\nThank you for subscribing to the Coderina's Newsletter! We're thrilled to have you on board.\n\nAt Coderina Education and Technology Foundation, we are committed to empowering students and educators by providing access to cutting-edge STEM education, technology skills, and innovative learning opportunities. Our mission is to inspire the next generation of tech leaders and problem-solvers through programs, workshops, and collaborative initiatives designed to bridge the digital divide.\n\nAs a subscriber, you will receive the latest updates on our projects, upcoming events, workshops, and new educational resources. Stay tuned for exciting content that will help you stay ahead in the ever-evolving world of technology.\n\nBest regards,\nThe Coderina Team`;

    const emailResponse = await sendEmail([email], subject, message);

    if (!emailResponse.success) {
      console.error("Failed to send email:", emailResponse.message);
      return new Response(
        JSON.stringify({
          message: "Subscriber added, but email could not be sent.",
        }),
        { status: 201 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Successfully subscribed!" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("subscribers");

    // Fetch all subscribers
    const subscribers = await collection.find({}).toArray();
    if (subscribers) {
      // Sort comments by `createdAt` in ascending order
      subscribers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return new Response(JSON.stringify({ success: true, subscribers }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing subscriber ID" }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection("subscribers");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Subscriber not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Subscriber deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

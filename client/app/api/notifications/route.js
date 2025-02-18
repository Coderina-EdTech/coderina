import { NextResponse } from "next/server";

// Define the fetchData helper function
const fetchData = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`
      );
    }

    // Convert the body to JSON and log it
    const data = await res.json();
    //console.log(`Fetched data from ${url}:`, data);
    // Log the response body
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

export async function GET() {
  try {
    const [subscribers] = await Promise.all([
      fetchData(`${process.env.API_BASE_URL}/api/subscribers`),
    ]);

    // Calculate the notification count

    // Optionally, you can still return the notifications
    const notifications = [
      ...(Array.isArray(subscribers) && subscribers.length > 0
        ? subscribers.map((item) => `New subscriber: ${item.email}`)
        : []),
    ];

    console.log("Notifications:", notifications);

    return NextResponse.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Error fetching notifications",
    });
  }
}

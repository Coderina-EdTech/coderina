import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Check if the model is already compiled to avoid recompiling errors during hot-reloading
const Events = mongoose.models.Events || mongoose.model("Events", EventsSchema);

export default Events;

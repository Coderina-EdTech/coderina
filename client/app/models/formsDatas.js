import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema for each section
const FormDataSchema = new Schema({
  section: {
    type: String,
    enum: ["FLL", "COUCH", "ACC", "ACW"],
    required: true,
  },

  FLL: {
    category: {
      type: String,
      enum: [
        "FIRST® LEGO® League Discover",
        "FIRST® LEGO® League Explore",
        "FIRST® LEGO® League Challenge",
        "FIRST® Tech Challenge",
      ],
      required: false,
      default: "FIRST® LEGO® League Discover",
    },
    coaches: [
      {
        name: { type: String, required: false },
        surname: { type: String, required: false },
        gender: {
          type: String,
          enum: ["Male", "Female"],
          required: false,
          default: "Male",
        },
        email: { type: String, required: false },
        phone: { type: String, required: false },
      },
    ],
    students: [
      {
        name: { type: String, required: false },
        surname: { type: String, required: false },
        gender: {
          type: String,
          enum: ["Male", "Female"],
          required: false,
          default: "Male",
        },
        email: { type: String, required: false },
        phone: { type: String, required: false },
      },
    ],
    institutionName: { type: String, required: false },
    teamName: { type: String, required: false },
    termsAccepted: { type: Boolean, required: false },
    makeEnquiry: { type: String, required: false },
  },
  COUCH: {
    coaches: [
      {
        name: { type: String, required: false },
        surname: { type: String, required: false },
        gender: {
          type: String,
          enum: ["Male", "Female"],
          required: false,
          default: "Male",
        },
        email: { type: String, required: false },
        phone: { type: String, required: false },
      },
    ],
    students: [
      {
        name: { type: String, required: false },
        surname: { type: String, required: false },
        gender: {
          type: String,
          enum: ["Male", "Female"],
          required: false,
          default: "Male",
        },
        level: {
          type: Number,
          enum: [100, 200, 300, 400, 500],
          required: false,
        },
        email: { type: String, required: false },
        phone: { type: String, required: false },
      },
    ],
    institutionName: { type: String, required: false },
    teamName: { type: String, required: false },
    termsAccepted: { type: Boolean, required: false },
  },
  ACC: {
    coaches: [
      {
        name: { type: String, required: false },
        surname: { type: String, required: false },
        gender: {
          type: String,
          enum: ["Male", "Female"],
          required: false,
          default: "Male",
        },
        email: { type: String, required: false },
        phone: { type: String, required: false },
      },
    ],
    students: [
      {
        name: { type: String, required: false },
        surname: { type: String, required: false },
        gender: {
          type: String,
          enum: ["Male", "Female"],
          required: false,
          default: "Male",
        },
        email: { type: String, required: false },
        phone: { type: String, required: false },
      },
    ],
    institutionName: { type: String, required: false },
    teamName: { type: String, required: false },
    termsAccepted: { type: Boolean, require: false },
  },
  ACW: {
    coaches: [
      {
        name: { type: String, required: false },
        surname: { type: String, required: false },
        gender: {
          type: String,
          enum: ["Male", "Female"],
          required: false,
          default: "Male",
        },
        email: { type: String, required: false },
        phone: { type: String, required: false },
      },
    ],
    students: [
      {
        name: { type: String, required: false },
        surname: { type: String, required: false },
        gender: {
          type: String,
          enum: ["Male", "Female"],
          required: false,
          default: "Male",
        },
        email: { type: String, required: false },
        phone: { type: String, required: false },
      },
    ],
    institutionName: { type: String, required: false },
    teamName: { type: String, required: false },
    termsAccepted: { type: Boolean, required: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model re-compilation in development
const FormData = models.FormData || model("FormData", FormDataSchema);

export default FormData;

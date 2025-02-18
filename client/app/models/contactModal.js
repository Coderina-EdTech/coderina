// models/contactUsModel.js
import mongoose from "mongoose";
const validator = require("validator");

// Define the schema for the Contact Us form
const contactUsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Trim leading and trailing spaces
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regex for email format
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
     
      maxlength: 1000, // Maximum message length
    },


    reason: {
      type: String,
      enum: ["Sponsorship", "Volunteer", "Other"],
     
    },
    otherReason: {
      type: String,
      trim: true,
      default: null, // Only populated if "Other" is selected
    },


   

    
   
  },
  {
    timestamps: true, // This will add createdAt and updatedAt automatically
  }
);

// Create the model from the schema
const ContactUs =
  mongoose.models.ContactUs || mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;

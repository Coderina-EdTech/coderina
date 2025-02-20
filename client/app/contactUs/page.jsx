"use client";

import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import Footer from "../Home/Footer";

const Page = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",

    reason: "", // Default reason
    otherReason: "", // To handle "Other" input
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleValidation = (values) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!values.name) errors.firstName = "First name is required";

    if (!values.email || !emailPattern.test(formValues.email))
      errors.email = "Valid email is required";
    if (!values.subject) errors.school = "Subject is required";

    if (!values.message) errors.address = "message is required";

    // Additional validation for "Other" reason
    if (values.reason === "Other" && !values.otherReason) {
      errors.otherReason = "Please specify your reason";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name]; // Clear the error for the current field
      return updatedErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = handleValidation(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    toast.dismiss();

    const payload = {
      name: formValues.name,
      message: formValues.message,
      subject: formValues.subject,
      email: formValues.email,

      reason: formValues.reason || null,
      otherReason:
        formValues.reason === "Other" ? formValues.otherReason : null,
    };

    try {
      const res = await fetch("/api/auth/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Check if the response is OK (status 200-299)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Try to parse the response as JSON
      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        // Handle the case where the response is not valid JSON
        const textResponse = await res.text(); // Get the raw response as text
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }

      console.log("Backend Response:", data);
      setLoading(false);

      if (data.success) {
        toast.success("Form submitted successfully!");
        setFormValues({
          name: "",
          email: "",
          subject: "",
          message: "",
          reason: "",

          otherReason: "",
        });
        setFormErrors({});
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full font-Geist px-2 md:px-4 lg:px-20 py-10 bg-white">
        <Toaster />
        <div className="max-w-[100rem] mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h4 className="font-bold text-xl lg:text-2xl">Contact Us</h4>
            <p className="text-base">Fill the form to send us a message</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#FDEFD9] md:max-w-full  p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <label className="block mb-1"> Name</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 rounded-lg outline-none ${formErrors.name
                    ? "border-red-500 text-red-500 text-[12px]"
                    : ""
                    }`}
                  placeholder="Enter your  name"
                />
                <p className="text-sm text-red-600 pl-1 font-medium">
                  {formErrors.name}
                </p>
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 rounded-lg outline-none ${formErrors.email ? "border-red-500" : ""
                    }`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formValues.subject}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 rounded-lg outline-none ${formErrors.subject ? "border-red-500" : ""
                    }`}
                  placeholder="Enter your subject"
                />
                <p className="text-sm text-red-600 pl-1 font-medium">
                  {formErrors.subject}
                </p>
              </div>

              {/* Radio Buttons for Reason */}
              <div>
                <label className="block mb-1">How do you want to partner with us?</label>
                <div className="flex flex-col md:flex-row gap-4">
                  {["Sponsorship", "Volunteer", "Other"].map((reason) => (
                    <label key={reason} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={formValues.reason === reason}
                        onChange={handleChange}
                      />
                      {reason}
                    </label>
                  ))}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="reason"
                      value=""
                      checked={formValues.reason === ""}
                      onChange={handleChange}
                    />
                    None
                  </label>
                </div>
              </div>

              {/* Conditional Other Reason Input */}
              {formValues.reason === "Other" && (
                <div>
                  <input
                    type="text"
                    name="otherReason"
                    placeholder="Specify other reason"
                    value={formValues.otherReason}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg outline-none"
                  />
                  {formErrors.otherReason && (
                    <p className="text-sm text-red-600">
                      {formErrors.otherReason}
                    </p>
                  )}
                </div>
              )}

              {/* Radio Buttons for space */}
              {/* <div className="space-y-2 py-2">
                <label className="block mb-1">What kind of space do you want?</label>
                <div className="grid grid-cols-2 md:grid-col-3 text-[14px]  gap-2">
                  {[
                    "Co-office space",
                    "Co-working space",
                    "Serviced Office",
                    "Office Rental",
                    "Meeting Venue",
                    "Seminar",
                    "Workshop",
                  ].map((spaceType) => (
                    <label key={spaceType} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="spaceType"
                        value={spaceType}
                        checked={formValues.spaceType === spaceType}
                        onChange={handleChange}
                      />
                      {spaceType}
                    </label>
                  ))}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="spaceType"
                      value=""
                      checked={formValues.spaceType === ""}
                      onChange={handleChange}
                    />
                    None
                  </label>
                </div>
              </div> */}
              <div>
                <label className="block mb-1">Message</label>
                <textarea
                  type="text"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  cols={10}
                  className={`w-full p-2 rounded-lg outline-none ${formErrors.message ? "border-red-500" : ""
                    }`}
                  placeholder="Enter your Message"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white rounded-3xl py-2 cursor-pointer px-4 text-[16px] hover:text-black hover:bg-white"
              >
                {loading ? (
                  <svg
                    className="w-6 h-6 mx-auto animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path d="M4 12h2a8 8 0 0 1 8 8v2" />
                  </svg>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-[#1a1a1a]">
        <div className="max-w-[100rem] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Home/Footer";
import Modal from "./components/Modal";

const RegistrationForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    section: "FLL",

    FLL: {
      category: "",
      coaches: [{ name: "", surname: "", gender: "", email: "", phone: "" }],
      students: [{ name: "", surname: "", gender: "", email: "", phone: "" }],
      institutionName: "",
      teamName: "",
      termsAccepted: false,
    },
    COUCH: {
      coaches: [{ name: "", surname: "", gender: "", email: "", phone: "" }],
      students: [
        { name: "", surname: "", gender: "", level: "", email: "", phone: "" },
      ],
      institutionName: "",
      teamName: "",
      termsAccepted: false,
    },
    ACC: {
      coaches: [{ name: "", surname: "", gender: "", email: "", phone: "" }],
      students: [{ name: "", surname: "", gender: "", email: "", phone: "" }],
      institutionName: "",
      teamName: "",
      termsAccepted: false,
    },
    ACW: {
      coaches: [{ name: "", surname: "", gender: "", email: "", phone: "" }],
      students: [{ name: "", surname: "", gender: "", email: "", phone: "" }],
      institutionName: "",
      teamName: "",
      termsAccepted: false,
    },
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleSectionChange = (newSection) => {
    setFormData((prevData) => ({
      ...prevData,
      section: newSection,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      const keys = name.split(/\.|\[|\]/).filter(Boolean);
      let newData = { ...prevData };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) {
          current[key] = isNaN(keys[i + 1]) ? {} : [];
        }
        current = current[key];
      }

      const lastKey = keys[keys.length - 1];
      current[lastKey] = type === "checkbox" ? checked : value;

      return newData;
    });
  };

  const validateForm = () => {
    const section = formData.section;
    const activeData = formData[section];

    // Ensure coaches and students are always initialized
    const coaches = activeData?.coaches || [];
    const students = activeData?.students || [];

    // Specific checks for sections that require institution and team name
    if (["FLL", "COUCH", "ACC", "ACW"].includes(section)) {
      // Clear previous modal message to avoid undefined showing
      setModalMessage("");

      if (!activeData.institutionName || !activeData.teamName) {
        setModalMessage("Institution and team name are required.");
        setIsModalOpen(true);
        console.log(
          "Validation failed: Institution and team name are required."
        );
        return; //{ isValid: false };
      }
    }

    // Specific checks for students
    if (["FLL", "COUCH", "ACC", "ACW"].includes(section)) {
      if (students.length < 5) {
        setModalMessage("At least 5 students are required.");
        setIsModalOpen(true);
        console.log("At least 5 students are required..");
        return; //{ isValid: false };
      }
    }

    if (["FLL", "COUCH", "ACC", "ACW"].includes(section)) {
      if (!activeData.termsAccepted) {
        setModalMessage("Please accept the terms and conditions.");
        setIsModalOpen(true);
        console.log("Please accept the terms and conditions.");
        return; //{ isValid: false };
      }
    }

    // Validate coaches' gender (default to 'Male' if missing)
    coaches.forEach((coach, index) => {
      if (!coach.gender) {
        coaches[index].gender = "Male"; // Set to Male if empty
      }
    });

    // Validate students' gender (default to 'Male' if missing)
    students.forEach((student, index) => {
      if (!student.gender) {
        students[index].gender = "Male"; // Set to Male if empty
      }
    });

    // Ensure category is set (default to "FIRST® LEGO® League Discover")
    if (!activeData.category) {
      activeData.category = "FIRST® LEGO® League Discover"; // Set default category if empty
    }

    // Update form data with modified activeData
    setFormData((prev) => ({
      ...prev,
      [section]: activeData,
    }));

    return { isValid: true };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const section = formData.section; // Current active section
    const activeData = formData[section];
    console.log("Submitting section:", formData.section);
    console.log("Form Data before submit:", formData);
    console.log("Active Section:", section);
    console.log("Active Data:", activeData);

    // Validate form before submitting
    const validationResult = validateForm();
    if (!validationResult.isValid) {
      alert(validationResult.message); // Show user-friendly error
      setLoading(false);
      return;
    }

    try {
      // Prepare the payload
      const payload = {
        section,
        [section]: activeData,
      };

      console.log("Submitting Payload:", payload);

      // Submit form data to the API
      const response = await fetch("/api/formData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Send data as JSON
      });

      console.log("Response Status:", response.status);

      // Check if the response is OK
      if (!response.ok) {
        const errorData = await response.json(); // Get the error message
        console.log("Backend error response:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorData.message}`
        );
      }

      // Parse JSON response
      const data = await response.json();
      console.log("Backend Response Data:", data);

      if (data.success) {
        // Success feedback and reset
        toast.success(`${section} submitted successfully!`);
        setFormData({
          section: "FLL",

          FLL: {
            category: "",
            coaches: [
              { name: "", surname: "", gender: "", email: "", phone: "" },
            ],
            students: [
              { name: "", surname: "", gender: "", email: "", phone: "" },
            ],
            institutionName: "",
            teamName: "",
            termsAccepted: false,
          },
          COUCH: {
            coaches: [
              { name: "", surname: "", gender: "", email: "", phone: "" },
            ],
            students: [
              {
                name: "",
                surname: "",
                gender: "",
                level: "",
                email: "",
                phone: "",
              },
            ],
            institutionName: "",
            teamName: "",
            termsAccepted: false,
          },
          ACC: {
            coaches: [
              { name: "", surname: "", gender: "", email: "", phone: "" },
            ],
            students: [
              { name: "", surname: "", gender: "", email: "", phone: "" },
            ],
            institutionName: "",
            teamName: "",
            termsAccepted: false,
          },
          ACW: {
            coaches: [
              { name: "", surname: "", gender: "", email: "", phone: "" },
            ],
            students: [
              { name: "", surname: "", gender: "", email: "", phone: "" },
            ],
            institutionName: "",
            teamName: "",
            termsAccepted: false,
          },
        });
        setFormErrors({});
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error(`Failed to submit ${section}. Please try again.`);
    } finally {
      setLoading(false); // Ensure the loading state is reset
    }
  };

  const addCoach = () => {
    const section = formData.section;
    const sectionData = formData[section];
    if (sectionData.coaches.length < 2) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          coaches: [
            ...prevData[section].coaches,
            { name: "", surname: "", email: "", gender: "", phone: "" },
          ],
        },
      }));
    } else {
      alert("You can only add up to 2 coaches.");
    }
  };

  const addEntry = (key) => {
    const section = formData.section;
    const newEntry = {
      name: "",
      surname: "",
      email: "",
      gender: "",
      phone: "",
      ...(key === "students" && { level: "" }),
    };

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: [...prevData[section][key], newEntry],
      },
    }));
  };

  const addTeamMember = () => {
    const section = formData.section;
    const newStudent = {
      name: "",
      surname: "",
      email: "",
      gender: "",
      phone: "",
      level: "",
    };

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        students: [...prevData[section].students, newStudent],
      },
    }));
  };

  const sectionNames = {
    FLL: "FIRST ROBOTICS",
    COUCH: "CODERINA UNIVERSITY CHALLENGE (COUCH)",
    ACC: "AFRICAN CODE CHALLENGE (ACC)",
    ACW: "AFRICA CODE WEEK (ACW)",
  };

  return (
    <div className="w-full bg-white">
      <Toaster />

      <div className="md:px-4 lg:px-20 py-4">
        <div className="max-w-[100rem] mx-auto flex flex-col items-start justify-start px-2 md:px-16 py-8 md:py-10 lg:py-16 w-full shadow-md  bg-white">
          <div className="w-full pt-5 md:pt-1 text-[28px] lg:text-3xl font-bold md:font-semibold pb-6 lg:pb-8 border-b-[1px] border-slate-300">
            <h1 className="text-green-800 text-[20px] md:text-xl md:leading-8 lg:leading-10">
              {sectionNames[formData.section] || "Select a Section"}
            </h1>
          </div>

          {/* form */}

          <form
            onSubmit={handleFormSubmit}
            action="for"
            method="POST"
            className="w-full md:w-3/4"
          >
            <div className="flex flex-row items-center justify-normal space-x-4 md:space-x-6 py-8">
              {["FLL", "COUCH", "ACC", "ACW"].map((section) => (
                <label key={section} className="space-x-2 ">
                  <input
                    type="radio"
                    name="section"
                    value={section}
                    checked={formData.section === section}
                    onChange={(e) => handleSectionChange(e.target.value)}
                    id={section}
                    className="peer rounded-3xl border-red-900 accent-red-800 p-1"
                  />
                  <label
                    className="ml-2  peer-checked:text-red-900 font-medium text-green-900 text-[16px]"
                    htmlFor={section}
                  >
                    {section}
                  </label>
                </label>
              ))}
            </div>

            {/* FLL Section */}
            {formData.section === "FLL" && (
              <div>
                <p className="text-red-800 text-[13px] md:text-sm">
                  (At least one coach and five team members are required to fill
                  this form)
                </p>

                <div className="pt-6 space-y-2">
                  <label htmlFor="">Team name*</label>
                  <input
                    type="text"
                    name="FLL.teamName"
                    value={formData.FLL.teamName}
                    onChange={handleChange}
                    placeholder="Team Name"
                    className="w-full px-2 py-1 border-[1px] border-slate-300 outline-none"
                  />

                  {/* <p className="text-sm text-red-600 pl-1 font-medium">
                {formErrors.team}
              </p> */}
                </div>

                <div className="pt-6 space-y-2">
                  <label htmlFor="">Name of Insistution*</label>
                  <input
                    type="text"
                    name="FLL.institutionName"
                    value={formData.FLL.institutionName}
                    onChange={handleChange}
                    placeholder="Institution Name"
                    className="w-full px-2 py-1 border-[1px] border-slate-300 outline-none"
                  />

                  {/* <p className="text-sm text-red-600 pl-1 font-medium">
                {formErrors.team}
              </p> */}
                </div>

                {/* Category Selection */}
                <div className="mt-8">
                  <h2 className="text-[16px]  font-medium mb-2 text-gray-700">
                    Which category in FLL are you registering for?
                  </h2>
                  <div className="flex flex-col  items-start justify-start md:space-y-2 ">
                    {[
                      "FIRST® LEGO® League Discover",
                      "FIRST® LEGO® League Explore",
                      "FIRST® LEGO® League Challenge",
                      "FIRST® Tech Challenge",
                    ].map((category) => (
                      <label
                        key={category}
                        className="space-x-2 flex  items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="FLL.category"
                          value={category}
                          checked={formData.FLL.category === category}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              FLL: { ...prev.FLL, category: e.target.value },
                            }))
                          }
                          id={category}
                          className="peer rounded-3xl border-red-900 accent-red-800 p-1"
                        />
                        <span
                          className="ml-2 peer-checked:text-red-900 font-medium text-green-900 text-[14px]"
                          htmlFor={category}
                        >
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* names and the rest */}

                <div className="w-full">
                  <div className="py-14 lg:py-16 space-y-6">
                    <div className="space-y-6">
                      {formData.FLL.coaches.map((coach, index) => (
                        <div className="space-y-4" key={index}>
                          <h2 className="text-xl font-medium">
                            {index === 0 ? "First Coach" : "Second Coach"}
                          </h2>
                          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between gap-3">
                            <div className="space-y-3">
                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">First name*</label>
                                <input
                                  type="text"
                                  name={`FLL.coaches[${index}].name`}
                                  value={coach.name}
                                  onChange={handleChange}
                                  placeholder="Name"
                                  required={index === 0} // First FLL is required
                                  className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">Last name*</label>
                                <input
                                  name={`FLL.coaches[${index}].surname`}
                                  value={coach.surname}
                                  onChange={handleChange}
                                  type="text"
                                  className="w-[20rem] text-[14px] md:w-80 pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                                  required={index === 0} // First coach is required
                                />
                              </div>
                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">Email*</label>
                                <input
                                  type="email"
                                  name={`FLL.coaches[${index}].email`}
                                  value={coach.email}
                                  onChange={handleChange}
                                  placeholder="only university/college emails accepted"
                                  className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                                  required={index === 0} // First coach is required
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">Phone*</label>
                                <input
                                  type="text"
                                  name={`FLL.coaches[${index}].phone`}
                                  value={coach.phone}
                                  onChange={handleChange}
                                  placeholder="+234"
                                  className="pl-2 border-[1px] border-slate-300 rounded-md w-[20rem] md:w-80 text-[14px] py-1 placeholder:text-sm placeholder:pl-4 outline-none"
                                  required={index === 0} // First coach is required
                                />
                              </div>
                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor={`gender-${index}`}>
                                  Gender*
                                </label>
                                <select
                                  name={`FLL.coaches[${index}].gender`}
                                  value={coach.gender}
                                  onChange={handleChange}
                                  required={index === 0} // First coach is required
                                  className="pl-2 border-[1px] border-slate-300 rounded-md w-[20rem] md:w-80 text-[14px] py-[6px] placeholder:text-sm placeholder:pl-4 outline-none"
                                >
                                  <option
                                    className="hover:bg-green-500 hover:text-white"
                                    value="Male"
                                  >
                                    Male
                                  </option>
                                  <option
                                    className="hover:bg-green-500 hover:text-white"
                                    value="Female"
                                  >
                                    Female
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Coach Button */}
                    {formData.FLL.coaches.length < 2 && (
                      <div
                        onClick={addCoach}
                        className="relative w-32 bg-green-800 cursor-pointer text-white  transition-all ease-in-out duration-700 rounded-2xl py-2 px-3 text-[14px] md:text-[16px] flex font-medium group overflow-hidden"
                      >
                        {/* Default Text */}
                        <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                          Add Coach
                        </span>

                        {/* Hover Text */}
                        <span className="absolute inset-0 flex items-center justify-center  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                          Add
                        </span>
                      </div>
                    )}
                  </div>

                  {/* students */}
                  <div className="space-y-4">
                    {formData.FLL.students
                      .slice(0, 10)
                      .map((student, index) => (
                        <div className="py-8 lg:py-8 space-y-4" key={index}>
                          <h2 className="text-xl font-medium">
                            Team Member {index + 1}
                          </h2>

                          <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between gap-3">
                            <div className="space-y-3 ">
                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">First name*</label>
                                <input
                                  type="text"
                                  className="w-[20rem] md:w-80 text-[14px] pl-2 border-[1px] border-slate-300 rounded-md  py-1 outline-none"
                                  name={`FLL.students[${index}].name`}
                                  value={student.name}
                                  onChange={handleChange}
                                />
                                {/* <p className="text-sm text-red-600 pl-1 font-medium">
                            {formErrors.captainFirstName}
                          </p> */}
                              </div>

                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">Last name*</label>
                                <input
                                  name={`FLL.students[${index}].surname`}
                                  value={student.surname}
                                  onChange={handleChange}
                                  type="text"
                                  className="w-[20rem] text-[14px] md:w-80   pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                                />
                                {/* <p className="text-sm text-red-600 pl-1 font-medium">
                            {formErrors.captainLastName}
                          </p> */}
                              </div>

                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">Gender*</label>
                                <select
                                  name={`FLL.students[${index}].gender`}
                                  value={student.gender}
                                  onChange={handleChange}
                                  required={index === 0} // First coach is required
                                  className="pl-2 border-[1px] border-slate-300 rounded-md w-[20rem] md:w-80 text-[14px] py-[6px] placeholder:text-sm placeholder:pl-4 outline-none"
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">Email*</label>
                                <input
                                  type="Email"
                                  name={`FLL.students[${index}].email`}
                                  value={student.email}
                                  onChange={handleChange}
                                  placeholder="only university/college emails accepted"
                                  className="w-[20rem] text-[14px] md:w-80 outline-none   pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                                />
                                {/* <p className="text-sm text-red-600 pl-1 font-medium">
                            {formErrors.captainEmail}
                          </p> */}
                              </div>

                              <div className="flex flex-col items-start justify-start space-y-1">
                                <label htmlFor="">Phone*</label>
                                <input
                                  type="Phone"
                                  name={`FLL.students[${index}].phone`}
                                  value={student.phone}
                                  onChange={handleChange}
                                  placeholder="+234"
                                  className="w-[20rem] text-[14px] md:w-80 outline-none   pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                                />
                                {/* <p className="text-sm text-red-600 pl-1 font-medium">
                            {formErrors.captainEmail}
                          </p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* Add More Button */}
                    {formData.FLL.students.length <= 10 && (
                      <div
                        onClick={addTeamMember}
                        className="relative px-3 w-32 bg-green-800 cursor-pointer text-white  transition-all ease-in-out duration-700 rounded-2xl py-2 text-[14px] md:text-[16px] flex font-medium group overflow-hidden"
                      >
                        {/* Default Text */}
                        <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                          Add Member
                        </span>

                        {/* Hover Text */}
                        <span className="absolute inset-0 flex items-center justify-center  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                          Add
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* terms and conditions */}
                <div className="space-y-3 text-[14px] items-start mt-8">
                  <p className="text-[14px] md:text-[17px]">
                    FLL will use, process and store your personal data at all
                    times in compliance with our Privacy Policy.
                  </p>
                  <div className="flex items-center justify-start">
                    <input
                      type="checkbox"
                      name="FLL.termsAccepted"
                      checked={formData.FLL.termsAccepted}
                      onChange={handleChange}
                      className="w-6"
                    />
                    <p className="text-[11px] md:text-[14px] pl-2">
                      Yes, I accept the FLL Terms and Conditions.
                    </p>
                  </div>
                  {/* {formErrors.checkbox && (
                <p className="text-sm text-red-600 font-medium">
                  {formErrors.checkbox}
                </p>
              )} */}
                </div>
              </div>
            )}

            {/* //COUCH Section */}

            {formData.section === "COUCH" && (
              <div>
                <p className="text-red-800 text-sm">
                  (At least one coach and five team members are required to fill
                  this form)
                </p>
                <div className="pt-6 space-y-2">
                  <label htmlFor="">Team name*</label>
                  <input
                    type="text"
                    name="COUCH.teamName"
                    value={formData.COUCH.teamName}
                    onChange={handleChange}
                    placeholder="Team Name"
                    className="w-full md:px-2 py-1 border-[1px] border-slate-300 outline-none"
                  />
                </div>

                <div className="pt-6 space-y-2">
                  <label htmlFor="">Name of Institution*</label>
                  <input
                    type="text"
                    name="COUCH.institutionName"
                    value={formData.COUCH.institutionName}
                    onChange={handleChange}
                    placeholder="Institution Name"
                    className="w-full md:px-2 py-1 border-[1px] border-slate-300 outline-none"
                  />
                </div>

                {/*  Coach */}
                {/* Coach Section */}
                <div className="py-10 lg:py-12 space-y-6">
                  <div className="space-y-10">
                    {formData.COUCH.coaches.map((coach, index) => (
                      <div className="space-y-6" key={index}>
                        <h2 className="text-xl font-medium">
                          {index === 0 ? "First Team Leader" : "Second Team Leader"}
                        </h2>
                        <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between gap-3">
                          <div className="space-y-3">
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">First name*</label>
                              <input
                                type="text"
                                name={`COUCH.coaches[${index}].name`}
                                value={coach.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required={index === 0} // First coach is required
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Last name*</label>
                              <input
                                name={`COUCH.coaches[${index}].surname`}
                                value={coach.surname}
                                onChange={handleChange}
                                type="text"
                                className="w-[20rem] text-[14px] md:w-80 pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                                required={index === 0} // First coach is required
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Email*</label>
                              <input
                                type="email"
                                name={`COUCH.coaches[${index}].email`}
                                value={coach.email}
                                onChange={handleChange}
                                placeholder="only university/college emails accepted"
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                                required={index === 0} // First coach is required
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Phone*</label>
                              <input
                                type="text"
                                name={`COUCH.coaches[${index}].phone`}
                                value={coach.phone}
                                onChange={handleChange}
                                placeholder="+234"
                                className="pl-2 border-[1px] border-slate-300 rounded-md w-[20rem] md:w-80 text-[14px] py-1 placeholder:text-sm placeholder:pl-4 outline-none"
                                required={index === 0} // First coach is required
                              />
                            </div>

                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Gender*</label>
                              <select
                                name={`COUCH.coaches[${index}].gender`}
                                value={coach.gender}
                                onChange={handleChange}
                                required={index === 0}
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-[6px] placeholder:text-sm placeholder:pl-4"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Coach Button */}
                  {formData.COUCH.coaches.length < 2 && (
                    <div
                      onClick={addCoach}
                      className="relative w-36 bg-green-800 cursor-pointer text-white  transition-all ease-in-out duration-700 rounded-2xl py-2 px-3 text-[14px] md:text-[16px]  font-medium group overflow-hidden"
                    >
                      {/* Default Text */}
                      <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                        Add Team Lead
                      </span>

                      {/* Hover Text */}
                      <span className="absolute inset-0 flex items-center justify-center  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                        Add
                      </span>
                    </div>
                  )}
                </div>

                {/* Students Section */}
                <div className="space-y-4">
                  {formData.COUCH.students
                    .slice(0, 10)
                    .map((student, index) => (
                      <div className="py-8 lg:py-8 space-y-4" key={index}>
                        <h2 className="text-xl font-medium">
                          Team Member {index + 1}
                        </h2>

                        <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between gap-3">
                          <div className="space-y-3">
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">First name*</label>
                              <input
                                type="text"
                                className="w-[20rem] md:w-80 text-[14px] pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                                name={`COUCH.students[${index}].name`}
                                value={student.name}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Last name*</label>
                              <input
                                name={`COUCH.students[${index}].surname`}
                                value={student.surname}
                                onChange={handleChange}
                                type="text"
                                className="w-[20rem] text-[14px] md:w-80 pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                              />
                            </div>

                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Gender*</label>
                              <select
                                name={`COUCH.students[${index}].gender`}
                                value={student.gender}
                                onChange={handleChange}
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-[6px] placeholder:text-sm placeholder:pl-4"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Email*</label>
                              <input
                                type="Email"
                                name={`COUCH.students[${index}].email`}
                                value={student.email}
                                onChange={handleChange}
                                placeholder="only university/college emails accepted"
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                              />
                            </div>

                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Phone*</label>
                              <input
                                type="Phone"
                                name={`COUCH.students[${index}].phone`}
                                value={student.phone}
                                onChange={handleChange}
                                placeholder="+234"
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                              />
                            </div>

                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">level*</label>
                              <select
                                name={`COUCH.students[${index}].level`}
                                value={student.level}
                                onChange={handleChange}
                                type="Number"
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-[6px] placeholder:text-sm placeholder:pl-4"
                              >
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Add More Button */}
                  {formData.COUCH.students.length <= 10 && (
                    <div
                      onClick={addTeamMember}
                      className="relative w-32 bg-green-800 cursor-pointer text-white  transition-all ease-in-out duration-700 rounded-2xl py-2 px-3 text-[14px] md:text-[16px]  font-medium group overflow-hidden"
                    >
                      {/* Default Text */}
                      <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                        Add Member
                      </span>

                      {/* Hover Text */}
                      <span className="absolute inset-0 flex items-center justify-center  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                        Add
                      </span>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-3 text-[14px] items-start mt-8">
                  <p className="text-[14px] md:text-[17px]">
                    COUCH will use, process and store your personal data at all
                    times in compliance with our Privacy Policy.
                  </p>
                  <div className="flex items-center justify-start">
                    <input
                      type="checkbox"
                      name="COUCH.termsAccepted"
                      checked={formData.COUCH.termsAccepted}
                      onChange={handleChange}
                      className="w-6"
                    />
                    <p className="text-[11px] md:text-[14px] pl-2">
                      Yes, I accept the COUCH Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* //AfriCANCodeChallenge Section */}

            {formData.section === "ACC" && (
              <div>
                <p className="text-red-800 text-sm">
                  (At least one coach and five team members are required to fill
                  this form)
                </p>

                <div className="pt-6 space-y-2">
                  <label htmlFor="">Team name*</label>
                  <input
                    type="text"
                    name="ACC.teamName"
                    value={formData.ACC.teamName}
                    onChange={handleChange}
                    placeholder="Team Name"
                    className="w-full md:px-2 py-1 border-[1px] border-slate-300 outline-none"
                  />
                </div>

                <div className="pt-6 space-y-2">
                  <label htmlFor="">Name of Institution*</label>
                  <input
                    type="text"
                    name="ACC.institutionName"
                    value={formData.ACC.institutionName}
                    onChange={handleChange}
                    placeholder="Institution Name"
                    className="w-full md:px-2 py-1 border-[1px] border-slate-300 outline-none"
                  />
                </div>

                {/*  Coach */}
                {/* Coach Section */}
                <div className="py-10 lg:py-12 space-y-6">
                  <div className="space-y-6">
                    {formData.ACC.coaches.map((coach, index) => (
                      <div className="space-y-4" key={index}>
                        <h2 className="text-xl font-medium">
                          {index === 0 ? "First Coach" : "Second Coach"}
                        </h2>
                        <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between gap-3">
                          <div className="space-y-3">
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">First name*</label>
                              <input
                                type="text"
                                name={`ACC.coaches[${index}].name`}
                                value={coach.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required={index === 0} // First coach is required
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Last name*</label>
                              <input
                                name={`ACC.coaches[${index}].surname`}
                                value={coach.surname}
                                onChange={handleChange}
                                type="text"
                                className="w-[20rem] text-[14px] md:w-80 pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                                required={index === 0} // First coach is required
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Email*</label>
                              <input
                                type="email"
                                name={`ACC.coaches[${index}].email`}
                                value={coach.email}
                                onChange={handleChange}
                                placeholder="only university/college emails accepted"
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                                required={index === 0} // First coach is required
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Phone*</label>
                              <input
                                type="text"
                                name={`ACC.coaches[${index}].phone`}
                                value={coach.phone}
                                onChange={handleChange}
                                placeholder="+234"
                                className="pl-2 border-[1px] border-slate-300 rounded-md w-[20rem] md:w-80 text-[14px] py-1 placeholder:text-sm placeholder:pl-4 outline-none"
                                required={index === 0} // First coach is required
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Gender*</label>
                              <select
                                name={`ACC.coaches[${index}].gender`}
                                value={coach.gender}
                                onChange={handleChange}
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-[6px] placeholder:text-sm placeholder:pl-4"
                                required={index === 0} // First coach is required
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Coach Button */}
                  {formData.ACC.coaches.length < 2 && (
                    <div
                      onClick={addCoach}
                      className="relative w-32 bg-green-800 cursor-pointer text-white  transition-all ease-in-out duration-700 rounded-2xl py-2 px-3 text-[14px] md:text-[16px]  font-medium group overflow-hidden"
                    >
                      {/* Default Text */}
                      <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                        Add Coach
                      </span>

                      {/* Hover Text */}
                      <span className="absolute inset-0 flex items-center justify-center  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                        Add
                      </span>
                    </div>
                  )}
                </div>

                {/* Students Section */}
                <div className="space-y-4">
                  {formData.ACC.students.slice(0, 10).map((student, index) => (
                    <div className="py-8 lg:py-8 space-y-4" key={index}>
                      <h2 className="text-xl font-medium">
                        Team Member {index + 1}
                      </h2>

                      <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between gap-3">
                        <div className="space-y-3">
                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">First name*</label>
                            <input
                              type="text"
                              className="w-[20rem] md:w-80 text-[14px] pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                              name={`ACC.students[${index}].name`}
                              value={student.name}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">Last name*</label>
                            <input
                              name={`ACC.students[${index}].surname`}
                              value={student.surname}
                              onChange={handleChange}
                              type="text"
                              className="w-[20rem] text-[14px] md:w-80 pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                            />
                          </div>

                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">Gender*</label>
                            <select
                              name={`ACC.students[${index}].gender`}
                              value={student.gender}
                              onChange={handleChange}
                              className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">Email*</label>
                            <input
                              type="Email"
                              name={`ACC.students[${index}].email`}
                              value={student.email}
                              onChange={handleChange}
                              placeholder="only university/college emails accepted"
                              className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                            />
                          </div>

                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">Phone*</label>
                            <input
                              type="Phone"
                              name={`ACC.students[${index}].phone`}
                              value={student.phone}
                              onChange={handleChange}
                              placeholder="+234"
                              className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  {formData.ACC.students.length <= 10 && (
                    <div
                      onClick={addTeamMember}
                      className="relative w-32 bg-green-800 cursor-pointer text-white  transition-all ease-in-out duration-700 rounded-2xl py-2 px-3 text-[14px] md:text-[16px]  font-medium group overflow-hidden"
                    >
                      {/* Default Text */}
                      <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                        Add Member
                      </span>

                      {/* Hover Text */}
                      <span className="absolute inset-0 flex items-center justify-center  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                        Add
                      </span>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-3 text-[14px] items-start mt-8">
                  <p className="text-[14px] md:text-[17px]">
                    AfriCAN Code Challenge will use, process and store your
                    personal data at all times in compliance with our Privacy
                    Policy.
                  </p>
                  <div className="flex items-center justify-start">
                    <input
                      type="checkbox"
                      name="ACC.termsAccepted"
                      checked={formData.ACC.termsAccepted}
                      onChange={handleChange}
                      className="w-6"
                    />
                    <p className="text-[11px] md:text-[14px] pl-2">
                      Yes, I accept the COUCH Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* //AfricaCodeWeek Section */}

            {formData.section === "ACW" && (
              <div>
                <p className="text-red-800 text-sm">
                  (At least one coach and five team members are required to fill
                  this form)
                </p>
                <div className="pt-6 space-y-2">
                  <label htmlFor="">Team name*</label>
                  <input
                    type="text"
                    name="ACW.teamName"
                    value={formData.ACW.teamName}
                    onChange={handleChange}
                    placeholder="Team Name"
                    className="w-full md:px-2 py-1 border-[1px] border-slate-300 outline-none"
                  />
                </div>

                <div className="pt-6 space-y-2">
                  <label htmlFor="">Name of Institution*</label>
                  <input
                    type="text"
                    name="ACW.institutionName"
                    value={formData.ACW.institutionName}
                    onChange={handleChange}
                    placeholder="Institution Name"
                    className="w-full md:px-2 py-1 border-[1px] border-slate-300 outline-none"
                  />
                </div>

                {/*  Coach */}
                {/* Coach Section */}
                <div className="py-10 lg:py-12 space-y-6">
                  <div className="space-y-6">
                    {formData.ACW.coaches.map((coach, index) => (
                      <div className="space-y-4" key={index}>
                        <h2 className="text-xl font-medium">
                          {index === 0 ? "First Coach" : "Second Coach"}
                        </h2>
                        <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between gap-3">
                          <div className="space-y-3">
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">First name*</label>
                              <input
                                type="text"
                                name={`ACW.coaches[${index}].name`}
                                value={coach.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required={index === 0} // First coach is required
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Last name*</label>
                              <input
                                name={`ACW.coaches[${index}].surname`}
                                value={coach.surname}
                                onChange={handleChange}
                                type="text"
                                className="w-[20rem] text-[14px] md:w-80 pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                                required={index === 0} // First coach is required
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Email*</label>
                              <input
                                type="email"
                                name={`ACW.coaches[${index}].email`}
                                value={coach.email}
                                onChange={handleChange}
                                placeholder="only university/college emails accepted"
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                                required={index === 0} // First coach is required
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Phone*</label>
                              <input
                                type="text"
                                name={`ACW.coaches[${index}].phone`}
                                value={coach.phone}
                                onChange={handleChange}
                                placeholder="+234"
                                className="pl-2 border-[1px] border-slate-300 rounded-md w-[20rem] md:w-80 text-[14px] py-1 placeholder:text-sm placeholder:pl-4 outline-none"
                                required={index === 0} // First coach is required
                              />
                            </div>

                            <div className="flex flex-col items-start justify-start space-y-1">
                              <label htmlFor="">Gender*</label>
                              <select
                                name={`ACW.coaches[${index}].gender`}
                                value={coach.gender || "Male"} // Default to Male
                                onChange={handleChange}
                                required={index === 0}
                                className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-[6px] placeholder:text-sm placeholder:pl-4"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Coach Button */}
                  {formData.ACW.coaches.length < 2 && (
                    <div
                      onClick={addCoach}
                      className="relative w-32 bg-green-800 cursor-pointer text-white  transition-all ease-in-out duration-700 rounded-2xl py-2 px-3 text-[14px] md:text-[16px]  font-medium group overflow-hidden"
                    >
                      {/* Default Text */}
                      <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                        Add Coach
                      </span>

                      {/* Hover Text */}
                      <span className="absolute inset-0 flex items-center justify-center  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                        Add
                      </span>
                    </div>
                  )}
                </div>

                {/* Students Section */}
                <div className="space-y-4">
                  {formData.ACW.students.slice(0, 10).map((student, index) => (
                    <div className="py-8 lg:py-8 space-y-6" key={index}>
                      <h2 className="text-xl font-medium">
                        Team Member {index + 1}
                      </h2>

                      <div className="w-full flex flex-col md:flex-row items-start justify-start md:justify-between gap-3">
                        <div className="space-y-3">
                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">First name*</label>
                            <input
                              type="text"
                              className="w-[20rem] md:w-80 text-[14px] pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                              name={`ACW.students[${index}].name`}
                              value={student.name}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">Last name*</label>
                            <input
                              name={`ACW.students[${index}].surname`}
                              value={student.surname}
                              onChange={handleChange}
                              type="text"
                              className="w-[20rem] text-[14px] md:w-80 pl-2 border-[1px] border-slate-300 rounded-md py-1 outline-none"
                            />
                          </div>

                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">Gender*</label>
                            <select
                              name={`ACW.students[${index}].gender`}
                              value={student.gender || "Male"}
                              onChange={handleChange}
                              className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-[6px] placeholder:text-sm placeholder:pl-4"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">Email*</label>
                            <input
                              type="Email"
                              name={`ACW.students[${index}].email`}
                              value={student.email}
                              onChange={handleChange}
                              placeholder="only university/college emails accepted"
                              className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                            />
                          </div>

                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">Phone*</label>
                            <input
                              type="Phone"
                              name={`ACW.students[${index}].phone`}
                              value={student.phone}
                              onChange={handleChange}
                              placeholder="+234"
                              className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-1 placeholder:text-sm placeholder:pl-4"
                            />
                          </div>

                          <div className="flex flex-col items-start justify-start space-y-1">
                            <label htmlFor="">level*</label>
                            <select
                              name={`ACW.students[${index}].level`}
                              value={student.level}
                              onChange={handleChange}
                              className="w-[20rem] text-[14px] md:w-80 outline-none pl-2 border-[1px] border-slate-300 rounded-md py-[6px] placeholder:text-sm placeholder:pl-4"
                            >
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="300">300</option>
                              <option value="400">400</option>
                              <option value="500">500</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  {formData.ACW.students.length <= 10 && (
                    <div
                      onClick={addTeamMember}
                      className="relative w-32 bg-green-800 cursor-pointer text-white  transition-all ease-in-out duration-700 rounded-2xl py-2 px-3 text-[14px] md:text-[16px]  font-medium group overflow-hidden"
                    >
                      {/* Default Text */}
                      <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                        Add Member
                      </span>

                      {/* Hover Text */}
                      <span className="absolute inset-0 flex items-center justify-center  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                        Add
                      </span>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4 text-[14px] items-start mt-8">
                  <p className="text-[14px] md:text-[17px]">
                    Africa Code Week will use, process and store your personal
                    data at all times in compliance with our Privacy Policy.
                  </p>
                  <div className="flex items-center justify-start">
                    <input
                      type="checkbox"
                      name="ACW.termsAccepted"
                      checked={formData.ACW.termsAccepted}
                      onChange={handleChange}
                      className="w-6"
                    />
                    <p className="text-[12px] md:text-[14px] pl-2">
                      Yes, I accept the Africa Code Week Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Similar logic for other sections like AfriCAN Code Challenge, Africa Code Week */}

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading === formData.section}
                className={`relative w-full py-2 px-4 text-white font-medium rounded-lg overflow-hidden group ${loading ? "bg-green-300" : "bg-green-700 hover:bg-green-800"
                  } focus:ring-4 focus:ring-green-300 focus:outline-none transition-all ease-in-out duration-700`}
              >
                {/* Spinner and Hover Effects */}
                {loading === formData.section ? (
                  <div className="flex justify-center items-center">
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
                  </div>
                ) : (
                  <>
                    {/* Default Text */}
                    <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                      Submit {formData.section}
                    </span>

                    {/* Hover Text */}
                    <span className="absolute inset-0 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                      Go!
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            message={modalMessage}
          />
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

export default RegistrationForm;
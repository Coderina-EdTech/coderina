"use client";

"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import DetailsModal from "./components/DetailsModal";
import { IoFolder, IoTrash } from "react-icons/io5";
import { IoIosSync } from "react-icons/io";
import { HiDownload } from "react-icons/hi";

const Page = () => {
  const [sections] = useState(["FLL", "COUCH", "ACC", "ACW"]); // Section list
  const [activeSection, setActiveSection] = useState("FLL");
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (registration) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRegistration(null);
    setIsModalOpen(false);
  };

  // Fetch registrations for the selected section
  const fetchRegistrations = async (section) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/formData?section=${section}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success) {
        if (data.data.length > 0) {
          setRegistrations(data.data);
        } else {
          setRegistrations([]);
          console.log(`No registrations found for ${section}`);
        }
      } else {
        console.log(data.message || "Failed to fetch data");
      }
    } catch (error) {
      console.log("Error fetching registrations");
    } finally {
      setLoading(false);
    }
  };

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Handle deletion of a registration
  const deleteRegistration = async (id) => {
    try {
      setLoadingId(id);
      const res = await fetch("/api/formData", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Registration deleted successfully");
        setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
      } else {
        toast.error(data.message || "Failed to delete registration");
      }
    } catch (error) {
      toast.error("Error deleting registration");
    } finally {
      setLoadingId(null);
    }
  };

  // Download individual registration details
  const downloadDetails = (registration) => {
    const { section } = registration; // Current section (e.g., "FLL")
    const sectionData = registration[section]; // Access specific section data

    const coaches =
      sectionData?.coaches
        ?.map(
          (coach, idx) =>
            `Coach ${idx + 1}:\n  Name: ${coach.name || "N/A"}\n  Surname: ${
              coach.surname || "N/A"
            }\n  Gender: ${coach.gender || "N/A"}\n  Email: ${
              coach.email || "N/A"
            }\n  Phone: ${coach.phone || "N/A"}\n`
        )
        .join("\n") || "No coaches provided.";

    const students =
      sectionData?.students
        ?.map(
          (student, idx) =>
            `Student ${idx + 1}:\n  Name: ${
              student.name || "N/A"
            }\n  Surname: ${student.surname || "N/A"}\n  Gender: ${
              student.gender || "N/A"
            }\n  Email: ${student.email || "N/A"}\n  Phone: ${
              student.phone || "N/A"
            }\n`
        )
        .join("\n") || "No students provided.";

    const details = `
  Section: ${section}
  Institution: ${sectionData?.institutionName || "N/A"}
  Team Name: ${sectionData?.teamName || "N/A"}
  Terms Accepted: ${sectionData?.termsAccepted ? "Yes" : "No"}
  ${coaches}
  ${students}
  Submitted At: ${new Date(registration.createdAt).toLocaleString()}
    `;

    const blob = new Blob([details.trim()], {
      type: "text/plain;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${section}_registration_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Convert registrations to CSV
  const downloadCSV = () => {
    if (registrations.length === 0) {
      toast.error("No registrations to download");
      return;
    }

    const headers = [
      "Section",
      "Institution Name",
      "Team Name",
      "Terms Accepted",
      "Coaches",
      "Students",
      "Submitted At",
    ];

    const rows = registrations.map((reg) => {
      const { section } = reg;
      const sectionData = reg[section];

      const coaches =
        sectionData?.coaches
          ?.map(
            (coach) =>
              `${coach.name || "N/A"} ${coach.surname || "N/A"} (${
                coach.gender || "N/A"
              })`
          )
          .join("; ") || "No coaches";

      const students =
        sectionData?.students
          ?.map(
            (student) =>
              `${student.name || "N/A"} ${student.surname || "N/A"} (${
                student.gender || "N/A"
              })`
          )
          .join("; ") || "No students";

      return [
        section,
        sectionData?.institutionName || "N/A",
        sectionData?.teamName || "N/A",
        sectionData?.termsAccepted ? "Yes" : "No",
        coaches,
        students,
        new Date(reg.createdAt).toLocaleString(),
      ];
    });

    const csvContent = [
      headers.join(","), // Header row
      ...rows.map((row) => row.map((field) => `"${field}"`).join(",")), // Data rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "registrations.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (activeSection) {
      fetchRegistrations(activeSection);
    }
  }, [activeSection]);

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Registrations</h1>

      <div className="mb-4 text-right font-medium">
        Total Registrations in {activeSection}: {registrations.length}
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={downloadCSV}
          disabled={registrations.length === 0} // Disable if no registrations
          className={`px-4 py-2 rounded ${
            registrations.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          Download CSV
        </button>
      </div>

      <div className="flex flex-row items-center justify-normal space-x-4 md:space-x-6 py-8">
        {sections.map((section) => (
          <label key={section} className="space-x-2">
            <input
              type="radio"
              name="section"
              value={section}
              checked={activeSection === section}
              onChange={(e) => handleSectionChange(e.target.value)}
              id={section}
              className="peer rounded-3xl border-red-900 accent-red-800 p-1"
            />
            <label
              className="ml-2 peer-checked:text-red-900 font-medium text-green-900 text-[16px]"
              htmlFor={section}
            >
              {section}
            </label>
          </label>
        ))}
      </div>

      {/* Registrations List */}
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : registrations.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 h-screen">
            No registrations available for
            <span className="font-semibold"> {activeSection}</span>.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-start">
            {registrations.map((reg) => (
              <div
                key={reg._id}
                className="p-4 border rounded shadow-md bg-white w-[300px] h-[200px]"
              >
                <h3 className="font-semibold text-[18px]">
                  {reg.FLL?.teamName ||
                    reg.COUCH?.teamName ||
                    reg.ACC?.teamName ||
                    reg.ACW?.teamName ||
                    "Team Name"}
                </h3>
                <p className="text-[15px]">
                  Institution:
                  {reg.FLL?.institutionName ||
                    reg.COUCH?.institutionName ||
                    reg.ACC?.institutionName ||
                    reg.ACW?.institutionName ||
                    "N/A"}
                </p>

                <p>
                  Coaches:
                  {(reg[activeSection]?.coaches || []).map((coach, idx) => (
                    <span
                      key={idx}
                      className="text-[13px] flex items-center space-x-1"
                    >
                      <p>{coach?.name || "No Name"}</p>
                      <p>{coach?.surname || "No Surname"}</p>
                    </span>
                  ))}
                </p>

                <div className="mt-4 flex space-x-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteRegistration(reg._id)}
                    disabled={loadingId === reg._id}
                  >
                    {loadingId === reg._id ? (
                      <IoIosSync className="animate-spin text-gray-500 text-xl" />
                    ) : (
                      <IoTrash size={18} />
                    )}
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => downloadDetails(reg)}
                  >
                    <HiDownload size={18} />
                  </button>

                  <button
                    className=" bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleOpenModal(reg)}
                  >
                    <IoFolder size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      <DetailsModal
        registration={selectedRegistration}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Page;

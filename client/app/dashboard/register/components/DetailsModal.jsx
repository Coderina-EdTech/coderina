import React, { useState } from "react";

const DetailsModal = ({ registration, isOpen, onClose }) => {
  if (!isOpen || !registration) return null;

  const renderDetails = () => {
    const section = registration.section;

    if (section === "FLL") {
      return (
        <div>
          <p>
            <strong>Category:</strong> {registration.FLL?.category || "N/A"}
          </p>
          <p>
            <strong>Team Name:</strong> {registration.FLL?.teamName || "N/A"}
          </p>
          <p>
            <strong>Institution:</strong>{" "}
            {registration.FLL?.institutionName || "N/A"}
          </p>
          <p>
            <strong>Coaches:</strong>
          </p>
          <ul>
            {registration.FLL?.coaches?.map((coach, index) => (
              <li key={index}>
                {coach.name} {coach.surname} ({coach.gender}) - {coach.email} -{" "}
                {coach.phone}
              </li>
            )) || "N/A"}
          </ul>
          <p>
            <strong>Students:</strong>
          </p>
          <ul>
            {registration.FLL?.students?.map((student, index) => (
              <li key={index}>
                {student.name} {student.surname} ({student.gender}) -{" "}
                {student.email} - {student.phone}
              </li>
            )) || "N/A"}
          </ul>
          <p>
            <strong>Terms Accepted:</strong>{" "}
            {registration.FLL?.termsAccepted ? "Yes" : "No"}
          </p>
        </div>
      );
    }

    if (section === "COUCH") {
      return (
        <div>
          <p>
            <strong>Team Name:</strong> {registration.COUCH?.teamName || "N/A"}
          </p>
          <p>
            <strong>Institution:</strong>{" "}
            {registration.COUCH?.institutionName || "N/A"}
          </p>
          <p>
            <strong>Coaches:</strong>
          </p>
          <ul>
            {registration.COUCH?.coaches?.map((coach, index) => (
              <li key={index}>
                {coach.name} {coach.surname} ({coach.gender}) - {coach.email} -{" "}
                {coach.phone}
              </li>
            )) || "N/A"}
          </ul>
          <p>
            <strong>Students:</strong>
          </p>
          <ul>
            {registration.COUCH?.students?.map((student, index) => (
              <li key={index}>
                {student.name} {student.surname} ({student.gender}) -{" "}
                {student.email} - {student.phone}
              </li>
            )) || "N/A"}
          </ul>
          <p>
            <strong>Terms Accepted:</strong>{" "}
            {registration.COUCH?.termsAccepted ? "Yes" : "No"}
          </p>
        </div>
      );
    }

    if (section === "ACC") {
      return (
        <div>
          <p>
            <strong>Team Name:</strong> {registration.ACC?.teamName || "N/A"}
          </p>
          <p>
            <strong>Institution:</strong>{" "}
            {registration.ACC?.institutionName || "N/A"}
          </p>
          <p>
            <strong>Coaches:</strong>
          </p>
          <ul>
            {registration.ACC?.coaches?.map((coach, index) => (
              <li key={index}>
                {coach.name} {coach.surname} ({coach.gender}) - {coach.email} -{" "}
                {coach.phone}
              </li>
            )) || "N/A"}
          </ul>
          <p>
            <strong>Students:</strong>
          </p>
          <ul>
            {registration.ACC?.students?.map((student, index) => (
              <li key={index}>
                {student.name} {student.surname} ({student.gender}) -{" "}
                {student.email} - {student.phone}
              </li>
            )) || "N/A"}
          </ul>
          <p>
            <strong>Terms Accepted:</strong>{" "}
            {registration.ACC?.termsAccepted ? "Yes" : "No"}
          </p>
        </div>
      );
    }

    if (section === "ACW") {
      return (
        <div>
          <p>
            <strong>Team Name:</strong> {registration.ACW?.teamName || "N/A"}
          </p>
          <p>
            <strong>Institution:</strong>{" "}
            {registration.ACW?.institutionName || "N/A"}
          </p>
          <p>
            <strong>Coaches:</strong>
          </p>
          <ul>
            {registration.ACW?.coaches?.map((coach, index) => (
              <li key={index}>
                {coach.name} {coach.surname} ({coach.gender}) - {coach.email} -{" "}
                {coach.phone}
              </li>
            )) || "N/A"}
          </ul>
          <p>
            <strong>Students:</strong>
          </p>
          <ul>
            {registration.ACW?.students?.map((student, index) => (
              <li key={index}>
                {student.name} {student.surname} ({student.gender}) -{" "}
                {student.email} - {student.phone}
              </li>
            )) || "N/A"}
          </ul>
          <p>
            <strong>Terms Accepted:</strong>{" "}
            {registration.ACW?.termsAccepted ? "Yes" : "No"}
          </p>
        </div>
      );
    }

    // Similar render logic for COUCH, ACC, ACW

    return <p>No details available for this section.</p>;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Registration Details</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Details Content */}
        <div className="space-y-4">
          <p>
            <strong>Section:</strong> {registration.section || "N/A"}
          </p>
          <p>
            <strong>Submitted At:</strong>{" "}
            {new Date(registration.createdAt).toLocaleString()}
          </p>
          {renderDetails()}
        </div>

        {/* Close Button */}
        <div className="mt-6 text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default DetailsModal;

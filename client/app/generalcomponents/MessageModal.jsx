import React, { useState, useEffect } from "react";
import codelogo from "../../public/codelogo.png";
import Image from "next/image";
const MessageModal = ({ message, isSuccess, onClose }) => {
  useEffect(() => {
    // Automatically close the modal after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute -top-16 md:-top-10 w-full flex items-center justify-center">
      <div className="flex justify-center items-center">
        <div className="bg-white backdrop-blur-lg p-3 flex flex-col items-center justify-center rounded-lg shadow-lg max-w-[14rem] w-full text-center">
          <Image src={codelogo} alt="codelogo" width={20} height={20} />
          <h2
            className={`text-xl font-semibold ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {isSuccess ? "Success!" : "Error"}
          </h2>
          <p className="mt-2 text-[13px] font-medium text-green-600">
            {message}
          </p>
          <div className="mt-4 flex justify-center items-center space-x-4"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;

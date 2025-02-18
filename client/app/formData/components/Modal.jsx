import React from "react";
import codelogo from "../../../public/codelogo.png";
import Image from "next/image";
const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg  w-80 shadow-inner  flex flex-col items-center justify-center">
        <div className="space-y-2  flex flex-col items-center justify-center">
          <Image src={codelogo} alt="codelogo" width={40} height={40} />
          <p>{message}</p>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
          >
            OK!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

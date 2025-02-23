import React from "react";

const Spinner = () => {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-900">
      <div
        class="relative w-16 h-16 animate-spin"
        style="animation: spin 1s linear infinite;"
      >
        <div class="absolute inset-0 w-full h-full flex items-center justify-center">
          <svg
            class="w-full h-full text-yellow-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.39 7.26h7.62l-6.17 4.72 2.39 7.26-6.23-4.54-6.23 4.54 2.39-7.26-6.17-4.72h7.62z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Spinner;

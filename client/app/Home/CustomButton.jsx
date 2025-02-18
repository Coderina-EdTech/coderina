import { Button } from "@mui/material";
import React from "react";
import { fontStyle } from "../utils/constants";

const CustomButton = ({ children, orange, styles, bold, isLarge }) => {
  return (
    <div className="relative group w-[10.3rem] overflow-hidden">
      <Button
        variant="contained"
        sx={{
          padding: isLarge ? ".9em 1.8em" : "",
          bgcolor: orange ? "#FBB12F" : "#201E1E",
          borderRadius: 10,
          fontSize: { xs: "10px", md: "13px" },
          textTransform: "none",
          fontWeight: bold ? 600 : 300,
          color: orange ? "#080F12" : "#fff",
          fontFamily: fontStyle,
          whiteSpace: "nowrap",
          gap: ".7em",
          ...styles,
        }}
        className="w-full h-full flex items-center justify-center transition-all ease-in-out duration-700"
      >
        {/* Main Text */}
        <p className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
          {children}
        </p>
      </Button>

      {/* Hover Text */}
      <span className="absolute inset-0 flex items-center justify-center text-white font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
        Go!
      </span>
    </div>
  );
};

export default CustomButton;

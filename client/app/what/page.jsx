"use client";

import React from "react";

import { Box, Container } from "@mui/material";

import { blackColor, pinkBg } from "../utils/constants";
import WhatBody from "./WhatBody";
import Subscribers from "../Home/Subscribers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Home/Footer";
const Page = () => {
  const whatWedoContent = [
    {
      color: pinkBg,
      section: <WhatBody />,
    },

    {
      color: pinkBg,
      section: <Subscribers />,
    },
    {
      color: ["#1a1a1a"],
      section: <Footer />,
    },
  ];

  return (
    <>
      <div>
        {whatWedoContent.map(({ color, section }, index) => (
          <div style={{ background: color }} className="p-4" key={`${section}-${index}`}>
            <div div className="max-w-[100rem] mx-auto">{section}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;

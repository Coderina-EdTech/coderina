"use client";
import { Box, Container, Stack } from "@mui/material";
import React from "react";

import { blackColor, pinkBg, whiteBg } from "../utils/constants";
import Events from "./components/Events";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import SubscribeForm from "../Home/SubscribeForm";

const Page = () => {
  const eventContent = [
    {
      color: pinkBg,
      section: <Events />,
    },
    {
      section: <SubscribeForm />
    },
    {
      color: "#1a1a1a",
      section: <Footer />,
    }
  ];

  return (
    <div className="overflow-hidden">
      {eventContent.map(({ color, section }, index) => (
        <div style={{ background: color }} className="p-4" key={`${section}-${index}`}>
          <div className="max-w-[100rem] mx-auto">{section}</div>
        </div>
      ))}
    </div>
  );
};

export default Page;

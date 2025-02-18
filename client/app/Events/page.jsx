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
  ];

  return (
    <>
      <div className="overflow-hidden px-2 md:px-4 lg:px-16">
        {eventContent.map(({ color, section }, index) => (
          <div className="p-4" key={`${section}-${index}`} bgcolor={color}>
            <div>{section}</div>
          </div>
        ))}
      </div>
      <div className="px-2 md:px-4 lg:px-16">
        <SubscribeForm />
      </div>

      <Footer />
    </>
  );
};

export default Page;

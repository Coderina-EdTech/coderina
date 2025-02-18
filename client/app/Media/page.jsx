"use client";

import React from "react";
import { blackColor, pinkBg } from "../utils/constants";
import { Box, Container, Stack } from "@mui/material";

import MediaBody from "../Media/component/MediaBody";
import Footer from "../Home/Footer";
import SubscribeForm from "../Home/SubscribeForm";

const Media = () => {
  const eventContent = [
    {
      color: pinkBg,
      section: <MediaBody />,
    },
  ];

  return (
    <>
      <div className="overflow-hidden px-2 md:px-4 lg:px-20">
        {eventContent.map(({ color, section }) => (
          <div p={4} key={section} bgcolor={color}>
            <div className="max-w-xl md:max-w-full">{section}</div>
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

export default Media;

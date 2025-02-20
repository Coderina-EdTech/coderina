"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import "./globals.css";
import Navbar from "./Home/Navbar";
import Header from "./Home/Header";
import AboutSection from "./Home/AboutSection";
import Upcoming from "./Home/Upcoming";
import Partners from "./Home/SubscribeForm";
import Footer from "./Home/Footer";
import Experience from "./Home/Experience";
import News from "./Home/News";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Activities from "./Home/Activities";
import Subscribers from "./Home/Subscribers";
import {
  blackCard,
  blackColor,
  blueColor,
  greenBg,
  headerBackground,
  pinkBg,
  whiteColor,
} from "./utils/constants";
import MediaBlog from "./Media/component/MediaBlog";

const page = () => {
  const homeContents1 = [
    {
      color: headerBackground,
      section: <Header />,
    },
    {
      // color: greenBg,
      section: <AboutSection />,
    },
    {
      color: blackCard,
      section: <Upcoming />,
    },
    {
      // color: blueColor,
      section: <Activities />,
    },
    {
      color: whiteColor,
      section: <News />,
    },

    {
      color: whiteColor,
      section: <Experience />,
    },
    {
      color: headerBackground,
      section: <Subscribers />,
    },
    {
      color: "#1a1a1a",
      section: <Footer />,
    },
  ];

  return (
    <div className=" overflow-hidden bg-white ">
      {homeContents1.map(({ color, section }, index) => (
        // <div  style={{ border: "1px solid red" }}>
        <div style={{ background: color }} key={`${section}-${index}`}>
          <div className="max-w-[100rem] mx-auto">{section}</div>
        </div>
        // </div>
      ))}
    </div>

  );
};

export default page;

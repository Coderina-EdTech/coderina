"use client";
import React from "react";
import AboutHeader from "./components/AboutHeader";
import AboutMV from "./components/AboutMV";
import Impact from "./components/Impact";
import Navbar from "../Home/Navbar";
import Team from "./components/Team";
import CoreValues from "./components/CoreValues";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Subscribers from "../Home/Subscribers";
import Footer from "../Home/Footer";

import SubscribeForm from "../Home/SubscribeForm";
import Testimonial from "./components/Testimonial";

import Sponsors from "../Home/Sponsors";
import { blackCard, headerBackground, whiteColor } from "../utils/constants";
import AboutTS from "./components/aboutTS";

const page = () => {

  const aboutContents1 = [
    {
      color: headerBackground,
      section: <AboutHeader />,
    },
    {
      color: whiteColor,
      section: <AboutMV />,
    },
    {
      color: blackCard,
      section: <Impact />,
    },
    {
      color: whiteColor,
      section: <Team />,
    },
    {
      color: headerBackground,
      section: <Sponsors />,
    },
    {
      color: headerBackground,
      section: <AboutTS />,
    },
    {
      color: "#1a1a1a",
      section: <Footer />,
    }
  ];
  return (
    <div className="">
      {aboutContents1.map(({ color, section }, index) => (
        <div style={{ background: color }} key={`${section}-${index}`}>
          <div className="max-w-[100rem] mx-auto">{section}</div>
        </div>
      ))}
    </div>
  );
};

export default page;

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import CustomButton from "./CustomButton";
import aboutSecImg from "../../public/aboutSec.png";
import aboutSecImg1 from "../../public/aboutSec1.png";
import Image from "next/image";
import Link from "next/link";
const AboutSection = () => {
  const aboutCard = [
    {
      title: "For Student",
      description:
        "Lifelong Learning Skills Needed to thrive in the 21st century.",
      img: aboutSecImg,
    },
    {
      title: "For Teachers",
      description:
        "Continuous Personal & Professional Development Training for Teachers",
      img: aboutSecImg1,
    },
  ];
  return (
    <div className="w-full font-Geist px-2 md:px-4 lg:px-16 py-10 md:py-16">
      <div className="flex flex-col  md:flex-row items-start md:items-end justify-start gap-y-7 md:gap-x-3 md:justify-between">
        <h2 className="font-medium text-[16px] md:text-[32px] leading-9 md:leading-[48px] w-full md:w-[70%]">
          Coderina is an independent Non-profit organisation Ed-Tech that works
          to promote ICT development, Youth Innovation and Entrepreneurship in
          Africa
        </h2>

        <Link
          href="/About"
          className="relative flex items-center justify-center  w-44  text-nowrap   bg-black text-white  rounded-3xl text-[14px]  cursor-pointer hover:bg-black hover:text-white transition-all ease-in-out duration-700  py-2 px-2    font-medium group overflow-hidden"
        >
          {/* Default Text */}
          <span className="relative flex items-center justify-center z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
            <p>Learn About Us</p>
          </span>

          {/* Hover Text */}
          <span className="absolute inset-0 flex items-center justify-center text-white  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
            Go!
          </span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 items-center justify-center  mt-10 bg-[#fff5e5] md:p-10 rounded-2xl">
        {aboutCard.map(({ title, description, img }, index) => {
          return (
            <div
              key={`${title}-${index}`}
              className="space-y-6  gap-4 p-8 md:px-5 md:py-5"
            >
              <div className="gap-y-3">
                <h2 className="text-[16px] font-medium leading-5 md:[20px]">
                  {title}
                </h2>
                <h2 className="text-[16px] md:[20px] font-normal leading-7">
                  {description}
                </h2>
              </div>
              <div>
                <Image src={img} alt="image" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutSection;

"use client";

import React from "react";
import { blackColor, pinkBg } from "../utils/constants";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import CustomButton from "../Home/CustomButton";
import Subscribers from "../Home/Subscribers";
import Footer from "../Home/Footer";
import SubscribeForm from "../Home/SubscribeForm";
import Link from "next/link";

const Couch = () => {
  const couchInfos = [
    {
      title: "About",
      content: [
        "Coderina® University Challenge (COUCH) is an event aimed at promoting innovation among students in Tertiary education in Nigeria. A 48 hours Challenge where teams of students with diverse background and skill set come together to solve “indigenous” problems using technology or modern business approaches. The aim is to foster collaboration, network, learn and build stuff that would change the world.",
        "Objectives",
      ],
      type: "p",
      shadows: "0px 1px 0px 0px rgba(0,0,0,0.1)",
    },
    {
      title: "Objectives",
      content: [
        "Expose participants to diverse creative and innovative business opportunities",
        "To foster networking and valuable collaboration among budding entrepreneurs",
        "Stimulate creative thinking and promote innovation in Nigeria/Africa",
        "To create solutions to real-life problems/challenges in Africa/World",
        "To help students make good career decisions and gain experiential knowledge of entrepreneurship",
        "To build sustainable tech solution solving indigenous social problems in Nigeria.",
      ],
      type: "li",
      shadows: "0px 1px 0px 0px rgba(0,0,0,0.1)",
    },
    {
      title: "Challenge Focused Areas",
      content: [
        "Employment/Unemployment",
        "Agriculture",
        "Financial Inclusion",
        "Food Security",
        "Quality Education",
        "Health Care",
        "Human Security",
      ],
      type: "li",
    },
  ];

  return (
    <Box className="couch__container">
      <Box p={4} bgcolor={pinkBg}>
        <Container maxWidth="lg" className="couch__header">
          <Stack p={{ xs: "4em 1em", md: "6.5em 14em" }}>
            <Typography variant="h4" fontSize={{ xs: "18px", md: "27px" }}>
              Coderina® University Challenge (COUCH)
            </Typography>
            <Typography fontSize={{ xs: "14px", md: "16px" }}>
              A 48 hours Challenge where teams of students with diverse
              background and skill set come together to solve “indigenous”
              problems using technology or modern business approaches.{" "}
            </Typography>

            <Link
              href="/formData"
              className="bg-black flex items-center justify-between text-white rounded-3xl py-3 px-8 gap-x-3 text-sm font-medium"
            >
              {" "}
              Get Started
            </Link>
          </Stack>
        </Container>
      </Box>
      <Box className="bg-white py-10 md:px-4 lg:px-28 ">
        <Container
          maxWidth="lg"
          className="couch__info"
          sx={{ padding: { xs: "", md: "0 5em" } }}
        >
          {couchInfos.map((info, i) => (
            <Stack key={i} boxShadow={info.shadows} borderRadius={4}>
              <Typography
                variant=" h4"
                fontSize={{ xs: "16px", md: "20px" }}
                fontWeight={700}
              >
                {info.title}
              </Typography>
              <Stack>
                {info.content.map((content, index) => (
                  <Stack className="couch__text" key={index}>
                    <Typography component={info.type}></Typography>
                    <Typography fontSize={{ xs: "14px", md: "16px" }}>
                      {content}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ))}

          <Box>
            <div className="mb-3 space-y-2 md:space-y-0 w-full bg-[#00a859] font-Geist py-8 px-3 md:px-6 text-[#fff] flex flex-col md:flex-row items-center justify-center md:justify-between  rounded-2xl gap-y-4 md:gap-y-0 md:gap-x-8 mt-4">
              <h3 className="text-[20px] md:text-[20px] text-[#fff] text-center md:text-start">
                Fill out the form to submit a project
              </h3>

              <Link
                href="/Form"
                className="bg-black flex items-center justify-between text-white rounded-3xl py-3 px-6 gap-x-3 text-sm font-medium cursor-pointer"
              >
                Get Started
              </Link>
            </div>
            <div className="space-y-2 md:space-y-0 w-full bg-[#FBB12F] font-Geist py-8 px-3 md:px-6 text-[#fff] flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 rounded-2xl gap-y-4 md:gap-y-0 md:gap-x-8 mt-1">
              <h3 className="text-[20px] md:text-[20px] text-[#fff] text-center md:text-start">
                Fill out the form to register
              </h3>

              <Link
                href="/formData"
                className="cursor-pointer bg-black flex items-center justify-between text-white rounded-3xl py-3 px-6 gap-x-3 text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
          </Box>
        </Container>
      </Box>
      <Box className=" bg-[#1a1a1a] ">
        <Box className="max-w-[100rem] mx-auto">
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Couch;

import React from "react";
import scopeImg1 from "../../../public/scope-img1.png";
import scopeImg2 from "../../../public/scope-img2.png";
import scopeImg3 from "../../../public/scope-img3.png";
import scopeImg4 from "../../../public/scope-img4.png";
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import SolutionCards from "@/app/Home/SolutionCards";

const Scope = () => {
  const scopeCards = [
    {
      img: scopeImg1,
      title: "STEAM Curriculum Development ",
      details:
        "Designing school programs that integrate coding, robotics, and problem-solving into daily learning.",
    },
    {
      img: scopeImg2,
      title: "Training for Educators",
      details:
        "Offering Continuous Personal and Professional Development Training (CPPDT) for teachers to improve their skills in virtual learning, coding, and STEAM education.",
    },
    {
      img: scopeImg3,
      title: "Project-Based Learning",
      details:
        "Guiding students in solving community challenges using robotics and AI.",
    },
    {
      img: scopeImg4,
      title: "Monitoring & Evaluation",
      details:
        "Providing expert assessments and real-time feedback to enhance project implementation and outcomes.",
    },
  ];

  return (
    <Box className="w-full  px-2 md:px-4 lg:px-8 py-10 ">
      <h4 className="py-5 font-bold text-[30px] leading-10"> Our Services</h4>
      <Grid container spacing={3} className="w-full justify-between">
        {scopeCards.map((scopeCard, i) => (
          <SolutionCards key={i} {...scopeCard}
            height={"250px"}
            childern1={scopeCard.title}
            childern3={scopeCard.details} />
        ))}
      </Grid>
    </Box>
  );
};

export default Scope;

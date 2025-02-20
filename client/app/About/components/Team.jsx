import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Grid from '@mui/material/Grid2';
import founder1 from "../../../public/founder1.jpg";
import founder2 from "../../../public/founder2.jpg";
import founder3 from "../../../public/founder3.jpg";
import group from "../../../public/group1.jpg";
import daniel from "../../../public/daniel.png";
import christy from "../../../public/christy.jpg";
import prelumi from "../../../public/prelumi.jpg";
import tosin from "../../../public/tosin.jpg";
import faith from "../../../public/faith.jpg";
import Ephraim from "../../../public/Ephraim.jpg";
import Image from "next/image";
import SolutionCards from "../../Home/SolutionCards";
import CustomButton from "@/app/Home/CustomButton";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
const Team = () => {
  const ourTeamCard = [
    {
      img: founder3,
      name: "Mr. Femi Niyi",
      role: "Chairman Board of trustee",
    },
    {
      img: founder2,
      name: "Mr. Olabisi Kelvin Ajayi",
      role: "Director of Relationships and engagement",
    },
    {
      img: daniel,
      name: "Mr. Aduku Daniel",
      role: "Program Director: Emerging Technology Education",
    },

    {
      img: tosin,
      name: "Mr. Oluwatosin Olugbemi",
      role: "Senior project manager ",
    },

    {
      img: prelumi,
      name: "Mr. Oluwapelumi A. Ojo",
      role: "Program Manager - Additive Manufacturing & Reverse Engineering",
    },
    {
      img: faith,
      name: "Mrs. Faith Effiong",
      role: "Account Manager: Primary Education",
    },

    {
      img: christy,
      name: "Miss. Christiana Anthony",
      role: "Project Manager - Tertiary Education",
    },

    {
      img: Ephraim,
      name: "Mr Ephraim Nyigba",
      role: "Online Digital Facilitator",
    },
  ];
  return (
    <Box className="px-4 md:px-4 lg:px-20 py-12 bg-white w-full space-y-9">
      <Stack direction={"row"} className="items-center justify-between">
        <h4 className="text-[20px] md:text-[30px]">Our Team</h4>
        <Link
          href="/contactUs"
          className="relative flex items-center justify-center  w-48  text-nowrap   bg-black text-white  rounded-3xl text-[14px]  cursor-pointer hover:bg-black hover:text-white transition-all ease-in-out duration-700  py-2 px-2    font-medium group overflow-hidden"
        >
          {/* Default Text */}
          <span className="relative flex items-center justify-center space-x-2 z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
            <p> Volunteer with us</p> <FaArrowRightLong />
          </span>

          {/* Hover Text */}
          <span className="absolute inset-0 flex items-center justify-center text-white  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
            Go!
          </span>
        </Link>
      </Stack>
      <Grid container spacing={4} className="w-full justify-between">
        {ourTeamCard.map((teamCard, i) => (
          <SolutionCards key={i} {...teamCard}
            height={"310px"}
            text={teamCard.name}
            childern2={teamCard.role}
          />
        ))}
      </Grid>
      <Stack className="space-y-3 justify-center items-center">
        <Stack className="w-full md:w-[600px] h-[350px] md:h-[450px] lg:px-4 flex items-center justify-center">
          <Image
            src={group}
            alt="groupPicture"
            className="w-full h-full md:object-cover rounded-[2rem]"
          />
        </Stack>
        <p className="font-medium text-[16px] text-center">Our Team</p>
      </Stack>
    </Box>
  );
};

export default Team;
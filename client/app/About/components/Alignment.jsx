import React from "react";
import education from "../../../public/Education.png";
import equality from "../../../public/equality.png";
import growth from "../../../public/growth.png";
import innovation from "../../../public/innovation.png";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
const Alignment = () => {
  const align = [
    {
      img: education,
      desc: "Promoting inclusive and equitable quality education.",
    },
    {
      img: equality,
      desc: "Empowering girls through the Her e-STEM initiative.",
    },
    {
      img: growth,
      desc: "Encouraging entrepreneurship and innovation through COUCH.",
    },
    {
      img: innovation,
      desc: "Building resilient infrastructure and fostering innovation through STEAM programs.",
    },
  ];
  return (
    <Box className="space-y-10 py-10 md:py-14">
      <Stack>
        <h1 className="font-bold text-[28px] md:text-[32px] leading-[41.1px]">
          Alignment with the SDGs
        </h1>
      </Stack>
      <Grid container spacing={3} className="w-full justify-between" >
        {align.map((sec, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} className="flex flex-col justify-center items-center space-y-2">
            <Stack className="w-full md:w-[290px] h-[270px]">
              <Image
                src={sec.img}
                alt="innovate"
                className="w-full h-full object-contain"
              />
            </Stack>

            <p className="text-center font-normal text-[16px] leading-7">
              {sec.desc}
            </p>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Alignment;

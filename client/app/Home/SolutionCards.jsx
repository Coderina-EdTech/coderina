import React from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";

const SolutionCards = ({
  img,
  name,
  childern,
  childern1,
  childern2,
  childern3,
}) => {
  return (
    <Grid size={{ xs: 12, sm: 5.8, md: 2.85 }} key={name}>
      <Card className="w-full h-[330px] md:h-[310px] rounded-2xl">
        <Image src={img} className="w-full h-full object-cover rounded-2xl" />
      </Card>
      <Typography fontSize={{ xs: "12px", md: "14px" }}>{childern}</Typography>
      <Typography fontSize={{ xs: "12px", md: "14px" }}>{childern1}</Typography>
      <Typography className="font-medium font-Poppins text-[17px] text-center">{name}</Typography>
      <Typography className="font-normal font-Poppins text-[13px] text-center">{childern2}</Typography>
      <Typography fontSize={{ xs: "12px", md: "14px" }}>{childern3}</Typography>
    </Grid>
  );
};

export default SolutionCards;

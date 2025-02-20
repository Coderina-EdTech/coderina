import React from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";

const SolutionCards = ({
  img,
  text,
  childern,
  childern1,
  childern2,
  childern3,
  height
}) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 2.85 }} key={text} className="space-y-2">
      <Card className="w-full rounded-2xl" sx={{ height: { xs: "400px", md: height } }}>
        <Image src={img} className="w-full h-full object-cover rounded-2xl" />
      </Card>
      <Typography fontSize={{ xs: "12px", md: "14px" }}>{childern}</Typography>
      <Typography className="font-semibold font-Geist text-[14px]">{childern1}</Typography>
      <Typography className="font-medium font-Poppins text-[17px] text-center">{text}</Typography>
      <Typography className="font-normal font-Poppins text-[13px] text-center">{childern2}</Typography>
      <Typography className="font-Geist text-[14px]">{childern3}</Typography>
    </Grid>
  );
};

export default SolutionCards;

import { Box, Card, CardContent, CardMedia, Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import CustomButton from './CustomButton';
import expCard1 from "../../public/experience-card1.png";
import expCard2 from "../../public/experience-card2.png";
import { greenBg2, headerBackground, pinkBgR, textColor } from '../utils/constants';
import Image from 'next/image';
import Link from 'next/link';

const Experience = () => {
  const expCard = [
    {
      title: "Coderina® University Challenge (COUCH)",
      text: "This is an annual event where tertiary students showcase their final year projects to industry experts. The goal is to bridge the gap between academic work and industry needs, aligning student projects with real-world requirements.",
      button: "Register",
      link: "/formData",
      color: greenBg2,
      image: expCard2
    },
    {
      title: "Bring the STEAM Experience to Your Next Celebration!",
      text: "Looking for something different to celebrate your child's birthday? Coderina provides a totally unique party experience with interactive elements that really engage the kids.",
      button: "Contact us",
      link: "/contactUs",
      color: headerBackground,
      image: expCard1
    },

  ]

  return (
    <Box className="px-2 md:px-4 lg:px-16 lg:py-20">
      <Grid container className="justify-between space-y-5 md:space-y-0 lg:gap-3" >
        {expCard.map((card, i) => (
          <Grid key={i}
            className="rounded-2xl flex justify-center items-center"
            bgcolor={card.color}
            size={{ xs: 12, md: 5.7 }}>
            <Stack className="space-y-10 p-7">
              <Stack className="space-y-4">
                <h1 className="text-[27px] font-semibold leading-[37.6px]">{card.title}</h1>
                <Stack>
                  <span className="text-[14px] md:[17px]" color={textColor}>{card.text}</span>
                </Stack>
                <Link href={card.link}>
                  <CustomButton>{card.button}</CustomButton>
                </Link>
              </Stack>
              <Stack className='rounded-3xl relative h-full w-full md:h-[350px] md:w-[360px] lg:w-[450px]'>
                <Image
                  src={card.image}
                  alt="imagecard"
                  className=" object-cover rounded-3xl w-full "
                  layout="responsive"
                />
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Experience






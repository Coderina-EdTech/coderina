import { Box, CardContent, Container, Stack, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import personStar from "../../../public/person-star.svg";
import smile from "../../../public/smile.svg";
import robot from "../../../public/robot.svg";
import plant from "../../../public/plant.svg";
import gSmile from "../../../public/green-smile.png";
import gPerson from "../../../public/green-person.png";
import gBank from "../../../public/green-bank.png";
import gHandShake from "../../../public/green-shake.png";
import gBill from "../../../public/Itemss.png";
import Image from "next/image";

const Testimonial = ({ lego }) => {
  const impactNums = [
    {
      text: "Coderina EduTech has provided an incredible learning experience. The interactive resources and expert guidance have helped me grow my skills in ways I never imagined.",
      name: "Alex Johnson",
      job: "Intern",
      img: gBill,
    },
    {
      text: "The mentorship and hands-on projects at Coderina have been invaluable. I’ve gained real-world experience that has boosted my confidence and career prospects.",
      name: "Fatima Adeyemi",
      job: "Frontend Developer",
      img: gBill,
    },
    {
      text: "As an educator, I appreciate how Coderina integrates technology into education. The platform is well-structured and enhances learning for students at all levels.",
      name: "David Smith",
      job: "STEM Educator",
      img: gBill,
    },
    {
      text: "Thanks to Coderina, I have developed strong problem-solving skills and a deeper understanding of coding principles. It’s a fantastic place for any aspiring tech enthusiast.",
      name: "Chukwuemeka Okoro",
      job: "Robotics Enthusiast",
      img: gBill,
    },
    {
      text: "Joining Coderina was a game-changer for me. The collaborative environment and access to industry professionals helped me take my skills to the next level.",
      name: "Isabella Martinez",
      job: "UI/UX Designer",
      img: gBill,
    },
  ];

  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className=" bg-transparent font-Geist overflow-hidden mb-10 lg:mb-16" >
      <Slider {...settings}>
        {impactNums.map((slide, index) => (
          <Stack
            key={index}
            className="bg-[#FFF5E5] p-1 w-[400px]"
          >
            <Stack className="bg-white p-3 rounded-lg md:h-60 justify-between" spacing={4}>
              <p className="text-[13px] md:text-[12.4px]">{slide.text}</p>

              <Stack className="flex-row items-center justify-start space-x-2">
                <Image
                  width={{ xs: "16px", md: "24px" }}
                  className="w-[20px] h-[24px]"
                  src={slide.img}
                  alt="slider"
                />
                <Stack>
                  <p className="text-[13px] md:text-sm">{slide.name}</p>
                  <p className="text-[13px] md:text-sm">{slide.job}</p>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonial;

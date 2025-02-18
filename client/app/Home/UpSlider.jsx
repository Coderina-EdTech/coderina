import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbClockHour3 } from "react-icons/tb";
import { DataContext } from "../context/DataContext";

const UpSlider = ({ slider }) => {
  const { upCard, loading } = useContext(DataContext);

  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    <div className="overflow-hidden px-2">
      <Slider ref={slider} className="gap-[2rem] max-w-full" {...settings}>
        {upCard.map((card, i) => (
          <div key={i} className="">
            <div className="flex flex-row text-white bg-[#201e1e] rounded-2xl max-w-[500px] h-[220px] md:h-[200px]">
              <div
                style={{ borderColor: card.color, backgroundColor: card.color }}
                className="border-4 h-[220px] md:h-[200px] min-w-[2.5%] rounded-xl"
              ></div>
              <div className="flex flex-col items-start justify-start text-white pl-10 gap-y-4 py-4">
                <div
                  style={{ color: card.color }}
                  className="flex flex-col items-start justify-start"
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <AiOutlineCalendar />
                    {card.startDate} - {card.endDate}
                  </div>
                  <div className="flex items-center justify-center gap-x-2">
                    <TbClockHour3 />
                    {card.startTime} - {card.endTime}
                  </div>
                </div>
                <div>
                  <h6 className="text-[20px] md:text-[24px]">{card.title}</h6>
                  <h3>{card.location}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UpSlider;

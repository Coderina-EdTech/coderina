import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { AiOutlineCalendar } from "react-icons/ai";
import { TbClockHour3 } from "react-icons/tb";
import { DataContext } from "../context/DataContext";

const UpSlider = ({ slider }) => {
  // const { upCard, loading } = useContext(DataContext);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { events, loading } = useContext(DataContext);

  useEffect(() => {
    if (!events || !events.length) return;

    // Current date in Nigeria's timezone
    const now = new Date();
    const offset = 1 * 60 * 60 * 1000; // UTC+1 offset for Nigeria
    const nigeriaTime = new Date(now.getTime() + offset);

    // Categorize events based on startDate
    const upcoming = events.filter((event) => {
      const eventDate = new Date(event.startDate); // Use startDate for comparison
      return eventDate >= nigeriaTime;
    });

    setUpcomingEvents(upcoming);
  }, [events]);

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
      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : upcomingEvents.length === 0 ? (
        <div className="flex justify-center items-center w-full py-16">
          <p className="text-center text-gray-500 md:text-[26px]">
            No Upcoming Event.
          </p>
        </div>
      ) : (
        <Slider ref={slider} className="gap-[2rem] max-w-full" {...settings}>
          {upcomingEvents.map((card, i) => (
            <div key={i} className="">
              <div className="flex flex-row text-white bg-[#201e1e] rounded-2xl max-w-[500px] h-[220px] md:h-[200px]">
                <div
                  style={{
                    borderColor: card.color,
                    backgroundColor: card.color,
                  }}
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
      )}
    </div>
  );
};

export default UpSlider;

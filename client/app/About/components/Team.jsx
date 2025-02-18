import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import founder1 from "../../../public/founder1.jpg";
import founder2 from "../../../public/founder2.jpg";
import founder3 from "../../../public/founder3.jpg";
import group from "../../../public/group1.jpg";
import daniel from "../../../public/daniel.png";
import christy from "../../../public/christy.jpg";
import prelumi from "../../../public/prelumi.jpg";
import tosin from "../../../public/tosin.jpg";
import faith from "../../../public/faith.jpg";
import  Ephraim from "../../../public/Ephraim.jpg";
import Image from "next/image";
import SolutionCards from "../../Home/SolutionCards";
import CustomButton from "@/app/Home/CustomButton";
import Link from "next/link";
const Team = () => {
  const ourTeamCard = [
    {
      img: founder3,
      name: "Mr. Femi Niyi",
      text: "Chairman Board of trustee",
    },
    {
      img: founder2,
      name: "Mr. Olabisi Kelvin Ajayi",
      text: "Director of Relationships and engagement",
    },
    {
      img: daniel,
      name: "Mr. Aduku Daniel",
      text: "Program Director: Emerging Technology Education",
    },

    {
      img: tosin,
      name: "Mr. Oluwatosin Olugbemi",
      text: "Senior project manager ",
    },

    {
      img: prelumi,
      name: "Mr. Oluwapelumi A. Ojo",
      text: "Program Manager - Additive Manufacturing & Reverse Engineering",
    },
    {
      img: faith,
      name: "Mrs. Faith Effiong",
      text: "Account Manager: Primary Education",
    },

    {
      img: christy,
      name: "Miss. Christiana Anthony",
      text: "Project Manager - Tertiary Education",
    },

    {
      img: Ephraim,
      name: "Mr Ephraim Nyigba",
      text: "Online Digital Facilitator",
    },
  ];
  return (
    <div className="px-4 md:px-4 lg:px-20 py-12 bg-white w-full">
      {" "}
      <div className="flex flex-col items-center justify-center space-y-9">
        <div className="w-full flex items-center justify-between">
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
        </div>
        {/* <div className="w-full grid md:grid-cols-3 items-center justify-between space-y-10 md:space-y-0 md:gap-x-3">
          {ourTeamCard.map((teamCard, i) => {
            return (
              <div
                className="w-full md:w-[300px] md:h-[300px]  md:space-y-3 rounded-2xl"
                key={i}
              >
                <div className="w-full h-[240px] md:w-full md:h-full">
                  <Image
                    src={teamCard.img}
                    alt="image"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-[17px] text-center">
                    {teamCard.name}
                  </h3>
                  <h3 className="font-normal text-[13px] text-center">
                    {teamCard.text}
                  </h3>
                </div>
              </div>
            );
          })}
        </div> */}

        <div className="w-full grid md:grid-cols-3 items-start md:items-center justify-between md:justify-center space-y-3 md:space-y-[1rem]">
          {ourTeamCard.map((teamCard, i) => {
            return (
              <div
                className="w-full md:w-[280px] h-[400px]  md:space-y-5"
                key={i}
              >
                <div className="w-full h-[330px] md:h-[300px]">
                  <Image
                    src={teamCard.img}
                    alt="image"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-[17px] text-center">
                    {teamCard.name}
                  </h3>
                  <h3 className="font-normal text-[13px] text-center">
                    {teamCard.text}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <div className="w-full md:w-[600px] h-[450px] lg:px-4 flex items-center justify-center rounded-[3rem]">
            <Image
              src={group}
              alt="groupPicture"
              className="w-full h-full object-cover rounded-[2rem]"
            />
          </div>

          <p className="font-medium text-[16px] text-center">Our Team</p>
        </div>
      </div>
    </div>
  );
};

export default Team;

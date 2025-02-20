import React from "react";
import scopeImg1 from "../../../public/roydek.jpg";
import scopeImg2 from "../../../public/kiki.jpg";

import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

const Projects = () => {
  return (
    <div className="w-full   py-10 ">
      <div className="py-5 lg:px-16 font-bold text-[30px] leading-10">
        <h4> Our Projects</h4>
      </div>
      <div className="w-full px-2 py-16  md:px-6 lg:px-24 md:space-y-6 lg:space-y-0 font-mulish">
        <div className=" flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-[350px] lg:w-[700px] h-[300px] lg:pr-10 rounded-3xl ">
            <Image
              src={scopeImg1}
              alt="scope"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4  pb-9 md:pb-0 lg:p-4 md:w-[50%] lg:w-[60%]">
            <h1 className="text-[24px] md:text-[32px] font-poppin font-semibold">
              Coderina Donates STEAM and Robotics Kits to Roy-Dek Academy in
              Makoko
            </h1>
            <p className="text-[16px] leading-[20.7px]">
              Coderina visited Roy-Dek Academy in the heart of Makoko, Lagos, to
              donate much-needed STEAM and Robotics kits to the school. Roy-Dek
              Academy, dedicated to empowering children from underserved
              communities, was the perfect partner for this initiative. The
              donation aims to inspire and equip the next generation with the
              tools and knowledge to thrive in the world of technology and
              innovation.
            </p>
          </div>
        </div>

        <div className=" flex flex-col mt-9 md:mt-0 md:flex-row items-center justify-between lg:p-6 gap-6 ">
          <div className="space-y-4  md:w-[50%] lg:w-[60%]">
            <h1 className="text-[24px] md:text-[32px] font-poppin font-semibold">
              Coderina`s STEAM and Robotics Initiative for Girls at Kiyi
            </h1>
            <p className="text-[16px] leading-[20.7px]">
              Coderina`s project empowers young girls in Kiyi through STEAM and
              Robotics education, keeping them in school and preventing early
              marriages. It combines technical training with conventional
              classes, fostering intellectual growth, confidence, and ambition.
            </p>

            <a href="https://www.dropbox.com/scl/fo/u6coqfo7xnz1ldriz42lt/AL0nQYTX_iAnyzlWvOxPBM8?rlkey=drosn8gdytiwir5e67ikjhjwk&st=ms6iuaei&dl=0" className=" text-[14px] flex items-center gap-x-2">
              See More <FaArrowRightLong />
            </a>
          </div>

          <div className="w-full md:w-[350px] lg:w-[700px] h-[300px] lg:pr-10 rounded-3xl ">
            <Image
              src={scopeImg2}
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

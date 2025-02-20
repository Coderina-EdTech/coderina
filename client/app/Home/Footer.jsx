"use client";

import React, { useEffect, useState } from "react";
import Space from "./Space.jsx";
import { RiMapPin3Fill } from "react-icons/ri";
import { TbClockHour3Filled } from "react-icons/tb";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMailFill } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import Logo from "../../public/coderinaBgLogo.png";
import Link from "next/link";
import {
  blueColor,
  darkGreenColor,
  redColor,
  yellowColor,
} from "../utils/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname(false);
  const id = pathname.startsWith("/Media/")
    ? pathname.split("/Media/")[1]
    : null;
  const [display, setDisplay] = useState();
  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/Media" ||
      (id && pathname === `/Media/${id}`) ||
      pathname === "/Form" ||
      pathname === "/Couch" ||
      pathname === "/what" ||
      pathname === "/Events" ||
      pathname === "/Firstlego" ||
      pathname === "/About"
    ) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [pathname]);
  return (
    <>
      {/* <Space/> */}

      {/* // footer */}
      <div className=" text-white pt-[16px] md:pt-20 lg:pt-24 ">
        <div className=" flex flex-col  md:flex-row items-start justify-between gap-y-6 md:gap-y-0 py-10 px-10 md:px-3 lg:px-16">
          <div className=" flex flex-col items-start md:justify-between space-y-6 md:space-y-16">
            <Image
              src={Logo}
              alt="logoCoderina"
              className="object-cover w-[150px] h-8 md:w-[120px] lg:w-[180px] lg:h-10"
              priority
            />
            <div className="flex items-center justify-center space-x-4 text-white">
              <a
                href="https://www.linkedin.com/company/coderina-edtech-foundation"
                className="text-white text-[16px] md:text-[24px]"
              >
                <CiLinkedin />
              </a>
              <a
                href="https://web.facebook.com/coderinaedu"
                className="text-white text-[16px] md:text-[24px]"
              >
                {" "}
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/coderinaedu/"
                className="text-white text-[16px] md:text-[24px]"
              >
                {" "}
                <AiFillInstagram />
              </a>
              <a
                href="https://www.youtube.com/@coderina5977"
                className="text-white text-[16px] md:text-[24px]"
              >
                <FaYoutube />
              </a>
              <a
                href="https://x.com/coderina"
                className="text-white text-[16px] md:text-[24px]"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
          <div className="space-y-3 text-[14px] lg:text-[17px] md:pl-2">
            <h3>Address</h3>
            <div className="flex space-x-2">
              <RiMapPin3Fill color={redColor} />
              <p>4 Ngozi Okonjo Iweala way, Utako district, Abuja</p>
            </div>
            <div className="flex space-x-2">
              <RiMapPin3Fill color={redColor} />
              <p> 4 Oye Balogun St, Lekki Penninsula II, Lekki Lagos</p>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <TbClockHour3Filled color={yellowColor} />
              <p> Mon - Fri 9.00 - 5.00</p>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <TbClockHour3Filled color={darkGreenColor} />
              <p> Sat 10.00 - 2.00</p>
            </div>
          </div>
          <div className="space-y-3 text-[14px] lg:text-[17px] md:pl-2">
            <h3>Email & Phone Number</h3>
            <div className="flex space-x-2 items-center">
              <FaPhoneAlt color={darkGreenColor} />
              <p> +234 9093307353 (Call and WhatsApp)</p>
            </div>
            <div className="flex items-center space-x-2">
              <RiMailFill color={blueColor} />
              <p> Planning@coderina.org</p>
            </div>
          </div>
        </div>
        <div className="border-[1px] border-t-white mt-8 md:mt-10"></div>
        <div className="text-[14px] md:text-[15px] text-[#E6E6E6] space-y-2 md:space-y-0 w-full flex flex-col md:flex-row items-star md:justify-between px-10 md:px-2  lg:px-8 py-8 md:py-8">
          <Link href="/" className="text-white">
            Coderina- © 2024
          </Link>
          <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0   md:space-x-4">
            <p> Privacy Policy</p>
            <p>Accessibility Statement</p>
            <p>Information</p>
            <Link href="/contactUs" className="text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

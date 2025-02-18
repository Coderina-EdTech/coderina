"use client";
import Image from "next/image";
import newsLgImg from "../../public/news-ImgLg.png";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import React, { useEffect, useState,useRef } from "react";
import BlogBanner1 from "../../public/look.jpg";
import BlogBanner2 from "../../public/table.jpg";
import BlogBanner3 from "../../public/arrange.jpg";
import BlogBanner4 from "../../public/focus.jpg";
import { motion, useAnimation } from "framer-motion";
const Space = () => {
// form


 const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [isSuccess, setIsSuccess] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [text, setText] = useState("");
  const fullText = "Coderina EduTech is committed to empowering students through technology and innovative learning.";
  const banners = [BlogBanner1, BlogBanner2, BlogBanner3, BlogBanner4];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ x: 0, opacity: 1 });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [controls]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Typing speed

    return () => clearInterval(interval);
  }, []);



  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Function to handle manual banner selection
  const selectBanner = (index) => {
    setCurrentBannerIndex(index);
  };
  return (
    <div ref={sectionRef} className="relative flex items-center justify-center md:justify-start bg-white h-96 mt-10">
      <div className="absolute  inset-0">
        <Image
          src={banners[currentBannerIndex]}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>


        {/*================== Overlay content ====================*/}

        <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={controls}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-0 bg-black bg-opacity-50 backdrop-blur-md h-full text-white px-2 md:px-8 py-10 rounded-lg w-[40%]"
      >
        <p className="text-sm font-medium">{text}</p>
      </motion.div>


     
    </div>
  );
};

export default Space;

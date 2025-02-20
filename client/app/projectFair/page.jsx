"use client";
import React from "react";
import FairHeader from "./components/FairHeader";
import Projects from "./components/Projects";
import Footer from "../Home/Footer";
import SubscribeForm from "../Home/SubscribeForm";
const page = () => {
  return (
    <div>
      <div className="max-w-[100rem] mx-auto">
        <FairHeader />
        <div className=" px-2 md:px-4 lg:px-8">
          <Projects />
          <SubscribeForm />
        </div>
      </div>
      <div className="bg-[#1a1a1a]">
        <div className="max-w-[100rem] mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;

"use client";
import React from "react";
import FairHeader from "./component/FairHeader";
import Projects from "./component/Projects";
import Footer from "../Home/Footer";
import SubscribeForm from "../Home/SubscribeForm";
const page = () => {
  return (
    <div>
      <FairHeader />
      <div className=" px-2 md:px-4 lg:px-8">
        <Projects />
        <SubscribeForm />
      </div>
      <Footer />
    </div>
  );
};

export default page;

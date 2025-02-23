import React, { useContext, useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import Image from "next/image";
import Link from "next/link";
import { LoadingSkeleton } from "../shared/Spinner";
import { BlogContext } from "../context/BlogContext";

const News = () => {
  const { blogs, loading } = useContext(BlogContext);
  const firstFourBlogs = blogs.slice(0, 4);

  const formatTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;

    // If it's more than a month old, show the full date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return postDate.toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-6  lg:px-16 py-10 md:pt-10 font-Geist">
      <div>
        <div className="w-full flex items-center justify-between">
          <h5 className="font-semibold text-[18px] md:text-[32px] text-center md:text-start">
            News & Updates
          </h5>

          <Link
            href="/Media"
            className="relative border-[1.3px] border-[#fbb12f] bg-[#FBB12F] cursor-pointer text-black hover:bg-white hover:text-[#fbb12f] transition-all ease-in-out duration-700 rounded-3xl py-2 px-4 text-[14px] md:text-[17px] flex font-medium group overflow-hidden"
          >
            {/* Default Text */}
            <span className="relative flex items-center space-x-3 z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
              <p> View all</p> <HiOutlineArrowNarrowRight size={20} />
            </span>

            {/* Hover Text */}
            <span className="absolute inset-0 flex items-center justify-center text-[#fbb12f]  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
              Go!
            </span>
          </Link>
        </div>
        {blogs.length === 0 ? (
          <div className="flex justify-center items-center w-full py-16">
            <p className="text-center text-gray-500 md:text-[26px]">
              No blog available.
            </p>
          </div>
        ) : (
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {firstFourBlogs.map((blog, index) => (
              <div
                key={index}
                className="space-y-2 w-full max-w-[340px] mx-auto"
              >
                <div className="w-full h-[200px]">
                  <Image
                    src={
                      (blog.images && blog.images[0]) || "/default-image.jpg"
                    }
                    alt={blog.title}
                    width={330}
                    height={200} // Ensure a consistent height for all images
                    className="object-cover w-full h-full rounded-3xl"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[13px]">{formatTime(blog.createdAt)}</p>
                  <h3 className="font-normal text-[14px] md:text-[16px] leading-6 font-inter font-medium">
                    {blog.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;

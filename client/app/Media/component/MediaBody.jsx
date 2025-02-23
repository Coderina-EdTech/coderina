import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import LikeAndComment from "./Likes";
import ImageModal from "./ImageModal";

import { BlogContext } from "../../context/BlogContext";
import SubscribeForm from "../../Home/SubscribeForm";

export default function MediaBody() {
  const [category, setCategory] = useState("new Articles");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const { blog, likesAndComments, loadin, error, fetchBlogs, handleLike } =
    useContext(BlogContext);

  const openModal = (images) => {
    setSelectedImages(images);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImages([]);
  };

  const categories = ["new Articles", "publications", "gallery"];

  useEffect(() => {
    fetchBlogs(category);
  }, [category, fetchBlogs]);

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

    return postDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="container mx-auto  py-8 font-Geist px-2 md:px-4 lg:px-20">
      <div className="mb-6 md:mb-2 flex flex-col space-y-5 md:space-y-0 justify-start md:flex-row items-center md:justify-between py-4">
        <h1 className="text-3xl font-bold mb-6">Media</h1>
        <div className="flex space-x-2 text-nowrap bg-gray-200 rounded-full mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-2 md:px-4 py-2 rounded text-[13px] md:text-[14px] ${
                cat === category
                  ? "bg-blue-500 text-white rounded-3xl"
                  : "bg-gray-200"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full">
        {error ? (
          <div className="flex justify-center items-center w-full">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        ) : blog.length === 0 ? (
          <div className="flex justify-center items-center w-full lg:h-screen">
            <p className="text-center text-gray-500 md:text-[26px]">
              No blogs available for this category.
            </p>
          </div>
        ) : (
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blog.map((blog) => {
              const { likesCount, commentsCount, liked } =
                likesAndComments[blog._id] || {};

              return (
                <div
                  key={blog._id}
                  className="flex flex-col items-start justify-start w-full max-w-[340px] mx-auto space-y-2"
                >
                  {blog.images?.length > 0 && (
                    <div className="w-full h-[210px]">
                      <Image
                        src={blog.images[0]}
                        alt={blog.title}
                        width={330}
                        height={210}
                        className="object-cover w-full h-full rounded-2xl"
                        onClick={() => openModal(blog.images)}
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[12.6px] font-medium mb-2">
                      {formatTime(blog.createdAt)}
                    </p>
                    <p className="text-[13px] font-medium mb-1">{blog.title}</p>
                  </div>
                  <div className="h-14">
                    <LikeAndComment
                      likes={likesCount}
                      comments={commentsCount}
                      liked={liked}
                      toggleLike={() => handleLike(blog._id)}
                    />
                    <Link href={`/Media/${blog._id}`}>
                      <p className="text-blue-500 hover:underline text-[13px] py-2">
                        Read More
                      </p>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <ImageModal
        images={selectedImages}
        isOpen={modalOpen}
        onClose={closeModal}
      />

      <div className="pt-[3rem]">
        <SubscribeForm />
      </div>
    </div>
  );
}

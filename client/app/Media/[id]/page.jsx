"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CiEdit, CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { IoTrash, IoTrashBin } from "react-icons/io5";
import { VscReply } from "react-icons/vsc";
import { MdOutlineExpandMore } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import EmailModal from "../component/EmailModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LikeAndComment from "../component/Likes";
import CommentPopup from "../component/Commentpopup";
import CommentInput from "../component/CommentInpute";
import Footer from "../../Home/Footer";
import md5 from "md5";
import Spinner from "../../lib/spinner";
import SubscribeForm from "../../Home/SubscribeForm";
export default function BlogDetails() {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [visibleComments, setVisibleComments] = useState(3);
  const [emailModal, setEmailModal] = useState(false);
  const [Modal, setModal] = useState(false);
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Generate Gravatar URL based on email
  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  };

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 3); // Load 3 more comments
  };

  useEffect(() => {
    if (id) {
      async function fetchBlogDetails() {
        try {
          setLoading(true);
          const res = await axios.get(`/api/likesandcomments?id=${id}`);
          setBlog(res.data.data);
        } catch {
          setError("Failed to fetch blog details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }

      fetchBlogDetails();
    }
  }, [id]);

  const handleAction = async (action, payload) => {
    setIsSubmitting(true); // Start spinner

    const data = {
      blogId: id, // Replace with actual blog ID
      action,
      email: email, // Ensure email is passed correctly from your context or component
      comment: newComment,
      ...payload, // Spread any additional data from payload
    };
    try {
      console.log("Sending payload:", data); // Log the data you're sending
      const res = await axios.post("/api/likesandcomments", data);
      setBlog(res.data.data);

      if (action === "comment") {
        setComments(data.data.comments);
        setNewComment("");
        toast.success("Comment posted successfully!");
      } else if (action === "like") {
        setLiked(!liked);
        toast.success(liked ? "Like removed!" : "Liked the blog!");
      }
    } catch {
      console.log("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop spinner after success or failure
    }
  };

  const handleEdit = async () => {
    if (!reply.trim()) return;

    try {
      const res = await axios.patch("/api/likesandcomments", {
        blogId: id,
        commentId: editCommentId,
        email,
        updatedComment: reply,
      });
      setBlog(res.data.data);
      setEditCommentId(null);
      setReply("");
      toast.success("Comment edited successfully!");
    } catch {
      toast.error("Failed to edit the comment.");
    }
  };

  // const handleDelete = async (commentId) => {
  //   try {
  //     const res = await axios.delete("/api/likesandcomments", {
  //       data: { blogId: id, commentId, email },
  //     });
  //     setBlog(res.data.data);
  //     toast.success("Comment deleted successfully!");
  //   } catch {
  //     toast.error("Failed to delete the comment.");
  //   }
  // };

  const handleDelete = async (commentId) => {
    try {
      setLoading(commentId); // Set the loading state to the comment ID
      const res = await axios.delete("/api/likesandcomments", {
        data: { blogId: id, commentId, email },
      });
      setBlog(res.data.data);
      toast.success("Comment deleted successfully!");
    } catch {
      toast.error("Failed to delete the comment.");
    } finally {
      setLoading(null); // Clear the loading state
    }
  };

  const toggleLike = async () => {
    if (!email) {
      setEmailModal(true);
      return;
    }
    setLiked((prev) => !prev);
    const updatedLikes = liked ? blog.likes.length - 1 : blog.likes.length + 1;
    setBlog((prev) => ({ ...prev, likes: Array(updatedLikes).fill(email) }));

    try {
      await handleAction("like", { email });
    } catch {
      setBlog((prev) => ({
        ...prev,
        likes: Array(
          liked ? prev.likes.length + 1 : prev.likes.length - 1
        ).fill(email),
      }));
    }
  };

  const toggleReplies = (commentId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReply = async (commentId) => {
    if (!reply.trim()) return;

    try {
      const res = await axios.post("/api/likesandcomments", {
        blogId: id,
        action: "reply",
        email,
        comment: reply,
        replyTo: commentId,
      });
      setBlog(res.data.data);
      setReply("");
      console.log("Reply posted successfully!");
    } catch {
      console.log("Failed to post reply.");
    }
  };

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
    return `${days} days ago`;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  // Ensure blog.likes is defined
  const likesCount = blog.likes ? blog.likes.length : 0;

  return (
    <div>
      <div className="container max-w-[100rem] mx-auto px-4 lg:px-16 py-8 md:py-24 font-Geist">
        <Toaster />
        <div className="max-w-4xl mx-auto pb-10">
          {blog && (
            <>
              {/* Blog Title */}
              <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

              {/* Blog Image */}
              {/* {blog.images?.length > 0 && (
                <Image
                  src={blog.images[0]}
                  alt={blog.title}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover mb-6"
                />
              )} */}

              {/* Blog Content */}
              <div>
                {/* Blog Images */}
                {blog.images?.length > 1 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 w--full">
                    {blog.images?.map((image, index) => (
                      <div key={index} className="w-full ">
                        <Image
                          src={image}
                          alt={`${blog.title} - Image ${index + 1}`}
                          width={330}
                          height={300}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  blog.images?.length > 0 && (
                    <Image
                      src={blog.images[0]}
                      alt={blog.title}
                      width={800}
                      height={400}
                      className="rounded-lg object-cover mb-6"
                    />
                  )
                )}
              </div>

              {/* Like and Comments Count */}
              {/* <IoTrashBin onClick={() => setShowPopup(true)} /> */}
              <LikeAndComment
                likes={blog?.likes?.length || 0}
                comments={blog?.comments?.length || 0}
                liked={liked}
                toggleLike={toggleLike}
              />

              {/* Blog Description */}
              <p className="text-lg font-medium text-gray-600 mb-4">
                {blog.description}
              </p>

              {/* Blog Body */}
              <div className="text-gray-800 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: blog.body }} />
              </div>

              {/* Add New Comment */}
              <div className="mt-16 border-t-[0.8px] border-gray-300 py-4">
                <CommentInput
                  email={email}
                  setEmailModal={setEmailModal}
                  handleAction={handleAction}
                  isSubmitting={isSubmitting}
                  newComment={newComment}
                  setNewComment={setNewComment}
                />
              </div>

              {/* Comments Section */}
              <div className="mt-4">
                {blog.comments.slice(0, visibleComments).map((comment) => (
                  <div
                    key={comment._id}
                    className="border-t-[0.8px] border-gray-300 py-5"
                  >
                    <div className="flex items-center justify-start space-x-2">
                      <Image
                        src={getGravatarUrl(comment.email)} // Use email to generate the Gravatar URL
                        alt={comment.email}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <p className="font-semibold text-[13px]">
                        {comment.email}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[13px]">
                        {formatTime(comment.createdAt)}
                      </p>

                      <p className="text-[14px]">{comment.comment}</p>
                    </div>

                    {/* Replies Section */}
                    {visibleReplies[comment._id] && (
                      <div className="ml-4 pt-2">
                        {comment.replies.map((reply, index) => (
                          <div key={index} className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2">
                              <Image
                                src={getGravatarUrl(reply.email)} // Use reply's email to generate the Gravatar URL
                                alt={reply.email}
                                width={30}
                                height={30}
                                className="rounded-full object-cover"
                              />
                              <p className="font-semibold text-[13px]">
                                {reply.email}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm">
                                {formatTime(reply.createdAt)}
                              </p>
                              <p className="text-[14px]">{reply.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      className="text-blue-500 flex items-center text-sm pt-2"
                      onClick={() => toggleReplies(comment._id)}
                    >
                      <VscReply size={16} /> Reply {comment.replies.length}
                    </button>

                    {visibleReplies[comment._id] && (
                      <div className="mt-2 flex items-center space-x-2">
                        <textarea
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          className="border-[0.8px] rounded-2xl p-2 text-sm outline-none"
                          placeholder="Reply to this comment"
                        />
                        <button
                          onClick={() => handleReply(comment._id)}
                          disabled={!reply.trim()}
                          className="text-blue-500"
                        >
                          <FiSend size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Load More Comments */}
                {blog.comments.length > visibleComments && (
                  <button
                    className="mt-4 text-blue-500"
                    onClick={loadMoreComments}
                  >
                    Load More
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Email Modal */}
        {emailModal && (
          <EmailModal
            email={email}
            setEmail={setEmail}
            setEmailModal={setEmailModal}
            onSubmit={(email) => {
              setEmail(email);
              setEmailModal(false);
            }}
          />
        )}

        <SubscribeForm />
      </div>
      <div className="bg-[#1a1a1a]">
        <Footer />
      </div>
    </div>
  );
}

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const MediaContext = createContext();

// Define the provider component
export const MediaProvider = ({ children }) => {
  const [blog, setBlog] = useState([]);
  const [likesAndComments, setLikesAndComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For handling errors
  const [category, setCategory] = useState("new Articles");

  // Fetch blogs based on the category
  const fetchBlogs = async (category) => {
    setLoading(true);
    setError(null); // Reset error state before fetching new data
    console.log("Fetching blogs...");

    try {
      // Handle undefined or empty categories
      const params = category ? { category } : {};
      const res = await axios.get(`/api/blog`, { params });

      if (res.status === 200 && res.data?.data) {
        const fetchedBlogs = res.data.data; // Ensure this matches the response structure
        setBlog(fetchedBlogs);

        // Fetch likes and comments for each blog
        const likesAndCommentsData = {};
        await Promise.all(
          fetchedBlogs.map(async (blog) => {
            const data = await fetchLikesAndComments(blog._id);
            likesAndCommentsData[blog._id] = data;
          })
        );
        setLikesAndComments(likesAndCommentsData);
      } else {
        setError("Failed to fetch blogs. Please try again later.");
      }
    } catch (error) {
      console.log("Error fetching blogs:", error);
      setError("An error occurred while fetching blogs. Please try again later.");
    } finally {
      setLoading(false);
      console.log("Loading finished");
    }
  };

  // Handle the 'like' functionality
  const handleLike = async (blogId) => {
    const updatedLikesAndComments = { ...likesAndComments };
    const blogData = updatedLikesAndComments[blogId];

    if (!blogData) return;

    // Toggle the 'liked' state
    blogData.liked = !blogData.liked;

    // Update likes count based on the 'liked' state
    blogData.likesCount += blogData.liked ? 1 : -1;
    setLikesAndComments(updatedLikesAndComments);

    try {
      await axios.post(`/api/likesandcomments`, {
        blogId,
        action: "like",
        email: "user@example.com", // Replace with authenticated user's email
      });
    } catch (error) {
      console.log("Failed to update like status on the server:", error);
    }
  };

  // Return the context provider with values
  return (
    <MediaContext.Provider
      value={{
        blog,
        likesAndComments,
        loading,
        error,
        fetchBlogs,
        handleLike,
        setCategory, // Pass the setter function to allow category changes
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

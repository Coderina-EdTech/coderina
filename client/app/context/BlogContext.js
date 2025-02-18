import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [likesAndComments, setLikesAndComments] = useState({});
  const [category, setCategory] = useState("new Articles");
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadin, setLoadin] = useState(true);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([
    "gallery",
    "New Articles",
    "publications",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("New Articles");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/allBlogs`);
        const data = await response.json();

        if (response.ok) {
          setBlogs(data.data);
        } else {
          console.log("Failed to fetch blogs:", data.message);
        }
      } catch (error) {
        console.log("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog", {
        params: { category: selectedCategory || "" },
      });
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  const createPost = async (postData) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/blog", postData);
      if (response.data.success) {
        toast.success("Post created successfully");
        fetchPosts();
      } else {
        toast.error(response.data.message || "Failed to create post");
      }
    } catch (error) {
      toast.error("Error creating post");
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/blog/${id}`, updatedData);
      if (response.data.success) {
        toast.success("Post updated successfully");
        fetchPosts();
      } else {
        toast.error(response.data.message || "Failed to update post");
      }
    } catch (error) {
      //toast.error("Error updating post");
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/blog`, { data: { id } });
      if (response.data.success) {
        toast.success("Post deleted successfully");
        fetchPosts();
      } else {
        toast.error(response.data.message || "Failed to delete post");
      }
    } catch (error) {
      toast.error("Error deleting post");
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // media side
 

  const fetchBlogs = async (category) => {
    setLoadin(true);
    console.log("Fetching blogs...");
    setError(null);
    try {
      // Handle undefined or empty categories
      const params = category ? { category } : {};
      const res = await axios.get(`/api/blog`, { params });
      const fetchedBlogs = res.data.data;
      setBlog(fetchedBlogs);
       console.log(fetchedBlogs)
      // Fetch likes and comments for each blog
      const likesAndCommentsData = {};
      await Promise.all(
        fetchedBlogs.map(async (blog) => {
          const data = await fetchLikesAndComments(blog._id);
          likesAndCommentsData[blog._id] = data;
        })
      );
      setLikesAndComments(likesAndCommentsData);
     
    } catch (error) {
      setError("Failed to fetch blogs. Please try again later.");
      console.log("Error fetching blogs:", error);
    } finally {
      setLoading(false);
      console.log("Loading finished");
    }
  };

  const fetchLikesAndComments = async (blogId) => {
    try {
      const res = await axios.get(`/api/likesandcomments?id=${blogId}`);
      const blogData = res.data.data;

      return {
        likesCount: blogData.likes.length,
        commentsCount: blogData.comments.length,
        liked: false,
      };
    } catch (error) {
      console.log("Failed to fetch likes and comments count:", error);
      return { likesCount: 0, commentsCount: 0, liked: false }; // Fallback data
    }
  };

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

  const contextValue = {
    blogs,
    blog,
    totalBlogs,
    loading,
    loadin,
    posts,
    categories,
    selectedCategory,
    setSelectedCategory,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    handleLike,
    error,
    fetchBlogs,
   
    likesAndComments,
  };

  return (
    <>
      <Toaster />
      <BlogContext.Provider value={contextValue}>
        {children}
      </BlogContext.Provider>
    </>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

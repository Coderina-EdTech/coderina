"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import ImageModal from "../..//Media/component/ImageModal";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    body: "",
    images: [],
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    "gallery",
    "new Articles",
    "publications",
  ]);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `/api/blog?category=${formData.category || ""}`
      );
      console.log(response);
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch posts");
      console.log("Error fetching posts:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    const images = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

    setFormData({ ...formData, images });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = { ...formData };
      if (editId) {
        // Update post
        const response = await axios.put(`/api/blog`, {
          ...formDataToSend,
          id: editId,
        });
        if (response.data.success) {
          toast.success("Post updated successfully!");
          fetchPosts();
          setEditId(null);
        }
      } else {
        // Create new post
        const response = await axios.post(`/api/blog`, formDataToSend);
        if (response.data.success) {
          toast.success("Post created successfully!");
          fetchPosts();
        }
      }
      setFormData({
        title: "",
        description: "",
        category: "",
        body: "",
        images: [],
      });
    } catch (error) {
      toast.error("Failed to submit post");
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditId(post._id);
    setFormData({
      title: post.title,
      description: post.description,
      category: post.category,
      body: post.body || "",
      images: [],
    });
    toast.info("Editing post...");
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/blog?id=${id}`);
      if (response.data.success) {
        toast.success("Post deleted successfully!");
        fetchPosts();
      }
    } catch (error) {
      toast.error("Failed to delete post");
      console.log("Error deleting post:", error);
    }
  };

  const openModal = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImages([]);
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === formData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? formData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" />
      <h2 className="text-xl font-bold mb-4">
        {editId ? "Edit Post" : "Create New Blog Post"}
      </h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border rounded p-2 outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border rounded p-2 outline-none"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border rounded p-2 outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {formData.category !== "gallery" && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              className="w-full border rounded p-2 outline-none"
              required
            ></textarea>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium">Images</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            className="w-full border rounded p-2 outline-none"
            multiple
            required
          />
        </div>
        {/* <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editId ? "Update Post" : "Create Post"}
        </button> */}

        <button
          type="submit"
          className={`outlinr-none bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center`}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : editId ? (
            "Update Post"
          ) : (
            "Create Post"
          )}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Posts by Category</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded space-y-2">
            <Image
              src={post.images[0]}
              alt="image"
              width={100}
              height={100}
              className="object-contain"
              onClick={() => openModal(post.images)} // Open the first image of gallery
            />
            <h3 className="font-bold text-sm">{post.title}</h3>
            <p className="text-[13px] font-normal">{post.description}</p>
            <p className="text-sm text-gray-600">Category: {post.category}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      

      <ImageModal
        images={selectedImages}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

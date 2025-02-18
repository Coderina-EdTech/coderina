"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const initialState = {
  username: "",
  email: "",
  address: "",
  phone: "",
  profilePicture: null,
  imagePreview: null,
};

const ProfilePage = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const { username, email, address, phone, profilePicture, imagePreview } =
    formData;
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const userDetails = await response.data;
        setUser(userDetails);
      } catch (error) {
        console.log("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);


  useEffect(() => {
    const fetchUserId = sessionStorage.getItem("userId");
    if (fetchUserId) {
      setUserId(fetchUserId);
    }
  }, []);
  
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profilePicture: user.profilePicture,
        imagePreview: null,
      });
    }
  }, [user]);

  const handleClick = () => inputRef.current.click();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          profilePicture: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("address", address);
      data.append("phone", phone);
      if (profilePicture) data.append("profilePicture", profilePicture);

      const response = await axios.patch(`/api/users/${userId}`, data);

      setFormData({
        ...formData,
        profilePicture: response.data.profilePicture,
        imagePreview: null,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="text-sm bg-white py-10 px-4 h-full flex flex-col justify-center items-center">
      <Toaster />
      <div className="p-5 h-full rounded max-w-md md:max-w-lg">
        <form onSubmit={handleSubmit}>
          <div
            onClick={handleClick}
            className="cursor-pointer flex justify-center items-center"
          >
            <div className="h-40 w-40 rounded-full border-dashed border-2 border-gray-300 overflow-hidden">
              {imagePreview ? (
                <Image
                  src={imagePreview || null}
                  alt="profile_picture"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={profilePicture || null}
                  alt="profile_picture"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-3 capitalize"
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-3"
          />
          <input
            type="text"
            name="address"
            value={address}
            placeholder="Address"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-3"
          />
          <input
            type="text"
            name="phone"
            value={phone}
            placeholder="Phone"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-3"
          />
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-green-600 text-white rounded shadow hover:shadow-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="w-6 h-6 mx-auto animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path d="M4 12h2a8 8 0 0 1 8 8v2" />
              </svg>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;

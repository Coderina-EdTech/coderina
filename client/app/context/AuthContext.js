"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { deleteCookies } from "../lib/logout";
import toast, { Toaster } from "react-hot-toast";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!userId) return; // Skip API call if userId is null or undefined
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const userDetails = response.data;
        if (userDetails) {
          setUser(userDetails);
          console.log(userDetails);
        } else {
          router.push("/"); // Redirect if user data is empty
        }
      } catch (error) {
        console.log("Failed to fetch user_data.");
        router.push("/"); // Redirect on fetch error
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
    } else {
      console.log("No userId found in sessionStorage.");
      router.push("/");
    }
  }, []);

  // // Update user profile
  const updateUserProfile = async (userId, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/users/${userId}`, updatedData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", userData);
      const { user, token, message } = response.data;

      // Save user details and token in session storage
      sessionStorage.setItem("username", user?.username ?? "");
      sessionStorage.setItem("userId", user?.id ?? "");
      sessionStorage.setItem(
        "Greeting",
        `Welcome back ${user?.username || ""}`
      );
      sessionStorage.setItem("token", token || "");

      setUser(user);
      toast.success(message || "Sign-up successful!");

      // Redirect user based on their role
      if (user.role === "admin") {
        router.push("/dashboard/overview");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await deleteCookies("token");
      toast.success("Logged out successfully!");
      router.push("/"); // Redirect to the login page or homepage
      setUser(null);
    } catch (error) {
      toast.log("Failed to log out. Please try again.");
      console.log("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogout, registerUser, updateUserProfile }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};

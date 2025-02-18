"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the API route
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications"); // Call the API route
      const data = await res.json(); // Parse the response into JSON

      if (res.ok) {
        console.log("New Notifications:", data.notifications); // Log the new notifications
        console.log(data.notificationCount); // Log the notification count

        if (data.success) {
          // Update state with the fetched notifications
          // Using spread to add new notifications at the top, maintaining order
          setNotifications((prev) => [...data.notifications, ...prev]);
        }
      } else {
        console.error(
          "Failed to fetch notifications:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Poll notifications every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

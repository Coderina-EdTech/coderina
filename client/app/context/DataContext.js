"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DateTime } from "luxon";
import toast, { Toaster } from "react-hot-toast";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [upCard, setUpCard] = useState([]);
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couchData, setCouchData] = useState({ total: 0, last30Days: 0 });

  const [subscribersData, setSubscribersData] = useState({
    total: 0,
    last30Days: 0,
  });
  const [postsData, setPostsData] = useState({ total: 0, last30Days: 0 });

  const isWithinLast30Days = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    return diff <= 30 * 24 * 60 * 60 * 1000;
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch posts
      const postsResponse = await axios.get("/api/allBlogs");
      const postData = postsResponse.data;
      if (postData.success) {
        setPosts(postData.data);
        const last30DaysPosts = postData.data.filter((post) =>
          isWithinLast30Days(post.createdAt)
        );
        setPostsData({
          total: postData.data.length,
          last30Days: last30DaysPosts.length,
        });
      }

      // Fetch couch data
      const couchResponse = await axios.get("/api/form");
      const couchData = couchResponse.data;
      if (couchData.success) {
        const last30DaysCouch = couchData.data.filter((entry) =>
          isWithinLast30Days(entry.createdAt)
        );
        setCouchData({
          total: couchData.data.length,
          last30Days: last30DaysCouch.length,
        });
      }

      // Fetch subscribers data
      const subscribersResponse = await axios.get("/api/subscribers");
      const subscribersData = subscribersResponse.data;
      if (subscribersData.success) {
        const last30DaysSubscribers = subscribersData.data.filter(
          (subscriber) => isWithinLast30Days(subscriber.createdAt)
        );
        setSubscribersData({
          total: subscribersData.data.length,
          last30Days: last30DaysSubscribers.length,
        });
      }
    } catch (error) {
      //toast.error("Failed to fetch data");
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        if (response.ok) {
          setUpCard(data.data); // Assuming API response is structured as { data: [...] }
        } else {
          console.log("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.log("Error fetching events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

 

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();

      if (data.success) {
        const sortedEvents = data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // // Get the current date/time in Nigeria's timezone
        // const now = DateTime.now().setZone("Africa/Lagos");

        // // Categorize into upcoming and past events
        // const upcoming = sortedEvents.filter((event) => {
        //   const eventDate = DateTime.fromISO(event.date, { zone: "Africa/Lagos" });
        //   return eventDate >= now;
        // });

        // const past = sortedEvents.filter((event) => {
        //   const eventDate = DateTime.fromISO(event.date, { zone: "Africa/Lagos" });
        //   return eventDate < now;
        // });

        setEvents(sortedEvents);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);


  return (
    <div>
      <Toaster />

      <DataContext.Provider
        value={{
          posts,
          loading,
          couchData,
          subscribersData,
          postsData,
          upCard,
          pastEvents,
          upcomingEvents,
          events,
        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  );
};

export { DataContext, DataProvider };

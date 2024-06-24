"use client";
import { useEffect, useState } from "react";

const RequestDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("/api/request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch requests:", response);
        return;
      }

      const data = await response.json();
      setRequests(data);
      console.log(data);
    };

    fetchRequests();
  }, []);

  return <div>RequestDashboard</div>;
};

export default RequestDashboard;

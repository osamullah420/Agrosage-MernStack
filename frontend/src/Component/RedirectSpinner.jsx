// RedirectSpinner.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectSpinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 0) {
      navigate("/login"); // Navigate to your login route
    }
  }, [count, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-center">
        Redirecting you in {count} seconds
      </h1>
    </div>
  );
};

export default RedirectSpinner;

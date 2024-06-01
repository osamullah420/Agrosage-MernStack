import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { ToastContainer } from "react-toastify";
import Chatbot from "../Component/Chatbot";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <ToastContainer />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Main;

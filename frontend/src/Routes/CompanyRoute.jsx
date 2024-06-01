import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../Component/Spinner";
import { toast } from "react-toastify";

const CompanyRoute = ({ children }) => {
  const [auth] = useAuth();
  const location = useLocation();

  console.log("my auth", auth);

  if (auth.loading) {
    return <Spinner />;
  }

  if (auth?.user?.userRole === "Company") {
    return children;
  } else {
    toast.info("Login is required to access this page", {
      position: "top-center",
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default CompanyRoute;

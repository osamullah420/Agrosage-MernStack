import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Modal = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset function from useForm
  } = useForm();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState("");

  // Function to reset form and state
  const resetForm = () => {
    reset(); // Reset form fields
    setShowOtpInput(false); // Reset showOtpInput state
  };

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        data
      );
      if (res.data.message === "OTP sent to email") {
        setEmail(data.email);
        setShowOtpInput(true);
        toast.success("OTP sent to your email", { position: "bottom-right" });
      } else {
        resetForm(); // Reset form and state
        toast.error(res.data.message, { position: "top-center" });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { position: "top-center" });
      } else {
        toast.error("Error while login", { position: "top-center" });
      }
    }
  };

  const handleVerifyOtp = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/verify-otp",
        { email, otp: data.otp }
      );
      if (res.data.success) {
        resetForm(); // Reset form and state
        document.getElementById("my_modal_5").close();
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        toast.success(res.data.message, { position: "bottom-right" });
      } else {
        toast.error(res.data.message, { position: "top-center" });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { position: "top-center" });
      } else {
        console.log(error);
        toast.error("Error while verifying OTP", { position: "top-center" });
      }
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(
              showOtpInput ? handleVerifyOtp : handleLogin
            )}
            className="card-body"
            method="dialog"
          >
            <h3 className="text-center font-bold">Login to AgroSage</h3>
            {!showOtpInput ? (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500">Email is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Choose role type</span>
                  </label>
                  <select
                    {...register("userRole", { required: true })}
                    className="select select-success w-full max-w-xs"
                  >
                    <option disabled selected>
                      Login as?
                    </option>
                    <option value="Company">Company</option>
                    <option value="Retailer">Retailer</option>
                  </select>
                  {errors.userRole && (
                    <p className="text-red-500">User role is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-red-500">Password is required</p>
                  )}
                </div>
              </>
            ) : (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter OTP</span>
                </label>
                <input
                  type="text"
                  placeholder="OTP"
                  className="input input-bordered"
                  {...register("otp", { required: true })}
                />
                {errors.otp && <p className="text-red-500">OTP is required</p>}
              </div>
            )}
            <div className="form-control mt-4">
              <input
                type="submit"
                value={showOtpInput ? "Verify OTP" : "Login"}
                className="btn bg-green text-white"
              />
            </div>
            {!showOtpInput && (
              <p className="text-center my-2">
                Doesn't have any account?
                <Link to="/register" className="underline text-red ml-1">
                  Register
                </Link>
              </p>
            )}
            <button
              onClick={() => {
                resetForm(); // Reset form and state on modal close
                document.getElementById("my_modal_5").close();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;

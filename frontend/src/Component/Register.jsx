import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        data
      );
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message, { position: "bottom-right" });
      } else {
        toast.error(res.data.message, { position: "bottom-right" });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, { position: "top-center" });
      } else {
        console.log(error);
        toast.error("Error while registration", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-2">
          <h2 className="md:text-5xl text-4xl font-bold leading-snug ">
            Ready to get
          </h2>
          <h2 className="text-green md:text-5xl text-4xl my-3 font-bold">
            Started?
          </h2>
          <p className="text-xl text-[#4A4A4A] mt-8">
            "Register now to access exclusive features and elevate your
            agricultural trading experience with AgroSage."
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body bg-white shadow-md rounded-lg p-8"
          method="dialog"
        >
          <h3 className="font-bold text-center text-xl mb-4">
            Create an Account
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-[#ff0000] text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered w-full"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <span className="text-[#ff0000] text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">CNIC</span>
              </label>
              <input
                type="text"
                placeholder="cnic"
                className="input input-bordered w-full"
                {...register("cnic", {
                  required: "CNIC is required",
                  pattern: {
                    value: /^[0-9]{13}$/,
                    message: "CNIC must be 13 digits",
                  },
                })}
              />
              {errors.cnic && (
                <span className="text-[#ff0000] text-sm">
                  {errors.cnic.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone No</span>
              </label>
              <input
                type="text"
                placeholder="phone"
                className="input input-bordered w-full"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Phone number must be 11 digits",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-[#ff0000] text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Choose role type</span>
              </label>
              <select
                {...register("userRole", {
                  required: "Role type is required",
                })}
                className="select select-success w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Register as?
                </option>
                <option value="Company">Company</option>
                <option value="Retailer">Retailer</option>
              </select>
              {errors.userRole && (
                <span className="text-[#ff0000] text-sm">
                  {errors.userRole.message}
                </span>
              )}
            </div>
            <div className="form-control col-span-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <span className="text-[#ff0000] text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              value="Register"
              type="submit"
              className="btn bg-green text-white w-full"
            />
          </div>
          <p className="text-center my-2">
            Already have an account?
            <button
              type="button"
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="underline text-red ml-1"
            >
              Login
            </button>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
      </div>
      <ToastContainer />
      <Modal />
    </div>
  );
};

export default Register;

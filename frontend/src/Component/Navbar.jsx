import React, { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { ImLeaf } from "react-icons/im";
import Modal from "./Modal";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import Profile from "./Profile";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const [isStickey, setStickey] = useState(false);

  useEffect(() => {
    const HandleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setStickey(true);
      } else {
        setStickey(false);
      }
    };
    window.addEventListener("scroll", HandleScroll);

    return () => {
      window.addEventListener("scroll", HandleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/products">Products</a>
      </li>
      <li>
        <a href="/collaborate">Collaborate with us</a>
      </li>
      <li>
        <a href="/financialhub">Financial Hub</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div
        className={`navbar xl:px-15 ${
          isStickey
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a href="/" className="flex items-center justify-center px-1">
            <ImLeaf style={{ color: "green" }} />
          </a>
          <a className="font-bold" href="/">
            AGROSAGE
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/** cart items  */}
          <Link to="/cartpage">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-3 lg:flex hidden items-center justify-center "
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart?.length}
                </span>
              </div>
            </div>
          </Link>
          {!auth?.user ? (
            <>
              {" "}
              <button
                className="btn bg-green text-white rounded-full px-6 flex items-center gap-2 mr-2"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                <CiLogin /> login
              </button>
              <button
                className="btn bg-green text-white rounded-full px-6 flex items-center gap-2 "
                onClick={() => {
                  navigate("/register");
                }}
              >
                <MdOutlineAssignmentInd /> Register
              </button>
            </>
          ) : (
            <>
              <Profile user={auth.user} />
            </>
          )}

          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

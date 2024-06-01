import React from "react";
import { Link, Outlet } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { MdRequestPage } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { ImLeaf } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import { BsCashCoin } from "react-icons/bs";
import { MdOutlinePreview } from "react-icons/md";
import { SiPowerpages } from "react-icons/si";
import { TfiViewList } from "react-icons/tfi";

const AdminDashboardLayout = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboard />
            </label>
            <button className="btn bg-green text-white sm:hidden flex items-center gap-2 rounded-full px-6">
              <FaUser />
              Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <ToastContainer />
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {auth.user && auth.user.userRole === "Company" ? (
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <a className="font-bold flex justify-start mb-5">
                  <ImLeaf style={{ color: "green" }} />
                  AGROSAGE
                  <span className="badge badge-primary">Company</span>
                </a>
              </li>
              <li>
                <Link to="/admindashboard">
                  <IoIosCreate />
                  Add Product
                </Link>
              </li>
              <li>
                <Link to="companyproducts">
                  <FaProductHunt />
                  Products
                </Link>
              </li>
              <li>
                <Link to="retailers">
                  <FaUsers />
                  Retailers
                </Link>
              </li>
              <li>
                <Link to="orders">
                  <SiPowerpages />
                  Orders
                </Link>
              </li>
              <li>
                <Link to="schedule">
                  <AiFillSchedule />
                  Schedule Meeting
                </Link>
              </li>
              <li>
                <Link to="viewschedule">
                  <MdOutlinePreview />
                  View Schedules
                </Link>
              </li>
              <li>
                <Link to="viewloans">
                  <MdOutlinePreview />
                  View Loan Request
                </Link>
              </li>
              <li>
                <Link to="addpayment">
                  <BsCashCoin />
                  Add Payment Details
                </Link>
              </li>
              <li>
                <Link to="viewpayment">
                  <TfiViewList />
                  View Payment Details
                </Link>
              </li>

              <li>
                <a href="/">
                  <FaHome />
                  Home
                </a>
              </li>
            </ul>
          ) : (
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <a className="font-bold flex justify-start mb-5">
                  <ImLeaf style={{ color: "green" }} />
                  AGROSAGE
                  <span className="badge badge-primary">Retailer</span>
                </a>
              </li>

              <li>
                <Link to="companies">
                  <FaUsers />
                  Companies
                </Link>
              </li>
              <li>
                <Link to="orders">
                  <SiPowerpages />
                  Orders
                </Link>
              </li>
              <li>
                <Link to="addpayment">
                  <BsCashCoin />
                  Add Payment Details
                </Link>
              </li>
              <li>
                <Link to="viewpayment">
                  <TfiViewList />
                  View Payment Details
                </Link>
              </li>
              <li>
                <Link to="applyforloan">
                  <BsCashCoin />
                  Apply for Loan
                </Link>
              </li>
              <li>
                <Link to="viewloans">
                  <MdOutlinePreview />
                  View Loan Request
                </Link>
              </li>
              <li>
                <Link to="schedule">
                  <AiFillSchedule />
                  Schedule Meeting
                </Link>
              </li>
              <li>
                <Link to="viewschedule">
                  <MdOutlinePreview />
                  View Schedules
                </Link>
              </li>

              <li>
                <a href="/">
                  <FaHome />
                  Home
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

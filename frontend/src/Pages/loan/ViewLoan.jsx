import React from "react";
import { Outlet, Link } from "react-router-dom";

const ViewLoan = () => {
  return (
    <div className="flex items-center justify-between m-6  w-full">
      <div>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="w-full navbar bg-base-200 flex items-center justify-between">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="flex  items-center justify-between">
                {" "}
                <div className="flex-1 px-2 mx-2 font-bold text-green">
                  All loan Request
                </div>
                <div className="flex-none hidden lg:block">
                  <ul className="menu menu-horizontal">
                    {/* Navbar menu content here */}
                    <li>
                      <Link to="pendingloans">Pending loan requests</Link>
                    </li>
                    <li>
                      <Link to="acceptedloans">Accepted loan requests</Link>
                    </li>
                    <li>
                      <Link to="paidloans">Paid loan requests </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200">
              {/* Sidebar content here */}
              <li>
                <Link to="pendingloans">Pending loan requests</Link>
              </li>
              <li>
                <Link to="acceptedloans">Accepted loan requests</Link>
              </li>
              <li>
                <Link to="paidloans">Paid loan requests </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLoan;

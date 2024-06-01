import React from "react";

const Aboutus = () => {
  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
          <div className="md:w-1/2">
            <img src="/src/assets/about2.png" alt="" />
          </div>

          <div className="md:w-1/2 space-y-7 px-4 ">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Streamline your Agricultural trades and communications using{" "}
              <span className="text-green">AgroSage</span>
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Get started by creating your account on Agrosage
            </p>
            <button className="btn bg-green rounded-full px-8 py-3 font-semibold text-white">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;

import React from "react";
import { useNavigate } from "react-router-dom";

const Collaborate = () => {
  const navigate = useNavigate();

  const handlesubmit = () => {
    navigate("/register");
  };
  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col  justify-center items-center gap-8">
          <div className="text-center space-y-7 px-4 ">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Join Us and Streamline Your Trades and Communications
              <span className="text-green"> Today</span>
            </h2>
            <p className="text-xl text-[#4A4A4A]  md:w-4/5 mx-auto">
              Enhance your business by becoming a retailer or a company on
              AgroSage. Effortlessly place orders and redefine your ordering
              experience. Join now for a seamless future in agricultural
              commerce.
            </p>

            <button
              className="btn bg-green rounded-full px-8 py-3  font-semibold text-white"
              onClick={handlesubmit}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;

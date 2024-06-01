import React from "react";
import { useNavigate } from "react-router-dom";

const FinancialHub = () => {
  const navigate = useNavigate();
  const handleclick = async () => {
    navigate("/admindashboard/applyforloan");
  };
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        <div className="md:w-1/2">
          <img src="/src/assets/loan.png" alt="" />
        </div>

        <div className="md:w-1/2 space-y-10 px-4 ">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Explore our Financial Hub, Empower Your Business using{" "}
            <span className="text-green">AgroSage</span>
          </h2>

          <p className="text-xl text-[#4A4A4A]">
            Unlock growth opportunities with our Financial Hub. Seamlessly
            manage your business finances, secure loans, and fuel expansion all
            from one central location. Take your business to new heights with
            ease and confidence.
          </p>
          <button
            className="btn bg-green rounded-full px-8 py-3 font-semibold text-white"
            onClick={handleclick}
          >
            Apply For Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialHub;

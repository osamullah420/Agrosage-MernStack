import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addpayment = () => {
  const [accountnumber, setAccountnumber] = useState("");
  const [accountname, setAccountname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        accountname,
        accountnumber,
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/payment/addpayment",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data && data.success) {
        navigate("/admindashboard/viewpayment");
        toast.success(data.message, {
          position: "bottom-right",
        });
      } else {
        toast.error(data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong!", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Add your Payment Details to <span className="text-green">AgroSage</span>
      </h2>
      {/**form */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Select Account</span>
            </label>
            <select
              className="select select-bordered"
              defaultValue=""
              onChange={(e) => setAccountname(e.target.value)}
            >
              <option defaultValue="">Select Account</option>
              <option value="jazzcash">Jazz Cash</option>
              <option value="easypaisa">Easy Paisa</option>
              <option value="MCB">MCB</option>
              <option value="HBL">HBL</option>
              <option value="allied">Allied Bank</option>
            </select>
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Account Number</span>
            </label>
            <input
              type="number"
              placeholder="Account Number"
              value={accountnumber}
              onChange={(e) => setAccountnumber(e.target.value)}
              className="input input-bordered w-full "
            />
          </div>

          <button type="submit" className="btn bg-green text-white my-4 px-6">
            Add Payment Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpayment;

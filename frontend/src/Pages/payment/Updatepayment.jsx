import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Updatepayment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [accountname, setAccountName] = useState("");
  const [accountnumber, setAccountNumber] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [auth] = useAuth();

  useEffect(() => {
    if (auth.token) {
      getPaymentDetails();
    }
  }, [auth.token, params.paymentId]);

  const getPaymentDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/payment/getsinglepayment/${params.paymentId}`,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setAccountName(data.paymentDetail.accountname); // Updated this line
      setAccountNumber(data.paymentDetail.accountnumber); // Updated this line
      setPaymentId(params.paymentId);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching payment details", {
        position: "bottom-right",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/payment/updatepayment/${paymentId}`,
        {
          accountname: accountname,
          accountnumber: accountnumber,
        }
      );

      if (data?.message) {
        toast.success(data.message, {
          position: "bottom-right",
        });
        // Redirect to another page after successful update
        navigate("/admindashboard/viewpayment");
      } else {
        toast.error("Failed to update payment details", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update your Payment <span className="text-green">Details</span>
      </h2>
      {/**form */}
      <div>
        <form onSubmit={handleUpdate}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Account Name</span>
            </label>
            <select
              className="select select-bordered"
              value={accountname} // Updated this line
              onChange={(e) => setAccountName(e.target.value)} // Updated this line
            >
              <option value="">Select Account</option>
              <option value="jazzcash">Jazz Cash</option>
              <option value="easypaisa">Easy Paisa</option>
              <option value="MCB">MCB</option>
              <option value="HBL">HBL</option>
              <option value="allied">Allied Bank</option>
            </select>
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Account number</span>
            </label>

            <input
              type="number"
              placeholder="Account number"
              value={accountnumber} // Updated this line
              onChange={(e) => setAccountNumber(e.target.value)} // Updated this line
              className="input input-bordered w-full "
            />
          </div>

          <button type="submit" className="btn bg-green text-white my-4 px-6">
            Update payment Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatepayment;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ReturnLoan = ({ loanId, companyId }) => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [companyPayment, setCompanyPayment] = useState([]);
  const [returnReceipt, setReturnReceipt] = useState("");

  const returnReceiptHandler = (e) => {
    const file = e.target.files[0];
    setReturnReceipt(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("returnReceipt", returnReceipt);

      const res = await axios.put(
        `http://localhost:8080/api/v1/loans/${loanId}/returnloan`,
        formdata,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      if (res && res.data.success) {
        document.getElementById("my_modal_8").close();
        navigate("/admindashboard");
        toast.success(res.data && res.data.message, {
          position: "bottom-right",
        });
      } else {
        toast.error(res.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    const getCompanyPayment = async () => {
      try {
        // Ensure companyId is not null before making the request
        if (companyId) {
          const res = await axios.get(
            `http://localhost:8080/api/v1/loans/getloanpaymentdetails/${companyId}`
          );
          setCompanyPayment(res.data.paymentDetails);
        }
      } catch (error) {
        console.log("error while fetching payment details :", error);
      }
    };
    getCompanyPayment();
  }, [companyId]); // Add companyId to the dependency array
  return (
    <dialog id="my_modal_8" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex:col justify-center mt-0">
          <div>
            <h2 className="text-2xl font-semibold my-4">
              Payment <span className="text-green">Details</span>
            </h2>
            {companyPayment.map((item, i) => (
              <div key={i}>
                <div className="mt-4">
                  <span className="font-bold">Account Name:</span>{" "}
                  {item.accountname}
                </div>
                <div>
                  <span className="font-bold">Account Number:</span>{" "}
                  {item.accountnumber}
                </div>
              </div>
            ))}
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Upload Receipt</span>
                </label>
                <input
                  accept="image/*"
                  type="file"
                  onChange={returnReceiptHandler}
                  className="file-input file-input-bordered  w-full max-w-xs"
                />
              </div>
              {returnReceipt && (
                <div className="form-control w-full my-6">
                  <img
                    src={URL.createObjectURL(returnReceipt)}
                    alt="loan_return_receipt"
                    className="img img-responsive"
                    style={{ maxWidth: "20%", height: "20%" }}
                  />
                </div>
              )}

              <div>
                {" "}
                <button
                  type="submit"
                  className="btn bg-green text-white my-4 px-6"
                >
                  Upload Receipt
                </button>
              </div>
            </form>
          </div>
          <button
            onClick={() => document.getElementById("my_modal_8").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReturnLoan;

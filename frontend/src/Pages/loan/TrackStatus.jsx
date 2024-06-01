import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { useParams } from "react-router-dom";
import ImageModal from "../order/ImageModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Component/Spinner";
import { SiPiaggiogroup } from "react-icons/si";

const TrackStatus = () => {
  const [unpaidLoans, setUnpaidLoans] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loanReceipt, setLoanReceipt] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [auth] = useAuth();
  const { retailerId, loanId } = useParams();
  const [retailerPayment, setRetailerPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const navigate = useNavigate();

  const loanReceiptHandle = (e) => {
    const file = e.target.files[0];
    setLoanReceipt(file);
  };

  console.log(retailerId);

  useEffect(() => {
    const getUnpaidLoans = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/loans/unpaid/${retailerId}`,
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        setUnpaidLoans(response.data.loans);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching unpaid loans:", error);
        setLoading(false);
      }
    };

    if (retailerId && auth.token) {
      getUnpaidLoans();
    }
  }, [retailerId, auth.token]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/loans/orders/${retailerId}`,
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        setOrders(response.data.orders);
        setLoading1(false);
      } catch (error) {
        console.error("Error fetching unpaid loans:", error);
        setLoading1(false);
      }
    };

    if (retailerId && auth.token) {
      getOrders();
    }
  }, [retailerId, auth.token]);

  useEffect(() => {
    const getRetailerPayment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/loans/getloanpaymentdetails/${retailerId}`
        );
        setRetailerPayment(res.data.paymentDetails);
      } catch (error) {
        console.log("error while fetching payment details :", error);
      }
    };
    getRetailerPayment();
  }, []);

  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("loanReceipt", loanReceipt); // Append the file to FormData

      // Send request to backend with FormData containing the file
      console.log("my formdata", formData);
      const res = await axios.put(
        `http://localhost:8080/api/v1/loans/${loanId}/accept`,
        formData,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      if (res && res.data.success) {
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

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/loans/${loanId}/reject`,

        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      if (res && res.data.success) {
        // Handle success
        navigate("/admindashboard");
        toast.success(res.data.message, {
          position: "bottom-right",
        });
      } else {
        // Handle failure
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

  return (
    <div className="w-full  px-4 mx-auto">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="flex  items-center justify-between m-4 ">
            <h5 className="text-2xl font-semibold my-4">
              Unpaid <span className="text-green">Loans</span>
            </h5>
            <h5 className="text-2xl font-semibold my-4">
              Total Unpaid Loans: {unpaidLoans.length}{" "}
            </h5>
          </div>
          {/**table */}
          <div>
            <div className="overflow-x-auto">
              {unpaidLoans.length === 0 ? (
                <h2 className="text-center text-2xl font-semibold my-4">
                  No Unpaid Loans Available
                </h2>
              ) : (
                <table className="table text-center table-zebra md:w-[1200px]">
                  {/* head */}
                  <thead className="bg-green text-white rounded-lg">
                    <tr>
                      <th>#</th>
                      <th>Retailer</th>
                      <th>Company</th>
                      <th>Amount</th>
                      <th>Duration</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Return Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row  */}
                    {unpaidLoans.map((item, index) => {
                      const Enddate = new Date(item.endDate);
                      const Startdate = new Date(item.startDate);
                      const displayendDate = Enddate.toLocaleDateString();
                      const displaystartDate = Startdate.toLocaleDateString();

                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{item.currentUserId.name}</td>
                          <td>{item.targetUserId.name}</td>
                          <td>{item.loanAmount} PKR</td>

                          <td>{item.loanDuration} months</td>
                          <td>{displaystartDate}</td>
                          <td>{displayendDate}</td>
                          <td
                            className={`status-${item.loanReturnStatus.toLowerCase()}`}
                          >
                            {item.loanReturnStatus}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
      {loading1 ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="flex  items-center justify-between m-4 ">
            <h5 className="text-2xl font-semibold my-4">
              Order <span className="text-green">History</span>
            </h5>
            <h5 className="text-2xl font-semibold my-4">
              Total Orders: {orders.length}{" "}
            </h5>
          </div>
          {/**table */}
          <div>
            <div className="overflow-x-auto">
              {orders.length === 0 ? (
                <h2 className="text-center text-2xl font-semibold my-4">
                  No Order Available
                </h2>
              ) : (
                <table className="table text-center table-zebra md:w-[1200px]">
                  {/* head */}
                  <thead className="bg-green text-white rounded-lg">
                    <tr>
                      <th>#</th>
                      <th>Buyer</th>
                      <th>Company</th>
                      <th>Order Date</th>
                      <th>Receipt</th>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row  */}
                    {orders.map((item, index) => {
                      const orderDate = new Date(item.orderDate);
                      const displayDate = orderDate.toLocaleDateString();
                      const displayTime = orderDate.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true, // This ensures you get the AM/PM part
                        }
                      );

                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{item.buyerId.name}</td>
                          <td>{item.companyId.name}</td>
                          <td>
                            {displayDate} at {displayTime}
                          </td>
                          <td>
                            <a
                              class="group  transition-all duration-300 ease-in-out"
                              onClick={() => {
                                setSelectedImage(
                                  item.receipt && item.receipt.url
                                );
                                document
                                  .getElementById("my_modal_7")
                                  .showModal();
                              }}
                            >
                              <span class="bg-left-bottom  bg-gradient-to-r from-green to-green bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                                View receipt
                              </span>
                            </a>
                          </td>
                          <td>{item.totalProducts}</td>
                          <td>$ {item.totalPrice}</td>
                          <td className={`status-${item.status.toLowerCase()}`}>
                            {item.status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
      <div className="w-full px-4 md:w-[1200px] my-10 mx-auto">
        <h2 className="text-2xl font-semibold mt-20">
          Approve<span className="text-green"> Request</span>
        </h2>
        {/**form */}
        <div>
          <h2 className="text-2xl font-semibold my-4">
            Payment <span className="text-green">Details</span>
          </h2>
          {retailerPayment.map((item, i) => (
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
          <form onSubmit={handleAccept}>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Upload Receipt</span>
              </label>
              <input
                accept="image/*"
                type="file"
                onChange={loanReceiptHandle}
                className="file-input file-input-bordered  w-full max-w-xs"
              />
            </div>
            {loanReceipt && (
              <div className="form-control w-full my-6">
                <img
                  src={URL.createObjectURL(loanReceipt)}
                  alt="loan_receipt"
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
                Approve Request
              </button>
              <button
                className="btn bg-red text-white mx-4 my-4 px-6"
                onClick={handleReject}
              >
                Reject Request
              </button>
            </div>
          </form>
        </div>
      </div>
      <ImageModal imageUrl={selectedImage} />
    </div>
  );
};

export default TrackStatus;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Spinner from "../../Component/Spinner";

const UserPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  // Fetch payment details for authenticated user
  const fetchUserPayments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/payment/getpayment",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setPayments(data.paymentDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user payments:", error);
      toast.error("Error fetching user payments", {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      fetchUserPayments(); // Fetch payments only when the token is available
    }
  }, [auth.token]);

  const handleDelete = async (paymentId) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete the payment Detail?"
      );
      if (!answer) return;
      const res = await axios.delete(
        `http://localhost:8080/api/v1/payment/deletepayment/${paymentId}`,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      fetchUserPayments();

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
        });
      } else {
        toast.error(res.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <div className="flex  items-center justify-between m-4">
        <h2 className="text-2xl font-semibold my-4">
          Your Payment <span className="text-green">Details</span>
        </h2>
        <h2 className="text-2xl font-semibold my-4">
          Total payments: {payments.length}
        </h2>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div>
            <div className="overflow-x-auto">
              {payments.length === 0 ? (
                <h2 className="text-center  text-2xl font-semibold my-4">
                  No payments available
                </h2>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Account Name</th>
                      <th>Account Number</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{payment.accountname}</td>
                        <td>{payment.accountnumber}</td>
                        <td>
                          <a href={`updatepayment/${payment._id}`}>
                            <button className="btn bg-success text-white btn-xs">
                              <FaEdit />
                            </button>
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn bg-red text-white btn-xs"
                            onClick={() => handleDelete(payment._id)}
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPayments;

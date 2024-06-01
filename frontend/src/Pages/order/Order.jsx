import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import ImageModal from "./ImageModal";
import { toast } from "react-toastify";
import Spinner from "../../Component/Spinner";
import Feedback from "../feedback/Feedback";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  // Function to fetch orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/orders/getordersbyid",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setOrders(data.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ", {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.token) {
      getOrders(); // Fetch orders only when the token is available
    }
  }, [auth.token]);

  // Function to handle confirming an order
  const handleConfirmOrder = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/orders/confirmorder/${orderId}`,
        {},
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
        });
        // Refresh orders after updating
        getOrders();
      } else {
        toast.error(res.data.message, {
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

  // Function to handle cancelling an order
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/orders/cancelorder/${orderId}`,
        {},
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
        });
        // Refresh orders after updating
        getOrders();
      } else {
        toast.error(res.data.message, {
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
    <div className="w-full  px-4 mx-auto">
      <div className="flex items-center justify-between m-4 gap-[40rem] ">
        <h5 className="text-2xl font-semibold my-4">
          All <span className="text-green">Orders</span>
        </h5>
        <h5 className="text-2xl font-semibold my-4">
          Total Orders: {orders.length}{" "}
        </h5>
      </div>
      {/**table */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <h2 className="text-center text-2xl font-semibold my-4">
                No Orders available
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
                    {auth?.user?.userRole === "Company" && (
                      <>
                        <th>Confirm</th>
                        <th>Cancel</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* row  */}
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.buyerId.name}</td>
                      <td>{order.companyId.name}</td>
                      <td>
                        {new Date(order.orderDate).toLocaleString("en-US")}
                      </td>
                      <td>
                        <a
                          className="group  transition-all duration-300 ease-in-out"
                          onClick={() => {
                            setSelectedImage(
                              order.receipt && order.receipt.url
                            );
                            document.getElementById("my_modal_7").showModal();
                          }}
                        >
                          <span className="bg-left-bottom  bg-gradient-to-r from-green to-green bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                            View receipt
                          </span>
                        </a>
                      </td>
                      <td>
                        <ul>
                          {order.products.map((product, index) => (
                            <li key={index}>
                              {product.quantity} x {product.productname}
                              {auth?.user?.userRole === "Retailer" &&
                                order.status === "Completed" &&
                                product.feedbackStatus === "no" && ( // Check product status
                                  <button
                                    className="btn btn-sm bg-[#4caf50] text-white ml-3"
                                    onClick={() => {
                                      setSelectedProductId(product.productId);
                                      document
                                        .getElementById("my_modal_9")
                                        .showModal();
                                    }}
                                  >
                                    Give Feedback
                                  </button>
                                )}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>${order.totalPrice}</td>
                      <td className={`status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </td>

                      {auth?.user?.userRole === "Company" &&
                        order.status === "Pending" && (
                          <>
                            <td>
                              <button
                                className="btn btn-sm bg-[#008CBA] text-white mr-3"
                                onClick={() => handleConfirmOrder(order._id)}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm bg-[#f44336] text-white mr-3"
                                onClick={() => handleCancelOrder(order._id)}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      <Feedback productId={selectedProductId} />

      <ImageModal imageUrl={selectedImage} />
    </div>
  );
};

export default Order;

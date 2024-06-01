import React, { useState, useEffect } from "react";
import { useCart } from "../../context/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [receipt, setReceipt] = useState("");
  const navigate = useNavigate();
  const [cart] = useCart();
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    const fetchPaymentDetails = async (uploadedById) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/payment/getpaymentorder/${uploadedById}`
        );
        const { paymentDetails } = response.data;
        setPaymentDetails((prevState) => ({
          ...prevState,
          [uploadedById]: paymentDetails,
        }));
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    // Fetch payment details for each unique uploadedBy_id
    const uploadedByIds = [...new Set(cart.map((item) => item.uploadedBy_id))];
    uploadedByIds.forEach((uploadedById) => {
      if (!paymentDetails[uploadedById]) {
        fetchPaymentDetails(uploadedById);
      }
    });
  }, [cart, paymentDetails]);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      // Convert total to Pakistani Rupees (Rs)
      return new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
      }).format(total);
    } catch (error) {
      console.log(error);
      return "Error calculating total price";
    }
  };

  const receiptHandler = (e) => {
    const file = e.target.files[0];
    setReceipt(file);
  };

  //place order
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("address", address);
      formData.append("receipt", receipt); // Assuming image is an array of File objects
      formData.append("cart", JSON.stringify(cart)); // Convert cart array to JSON string

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/orders/addorder",
        formData
      );

      if (data?.success) {
        // Clear cart data from local storage
        localStorage.removeItem("cart");

        navigate("/admindashboard/orders");

        toast.success(data?.message, {
          position: "bottom-right",
        });
      } else {
        toast.error(data?.message, {
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
    <div className="max-w-screen-xl container mx-auto xl:px-24 px-4 py-28">
      <div className="flex flex-col  justify-between items-start gap-8">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row justify-between">
            <h2 className="text-2xl font-semibold my-4">
              Checkout <span className="text-green">Page</span>
            </h2>
            <h2 className="text-2xl font-semibold my-4">
              Total Price : {totalPrice()}
            </h2>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra md:w-[870px]">
                <thead className="bg-green text-white rounded-lg">
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Company</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.name}</td>
                      <td>Rs {item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.uploadedBy_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold my-4">
              Payment <span className="text-green">Details</span>
            </h2>
            {Object.entries(paymentDetails).map(([uploadedById, details]) => (
              <div key={uploadedById}>
                {details.length === 0 ? (
                  <h2 className="text-xl font-semibold my-4">
                    No payment details from company
                  </h2>
                ) : (
                  <>
                    {" "}
                    {details.map((detail, i) => (
                      <div key={i}>
                        <div>
                          <span className="font-bold">Account Name:</span>{" "}
                          {detail.accountname}
                        </div>
                        <div>
                          <span className="font-bold">Account Number:</span>{" "}
                          {detail.accountnumber}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <form onSubmit={HandleSubmit}>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input input-bordered w-full "
                />
              </div>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Upload Receipt</span>
                </label>
                <input
                  accept="image/*"
                  type="file"
                  onChange={receiptHandler}
                  className="file-input file-input-bordered  w-full max-w-xs"
                />
              </div>
              {receipt && (
                <div className="form-control w-full my-6">
                  <img
                    src={URL.createObjectURL(receipt)}
                    alt="receipt"
                    className="img img-responsive"
                    style={{ maxWidth: "20%", height: "20%" }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn bg-green text-white my-4 px-6"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

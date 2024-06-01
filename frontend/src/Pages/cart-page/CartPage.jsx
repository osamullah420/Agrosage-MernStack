import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/Cart";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const HandleDeleteCartItem = (item_id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === item_id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from the cart", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
      toast.error("error while removing the item ", {
        position: "bottom-right",
      });
    }
  };

  // Update handleQuantityChange function in CartPage
  const handleQuantityChange = (itemId, newQuantity) => {
    try {
      newQuantity = Math.max(newQuantity, 1);

      const updatedCart = cart.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      const prevQuantity = cart.find((item) => item._id === itemId)?.quantity;
      if (newQuantity === 1 && prevQuantity === 1) {
        toast.error("Quantity cannot be less than 1", {
          position: "bottom-right",
        });
      } else {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const totalitems = () => {
    try {
      let totalitems = 0;
      cart.forEach((item) => {
        totalitems += item.quantity;
      });
      return totalitems;
    } catch (error) {
      console.log(error);
      return "Error while calculating total items";
    }
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!", {
        position: "bottom-right",
      });
    } else {
      window.location.href = "/checkout";
    }
  };
  return (
    <div className="section-container">
      {/** BANNER  */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-24 flex flex-col  justify-center items-center gap-8">
          <div className=" space-y-7 px-4 ">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items added to <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/** tables */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Item name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.photo && item.photo.url} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      className="w-10 mx-2 text-center overflow-hidden appearence-none"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                    />
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>Rs {item.price}</td>
                  <th>
                    <button
                      className="btn btn-ghost text-red btn-xs"
                      onClick={() => HandleDeleteCartItem(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/**buyer details  */}

      <div className="my-20 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Buyer Details</h3>
          <p>Name : {auth?.user?.name}</p>
          <p>Email : {auth?.user?.email}</p>
          <p>Phone : {auth?.user?.phone}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Shopping Details</h3>
          <p>Total Items: {totalitems()}</p>
          <p>Total Price: {totalPrice()}</p>
          <div>
            <button
              className=" btn bg-green text-white"
              onClick={proceedToCheckout}
            >
              Procceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

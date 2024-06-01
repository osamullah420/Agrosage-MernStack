import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const Cards = ({ item }) => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (cart.length > 0) {
      const cartCompanyId = cart[0].uploadedBy_id;
      if (product.uploadedBy_id !== cartCompanyId) {
        toast.error("You can only add products from one company at a time", {
          position: "bottom-right",
        });
        return;
      }
    }

    const existingItemIndex = cart.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      toast.success("Item Added to cart", {
        position: "bottom-right",
      });
    }
  };

  const DetailHandlear = (itemId) => {
    navigate(`/productdetails/${itemId}`);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl relative">
      <figure>
        <Link to="">
          <img
            src={item.photo && item.photo.url}
            alt=""
            className="hover:scale-105 transition-all duration-200 h-60"
          />
        </Link>
      </figure>
      <div className="card-body">
        <div className="flex flex-row justify-between items-center">
          <h2 className="card-title">{item.name}</h2>
          <h2 className="flex flex-row items-center font-bold px-2">
            <FaStar className="text-[#ffd700]" /> {item.rating} ({" "}
            {item.numReviews} )
          </h2>
        </div>
        <p className="description overflow-hidden whitespace-nowrap overflow-ellipsis">
          {item.description}
        </p>
        <div className="card-actions justify-between items-center mt-2">
          <p className="my-2 font-bold">
            <span className="text-red">Company:</span> {item.uploadedBy_name}
          </p>
          <h5 className="font-semibold mr-3">
            <span className="text-sm text-red">Rs</span>
            {item.price}
          </h5>
        </div>
        <div className="flex flex-row items-center justify-between">
          <button
            className="btn bg-[#0000FF] text-white px-8"
            onClick={() => DetailHandlear(item._id)}
          >
            Details
          </button>
          <button
            className="btn bg-green text-white"
            onClick={() => {
              addToCart(item);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;

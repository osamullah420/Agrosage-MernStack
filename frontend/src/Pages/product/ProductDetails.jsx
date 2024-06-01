import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/getsingleproduct/${params.id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching product details", {
          position: "bottom-right",
        });
      }
    };

    fetchProduct();
  }, [params.id]);

  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
      {product && (
        <div className="py-24 flex flex-col  gap-8">
          <div className="flex flex-col md:flex-row  items-center  gap-40">
            <div className="flex-shrink-0">
              <img
                src={product.photo.url}
                alt={product.name}
                className="w-64 h-auto rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <span className="inline-block font-bold text-xl mt-2">
                Description :
              </span>
              <p className="text-gray-700 my-2 text-xl">
                {product.description}
              </p>
              <div className="flex flex-row items-center gap-2">
                {" "}
                <p className="font-bold text-xl">Price:</p>
                <p className="text-red">Rs {product.price}</p>
              </div>
              <div className="flex flex-row items-center text-xl gap-2">
                <p className="font-bold  my-2">Company:</p>
                <p>{product.uploadedBy_name}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold mt-8 mb-4 text-gray-800">
              Reviews
            </h2>
            {product.reviews.length > 0 ? (
              <ul className="flex flex-col  items-start gap-5">
                {product.reviews.map((review) => (
                  <li key={review._id} className="mb-4 mt-10">
                    <div className="flex flex-row items-center gap-10">
                      {" "}
                      <p className="text-gray-800 font-bold">Reviewed by:</p>
                      <div className="flex flex-row items-center">
                        <FaStar className="text-[#ffd700]" />
                        <p className="text-gray-800"> {review.rating}</p>
                      </div>
                    </div>
                    {review.userId.name}
                    <p className="text-gray-700 font-bold">Comment: </p>
                    {review.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800">No reviews yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

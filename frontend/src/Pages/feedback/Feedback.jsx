import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";

const Feedback = ({ productId }) => {
  const [auth] = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/reviews/reviews/${productId}`,
        { comment, rating },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "bottom-right",
        });
        // Close the modal after successful submission
        document.getElementById("my_modal_9").close();
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", {
        position: "bottom-right",
      });
    }
  };

  return (
    <dialog id="my_modal_9" className="modal modal-middle sm:modal-middle">
      <div className="modal-box  bg-gray-200">
        <div className="modal-action flex flex:col justify-center mt-0 ">
          <div className="p-8 rounded-md">
            <h2 className="text-2xl font-bold text-green mb-4">
              Give Feedback
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-green-700"
                >
                  Rating
                </label>
                <div className="rating flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      name="rating"
                      value={star}
                      onChange={() => setRating(parseInt(star))}
                      className="mask mask-star-2 bg-orange-400"
                      checked={parseInt(star) === rating}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-green-700"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className=" my-2 p-2 block w-full rounded-md"
                ></textarea>
              </div>
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="btn btn-ghost bg-green text-white py-2 px-4 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <button
            onClick={() => document.getElementById("my_modal_9").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Feedback;

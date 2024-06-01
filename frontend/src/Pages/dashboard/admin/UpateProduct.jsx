import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const photoHandler = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    // Create a URL for the selected image file
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        ` http://localhost:8080/api/v1/products/getsingleproduct/${params.id}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category);
      setId(data.product._id);
      if (data.product.photo && data.product.photo.url) {
        setImageUrl(data.product.photo.url);
        setPhoto(data.product.photo); // Store the existing photo details
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching product details", {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
    return () => {
      // Clean up the URL object for the photo to prevent memory leaks
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      if (photo && photo.url) {
        productData.append("photoUrl", photo.url); // Send existing photo URL if no new photo is selected
      } else if (photo) {
        productData.append("photo", photo);
      }
      productData.append("category", category);

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/products/updateproduct/${id}`,
        productData
      );

      if (data?.success) {
        toast.success(data?.message, {
          position: "bottom-right",
        });
        navigate("/admindashboard/companyproducts");
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
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update your <span className="text-green">Product</span>
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Select Category</span>
                </label>
                <select
                  className="select select-bordered"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="default" disabled>
                    Choose Category
                  </option>
                  <option value="seed">Seed</option>
                  <option value="pesticide">Pesticide</option>
                  <option value="machine">Machine</option>
                  <option value="nitrates">Nitrates</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered h-24"
                placeholder="Product Description"
              ></textarea>
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Upload Photo</span>
              </label>
              <input
                accept="image/*"
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={photoHandler}
              />
            </div>
            {imageUrl && (
              <div className="form-control w-full my-6">
                <img
                  src={imageUrl}
                  alt="product_photo"
                  className="img img-responsive"
                  style={{ maxWidth: "20%", height: "20%" }}
                />
              </div>
            )}
            <button
              type="submit"
              className={`btn bg-green text-white my-4 px-6 ${
                isUpdating ? "loading" : ""
              }`}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;

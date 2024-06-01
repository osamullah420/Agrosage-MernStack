import { React, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  const photoHandler = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("photo", photo);
      // Assuming image is an array of File objects

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/products/createproduct",
        formData
      );

      if (data?.success) {
        navigate("/admindashboard/companyproducts");
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
      toast.error("Somthing went wrong", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Add a new Product to <span className="text-green">AgroSage</span>
      </h2>
      {/**form */}
      <div>
        <form onSubmit={HandleSubmit}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Select Category</span>
              </label>
              <select
                className="select select-bordered"
                defaultValue="default"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option defaultValue="">Choose Category</option>
                <option value="seed">Seed</option>
                <option value="pesticide">Pesticide</option>
                <option value="machine">Machine</option>
                <option value="nitrates">Nitrates</option>
              </select>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              accept="image/*"
              type="file"
              onChange={photoHandler}
              className="file-input file-input-bordered  w-full max-w-xs"
            />
          </div>
          {photo && (
            <div className="form-control w-full my-6">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                className="img img-responsive"
                style={{ maxWidth: "20%", height: "20%" }}
              />
            </div>
          )}

          <button type="submit" className="btn bg-green text-white my-4 px-6">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

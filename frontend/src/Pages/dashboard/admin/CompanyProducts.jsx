import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthProvider";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Spinner from "../../../Component/Spinner";

const CompanyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  //Get company products

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/products/getproductsbyid",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setProducts(data.products);
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
      getProducts(); // Fetch products only when the token is available
    }
  }, [auth.token]);

  const handleDelete = async (productId) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete the product?"
      );
      if (!answer) return;
      const res = await axios.delete(
        `http://localhost:8080/api/v1/products/deleteproduct/${productId}`,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      getProducts();

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
          Company <span className="text-green">Products</span>
        </h2>
        <h2 className="text-2xl font-semibold my-4">
          Total products : {products.length}
        </h2>
      </div>
      {/**Menu item table */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div>
            <div className="overflow-x-auto">
              {products.length === 0 ? (
                <h2 className="text-center  text-2xl font-semibold my-4">
                  No products available
                </h2>
              ) : (
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={p.photo && p.photo.url} alt="" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.description}</td>
                        <td>Rs {p.price}</td>
                        <td>
                          <a href={`updateproduct/${p._id}`}>
                            <button className="btn bg-success text-white btn-xs">
                              <FaEdit />
                            </button>
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn bg-red text-white btn-xs"
                            onClick={() => handleDelete(p._id)}
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

export default CompanyProducts;

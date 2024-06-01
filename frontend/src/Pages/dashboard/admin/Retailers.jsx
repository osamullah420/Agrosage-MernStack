import React, { useState, useEffect } from "react";
import axios from "axios";

const Retailers = () => {
  const [retailers, setRetailers] = useState([]);

  //get all retailers
  const getAllRetailers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/users/getallretailers"
      );
      setRetailers(data.retailers);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllRetailers();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between m-4 ">
        <h5 className="text-2xl font-semibold my-4">
          All <span className="text-green">Retailers</span>
        </h5>
        <h5 className="text-2xl font-semibold my-4">
          Total Retailers: {retailers.length}{" "}
        </h5>
      </div>
      {/**table */}

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {retailers.map((retailer, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{retailer.name}</td>
                  <td>{retailer.email}</td>
                  <td>{retailer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Retailers;

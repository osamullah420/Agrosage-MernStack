import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  //get all companies

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/users/getallcompanies"
        );
        setCompanies(data.Companies);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!", {
          position: "bottom-right",
        });
      }
    };
    getAllCompanies();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between m-4 ">
        <h5 className="text-2xl font-semibold my-4">
          All <span className="text-green">Companies</span>
        </h5>
        <h5 className="text-2xl font-semibold my-4">
          Total Companies: {companies.length}{" "}
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
              {companies.map((company, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Companies;

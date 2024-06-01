import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import { toast } from "react-toastify";
import Spinner from "../../../Component/Spinner";

const Pendingloans = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  useEffect(() => {
    const getLoanRequest = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/loans/getallloans",
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );

        setLoanRequests(res.data.loans);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching loan Requests", error);
        toast.success(error, {
          position: "bottom-right",
        });
        setLoading(false);
      }
    };

    if (auth.token) {
      getLoanRequest();
    }
  }, [auth.token]);

  return (
    <div className="w-full  px-4 mx-auto">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex  items-center justify-between m-4 ">
            <h5 className="text-2xl font-semibold my-4">
              Available Loan <span className="text-green">Requests</span>
            </h5>
            <h5 className="text-2xl font-semibold my-4">
              Total Loan Requests: {loanRequests.length}{" "}
            </h5>
          </div>
          {/**table */}

          <div>
            <div className="overflow-x-auto">
              {loanRequests.length === 0 ? (
                <h2 className="text-center text-2xl font-semibold my-4">
                  No Loan Requests available
                </h2>
              ) : (
                <table className="table text-center table-zebra">
                  {/* head */}
                  <thead className="bg-green text-white rounded-lg">
                    <tr>
                      <th>#</th>
                      <th>Retailer</th>
                      <th>Company</th>
                      <th>Amount</th>
                      <th>Duration</th>
                      <th>Installements</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                      {auth?.user?.userRole === "Company" && (
                        <>
                          <th>Action</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* row  */}
                    {loanRequests.map((item, index) => {
                      const Enddate = new Date(item.endDate);
                      const Startdate = new Date(item.startDate);
                      const displayendDate = Enddate.toLocaleDateString();
                      const displaystartDate = Startdate.toLocaleDateString();

                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{item.currentUserId.name}</td>
                          <td>{item.targetUserId.name}</td>
                          <td>{item.loanAmount} PKR</td>

                          <td>{item.loanDuration} months</td>
                          <td>{item.installments.length}</td>
                          <td>{displaystartDate}</td>
                          <td>{displayendDate}</td>
                          <td className={`status-${item.status.toLowerCase()}`}>
                            {item.status}
                          </td>
                          {auth?.user?.userRole === "Company" && (
                            <>
                              <td>
                                <a
                                  href={`/admindashboard/trackloan/${item.currentUserId._id}/${item._id}`}
                                >
                                  <button className="btn btn-sm bg-green text-white ">
                                    Track Status
                                  </button>
                                </a>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
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

export default Pendingloans;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import ImageModal from "../../order/ImageModal";
import Spinner from "../../../Component/Spinner";
import ReturnReceipt from "../ReturnReceipt";

const PaidLoanRequests = () => {
  const [auth] = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [returnReceipt, setReturnReceipt] = useState(null);
  const [paidLoans, setPaidLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPaidLoans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/loans/getpaidloans",
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        setPaidLoans(response.data.loans);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching paid loans:", error);
        setLoading(false);
      }
    };

    if (auth.token) {
      getPaidLoans();
    }
  }, [auth.token]);

  return (
    <div className="w-full px-4 mx-auto">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex items-center justify-between m-4">
            <h5 className="text-2xl font-semibold my-4">
              Paid Loan <span className="text-green">Requests</span>
            </h5>
            <h5 className="text-2xl font-semibold my-4">
              Total Paid Loans: {paidLoans.length}
            </h5>
          </div>
          <div className="overflow-x-auto">
            {paidLoans.length === 0 ? (
              <h2 className="text-center text-2xl font-semibold my-4">
                No Paid Loan Requests available
              </h2>
            ) : (
              <table className="table text-center table-zebra w-full">
                <thead className="bg-green text-white rounded-lg">
                  <tr>
                    <th>#</th>
                    <th>Retailer</th>
                    <th>Company</th>
                    <th>Amount</th>
                    <th>Loan Receipt</th>
                    <th>Duration</th>
                    <th>Installments</th>
                    <th>Status</th>
                    <th>Return Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paidLoans.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <th>{index + 1}</th>
                        <td>{item.currentUserId.name}</td>
                        <td>{item.targetUserId.name}</td>
                        <td>{item.loanAmount} PKR</td>
                        <td>
                          <a
                            className="group transition-all duration-300 ease-in-out"
                            onClick={() => {
                              setSelectedImage(
                                item.loanReceipt && item.loanReceipt.url
                              );
                              document.getElementById("my_modal_7").showModal();
                            }}
                          >
                            <span className="bg-left-bottom bg-gradient-to-r from-green to-green bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                              View loan receipt
                            </span>
                          </a>
                        </td>
                        <td>{item.loanDuration} months</td>
                        <td colSpan="3">
                          <table className="table-auto w-full text-left">
                            <thead>
                              <tr>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Return Receipt</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.installments.map((installment, idx) => (
                                <tr key={idx}>
                                  <td>{installment.amount} PKR</td>
                                  <td>
                                    {new Date(
                                      installment.dueDate
                                    ).toLocaleDateString()}
                                  </td>
                                  <td
                                    className={`status-${installment.status.toLowerCase()}`}
                                  >
                                    {installment.status}
                                  </td>
                                  <td>
                                    {installment.returnReceipt && (
                                      <a
                                        className="group transition-all duration-300 ease-in-out"
                                        onClick={() => {
                                          setReturnReceipt(
                                            installment.returnReceipt.url
                                          );
                                          document
                                            .getElementById("my_modal_9")
                                            .showModal();
                                        }}
                                      >
                                        <span className="bg-left-bottom bg-gradient-to-r from-green to-green bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                                          View return receipt
                                        </span>
                                      </a>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      <ImageModal imageUrl={selectedImage} />
      <ReturnReceipt returnReceipt={returnReceipt} />
    </div>
  );
};

export default PaidLoanRequests;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import { toast } from "react-toastify";
import ImageModal from "../../order/ImageModal";
import Spinner from "../../../Component/Spinner";
import ReturnLoan from "../ReturnLoan";
import ReturnReceipt from "../ReturnReceipt";

const AcceptedLoans = () => {
  const [auth] = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [acceptedLoans, setAcceptedLoans] = useState([]);
  const [loanId, setLoanId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [returnReceipt, setReturnReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/loans/getacceptedloans",
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );

        setAcceptedLoans(response.data.loans);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accepted loans:", error);
        toast.error("Error fetching accepted loans", {
          position: "bottom-right",
        });
        setLoading(false);
      }
    };

    if (auth.token) {
      fetchData();
    }
  }, [auth.token]);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.getElementById("my_modal_7").showModal();
  };

  const openReturnLoanModal = (loanId, companyId) => {
    setLoanId(loanId);
    setCompanyId(companyId);
    document.getElementById("my_modal_8").showModal();
  };

  return (
    <div className="w-full px-4 mx-auto">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex items-center justify-between m-4">
            <h5 className="text-2xl font-semibold my-4">
              Returning Loan <span className="text-green">Requests</span>
            </h5>
            <h5 className="text-2xl font-semibold my-4">
              Total Returning Loans: {acceptedLoans.length}
            </h5>
          </div>
          <div className="overflow-x-auto">
            {acceptedLoans.length === 0 ? (
              <h2 className="text-center text-2xl font-semibold my-4">
                No Returning Loan Requests available
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
                    <th>Status</th>
                    <th>Return Status</th>
                    <th>Installments</th>
                    {auth?.user?.userRole === "Retailer" && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {acceptedLoans.map((item, index) => {
                    const endDate = new Date(item.endDate);
                    const startDate = new Date(item.startDate);
                    const displayEndDate = endDate.toLocaleDateString();
                    const displayStartDate = startDate.toLocaleDateString();

                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <th>{index + 1}</th>
                          <td>{item.currentUserId.name}</td>
                          <td>{item.targetUserId.name}</td>
                          <td>{item.loanAmount} PKR</td>

                          <td>
                            <a
                              className="group transition-all duration-300 ease-in-out cursor-pointer"
                              onClick={() =>
                                openImageModal(item.loanReceipt?.url)
                              }
                            >
                              <span className="bg-left-bottom bg-gradient-to-r from-green to-green bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                                View loan receipt
                              </span>
                            </a>
                          </td>

                          <td>{item.loanDuration} months</td>

                          <td className={`status-${item.status.toLowerCase()}`}>
                            {item.status}
                          </td>
                          <td
                            className={`status-${item.loanReturnStatus.toLowerCase()}`}
                          >
                            {item.loanReturnStatus}
                          </td>
                          <td colSpan="3">
                            <table className="table-auto w-full text-left">
                              <thead>
                                <tr>
                                  <th>Installment Amount</th>
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
                                          className="group transition-all  duration-300 ease-in-out cursor-pointer"
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
                                            View Return Receipt
                                          </span>
                                        </a>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                          {auth?.user?.userRole === "Retailer" &&
                            item.loanReturnStatus !== "paid" && (
                              <td>
                                <button
                                  className="btn btn-sm bg-green text-white mr-3"
                                  onClick={() =>
                                    openReturnLoanModal(
                                      item._id,
                                      item.targetUserId._id
                                    )
                                  }
                                >
                                  Return Loan
                                </button>
                              </td>
                            )}
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      <ImageModal imageUrl={selectedImage} />
      <ReturnLoan loanId={loanId} companyId={companyId} />
      <ReturnReceipt returnReceipt={returnReceipt} />
    </div>
  );
};

export default AcceptedLoans;

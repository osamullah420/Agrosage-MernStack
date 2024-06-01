import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ApplyLoan = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [targetUserId, setTargetUserId] = useState("");

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/users/getallcompanies"
        );
        setCompanies(res.data.Companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Error while fetching companies", {
          position: "bottom-right",
        });
      }
    };

    getCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loanAmount || !loanDuration || !loanPurpose || !targetUserId) {
      toast.error("Please fill in all fields", { position: "bottom-right" });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("loanAmount", loanAmount);
      formData.append("loanDuration", loanDuration);
      formData.append("loanPurpose", loanPurpose);
      formData.append("targetUserId", targetUserId);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/loans/applyforloan",
        formData
      );

      if (data && data.success) {
        toast.success(data.message, { position: "bottom-right" });
        // Optionally, reset form fields after successful submission
        setLoanAmount("");
        setLoanDuration("");
        setLoanPurpose("");
        setTargetUserId("");
      } else {
        toast.error(data.message || "Failed to apply for loan", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error applying for loan:", error);
      toast.error(error.response?.data.message || "Something went wrong!", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Apply for <span className="text-green">Loan</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Loan Amount</span>
          </label>
          <input
            type="number"
            placeholder="In Pkr"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text font-bold">Select Company</span>
          </label>
          <select
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Loan Duration (months)</span>
          </label>
          <input
            type="number"
            placeholder="Loan Duration"
            value={loanDuration}
            onChange={(e) => setLoanDuration(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Loan Purpose</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Loan Purpose"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn bg-green text-white my-4 px-6"
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;

import usersModel from "../models/usersModel.js";
import Loan from "../models/loanModel.js";
import orderSchema from "../models/orderSchema.js";
import cloudinary from "cloudinary";

export const applyLoan = async (req, res) => {
  try {
    const { loanAmount, loanDuration } = req.body;
    const currentUserId = req.user._id;
    const targetUserId = req.body.targetUserId;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + loanDuration);

    // Calculate installment amounts and due dates
    const installmentAmount = loanAmount / loanDuration;
    const installments = [];
    for (let i = 0; i < loanDuration; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);
      installments.push({ amount: installmentAmount, dueDate });
    }

    const newLoan = new Loan({
      currentUserId,
      targetUserId,
      loanAmount,
      loanDuration,
      startDate,
      endDate,
      installments,
    });

    await newLoan.save();
    res.status(201).send({ success: true, loan: newLoan });
  } catch (error) {
    console.error("Error applying for loan:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getAllLoans = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await usersModel.findById(userId); // Assuming you have access to the usersModel

    let loans;
    if (user.userRole === "Company") {
      loans = await Loan.find({
        targetUserId: userId,
        status: "pending",
      }).populate("currentUserId targetUserId");
    } else if (user.userRole === "Retailer") {
      loans = await Loan.find({
        currentUserId: userId,
        status: "pending",
      }).populate("currentUserId targetUserId");
    } else {
      // Handle other user roles or provide a default behavior
      return res
        .status(400)
        .send({ success: false, message: "Invalid user role" });
    }

    res.status(200).send({ success: true, loans });
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getAcceptedloans = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await usersModel.findById(userId); // Assuming you have access to the usersModel

    let loans;
    if (user.userRole === "Company") {
      loans = await Loan.find({
        targetUserId: userId,
        status: "accepted",
        loanReturnStatus: "unpaid",
      }).populate("currentUserId targetUserId");
    } else if (user.userRole === "Retailer") {
      loans = await Loan.find({
        currentUserId: userId,
        status: "accepted",
        loanReturnStatus: "unpaid",
      }).populate("currentUserId targetUserId");
    } else {
      // Handle other user roles or provide a default behavior
      return res
        .status(400)
        .send({ success: false, message: "Invalid user role" });
    }

    res.status(200).send({ success: true, loans });
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getPaidloans = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await usersModel.findById(userId); // Assuming you have access to the usersModel

    let loans;
    if (user.userRole === "Company") {
      loans = await Loan.find({
        targetUserId: userId,
        status: "accepted",
        loanReturnStatus: "paid",
      }).populate("currentUserId targetUserId");
    } else if (user.userRole === "Retailer") {
      loans = await Loan.find({
        currentUserId: userId,
        status: "accepted",
        loanReturnStatus: "paid",
      }).populate("currentUserId targetUserId");
    } else {
      // Handle other user roles or provide a default behavior
      return res
        .status(400)
        .send({ success: false, message: "Invalid user role" });
    }

    res.status(200).send({ success: true, loans });
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getUnpaidLoans = async (req, res) => {
  try {
    const retailerId = req.params.retailerId;

    // Retrieve unpaid loan requests for the retailer from the database
    const unpaidLoans = await Loan.find({
      currentUserId: retailerId,
      loanReturnStatus: "unpaid",
      status: "accepted",
    }).populate("currentUserId targetUserId");

    res.status(200).send({ success: true, loans: unpaidLoans });
  } catch (error) {
    console.error("Error fetching unpaid loans:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const orderTrack = async (req, res) => {
  try {
    const retailerId = req.params.retailerId;

    // Retrieve unpaid loan requests for the retailer from the database
    const orders = await orderSchema
      .find({
        buyerId: retailerId,
        status: "Completed",
      })
      .populate("buyerId companyId");

    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error("Error fetching unpaid loans:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { loanReceipt } = req.files; // Uploaded file

    console.log("working");

    // Find loan request by ID
    const loan = await Loan.findById(loanId);

    loan.loanReturnStatus = "unpaid";
    loan.status = "accepted";

    const CloudinaryResponse = await cloudinary.uploader.upload(
      loanReceipt.tempFilePath
    );

    if (!CloudinaryResponse) {
      console.error(
        "Cloudinary error : ",
        CloudinaryResponse.error || "unknown cloudinary error!"
      );
    }

    // Save loanReceipt details in the database
    loan.loanReceipt = {
      public_id: CloudinaryResponse.public_id,
      url: CloudinaryResponse.secure_url,
    };

    await loan.save();

    res
      .status(200)
      .send({ success: true, message: "Loan request accepted successfully" });
  } catch (error) {
    console.error("Error accepting loan:", error);
    res.status(500).send({ success: false, error: "Internal server error" });
  }
};

export const rejectLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    // Find loan request by ID
    const loan = await Loan.findById(loanId);

    // Update loan status to "rejected"
    loan.status = "rejected";

    // Save the updated loan status
    await loan.save();

    res
      .status(200)
      .send({ success: true, message: "Loan request rejected successfully" });
  } catch (error) {
    console.error("Error rejecting loan:", error);
    res.status(500).send({ success: false, error: "Internal server error" });
  }
};

// Return loan installment
export const returnLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { returnReceipt } = req.files; // Uploaded file
    const currentUser = req.user._id;

    // Find loan by ID
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res
        .status(404)
        .send({ success: false, message: "Loan not found" });
    }

    // Check if the current user is authorized to return this loan
    if (loan.currentUserId.toString() !== currentUser.toString()) {
      return res.status(403).send({
        success: false,
        message: "Not authorized to return this loan",
      });
    }

    // Find the next pending installment to mark as paid
    const nextInstallment = loan.installments.find(
      (installment) => installment.status === "unpaid"
    );

    if (!nextInstallment) {
      // All installments are already paid, update returnStatus to "paid"
      loan.loanReturnStatus = "paid";
      await loan.save();

      return res
        .status(400)
        .send({ success: false, message: "All installments are already paid" });
    }

    // Upload returnReceipt to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      returnReceipt.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary error:",
        cloudinaryResponse.error || "unknown cloudinary error!"
      );
      return res.status(500).send({
        success: false,
        message: "Error uploading return receipt to Cloudinary",
      });
    }

    // Mark installment as paid and save returnReceipt details in the database
    nextInstallment.status = "paid";
    nextInstallment.returnReceipt = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };

    // Check if all installments are paid
    const allPaid = loan.installments.every(
      (installment) => installment.status === "paid"
    );
    if (allPaid) {
      loan.loanReturnStatus = "paid";
    }

    await loan.save();

    res
      .status(200)
      .send({ success: true, message: "Installment paid successfully", loan });
  } catch (error) {
    console.error("Error returning loan:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getCompanyPayment = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find user by ID
    const user = await usersModel.findById(companyId);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const { paymentDetails } = user;

    if (!paymentDetails) {
      return res
        .status(200)
        .send({ success: true, message: "No payment details available" });
    }

    res.status(200).send({
      success: true,
      paymentDetails,
      message:
        paymentDetails.length > 0
          ? "Payment details fetched successfully"
          : "There are no payment details for this user!",
    });
  } catch (error) {
    console.error("Error getting payment details:", error);
    res.status(500).send({ success: false, error: "Internal server error" });
  }
};

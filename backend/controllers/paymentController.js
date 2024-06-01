import usersModel from "../models/usersModel.js";

export const addpayment = async (req, res) => {
  try {
    const { accountname, accountnumber } = req.body;
    const userid = req.user._id;

    switch (true) {
      case !accountname:
        return res.status(400).send({
          error: "Account name is required!",
        });

      case !accountnumber:
        return res.status(400).send({
          error: "Account number is required!",
        });
    }

    let user = await usersModel.findById(userid);

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found!" });
    }

    // Check if the payment details already exist for the user
    const existingPaymentDetails = user.paymentDetails.find(
      (details) =>
        details.accountname === accountname &&
        details.accountnumber === accountnumber
    );
    if (existingPaymentDetails) {
      return res.status(400).send({
        success: false,
        message: "This Payment details already exist for the user!",
      });
    }
    user.paymentDetails.push({ accountname, accountnumber });
    await user.save();
    res.status(201).send({
      success: true,
      message: "Payment details added successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        paymentDetails: user.paymentDetails,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getPaymentDetails = async (req, res) => {
  try {
    const userid = req.user._id;

    let user = await usersModel.findById(userid);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    const { paymentDetails } = user;
    res.status(201).send({
      success: true,
      message: "Successfully payment details fetched",
      paymentDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const paymentId = req.params.paymentId;

    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    const paymentIndex = user.paymentDetails.findIndex(
      (payment) => payment._id == paymentId
    );

    if (paymentIndex === -1) {
      return res.status(404).send({
        success: false,
        message: "Payment details not found",
      });
    }

    user.paymentDetails.splice(paymentIndex, 1);

    await user.save();

    res.status(200).send({
      success: true,
      message: "Payment Details Deleted Successfully",
    });
  } catch (error) {
    console.log("Error Deleting payment Details: ", error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

// Controller function to update a specific payment detail for a user
export const updatepayment = async (req, res) => {
  const { paymentId } = req.params;
  const userId = req.user._id;
  const { accountname, accountnumber } = req.body;

  try {
    // Find the user by userId
    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Find the specific payment detail to update
    const paymentDetailToUpdate = user.paymentDetails.find(
      (payment) => payment._id.toString() === paymentId
    );

    if (!paymentDetailToUpdate) {
      return res
        .status(404)
        .send({ success: false, message: "Payment detail not found" });
    }

    // Update payment detail fields
    if (accountname) {
      paymentDetailToUpdate.accountname = accountname;
    }
    if (accountnumber) {
      paymentDetailToUpdate.accountnumber = accountnumber;
    }

    // Save the user
    await user.save();

    res
      .status(201)
      .send({ success: true, message: "Payment detail updated successfully" });
  } catch (error) {
    console.error("Error updating payment detail:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getSinglePaymentDetail = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you're using authentication middleware to get the user ID
    const paymentId = req.params.paymentId; // Assuming you're passing payment ID in the request parameters

    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    // Find the specific payment detail by its ID
    const paymentDetail = user.paymentDetails.find(
      (payment) => payment._id.toString() === paymentId
    );

    if (!paymentDetail) {
      return res.status(404).send({
        success: false,
        message: "Payment detail not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Payment detail fetched successfully",
      paymentDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const getPaymentOrder = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming id is passed as a parameter in the URL

    // Find the user by id
    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Extract payment details from the user object
    const paymentDetails = user.paymentDetails;

    // Send response with payment details
    res.status(200).json({
      success: true,
      message: "Payment details fetched successfully",
      paymentDetails: paymentDetails,
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

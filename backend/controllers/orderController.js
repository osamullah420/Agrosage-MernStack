import orderSchema from "../models/orderSchema.js";
import usersModel from "../models/usersModel.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../helpers/emailHelper.js";

export const addOrder = async (req, res) => {
  try {
    const { address, cart } = req.body;
    const { receipt } = req.files;
    const buyerId = req.user._id;
    const Recipient = await usersModel.findById(buyerId);

    const email = Recipient.email;

    console.log("Buyer email: ", email);
    // Ensure cart data is not empty
    if (!cart || cart.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const parsedCart = JSON.parse(cart);
    let totalPrice = 0;
    let totalProducts = 0;
    const products = [];

    // Calculate totalPrice, totalProducts, and create products array
    parsedCart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalProducts += item.quantity;
      products.push({
        productId: item._id,
        quantity: item.quantity,
        productname: item.name,
        feedbackStatus: "no",
      });
    });

    const companyId = parsedCart[0].uploadedBy_id; // Extract company ID from the first item in the cart array

    const company = await usersModel.findById(companyId);
    const buyer = await usersModel.findById(buyerId);

    const CloudinaryResponse = await cloudinary.uploader.upload(
      receipt.tempFilePath
    );

    if (!CloudinaryResponse) {
      console.error(
        "Cloudinary error : ",
        CloudinaryResponse.error || "unknown cloudinary error!"
      );
    }

    // Create the order
    const order = new orderSchema({
      buyerId,
      companyId,
      totalPrice,
      totalProducts,
      products,
      receipt: {
        public_id: CloudinaryResponse.public_id,
        url: CloudinaryResponse.secure_url,
      },
      address,
      Company: company ? company.name : "Unknown",
      buyer: buyer ? buyer.name : "Unknown",
    });

    await order.save();

    // Ensure email is defined before sending
    if (!email) {
      throw new Error("Recipient email address is missing");
    }

    await sendEmail(email, "Order Placed", "Your Order is Placed Successfully");
    res.status(201).send({
      success: true,
      message: "Order placed Successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getOrdersById = async (req, res) => {
  try {
    const userId = req.user._id;
    let orders;

    //for finding userRole
    const user = await usersModel.findById(userId);

    if (user.userRole === "Company") {
      orders = await orderSchema
        .find({ companyId: userId })
        .populate("buyerId companyId");
    } else {
      orders = await orderSchema
        .find({ buyerId: userId })
        .populate("buyerId companyId");
    }

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// Controller method to confirm an order
export const confirmOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderSchema.findById(orderId);

    // Check if order is already completed or cancelled
    if (order.status === "Completed") {
      return res.status(400).send({
        success: false,
        message: "Order is already completed",
      });
    } else if (order.status === "Cancelled") {
      return res.status(400).send({
        success: false,
        message: "Order is already cancelled",
      });
    }

    // Update order status to completed
    order.status = "Completed";
    await order.save();

    res.status(200).send({
      success: true,
      message: "Order Confirmed Successfully!",
      order,
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Controller method to cancel an order
export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderSchema.findById(orderId);

    // Check if order is already completed or cancelled
    if (order.status === "Completed") {
      return res.status(400).send({
        success: false,
        message: "Order is already completed",
      });
    } else if (order.status === "Cancelled") {
      return res.status(400).send({
        success: false,
        message: "Order is already cancelled",
      });
    }

    // Update order status to cancelled
    order.status = "Cancelled";
    await order.save();

    res.status(200).send({
      success: true,
      message: "Order Cancelled Successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

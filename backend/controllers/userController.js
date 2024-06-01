import usersModel from "../models/usersModel.js";

export const getAllRetailers = async (req, res) => {
  try {
    const retailers = await usersModel.find({ userRole: "Retailer" });
    res.status(201).send({
      success: true,
      retailers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching retailers",
      error,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const Companies = await usersModel.find({ userRole: "Company" });
    res.status(201).send({
      success: true,
      Companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching companies",
      error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find({});
    res.status(201).send({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users ",
      error,
    });
  }
};

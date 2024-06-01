// Populate Nadra table with 50 dummy users

import mongoose from "mongoose";
import Nadra from "./models/nadraModel.js";

mongoose
  .connect(
    "mongodb+srv://osamkhan545:osamkhan123@agrosage-cluster.q0nbmoi.mongodb.net/agrosage",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Generate 50 dummy users
const generateDummyUsers = () => {
  const dummyUsers = [];
  for (let i = 0; i < 50; i++) {
    const paddedIndex = String(i).padStart(2, '0'); // Ensure two-digit index
    const dummyUser = {
      name: `User${paddedIndex + 1}`,
      cnic: `12345678901${paddedIndex}`,
      gender: i % 2 === 0 ? "Male" : "Female",
      address: `Address${paddedIndex + 1}`,
      // Add other fields as needed
    };
    dummyUsers.push(dummyUser);
  }
  return dummyUsers;
};

// Insert dummy users into Nadra collection
const dummyData = generateDummyUsers();
Nadra.insertMany(dummyData)
  .then(() => console.log("Dummy data inserted"))
  .catch((error) => console.error(err))
  .finally(() => mongoose.disconnect());

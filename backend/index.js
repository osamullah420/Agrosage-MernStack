import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/dbconnect.js";
import authRoute from "../backend/routes/authRoute.js";
import getuserRoute from "../backend/routes/getuserRoute.js";
import productsRoute from "../backend/routes/productsRoute.js";
import paymentRoute from "../backend/routes/paymentRoute.js";
import scheduleRoute from "../backend/routes/scheduleRoute.js";
import orderRoute from "../backend/routes/orderRoute.js";
import loanRoute from "../backend/routes/loanRoute.js";
import feedbackRatingsRoute from "../backend/routes/feedbackRatingsRoute.js";
import recommnedationRoutes from "../backend/routes/recommnedationRoutes.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

//config  env
dotenv.config();

//rest object
const app = express();

//middlewares

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

connectDB();

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", getuserRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/schedule", scheduleRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/loans", loanRoute);
app.use("/api/v1/reviews", feedbackRatingsRoute);
app.use("/api/v1/recommendations", recommnedationRoutes);

app.get("/", (req, res) => {
  res.send("hello osam");
});

const port = process.env.PORT;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(port, () => {
  console.log(`Server runnning on ${port}`);
});

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Component/Register";
import Products from "../Pages/product/Products";
import Aboutus from "../Component/Aboutus";
import CartPage from "../Pages/cart-page/CartPage";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import CreateProduct from "../Pages/dashboard/admin/CreateProduct";
import Retailers from "../Pages/dashboard/admin/Retailers";
import CompanyProducts from "../Pages/dashboard/admin/CompanyProducts";
import UpateProduct from "../Pages/dashboard/admin/UpateProduct";
import Companies from "../Pages/dashboard/retailer/Companies";
import Schedule from "../Pages/Scheduling/Schedule";
import ViewSchedule from "../Pages/Scheduling/ViewSchedule";
import Addpayment from "../Pages/payment/Addpayment";
import ViewPayment from "../Pages/payment/ViewPayment";
import Updatepayment from "../Pages/payment/Updatepayment";
import Checkout from "../Pages/cart-page/Checkout";
import Order from "../Pages/order/Order";
import ViewLoan from "../Pages/loan/ViewLoan";
import ApplyLoan from "../Pages/loan/ApplyLoan";
import TrackStatus from "../Pages/loan/TrackStatus";
import Call from "../Pages/Scheduling/Call";
import Pendingloans from "../Pages/loan/viewloan/Pendingloans";
import AcceptedLoans from "../Pages/loan/viewloan/AcceptedLoans";
import PaidLoanRequests from "../Pages/loan/viewloan/PaidLoanRequests";
import FinancialHub from "../Pages/financial Hub/FinancialHub";
import ProductDetails from "../Pages/product/ProductDetails";
import Collaborate from "../Pages/Collaborate";
import PrivateRoutes from "./PrivateRoutes";
import RetailerRoute from "./RetailerRoute";
import CompanyRoute from "./CompanyRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/productdetails/:id", element: <ProductDetails /> },
      { path: "/aboutus", element: <Aboutus /> },
      { path: "/financialhub", element: <FinancialHub /> },
      { path: "/cartpage", element: <CartPage /> },
      { path: "/collaborate", element: <Collaborate /> },
      {
        path: "/checkout",
        element: (
          <RetailerRoute>
            <Checkout />
          </RetailerRoute>
        ),
      },
    ],
  },
  { path: "/register", element: <Register /> },
  {
    path: "/admindashboard",
    element: (
      <PrivateRoutes>
        <AdminDashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/admindashboard",
        element: <CreateProduct />,
      },
      { path: "retailers", element: <Retailers /> },
      { path: "companies", element: <Companies /> },
      {
        path: "companyproducts",
        element: (
          <CompanyRoute>
            <CompanyProducts />
          </CompanyRoute>
        ),
      },
      {
        path: "updateproduct/:id",
        element: (
          <CompanyRoute>
            <UpateProduct />
          </CompanyRoute>
        ),
      },
      { path: "addpayment", element: <Addpayment /> },
      { path: "schedule", element: <Schedule /> },
      { path: "viewschedule", element: <ViewSchedule /> },
      { path: "viewpayment", element: <ViewPayment /> },
      { path: "updatepayment/:paymentId", element: <Updatepayment /> },
      { path: "orders", element: <Order /> },
      {
        path: "applyforloan",
        element: (
          <RetailerRoute>
            <ApplyLoan />
          </RetailerRoute>
        ),
      },
      {
        path: "viewloans",
        element: <ViewLoan />,
        children: [
          { path: "pendingloans", element: <Pendingloans /> },
          { path: "acceptedloans", element: <AcceptedLoans /> },
          { path: "paidloans", element: <PaidLoanRequests /> },
        ],
      },
      { path: "trackloan/:retailerId/:loanId", element: <TrackStatus /> },
      { path: "call/:scheduleId", element: <Call /> },
    ],
  },
]);

export default router;

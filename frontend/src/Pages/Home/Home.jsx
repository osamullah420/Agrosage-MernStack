import React from "react";
import Banner from "../../Component/Banner";
import Aboutus from "../../Component/Aboutus";
import Categories from "./Categories";
import Product from "./Product";
import Recommendations from "../../Component/Recommendations";
import CompaniesRecommendations from "../../Component/CompaniesRecommendations";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Product />
      <Aboutus />
      <Recommendations />
      <CompaniesRecommendations />
    </div>
  );
};

export default Home;

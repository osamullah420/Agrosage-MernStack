import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const simpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

const simplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const CompaniesRecommendations = () => {
  const [companies, setCompanies] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/recommendations/companies"
        ); // Adjust the URL as per your API endpoint
        if (response.data.success) {
          setCompanies(response.data.topRatedUsers); // Assuming topRatedUsers is the key containing companies data
        } else {
          console.error("Failed to fetch companies:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []); // Only run this effect on mount

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <simpleNextArrow />,
    prevArrow: <simplePrevArrow />,
  };

  return (
    <div className="section-container my-20  relative">
      <div className="text-left">
        <h2 className="title">Recommended Companies</h2>
      </div>
      <div className="md:absolute right-3 top-8 md:mr-24 mb-10">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full ml-5 bg-green text-white"
        >
          <FaAngleLeft className="w-8 h-8 p-1" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full ml-5 bg-green text-white"
        >
          <FaAngleRight className="w-8 h-8 p-1" />
        </button>
        <></>
      </div>
      {companies.length === 0 ? (
        <div className="text-4xl font-semibold my-20 text-center">
          No Recommended Companies
        </div>
      ) : (
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden mt-10 space-x-5"
        >
          {companies.map((company, index) => (
            <div className="card w-96 bg-base-100 shadow-md  relative">
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                <p className=" mb-2">{company.email}</p>
                <p className=" mb-2">Rating: {company.rating.toFixed(2)} / 5</p>
                <p className="text-gray-500">Reviews: {company.numReviews}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default CompaniesRecommendations;

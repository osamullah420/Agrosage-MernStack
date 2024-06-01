import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../Component/Cards";
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

const Product = () => {
  const [product, setProduct] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/products/getallproducts"
        ); // Replace "/api/products" with your actual backend API endpoint

        setProduct(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error
      }
    };

    getProducts();
  }, []);

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
    <div className="section-container my-20 relative">
      <div className="text-left">
        <h2 className="title">Products</h2>
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
      {product.length === 0 ? (
        <div className="text-4xl font-semibold my-20 text-center">
          No products available
        </div>
      ) : (
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden  mt-10 space-x-5"
        >
          {product.map((item, i) => (
            <Cards key={i} item={item} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Product;

import React, { useEffect, useState } from "react";
import axios from "axios";

const staticCategoryItems = [
  {
    id: 1,
    title: "Seeds",
    name: "seed", // Ensure these titles exactly match the category identifiers in your product data
    image: "/src/assets/categories/seed.png",
  },
  {
    id: 2,
    title: "Machines",
    name: "machine",
    image: "/src/assets/categories/machine.png",
  },
  {
    id: 3,
    title: "Pesticides",
    name: "pesticide",
    image: "/src/assets/categories/pesticide.png",
  },
  {
    id: 4,
    title: "Nitrates",
    name: "nitrates",
    image: "/src/assets/categories/fertilizer.png",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(
    staticCategoryItems.map((item) => ({ ...item, des: "Loading..." }))
  );

  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(
          "http://localhost:8080/api/v1/products/getallproducts"
        );
        const products = response.data.products; // Adjust based on your API response structure

        // Map to accumulate counts per category
        const counts = products.reduce((acc, product) => {
          // Ensure this matches how categories are identified in your products
          // For example, if product.category is an object, you might need product.category.title
          const category = product.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        // Update static items with counts
        const updatedCategories = staticCategoryItems.map((category) => ({
          ...category,
          des: `(${counts[category.name] || 0} items)`, // Check for exact match in category names
        }));

        setCategories(updatedCategories);
      } catch (error) {
        console.error("Failed to fetch product counts:", error);
        // Handle error, for example, by setting a default description
        setCategories(
          categories.map((category) => ({
            ...category,
            des: "Error fetching counts",
          }))
        );
      }
    };

    fetchProductCounts();
  }, []);

  return (
    <div className="section-container py-16">
      <div className="text-center">
        <h2 className="title">Available Categories</h2>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
        {categories.map((item, index) => (
          <div
            key={index}
            className="shadow-lg rounded-md bg-[#a5d6a0] py-6 px-5 w-72 mx-auto text-center cursor-pointer duration-300 hover:-translate-y-4 transition-all"
          >
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="bg-[#d2e7d4] p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5>{item.title}</h5>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

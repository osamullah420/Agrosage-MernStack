import React, { useEffect, useState } from "react";
import Cards from "../../Component/Cards";
import { FaFilter } from "react-icons/fa";
import axios from "axios";

const Products = () => {
  const [isProducts, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  //loading data

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/products/getallproducts"
        ); // Replace "/api/products" with your actual backend API endpoint

        setProducts(data.products);
        setFilteredItems(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error
      }
    };

    getProducts();
  }, []);

  //filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? isProducts
        : isProducts.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  //show all data

  const showAll = () => {
    setFilteredItems(isProducts);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // sorting based on A-Z , Z-A , low-high Pricing
  const handleSortChange = (Option) => {
    setSortOption(Option);

    let sortedItems = [...filteredItems];
    //
    switch (Option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;

      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //search

  const handelSearchQuery = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const searchedItems = isProducts.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    setFilteredItems(searchedItems);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col  justify-center items-center gap-8">
          <div className="text-center space-y-7 px-4 ">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Order Now and Experience Seamless
              <span className="text-green"> Trading</span>
            </h2>
            <p className="text-xl text-[#4A4A4A]  md:w-4/5 mx-auto">
              Discover agricultural excellence on AgroSage. Effortlessly place
              orders and redefine your ordering experience. Join now for a
              seamless future in agricultural commerce.
            </p>
            <button className="btn bg-green rounded-full px-8 py-3 font-semibold text-white">
              Order Now
            </button>
          </div>
        </div>
      </div>
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              className={selectedCategory === "all" ? "active" : ""}
              onClick={showAll}
            >
              All
            </button>
            <button
              className={selectedCategory === "seed" ? "active" : ""}
              onClick={() => filterItems("seed")}
            >
              Seeds
            </button>
            <button
              className={selectedCategory === "pesticide" ? "active" : ""}
              onClick={() => filterItems("pesticide")}
            >
              Pesticides
            </button>
            <button
              className={selectedCategory === "machine" ? "active" : ""}
              onClick={() => filterItems("machine")}
            >
              Machines
            </button>
            <button
              className={selectedCategory === "nitrates" ? "active" : ""}
              onClick={() => filterItems("nitrates")}
            >
              Nitrates
            </button>
          </div>

          <div className="flex flex-row items-center gap-4 justify-center space-x-2">
            <div>
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={handelSearchQuery}
                className="border border-gray-300 px-4 py-2  mb-4 rounded"
              />
            </div>

            <div className="flex justify-end mb-4 rounded-sm">
              <div className="bg-black p-2">
                <FaFilter className="h-4 w-4 text-white " />
              </div>
              {/* sorting options */}
              <select
                name="sort"
                id="sort"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOption}
                className="bg-black text-white px-2 py-1 rounded-sm"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">Low-to-High</option>
                <option value="high-to-low">High-to-Low</option>
              </select>
            </div>
          </div>

          {/*sorting base filtering */}
        </div>
        {/*products  */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {currentItems.length > 0 ? (
            currentItems.map((item) => <Cards key={item._id} item={item} />)
          ) : (
            <p className="col-span-full text-center text-xl font-bold my-auto">
              No products are available from the selected category
            </p>
          )}
        </div>
        {/*pagination */}
        <div className="flex justify-center my-8">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === index + 1
                  ? "bg-green text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

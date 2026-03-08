import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPackage } from "react-icons/fi";
import ClientPagination from "@/Components/ClientPagination";
import { CategoryDialog } from "@/Components/CategoryDialog";
import { useAppContext } from "@/store/store";
import WishListIcon from "@/Components/WishListIcon";
import DiscountParcent from "@/Components/DiscountParcent";
const url = import.meta.env.VITE_ENDPOINT;

const LIMIT = 24;

const Categories = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [getProducts, setGetProducts] = useState([]);
  const { categoryName, setCategoryName } = useAppContext();

  // pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //minimum and maximum sorting
  const [min, setMin] = useState("");
  const [max, setMax] = useState(100000);

  // FETCH ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const res = await fetch(`${url}/api/client/categories`, {
        method: "get",
      });
      const data = await res.json();

      if (res.ok) {
        setAllCategory(data);
        if (categoryName.length == 0 && data.length > 0) {
          setCategoryName(data[0].category_name);
        }
      }
    } catch (error) {
      toast.error("Internal server error");
      console.error(error);
    }
  };

  // FETCH CATEGORY PRODUCTS
  const getCategoryBaseProduct = async () => {
    if (!categoryName) return;

    try {
      const res = await fetch(
        `${url}/api/client/categories/product/${categoryName}?page=${page}&limit=${LIMIT}&min=${min}&max=${max}`
      );
      const data = await res.json();

      if (res.ok) {
        setGetProducts(data.products);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      toast.error("Internal server error");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (!categoryName) return;
    setPage(1);
  }, [categoryName]);

  useEffect(() => {
    if (!categoryName) return;
    getCategoryBaseProduct();
  }, [categoryName, page, min, max]);

  return (
    <>
      {/* =======================
          CATEGORY DIALOG
      ======================= */}
      <CategoryDialog
        allCategory={allCategory}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        min={min}
        max={max}
        setMin={setMin}
        setMax={setMax}
      />

      {/* =======================
          PRODUCT SECTION
      ======================= */}
      <div className="w-full mx-auto py-4 font2 sm:py-2 mb-12 px-2 sm:px-4 lg:px-6 2xl:px-10 ">
        <div className="mb-8 w-[97%] ">
          <div className="text-2xl md:text-3xl mt-2 flex justify-center gap-1 sm:gap-4 text-gray-800 text-center">
            <h1 className="font-semibold max-[430px]:text-lg ">
              All results of :{" "}
            </h1>
            <h1 className="bg-teal-700 text-white px-3  rounded pt-1  font-semibold pb-0.5 text-lg max-[430px]:text-base  ">
              {categoryName}
            </h1>
          </div>
        </div>

        {getProducts.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
            <FiPackage className="text-7xl text-gray-300" />
            <h2 className="text-gray-400 text-lg md:text-xl italic">
              No product found in this category
            </h2>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3">
              {getProducts.map((singleproduct) => (
                <Link
                  key={singleproduct._id}
                  to={`/product/${singleproduct._id}`}
                  className="group bg-white relative rounded-lg shadow-sm
               hover:shadow-2xl transition-all duration-300"
                >
                  <WishListIcon id={singleproduct._id} />
                  <DiscountParcent discount={singleproduct.discount} />

                  {/* IMAGE */}
                  <div className="p-3 bg-white rounded-t-lg">
                    <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                      <img
                        src={`${url}/upload/${singleproduct.image}`}
                        alt={singleproduct.tittle}
                        className="max-w-full rounded-md max-h-full object-contain
                     transition-transform duration-300
                     group-hover:scale-95"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="px-3 pb-4">
                    <h1
                      className="text-xs md:text-base font-medium text-gray-900
                     leading-tight line-clamp-2 "
                    >
                      {singleproduct.tittle}
                    </h1>

                    {/* PRICE */}
                    <div className="mt-1 flex justify-start gap-x-2 ">
                      <div className=" text-base font-semibold text-[#f57224] break-keep">
                        <span className=" text-base font-normal mr-1">৳</span>
                        {singleproduct.price}
                      </div>
                      <div className="  ">
                        <span className={` ${singleproduct.discount ===0 ?"hidden":""} text-xs font-normal mr-1  my-auto text-red-600`}>
                          {" "}
                          -{singleproduct.discount}%
                        </span>
                      </div>
                    </div>

                    <h1 className="text-sm text-gray-600 mt-2 ml-1">
              <span className="font-semibold">
                <span
                  className={
                    singleproduct.stock > 0
                      ? "text-green-800"
                      : "text-red-600"
                  }
                >
                  {singleproduct.stock > 0 ? "Available" : "Not Available"}
                </span>
              </span>
            </h1>
                   
                  </div>
                </Link>
              ))}
            </div>

            {/* =======================
                PAGINATION
            ======================= */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <ClientPagination
                  page={page}
                  onPageChange={setPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Categories;


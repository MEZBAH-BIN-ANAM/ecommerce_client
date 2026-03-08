import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductElement from "@/Components/ProductElement";
import ClientPagination from "@/Components/ClientPagination";
import { FiPackage } from "react-icons/fi";
import Filter from "@/Components/Filter";
const url = import.meta.env.VITE_ENDPOINT;


const LIMIT = 24;

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [min, setMin] = useState("");
  const [max, setMax] = useState(100000);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getSearchProducts = async (currentPage) => {
    try {
      const res = await fetch(
        `${url}/api/client/products/search?q=${q}&page=${currentPage}&limit=${LIMIT}&min=${min}&max=${max}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setProducts(data.results || []);
      setTotalPages(Math.ceil((data.total || 0) / LIMIT));
    } catch (error) {
      console.error("Search error:", error);
      setProducts([]);
      setTotalPages(1);
    }
  };

  // Reset page when search query changes
  useEffect(() => {
    setPage(1);
  }, [q]);

  // Fetch data when page or query changes
  useEffect(() => {
      getSearchProducts(page);
  }, [q, page,min,max]);

  return (
    <div className="px-2 sm:px-4 pt-4 sm:pt-6 sm:py-5 min-h-full font2 mb-6">
      {/* TITLE */}
      <h1 className="text-2xl grid grid-cols-2  mb-6 mt-3 max-[430px]:text-sm w-full bg-slate-100 py-4 ">
         <span className=" text-cyan-800 rounded px-1 pb-1 pt-0.5 ml-2 my-auto">{q}</span>
         <span className="flex justify-end mr-2 mb-1"><Filter  min={min} max={max}  setMin={setMin} setMax={setMax} /></span>
      </h1>

      {/* NO RESULTS */}
      {products.length === 0 && (
         <div className="h-[100px] flex flex-col items-center justify-center gap-4">
         <FiPackage className="text-7xl text-gray-300" />
         <h2 className="text-gray-400 text-lg md:text-xl italic">
           No product found
         </h2>
       </div>
      )}

      {/* RESULTS */}
      {products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3">
          <ProductElement products={products} />
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <ClientPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default SearchPage;

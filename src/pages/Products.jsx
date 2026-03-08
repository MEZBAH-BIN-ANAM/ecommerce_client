import { useEffect, useState } from "react";
import ProductElement from "@/Components/ProductElement";
import ClientPagination from "@/Components/ClientPagination";
import Filter from "@/Components/Filter";
const url = import.meta.env.VITE_ENDPOINT;

const LIMIT = 24;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [min, setMin] = useState("");
  const [max, setMax] = useState(100000);
  const [total, setTotal] = useState(0);

  // Fetch products from API
  const fetchProducts = async (currentPage) => {
    try {
      const res = await fetch(
        `${url}/api/client/products?page=${currentPage}&limit=${LIMIT}&min=${min}&max=${max}`
      );

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      setProducts(data.results || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotal(0);
    }
  };

  // Fetch products whenever page changes
  useEffect(() => {
    fetchProducts(page);
  }, [page, min, max]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className=" pt-4 sm:pt-6 px-2 sm:px-4 mb-10 font2 min-h-full">
      <div className="">
        {/* TITLE */}
        <h1 className="text-2xl grid grid-cols-2  mb-6 mt-3 max-[430px]:text-sm w-full bg-slate-100 py-4 ">
          <span className=" text-3xl font-bold text-orange-800 my-auto ml-5 max-[430px]:text-xl ">
            Products
          </span>
          <span className="flex justify-end mr-2 mb-1">
            <Filter min={min} max={max} setMin={setMin} setMax={setMax} />
          </span>
        </h1>
      </div>

      {/* NO PRODUCTS */}
      {products.length === 0 && (
        <p className="text-center text-gray-500 text-xl mt-12">
          No products found.
        </p>
      )}

      {/* PRODUCT GRID */}
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

export default Products;

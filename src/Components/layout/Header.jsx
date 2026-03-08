import Logout from "@/pages/Logout";
import { useAppContext } from "@/store/store";
import { useState } from "react";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [text, setText] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { haveToken, wishlistCount, cartItemsCount } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${text}`);
  };

  return (
    <>
      {/* ===== FIXED HEADER ===== */}
      <header className="fixed top-0 left-0 w-full z-100">
        {/* ===== TOP BAR ===== */}
        <div className="bg-primary text-primary-foreground">
          <div className="flex items-center gap-4 px-4 md:px-8 h-[60px]">
            {/* LOGO */}
            <h1 className="text-xl md:text-2xl font-bold tracking-wide cursor-pointer">
              CMART
            </h1>

            {/* SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="flex flex-2 max-w-xl mx-auto bg-gray-700 rounded-full pr-1 sm:px-3"
            >
              <input
                type="text"
                placeholder="Search here"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2 sm:py-2.5 sm:px-4 md:px-4 rounded-l-md text-teal-50 max-[430px]:placeholder:text-[12px] max-[430px]:text-[10px] placeholder:text-teal-50 focus:outline-none"
              />
              <button className="max-[325px]:px-1 px-2 bg-transparent rounded-r-full flex items-center justify-center">
                <FaSearch className="text-white max-[325px]:text-[14px] text-[16px] sm:text-xl cursor-pointer" />
              </button>
            </form>

            {/* RIGHT ICONS */}
            <div className="flex items-center max-[430px]:gap-3 gap-4 shrink-0">
              <Link to="/cart" className="relative  hover:text-orange-200 transition ">
              <span className={` ${!cartItemsCount && "hidden"} absolute -right-2 -top-3 h-4 w-4 text-[12px]  flex justify-center items-center rounded-full bg-emerald-200 text-black`}>{cartItemsCount}</span>
                <FaCartArrowDown size={22} />
              </Link>

              <button
                className="md:hidden hover:text-yellow-400"
                onClick={() => setOpenMenu(true)}
              >
                <HiMenu size={26} />
              </button>

              {/* AUTH DESKTOP */}
              {!haveToken ? (
                <>
                  <Link
                    to="/login"
                    className="hidden md:block text-sm bg-blue-700 hover:bg-blue-500 px-4 py-2 rounded-md transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hidden md:block bg-transparent border hover:border-yellow-500 text-white px-4 py-2 transition rounded-md hover:bg-yellow-500 text-sm"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="hidden md:block">
                  <Logout />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== DESKTOP NAV BAR ===== */}
        <nav className="hidden md:flex gap-1 md:px-6 md:py-2.5 bg-[#232f3e] text-md ">
          {["/", "/products", "/categories", "/orderHistory", "/wishlist", "/contact"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "block px-3  capitalize link-underline relative  text-teal-200"
                  : "block px-3  capitalize link-underline relative  text-white"
              }
            >
             {path==="/wishlist"? ( <span className={` ${!wishlistCount && "hidden"} absolute -right-1 -top-1 h-4 w-4 text-[12px]  flex justify-center items-center rounded-full bg-emerald-200 text-black`}>{wishlistCount}</span>):(<span></span>)}
              {["Home", "Products", "Categories","Order History", "wishlist", "Contact Us"][i]}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* ===== MOBILE OVERLAY ===== */}
      {openMenu && (
        <div
          className="fixed inset-0 z-110 bg-black/40 md:hidden"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* ===== MOBILE DRAWER ===== */}
      <aside
        className={`fixed top-0 left-0 z-200 h-screen w-[60%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex items-center justify-between pl-2 py-4 border-b mx-8">
          <h2 className="text-lg font-semibold max-[430px]:text-base">Menu</h2>
          <button
            onClick={() => setOpenMenu(false)}
            className="text-2xl"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* DRAWER NAV */}
        <nav className="flex flex-col gap-4 p-6 text-base sm:text-lg mx-3">
          {["/", "/products", "/categories", "/orderHistory", "/wishlist", "/contact"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) =>
                isActive ? "text-teal-600 font-medium relative" : "text-black relative"
              }
            >
              {path==="/wishlist"? ( <span className={` ${!wishlistCount && "hidden"} absolute right-0 top-1 h-4 w-4 text-[12px]  flex justify-center items-center rounded-full bg-emerald-200 text-black`}>{wishlistCount}</span>):(<span></span>)}

              {["Home", "Products", "Categories", "Order History", "Wishlist", "Contact Us"][i]}
            </NavLink>
          ))}

          <hr />

          {!haveToken ? (
            <div className="mt-6 space-y-3 w-[98%] mx-auto">
              <Link
                to="/login"
                onClick={() => setOpenMenu(false)}
                className="flex justify-center w-full rounded-md bg-blue-800 px-4 py-2 text-base font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpenMenu(false)}
                className="flex justify-center w-full rounded-md border border-primary px-4 py-2 text-base font-semibold text-primary hover:bg-primary/10 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <Logout />
          )}
        </nav>
      </aside>

      {/* ===== HEADER SPACER ===== */}
      <div className="h-[36px] md:h-20" />
      {/* <div className="max-[430px]:h-[43px] h-[47px] md:h-[87px] lg:h-[94px]" /> */}
    </>
  );
};

export default Header;

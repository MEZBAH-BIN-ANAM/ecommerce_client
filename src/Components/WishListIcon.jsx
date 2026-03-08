import { useAppContext } from "@/store/store";
import { GoHeartFill } from "react-icons/go";
import React from "react";

const WishListIcon = ({ id }) => {
  const { wishlist, handleWishlist } = useAppContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // stop Link navigation
        e.stopPropagation();
        handleWishlist(id);
      }}
      className="absolute top-2  right-2.5 z-30 p-2 max-[430px]:p-1 rounded-full hover:bg-red-300/50 transition"
    >
      <GoHeartFill
        className={` text-[22px] max-[430px]:text-lg transition duration-300 ${
          wishlist.includes(id)
            ? "text-red-600 drop-shadow-[0_0_6px_rgba(220,38,38,0.8)]"
            : "text-gray-400 hover:text-red-600"
        }`}
      />
    </button>
  );
};

export default WishListIcon;

import React from "react";

const DiscountParcent = ({ discount }) => {
  return (
    <>
      <div
        className={`p-1 sm:px-2 sm:py-2.5 -rotate-30 z-30 absolute rounded-full text-[8px] sm:text-[12px] bg-emerald-700 text-white  ${
          discount === 0 ? "hidden" : ""
        }`}
      >
        {discount || 0} % OFF
      </div>
    </>
  );
};

export default DiscountParcent;

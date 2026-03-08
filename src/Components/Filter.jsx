import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;


const Filter = ({ min, max, setMin, setMax }) => {
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const getMaxPrice = async () => {
      try {
        const res = await fetch(`${url}/api/client/maxPrice`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          const price = Number(data.maxPrice) || 0;
          setMaxPrice(price);
          setMax(price); // default max filter = max product price
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMaxPrice();
  }, [setMax]);

  const handleMin = (e) => {
    const value = Number(e.target.value) || 0;

    if (value >= maxPrice) {
      toast.info(`Minimum price must be less than ${maxPrice}`);
      return;
    }

    if (value >= max) {
      toast.info("Minimum price must be less than maximum price");
      return;
    }

    setMin(value);
  };

  const handleMax = (e) => {
    const value = Number(e.target.value) || maxPrice;

    if (value > maxPrice) {
      toast.info(`Maximum price must be less than or equal to ${maxPrice}`);
      return;
    }

    if (value <= min) {
      toast.info("Maximum price must be greater than minimum price");
      return;
    }

    setMax(value);
  };

  return (
    <div className="flex flex-col gap-1 text-sm">
      <span className="max-[430px]:text-xs text-lg text-gray-900 font-serif">
        Price
      </span>

      <div>
        <input
          type="number"
          min={0}
          max={maxPrice}
          step={1}
          inputMode="numeric"
          placeholder="Min"
          value={min}
          onChange={handleMin}
          className="w-14 sm:w-24 text-[10px] sm:text-base px-2 py-1  border border-orange-700 focus:border-0 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-800 placeholder:text-center max-[430px]:py-0.5 text-center"
        />

        <span className="text-gray-400 mx-0.5 sm:mx-3">–</span>

        <input
          type="number"
          min={0}
          max={maxPrice}
          step={1}
          inputMode="numeric"
          placeholder="Max"
          value={max}
          onChange={handleMax}
          className="w-14 sm:w-24 text-[10px] sm:text-base px-2 py-1 border border-orange-700 focus:border-0 rounded-sm focus:ring-1 focus:ring-teal-800 focus:outline-none placeholder:text-center max-[430px]:py-0.5 text-center "
        />
      </div>
    </div>
  );
};

export default Filter;

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/Components/ui/dialog";
import Filter from "./Filter";
const url = import.meta.env.VITE_ENDPOINT;


export function CategoryDialog({ allCategory, categoryName, setCategoryName , min, max, setMin, setMax}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleSelectCategory = (name) => {
    setCategoryName(name);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-between pt-3">
        {/* TRIGGER */}
      <DialogTrigger asChild>
       
       <Button 
          className=" max-[430px]:text-xs text-lg mt-8  ml-4 flex items-center gap-2 bg-transparent border-2 sm:py-6 text-slate-900 pl-12 "
          onMouseEnter={() => {setHovered(true); setOpen(true)}}
          onMouseLeave={() => setHovered(false)}
        >
          See All Categories
          <ChevronDown
            className={`transition-transform duration-300 ${
              open || hovered ? "rotate-180" : ""
            }`}
          />
        </Button>
        
      </DialogTrigger>
        <div className="mt-6 mr-2">
        <Filter min={min} max={max}  setMin={setMin} setMax={setMax} />
        </div>
      </div>

      {/* DIALOG */}
      <DialogContent className="w-[95vw] h-fit font2 p-12 max-[430px]:p-8" aria-describedby={undefined}>
        {/* CUSTOM CLOSE BUTTON */}
        <DialogClose asChild>
          <button
            className="
              absolute top-6 right-6 sm:top-8 sm:right-10
             border-0 rounded-full p-2
              bg-gray-100 hover:bg-red-100
              text-red-600 transition
            "
          >
            <X className="h-5 w-5" />
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 text-center max-[430px]:text-xl ">
            All Categories
          </DialogTitle>
        </DialogHeader>

        {/* CATEGORY LIST */}
        <div className="mt-6 overflow-y-auto pr-2 max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allCategory.map((singleCategory) => (
              <div
                key={singleCategory._id}
                onClick={() =>
                  handleSelectCategory(singleCategory.category_name)
                }
                className={`grid grid-cols-2 p-4 rounded-xl cursor-pointer border bg-white transition
                  ${
                    categoryName === singleCategory.category_name
                      ? "border-indigo-500 shadow-lg"
                      : "hover:shadow-lg hover:scale-95"
                  }`}
              >
                <div className="flex items-center justify-center">
                  <img
                    src={`${url}/upload/${singleCategory.image}`}
                    alt={singleCategory.category_name}
                    className="w-20 h-20 max-[430px]:w-10 max-[430px]:h-10 rounded-full border object-cover"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <h1 className="text-sm max-[430px]:text-xs font-semibold text-black">
                    {singleCategory.category_name}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


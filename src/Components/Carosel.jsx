import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_ENDPOINT;

const CarouselSection = () => {
  const [slides, setSlides] = React.useState([]);
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);

  const navigate= useNavigate()

  // FIXED LOGIC: stopOnMouseEnter: true handles the pause/resume cycle perfectly
  const autoplay = React.useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const getHomeBanners = async () => {
    try {
      const res = await fetch(`${url}/api/client/home/banner`);
      const data = await res.json();
      if (res.ok && data?.length) setSlides(data);
    } catch (error) {
      console.error("Banner fetch error:", error);
    }
  };

  React.useEffect(() => {
    getHomeBanners();
  }, []);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (!slides.length) return null;

  return (
    <div className="w-full h-fit py-4">
      <div className="mx-auto relative group">
        <Carousel
          setApi={setApi}
          plugins={[autoplay.current]}
          opts={{ loop: true, align: "start" }}
          // Manual listeners removed so the plugin can manage its own state
          className="w-full overflow-hidden shadow-sm bg-white"
        >
          <CarouselContent className="ml-0">
            {slides.map((slide) => (
              <CarouselItem key={slide._id} className="pl-0 basis-full">
                {/* Maintain 16:6 ratio */}
                <div className="relative w-full aspect-16/6 flex items-center justify-center bg-[#ebebeb]">
                  <img
                    src={`${url}/upload/${slide.image}`}
                    alt="Banner"
                    onClick={()=>{navigate(slide.link)}}
                    className="w-full h-full object-fill cursor-pointer"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* RESTORED UX: Original Navigation Styling */}
          <CarouselPrevious
            className="hidden group-hover:flex left-2 
            bg-black/20 hover:bg-black/40 border-none 
            text-white h-12 w-9 rounded-sm transition-all"
          />
          <CarouselNext
            className="hidden group-hover:flex right-2 
            bg-black/20 hover:bg-black/40 border-none 
            text-white h-12 w-9 rounded-sm transition-all"
          />

          {/* RESTORED UX: Original Rectangular Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`transition-all duration-300 ease-out rounded-sm cursor-pointer border border-emerald-950 ${
                  current === index
                    ? "sm:w-5 sm:h-2 w-3 h-1.5 my-auto bg-orange-400"
                    : "sm:w-3 sm:h-3 w-2 h-2 bg-white hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSection;

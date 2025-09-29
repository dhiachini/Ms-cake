import { useEffect, useState } from "react";
import article1 from "../assets/images/article-weekend-1.png";
import article2 from "../assets/images/article-weekend-2.png";
import article3 from "../assets/images/article-weekend-3.png";
import Card from "./Card";

function WeekendCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const boxes = [article1, article2, article3, article1, article2, article3];

  // Auto-slide toutes les 2s for both mobile and desktop
  const desktopLength = Math.ceil(boxes.length / 2);
  const [desktopIndex, setDesktopIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % boxes.length);
      setDesktopIndex((prev) => (prev + 1) % desktopLength);
    }, 2000);
    return () => clearInterval(interval);
  }, [boxes.length, desktopLength]);

  return (
    <div className="w-full mt-16 md:mt-36">
      {/* Titre centré */}
      <div className="w-full flex justify-center">
        <span className="text-2xl md:text-5xl text-[#342520]">
          Patisseries du week-end
        </span>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden relative w-full h-96 mt-5 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {boxes.map((img, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <Card>
                <div className="p-4">
                  <img
                    src={img}
                    alt={`Photo ${i + 1}`}
                    className="object-cover w-full h-90 mb-4 rounded-xl"
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop carousel: 2 images at a time, auto-slide */}
      <div className="hidden md:flex w-full mt-5 gap-4 overflow-hidden">
        <div
          className="flex w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${desktopIndex * 100}%)` }}
        >
          {Array.from({ length: desktopLength }).map((_, idx) => {
            const start = idx * 2;
            const pair = boxes.slice(start, start + 2);
            return (
              <div key={idx} className="flex w-full gap-4 flex-shrink-0">
                {pair.map((img, i) => (
                  <div key={i} className="w-1/2 p-4">
                    <Card>
                      <img
                        src={img}
                        alt={`Photo ${start + i + 1}`}
                        className="object-cover w-full h-150 mb-4 rounded-xl"
                      />
                    </Card>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeekendCarousel;

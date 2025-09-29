import { Cake, ChefHat, HandPlatter } from "lucide-react";
import Layout from "../Layout";
import { useState, useEffect } from "react";

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const boxes = [
    {
      icon: <Cake className="w-15 h-15 mb-2" />,
      title: "Je commande",
      subtitle: "Cake personnalisé",
    },
    {
      icon: <HandPlatter className="w-15 h-15 mb-2" />,
      title: "Je découvre",
      subtitle: "Service traiteur",
    },
    {
      icon: <ChefHat className="w-15 h-15 mb-2" />,
      title: "Je réserve",
      subtitle: "Ateliers\npâtisserie & design cake",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % boxes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + boxes.length) % boxes.length);
  };

  // Auto slide every 2s on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Touch event handlers for swipe
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      nextSlide(); // Swipe left to go to next slide
    } else if (diff < -50) {
      prevSlide(); // Swipe right to go to previous slide
    }
    touchStartX = 0;
    touchEndX = 0;
  };

  return (
    <Layout>
      <div className="space-y-7">
        <div className="banner relative min-h-screen flex items-start md:items-center">
          <div className="space-y-3 text-left pl-6 mt-16 md:pl-12 lg:pl-24">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#342520] max-w-3xl">
              La haute pâtisserie française,
            </h1>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#342520] max-w-3xl">
              personalisée pour vos plus
            </h1>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#342520] max-w-3xl">
              belles occasions
            </h1>
            <button className="bg-[#faf4e6] hover:bg-[#b06c74] hover:text-[#faf4e6] text-black px-3 py-1 h-[50px] mt-9 w-[180px] rounded-3xl cursor-pointer border-0 outline-none">
              Découvrez-nous
            </button>
          </div>

          {/* 👉 Boxes à moitié en dehors */}
          <div className="absolute left-1/2 bottom-[-20%] -translate-x-1/2 w-full flex justify-center z-10">
            <div className="relative w-full md:w-auto">
              {/* Desktop */}
              <div className="md:flex md:flex-row md:gap-[3rem] hidden rounded-xl">
                {boxes.map((box, index) => (
                  <div
                    key={index}
                    className="bg-[#fdf5f2] w-full h-56 p-7 flex flex-col justify-center items-center rounded-xl"
                  >
                    {box.icon}
                    <span className="text-3xl text-[#1d110f] text-center mb-3">
                      {box.title} <br />
                    </span>
                    <span>{box.subtitle}</span>
                  </div>
                ))}
              </div>

              {/* Mobile */}
              <div className="md:hidden">
                <div className="relative w-full h-56 overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {boxes.map((box, index) => (
                      <div
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        key={index}
                        className="bg-[#fdf5f2] w-full h-full p-7 flex flex-col justify-center items-center min-w-full"
                      >
                        {box.icon}
                        <span className="text-3xl text-[#1d110f] text-center mb-3">
                          {box.title} <br />
                        </span>
                        <span>{box.subtitle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;

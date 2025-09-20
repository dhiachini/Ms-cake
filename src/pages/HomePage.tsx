import { Cake, ChefHat, HandPlatter } from "lucide-react";
import Layout from "../Layout";
import { useState } from "react";

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
        <div className="banner py-24 h-screen">
          <div className="container space-y-3">
            <h1 className="font-serif text-5xl text-[#342520]">
              La haute pâtisserie
              <br /> française, personalisée <br /> pour vos plus belles
              <br />
              occasions
            </h1>
            <button className="bg-[#faf4e6] hover:bg-[#b06c74] hover:text-[#faf4e6] text-black px-3 py-1 h-[50px] mt-9 w-[180px] rounded-3xl cursor-pointer border-0 outline-none">
              Découvrez-nous
            </button>
          </div>
          {/* Div ajouté après les images */}
        </div>
        {/* Box positionnées à 50% du bas de la bannière */}
        <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[100%] w-full flex justify-center z-10">
          <div className="relative w-full md:w-auto">
            {/* Carousel for mobile, row for md+ */}
            <div className="md:flex md:flex-row md:gap-[3rem] hidden rounded-xl">
              <div className="bg-[#fdf5f2] w-full h-56 p-7 flex flex-col justify-center items-center rounded-xl">
                {boxes[0].icon}
                <span className="text-3xl text-[#1d110f] text-center mb-3">
                  {boxes[0].title} <br />
                </span>
                <span>{boxes[0].subtitle}</span>
              </div>
              <div className="bg-[#fdf5f2] w-full h-56 p-7 flex flex-col justify-center items-center rounded-xl">
                {boxes[1].icon}
                <span className="text-3xl text-[#1d110f] text-center mb-3">
                  {boxes[1].title} <br />
                </span>
                <span>{boxes[1].subtitle}</span>
              </div>
              <div className="bg-[#fdf5f2] w-full h-56 p-7 flex flex-col justify-center items-center rounded-xl">
                {boxes[2].icon}
                <span className="text-3xl text-[#1d110f] text-center">
                  {boxes[2].title} <br />
                </span>
                <span className="text-xl text-[#1d110f] text-center">
                  {boxes[2].subtitle}
                </span>
              </div>
            </div>
            {/* Carousel for mobile */}
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
    </Layout>
  );
}

export default HomePage;

import { useEffect, useState } from "react";
import Card from "./Card";
import APIBackend from "../utils/APIBackend";
import ServerAdress from "../utils/ServerAdress";

function WeekendCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    APIBackend.get("/CakeWeek/GetAll")
      .then((response) => {
        console.log("GET /CakeWeek/GetAll =>", response.data); // << DEBUG: regarde la structure ici
        const raw = response.data;
        const items = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
        setWorkshops(items);
      })
      .catch((error) => {
        console.error("Erreur API:", error);
        setWorkshops([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // desktop group length (3 items per group)
  const desktopLength = Math.max(1, Math.ceil(workshops.length / 3));

  useEffect(() => {
    if (workshops.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % workshops.length);
      setDesktopIndex((prev) => (prev + 1) % desktopLength);
    }, 2000);
    return () => clearInterval(interval);
  }, [workshops.length, desktopLength]);

  if (loading) {
    return (
      <div className="py-12 text-center text-[#481713]">Chargement des pâtisseries...</div>
    );
  }

  if (!Array.isArray(workshops) || workshops.length === 0) {
    return (
      <div className="py-12 text-center mt-24 md:mt-36">
        <p className="text-2xl font-bold text-[#481713] mb-2">Pas d’articles pour ce week-end 😔</p>
        <p className="text-[#481713]">Revenez bientôt — de nouveaux articles et douceurs arrivent très vite !</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-24 md:mt-36">
      <div className="w-full flex justify-center">
        <span className="text-2xl md:text-5xl text-[#342520]">Pâtisseries du week-end</span>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative w-full h-96 mt-5 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {workshops.map((item, i) => (
            <div key={item._id ?? i} className="w-full flex-shrink-0">
              <Card>
                <div className="p-4">
                  <img
                    src={ item.ImageUrl}
                    alt={item.Title || `Photo ${i + 1}`}
                    className="object-cover w-full h-90 mb-4 rounded-xl"
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex w-full mt-5 gap-4 overflow-hidden">
        <div
          className="flex w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${desktopIndex * 100}%)` }}
        >
          {Array.from({ length: desktopLength }).map((_, idx) => {
            const start = idx * 3;
            const group = workshops.slice(start, start + 3);
            return (
              <div key={idx} className="flex w-full gap-4 flex-shrink-0">
                {group.map((item, i) => (
                  <div key={item._id ?? i} className="w-1/3 p-4">
                    <Card>
                      <img
                        src={ item.ImageUrl}
                        alt={item.Title || `Photo ${start + i + 1}`}
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

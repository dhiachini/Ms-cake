import { useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import CustomOrderPopup from "../components/modals/CustomOrderPopup";
import weekEndBreadcrumb from "../assets/images/week-end-patisserie-breadcrumb.jpg";
import patisserie1 from "../assets/images/patisserie-week-1.jpg";
import patisserie2 from "../assets/images/patisserie-week-2.jpg";
import patisserie3 from "../assets/images/patisserie-week-3.jpg";
import patisserie4 from "../assets/images/patisserie-week-4.jpg";
import APIBackend from "../utils/APIBackend";

function PastryWeekEnd() {
  const workshops = [
    {
      id: 1,
      title: "Tarte fraise pistache",
      description: "Pate sablée, crème pistache, fraises fraîches",
      image: patisserie1,
    },
    {
      id: 2,
      title: "Millefeuille",
      description: "Crème diplomate vanille, pâte feuilletée caramélisée",
      image: patisserie2,
    },
    {
      id: 3,
      title: "Tarte citron meringuée",
      description: "Lemond curd, meringue italienne",
      image: patisserie3,
    },
    {
      id: 4,
      title: "Eclaier chocolat",
      description: "Dark chocolate ganache, pâte à choux",
      image: patisserie4,
    },
    {
      id: 5,
      title: "Masterclass Macaron",
      description:
        "Parfait pour débutants, apprenez les bases des macarons avec un chef.",
      image: patisserie1,
    },
    {
      id: 6,
      title: "Masterclass Tarte",
      description:
        "Créez des tartes élégantes avec des techniques de cake design innovantes.",
      image: patisserie2,
    },
    {
      id: 7,
      title: "Masterclass Tarte",
      description:
        "Maîtrisez la tarte avec des designs personnalisés et des garnitures uniques.",
      image: patisserie3,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);

  const paginatedWorkshops = workshops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(500, 500); // Scroll to top on page change
  };
  const openCustomOrder = () => {
    setIsCustomOrderOpen(true);
  };

  const closeCustomOrder = () => {
    setIsCustomOrderOpen(false);
  };
  const getData = () => {
    APIBackend.get("/workshops")
      .then((response: { data: any; }) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full h-120">
          <img
            src={weekEndBreadcrumb}
            alt="Workshop Breadcrumb"
            className="w-full h-full object-cover mt-0"
          />

          {/* Texte et bouton positionnés sur la photo */}
          <div className="absolute top-1/2 left-10 -translate-y-1/2 space-y-3">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#342520]">
              MENU DU WEEK-END <br /> pâtisserie éphémère
              <br />
            </h1>

            <section className="font-serif text-sm sm:text-base md:text-2xl text-[#342520] mt-5">
              Chaque semaine, une sélection inspirée par les pulsons.
              <br /> les envies et vos gourmandises.
            </section>

            <button
              onClick={openCustomOrder}
              className="bg-[#5a140a] hover:bg-[#b06c74] hover:text-[#faf4e6] text-white px-6 py-3 mt-9 w-auto rounded-3xl cursor-pointer border-0 outline-none mx-auto "
            >
              Passer une commande personnalisée
            </button>
          </div>
        </div>

        <div className="w-full h-full p-8 bg-[#fdf5f2]">
          <div className="w-full bg-[#fffcf7] rounded-lg p-14">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
              {paginatedWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="max-w-full bg-[#fffcf7] rounded-lg"
                >
                  <div className="max-w-sm rounded-lg aspect-square">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover object-center"
                        src={workshop.image}
                        alt={workshop.title}
                      />
                    </div>
                    <div className="p-5">
                      <h5 className="mb-3 text-base sm:text-lg md:text-2xl font-bold tracking-tight text-[#481713]">
                        {workshop.title}
                      </h5>
                      <p className="text-sm sm:text-base md:text-[#481713] font-normal">
                        {workshop.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Pagination
                totalItems={workshops.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CustomOrderPopup isOpen={isCustomOrderOpen} onClose={closeCustomOrder} />
    </div>
  );
}

export default PastryWeekEnd;

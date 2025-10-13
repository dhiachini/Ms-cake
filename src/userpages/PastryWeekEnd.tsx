import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import CustomOrderPopup from "../components/modals/CustomOrderPopup";
import weekEndBreadcrumb from "../assets/images/week-end-patisserie-breadcrumb.jpg";
import APIBackend from "../utils/APIBackend";

function PastryWeekEnd() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [workshops, setWorkshops] = useState<any[]>([]);

  const paginatedWorkshops = workshops?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(500, 500);;
  };

  const openCustomOrder = () => setIsCustomOrderOpen(true);
  const closeCustomOrder = () => setIsCustomOrderOpen(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    APIBackend.get("/CakeWeek/GetAll")
      .then((response) => {
        setWorkshops(response.data);
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
        {/* Section Hero */}
       <div className="relative w-full h-[30vh] sm:h-[60vh] md:h-[80vh]">
  <img
    src={weekEndBreadcrumb}
    alt="Workshop Breadcrumb"
    className="w-full h-full object-cover mt-0"
  />

  <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-10 space-y-3 text-[#342520]">
    <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl max-w-[90%] sm:max-w-[70%] leading-snug">
      MENU DU WEEK-END <br /> pâtisserie éphémère
    </h1>

    <section className="font-serif text-sm sm:text-base md:text-2xl mt-5 max-w-[90%] sm:max-w-[70%] leading-relaxed">
      Chaque semaine, une sélection inspirée par nos passions,
      <br /> vos envies et vos plus belles gourmandises.
    </section>

    <button
      onClick={openCustomOrder}
      className="bg-[#5a140a] hover:bg-[#b06c74] hover:text-[#faf4e6] text-white px-6 py-3 mt-9 w-fit rounded-3xl cursor-pointer border-0 outline-none"
    >
      Passer une commande personnalisée
    </button>
  </div>
</div>


        {/* Section Cards */}
        <div className="w-full h-full p-6 sm:p-8 bg-[#fdf5f2]">
          <div className="w-full bg-[#fffcf7] rounded-lg p-6 sm:p-10">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedWorkshops?.map((workshop) => (
                <div
                  key={workshop._id}
                  className="flex flex-col bg-[#fffcf7] rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  {/* Image */}
                  <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={workshop.ImageUrl}
                      alt={workshop.Title}
                    />
                  </div>

                  {/* Description */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col border-none">
                    <h5 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold text-[#481713]">
                      {workshop.Title}
                    </h5>
                    <p className="text-sm sm:text-base text-[#481713] leading-relaxed break-words">
                      {workshop.Description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Pagination
                totalItems={workshops?.length}
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

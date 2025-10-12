import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import workshopBreadcrumb from "../assets/images/workshop-breadcrumb.png";
import APIBackend from "../utils/APIBackend";


function WorkShops() {
  const [selectedCategory, setSelectedCategory] = useState("Pâtisserie");
  const [data, setData] = useState<any[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate(); // Call useNavigate at the top level

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setFilteredWorkshops(
      data.filter(
        (workshop: { Categories: string }) => workshop.Categories === category
      )
    );
    setCurrentPage(1); // Reset to first page when category changes
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    APIBackend.get("/Atelier/GetAll")
      .then((response) => {
        setData(response.data);
        setFilteredWorkshops(
          response.data.filter(
            (workshop: { Categories: string }) =>
              workshop.Categories === selectedCategory
          )
        );
      })
      .catch((error: any) => {
        console.error("There was an error!", error);
      });
  };
  const paginatedWorkshops = filteredWorkshops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top on component mount
    window.scrollTo(370, 370);
  };

  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="w-full flex flex-col items-center">
        <img
          src={workshopBreadcrumb}
          alt="Workshop Breadcrumb"
          className="w-full h-70 object-cover mt-0"
        />
        <div className="w-full h-full p-8 bg-[#fdf5f2]">
          <div className="w-full flex flex-row justify-center items-center mb-8 gap-4">
            <button
              className={`bg-[#461712] ${
                selectedCategory === "Pâtisserie"
                  ? "bg-[#b06c74] text-[#faf4e6]"
                  : "hover:bg-[#b06c74] hover:text-[#faf4e6]"
              } text-white px-3 py-1 h-[50px] w-[180px] rounded-3xl cursor-pointer border-0 outline-none`}
              onClick={() => handleCategoryClick("Pâtisserie")}
            >
              Pâtisserie
            </button>
            <button
              className={`bg-[#461712] ${
                selectedCategory === "Cake design"
                  ? "bg-[#b06c74] text-[#faf4e6]"
                  : "hover:bg-[#b06c74] hover:text-[#faf4e6]"
              } text-white px-3 py-1 h-[50px] w-[180px] rounded-3xl cursor-pointer border-0 outline-none`}
              onClick={() => handleCategoryClick("Cake design")}
            >
              Cake design
            </button>
          </div>
          <div className="w-full bg-[#fffcf7] rounded-lg p-14">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
              {paginatedWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="max-w-full bg-[#fffcf7] rounded-lg"
                >
                  <div className="max-w-sm rounded-lg">
                    <div className="w-full max-w-sm rounded-lg overflow-hidden">
                      <a href="#">
                        <div className="w-full h-64 overflow-hidden rounded-lg">
                          <img
                            src={ workshop.ImageUrl}
                            alt={workshop.Title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </a>
                    </div>

                    <div className="p-5 ">
                      <a href="#">
                        <h5 className="mb-2 text-base sm:text-lg md:text-2xl font-normal tracking-tight text-[#481713]">
                          {workshop.Title}
                        </h5>
                      </a>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-0 mb-2">
                        <p className="text-sm sm:text-base font-normal text-[#481713]">
                          {new Date(workshop.Date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm sm:text-base font-normal text-[#481713]">
                          {workshop.Prix} €
                        </p>
                      </div>

                      <div className="flex justify-between items-center flex-wrap gap-2">
                        {workshop.RemainingPlaces > 0 && (
                          <p className="text-sm sm:text-base font-normal text-[#481713]">
                            {workshop.RemainingPlaces} Places restantes
                          </p>
                        )}
                        {workshop.RemainingPlaces === 0 ? (
                          <p className="text-sm sm:text-base font-normal text-[#481713]">
                            Complets!
                          </p>
                        ) : (
                          <button
                            onClick={() =>
                              navigate(`/workshopreserve/${workshop._id}`)
                            }
                            className="bg-[#461712] hover:bg-[#b06c74] hover:text-[#faf4e6] text-white 
       px-2 py-1 h-[35px] w-[120px] sm:h-[50px] sm:w-[180px] 
       text-xs sm:text-base rounded-3xl cursor-pointer border-0 outline-none"
                          >
                            Reserver ma place
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Pagination
                totalItems={filteredWorkshops.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WorkShops;

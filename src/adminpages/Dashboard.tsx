import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PastryTable from "../components/tables/PastryTable";
import WorkshopTable from "../components/tables/WorkshopTable";
import APIBackend from "../utils/APIBackend";

// interface Workshop {
//   _id: number;
//   Title: string;
//   Date: string;
//   Prix: number;
//   NbPlaces: number;
//   ImageUrl: string;
//   Categories: string;
//   RemainingPlaces: number;
// }

function Dashboard() {

  const [weekCake, setWeekCake] = useState<any[]>([]);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const getDataCake = () => {
    APIBackend.get("/CakeWeek/GetAll")
      .then((response) => {
        setWeekCake(response.data);

      })
      .catch((error: any) => {
        console.error("There was an error!", error);
      });
  };
  const getDataAteliers = () => {
    APIBackend.get("/Atelier/GetAll")
      .then((response) => {
        setWorkshops(response.data);
      })
      .catch((error: any) => {
        console.error("There was an error!", error);
      });
  };
  useEffect(() => {
    getDataCake();
    getDataAteliers();
  }, []);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Pâtisserie"); // Par défaut "Tous" pour afficher tous les workshops
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset à la première page
  };

  const filteredWorkshops =
    selectedCategory === "Tous"
      ? workshops
      : workshops.filter((workshop) => workshop.Categories === selectedCategory);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(370, 370);
  };

  const handleEditPastry = (id: string) => {
    navigate(`/pastry/${id}/edit`);
  };
  const handleEditWorkshop = (id: string) => {
    navigate(`/workshop/${id}/edit`);
  };

  // delete handled inside WorkshopTable; pass a refresh callback below
  

  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-full h-30 bg-[#fdf5f2] flex items-center justify-center mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#342520]">
            Tableau de bord administrateur
          </h1>
        </div>

        <div className="w-full h-full p-8 bg-[#fdf5f2]">
          <div className="w-full flex flex-row justify-center items-center mb-8 gap-4">
            <button
              className={`bg-[#461712] ${selectedCategory === "Pâtisserie"
                ? "bg-[#b06c74] text-[#faf4e6]"
                : "hover:bg-[#b06c74] hover:text-[#faf4e6]"
                } text-white px-3 py-1 h-[50px] w-[210px] rounded-3xl cursor-pointer border-0 outline-none`}
              onClick={() => handleCategoryClick("Pâtisserie")}
            >
              Pâtisserie
            </button>
            <button
              className={`bg-[#461712] ${selectedCategory === "Tous" ||
                selectedCategory === "Cake design"
                ? "bg-[#b06c74] text-[#faf4e6]"
                : "hover:bg-[#b06c74] hover:text-[#faf4e6]"
                } text-white px-3 py-1 h-[50px] w-[200px] rounded-3xl cursor-pointer border-0 outline-none`}
              onClick={() => handleCategoryClick("Tous")}
            >
              Ateliers
            </button>
          </div>

          {selectedCategory === "Pâtisserie" ? (
            <PastryTable
              pastries={weekCake}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onEdit={handleEditPastry}
              fetchPastries={getDataCake}
            />
          ) : (
            <WorkshopTable
              workshops={filteredWorkshops}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onEdit={handleEditWorkshop}
              onDelete={getDataAteliers}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

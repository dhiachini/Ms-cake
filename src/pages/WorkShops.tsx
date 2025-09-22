import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import workshopBreadcrumb from "../assets/images/workshop-breadcrumb.png";
import workshop1 from "../assets/images/Workshop-image-1.jpg";
import workshop2 from "../assets/images/Workshop-image-2.jpg";
import workshop3 from "../assets/images/Workshop-image-3.jpg";
import workshop4 from "../assets/images/Workshop-image-4.jpg";
import workshop5 from "../assets/images/Workshop-image-5.jpg";
import workshop6 from "../assets/images/Workshop-image-6.jpg";
import workshop7 from "../assets/images/Workshop-image-7.jpg";

function WorkShops() {
  const workshops = [
    {
      id: 1,
      title: "Masterclass Saint-Honoré",
      date: "Samedi 12 Juillet",
      price: 420,
      places: 3,
      image: workshop1,
      category: "Pâtisserie",
    },
    {
      id: 2,
      title: "Masterclass Éclair",
      date: "Dimanche 13 Juillet",
      price: 80,
      places: 2,
      image: workshop2,
      category: "Pâtisserie",
    },
    {
      id: 3,
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: workshop3,
      category: "Pâtisserie",
    },
    {
      id: 4,
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: workshop4,
      category: "Pâtisserie",
    },
    {
      id: 5,
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: workshop5,
      category: "Pâtisserie",
    },
    {
      id: 6,
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: workshop6,
      category: "Cake design",
    },
    {
      id: 7,
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: workshop7,
      category: "Cake design",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Pâtisserie");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate(); // Call useNavigate at the top level

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const filteredWorkshops = workshops.filter(
    (workshop) => workshop.category === selectedCategory
  );
  const paginatedWorkshops = filteredWorkshops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top on component mount
    window.scrollTo(300, 300);
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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-items-center gap-8">
              {paginatedWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="max-w-full bg-[#fffcf7] rounded-lg"
                >
                  <div className="max-w-sm rounded-lg">
                    <div className="max-w-4xl max-h-96 rounded-lg overflow-hidden">
                      <a href="#">
                        <img
                          className="w-full h-full object-center"
                          src={workshop.image}
                          alt={workshop.title}
                        />
                      </a>
                    </div>

                    <div className="p-5 ">
                      <a href="#">
                        <h5 className="mb-2 text-base sm:text-lg md:text-2xl font-normal tracking-tight text-[#481713]">
                          {workshop.title}
                        </h5>
                      </a>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-0 mb-2">
                        <p className="text-sm sm:text-base font-normal text-[#481713]">
                          {workshop.date}
                        </p>
                        <p className="text-sm sm:text-base font-normal text-[#481713]">
                          {workshop.price} €
                        </p>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-0">
                        <p className="text-sm sm:text-base font-normal text-[#481713]">
                          {workshop.places} Places restantes
                        </p>
                        <button
                          onClick={() => navigate(`/workshop/${workshop.id}`)}
                          className="bg-[#461712] hover:bg-[#b06c74] hover:text-[#faf4e6] text-white 
             px-2 py-1 h-[35px] w-[120px] sm:h-[50px] sm:w-[180px] 
             text-xs sm:text-base rounded-3xl cursor-pointer border-0 outline-none"
                        >
                          Reserver ma place
                        </button>
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

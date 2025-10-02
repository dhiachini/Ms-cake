import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import workshop1 from "../assets/images/Workshop-image-1.jpg";
import workshop2 from "../assets/images/Workshop-image-2.jpg";
import workshop3 from "../assets/images/Workshop-image-3.jpg";
import workshop4 from "../assets/images/Workshop-image-4.jpg";
import workshop5 from "../assets/images/Workshop-image-5.jpg";
import workshop6 from "../assets/images/Workshop-image-6.jpg";
import workshop7 from "../assets/images/Workshop-image-7.jpg";
import patisserie1 from "../assets/images/patisserie-week-1.jpg";
import patisserie2 from "../assets/images/patisserie-week-2.jpg";
import patisserie3 from "../assets/images/patisserie-week-3.jpg";
import patisserie4 from "../assets/images/patisserie-week-4.jpg";

function Dashboard() {
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
    {
      id: 8,
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: workshop5,
      category: "Pâtisserie",
    },
    {
      id: 9,
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: workshop6,
      category: "Cake design",
    },
    {
      id: 10,
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: workshop7,
      category: "Cake design",
    },
    {
      id: 11,
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: workshop6,
      category: "Cake design",
    },
    {
      id: 12,
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: workshop7,
      category: "Cake design",
    },
  ];
  const pastry = [
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

  const [selectedCategory, setSelectedCategory] = useState("Tous"); // Par défaut "Tous" pour afficher tous les workshops
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset à la première page
  };

  const filteredWorkshops =
    selectedCategory === "Tous"
      ? workshops
      : selectedCategory === "Pâtisserie"
        ? pastry
        : workshops.filter(
            (workshop) => workshop.category === selectedCategory
          );

  const paginatedWorkshops = filteredWorkshops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(370, 370);
  };

  const handleEdit = (id: number) => {
    navigate(`/workshop/${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet atelier ?")) {
      console.log(`Atelier ${id} supprimé`);
    }
  };

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
              className={`bg-[#461712] ${
                selectedCategory === "Pâtisserie"
                  ? "bg-[#b06c74] text-[#faf4e6]"
                  : "hover:bg-[#b06c74] hover:text-[#faf4e6]"
              } text-white px-3 py-1 h-[50px] w-[210px] rounded-3xl cursor-pointer border-0 outline-none`}
              onClick={() => handleCategoryClick("Pâtisserie")}
            >
              Pâtisserie
            </button>
            <button
              className={`bg-[#461712] ${
                selectedCategory === "Tous" ||
                selectedCategory === "Cake design"
                  ? "bg-[#b06c74] text-[#faf4e6]"
                  : "hover:bg-[#b06c74] hover:text-[#faf4e6]"
              } text-white px-3 py-1 h-[50px] w-[200px] rounded-3xl cursor-pointer border-0 outline-none`}
              onClick={() => handleCategoryClick("Tous")}
            >
              Ateliers
            </button>
          </div>

          <div className="w-full bg-[#fffcf7] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-[#481713] mb-4">
              Liste des Ateliers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-[#481713]">
                <thead className="text-xs uppercase bg-[#461712] text-white">
                  <tr>
                    <th className="px-4 py-2 rounded-l-xl">ID</th>
                    <th className="px-4 py-2">Titre</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Prix (€)</th>
                    <th className="px-4 py-2">Places</th>
                    <th className="px-4 py-2">Catégorie</th>
                    <th className="px-4 py-2 rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedWorkshops.map((workshops) => (
                    <tr
                      key={workshops.id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="px-4 py-2">{workshops.id}</td>
                      <td className="px-4 py-2">{workshops.title}</td>
                      <td className="px-4 py-2">
                        {"date" in workshops && workshops.date ? workshops.date : "-"}
                      </td>
                      <td className="px-4 py-2">
                        {"price" in workshops && workshops.price ? `${workshops.price}` : "-"}
                      </td>
                      <td className="px-4 py-2">
                        {"places" in workshops && workshops.places ? `${workshops.places}` : "-"}
                      </td>
                      <td className="px-4 py-2">
                        {"category" in workshops && workshops.category ? workshops.category : "Pâtisserie"}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEdit(workshops.id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(workshops.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                totalItems={
                  selectedCategory === "Pâtisserie"
                    ? pastry.length
                    : workshops.length
                }
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

export default Dashboard;

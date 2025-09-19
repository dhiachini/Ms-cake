import { useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

function PastryWeekEnd() {
  const workshops = [
    {
      id: 1,
      title: "Masterclass Saint-Honoré",
      description:
        "Apprenez à créer un Saint-Honoré délicieux avec des techniques de pâtisserie expertes.",
      image: "/src/assets/images/article-weekend-1.png",
    },
    {
      id: 2,
      title: "Masterclass Éclair",
      description:
        "Maîtrisez l’art de l’éclair avec des recettes classiques et modernes.",
      image: "/src/assets/images/article-weekend-2.png",
    },
    {
      id: 3,
      title: "Masterclass Macaron",
      description:
        "Découvrez les secrets pour des macarons parfaits, du mélange à la décoration.",
      image: "/src/assets/images/article-weekend-3.png",
    },
    {
      id: 4,
      title: "Masterclass Macaron",
      description:
        "Explorez des saveurs uniques dans cette masterclass de macarons créatifs.",
      image: "/src/assets/images/article-weekend-1.png",
    },
    {
      id: 5,
      title: "Masterclass Macaron",
      description:
        "Parfait pour débutants, apprenez les bases des macarons avec un chef.",
      image: "/src/assets/images/article-weekend-2.png",
    },
    {
      id: 6,
      title: "Masterclass Tarte",
      description:
        "Créez des tartes élégantes avec des techniques de cake design innovantes.",
      image: "/src/assets/images/article-weekend-3.png",
    },
    {
      id: 7,
      title: "Masterclass Tarte",
      description:
        "Maîtrisez la tarte avec des designs personnalisés et des garnitures uniques.",
      image: "/src/assets/images/article-weekend-1.png",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const paginatedWorkshops = workshops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(300, 300); // Scroll to top on page change
  };

  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="w-full flex flex-col items-center">
        <img
          src="/src/assets/images/workshop-breadcrumb.png"
          alt="Workshop Breadcrumb"
          className="w-full h-70 object-cover mt-0"
        />
        <div className="w-full h-full p-8 bg-[#fdf5f2]">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-items-center gap-8">
            {paginatedWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="max-w-full bg-[#fffcf7] rounded-lg"
              >
                <div className="max-w-sm rounded-lg">
                  <div className="max-w-4xl max-h-96 rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={workshop.image}
                      alt={workshop.title}
                    />
                  </div>
                  <div className="p-5">
                    <h5 className="mb-3 text-2xl font-normal tracking-tight text-[#481713] dark:text-white">
                      {workshop.title}
                    </h5>
                    <p className="text-[#481713] font-normal">
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

      <Footer />
    </div>
  );
}

export default PastryWeekEnd;

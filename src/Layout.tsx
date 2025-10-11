import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EbookIcon from "./assets/icons/EbookIcon";
import WeekendCarousel from "./components/WeekendCarousel";
import about1 from "./assets/images/Mariam.jpeg";
import about2 from "./assets/images/Sofien.jpeg";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Contenu principal */}
      <div className="w-full">{children}</div>

      {/* Section avec carousel + ebook */}
      <div className="w-full p-8 bg-[#fffcf5]">
        {/* 👉 intègre directement ton composant */}
        <WeekendCarousel />

        {/* Section Ebook */}
        <div className="w-full flex justify-center px-4 mt-10">
          <div className="flex w-full max-w-5xl h-auto bg-[#fae5e4] flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 p-6 rounded-xl shadow-md">
            <EbookIcon className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
            <span className="text-2xl sm:text-3xl md:text-4xl text-[#342520] text-center sm:text-left font-serif">
              E-book Design Cake pour débutants
            </span>
          </div>
        </div>

        {/* 🌸 Section À propos de nous */}
        <div className="w-full flex justify-center mt-20 px-6">
          <div className="flex flex-col lg:flex-row items-center max-w-6xl gap-12">
            {/* 📸 Bloc gauche : images */}
            <div className="flex gap-4 flex-1 justify-center">
              <img
                src={about1}
                alt="Équipe Ms Cake"
                className="rounded-2xl w-1/2 object-cover shadow-md"
              />
              <img
                src={about2}
                alt="Atelier Ms Cake"
                className="rounded-2xl w-1/2 object-cover shadow-md"
              />
            </div>

            {/* 🧾 Bloc droit : texte */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-[#461712] font-semibold text-lg mb-2">
                Qui sommes-nous
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-[#461712] mb-4 leading-snug">
                🍰 Sofiane Ben Salah
              </h2>
              <p className="text-gray-700 text-base mb-8 leading-relaxed">
                Chef pâtissier passionné, fort de 15 ans d’expérience en
                pâtisserie française. Doué depuis l’enfance, il allie
                savoir-faire, précision et créativité. Il rejoint Ms Cake en
                2022 pour y exprimer pleinement son art.
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-[#461712] mb-4 leading-snug">
                🎂 Meriem Nouira
              </h2>
              <p className="text-gray-700 text-base mb-8 leading-relaxed">
                Fondatrice et cake designer, Meriem transforme la passion en
                métier depuis plus de 5 ans. Partie de chez elle, cette jeune
                maman artiste crée des gâteaux qui mêlent élégance, émotion et
                authenticité.{" "}
              </p>

           
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

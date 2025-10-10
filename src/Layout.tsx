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
              <h2 className="text-3xl md:text-4xl font-bold text-[#461712] mb-4 leading-snug">
                Design, Passion et Création au Service de Vos Goûts
              </h2>
              <p className="text-gray-700 text-base mb-8 leading-relaxed">
                Chez{" "}
                <span className="font-semibold text-[#481713]">Ms Cake</span>,
                nous mettons notre créativité et notre savoir-faire au service
                de la gourmandise. Qu’il s’agisse de design pâtissier, de
                composition ou de personnalisation, notre équipe met tout son
                cœur à réaliser vos envies avec une approche artisanale et
                moderne.
              </p>

              {/* 🎯 Mission / Vision */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                {/* Mission */}
                <div className="flex flex-col items-center sm:items-start bg-[#b06c74]/10 p-5 rounded-xl w-full sm:w-1/2 shadow-sm hover:shadow-md transition">
                  <div className="bg-[#b06c74] text-white p-3 rounded-lg mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-[#1e1e1e]">
                    Notre mission
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Allier l’élégance et le goût pour offrir des créations
                    uniques, inspirées par la passion et le savoir-faire
                    artisanal.
                  </p>
                </div>

                {/* Vision */}
                <div className="flex flex-col items-center sm:items-start bg-[#b06c74]/10 p-5 rounded-xl w-full sm:w-1/2 shadow-sm hover:shadow-md transition">
                  <div className="bg-[#b06c74] text-white p-3 rounded-lg mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-[#1e1e1e]">
                    Notre vision
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Redéfinir la pâtisserie artisanale en mêlant créativité,
                    innovation et émotions sucrées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

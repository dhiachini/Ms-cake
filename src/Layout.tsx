import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EbookIcon from "./assets/icons/EbookIcon";
import WeekendCarousel from "./components/WeekendCarousel";



type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Contenu principal */}
      <div className="w-full">{children}</div>

      {/* Section avec carousel + ebook */}
      <div className="w-full p-8 bg-[#fffcf5] ">
        {/* 👉 intègre directement ton composant */}
        <WeekendCarousel />

        {/* Nouveau div avec bg #fae5e4 */}
        <div className="w-full flex justify-center px-4 mt-10">
          <div className="flex w-full max-w-5xl h-auto bg-[#fae5e4] flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 p-6 rounded-xl">
            <EbookIcon className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
            <span className="text-2xl sm:text-3xl md:text-4xl text-[#342520] text-center sm:text-left">
              E-book Design Cake pour débutants
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

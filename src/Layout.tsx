import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import EbookIcon from "./assets/icons/EbookIcon";
import article1 from "./assets/images/article-weekend-1.png";
import article2 from "./assets/images/article-weekend-2.png";
import article3 from "./assets/images/article-weekend-3.png";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="w-full h-screen">{children}</div>

      <div className="w-full p-8 bg-[#fffcf5] ">
        <div className="w-full mt-35">
          {/* Titre centré */}
          <div className="w-full flex justify-center">
            <span className="text-5xl text-[#342520]">
              Patisseries du week-end
            </span>
          </div>

          {/* Les 3 boxes */}
          <div className="w-full flex flex-col md:flex-row mt-5">
            <div className="w-full flex-1 p-4">
              <Card>
                <img
                  src={article1}
                  alt="Photo 1"
                  className="object-cover w-full h-90 mb-4 rounded-xl"
                />
              </Card>
            </div>
            <div className="w-full flex-1 p-4">
              <Card>
                <img
                  src={article2}
                  alt="Photo 2"
                  className="object-cover w-full h-90 mb-4 rounded-xl"
                />
              </Card>
            </div>
            <div className="w-full flex-1 p-4">
              <Card>
                <img
                  src={article3}
                  alt="Photo 3"
                  className="object-cover w-full h-90 mb-4 rounded-xl"
                />
              </Card>
            </div>
          </div>
          {/* Nouveau div avec bg #fae5e4 */}
          <div className="w-full flex justify-center px-4">
            <div className="flex w-full max-w-5xl h-auto bg-[#fae5e4] flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 p-6 rounded-xl">
              <EbookIcon className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
              <span className="text-2xl sm:text-3xl md:text-4xl text-[#342520] text-center sm:text-left">
                E-book Design Cake pour débutants
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

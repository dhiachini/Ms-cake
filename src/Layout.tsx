import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import EbookIcon from "./assets/icons/EbookIcon";

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
                  src="/src/assets/images/article-weekend-1.png"
                  alt="Photo 1"
                  className="object-cover w-full h-90 mb-4"
                />
              </Card>
            </div>
            <div className="w-full flex-1 p-4">
              <Card>
                <img
                  src="/src/assets/images/article-weekend-2.png"
                  alt="Photo 2"
                  className="object-cover w-full h-90 mb-4"
                />
              </Card>
            </div>
            <div className="w-full flex-1 p-4">
              <Card>
                <img
                  src="/src/assets/images/article-weekend-3.png"
                  alt="Photo 3"
                  className="object-cover w-full h-90 mb-4"
                />
              </Card>
            </div>
          </div>
          {/* Nouveau div avec bg #fae5e4 */}
          <div className="w-full flex justify-center">
            <div className="flex w-[57rem] h-40 bg-[#fae5e4] flex-row justify-center items-center gap-10 p-5">
              <EbookIcon className="w-40 h-40" />
              <span className="text-4xl text-[#342520]">
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
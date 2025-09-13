import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BookOpenText } from "lucide-react";
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

      <div className="flex w-full justify-center items-center p-8 bg-[#fffcf5]">
        <div className="mt-40 w-full">
          {/* Titre centré */}
          <div className="flex justify-center">
            <span className="text-5xl text-[#342520]">
              Patisseries du week-end
            </span>
          </div>

          {/* Les 3 boxes */}
          <div className="flex justify-center gap-8 py-12 ">
            <img
              src="/src/assets/images/article-weekend-1.png"
              alt="Photo 1"
              className="object-cover w-70 h-78 "
            />

            <img
              src="/src/assets/images/article-weekend-2.png"
              alt="Photo 2"
              className="object-cover w-70 h-78"
            />
            <img
              src="/src/assets/images/article-weekend-3.png"
              alt="Photo 3"
              className="object-cover w-70 h-78"
            />
          </div>
          {/* Nouveau div avec bg #fae5e4 */}
          <div className="flex justify-center ">
            <div className="flex w-[57rem] h-40 bg-[#fae5e4] flex-row justify-center items-center gap-10 p-5">
              <EbookIcon className="w-40 h-40" />
              <span className="text-4xl text-[#342520]">E-book Design Cake pour débutants</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

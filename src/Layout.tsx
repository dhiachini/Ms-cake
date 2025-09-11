import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="w-full">{children}</div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

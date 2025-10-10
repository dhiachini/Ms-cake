import React, { useEffect } from "react";
import { Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UnderDevelopment: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf5f2]">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <Wrench className="w-24 h-24 text-[#b06c74] mb-6 animate-spin-slow" />

        <h1 className="text-3xl font-bold text-[#481713] mb-4">
          Section en cours de développement 🚧
        </h1>

        <p className="text-lg text-[#481713] max-w-lg mb-8">
          Cette section est actuellement en cours de création. Revenez bientôt pour découvrir les nouvelles fonctionnalités !
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-[#461712] hover:bg-[#b06c74] text-white font-semibold px-6 py-3 rounded-3xl transition duration-300"
        >
          Retour à l’accueil
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default UnderDevelopment;

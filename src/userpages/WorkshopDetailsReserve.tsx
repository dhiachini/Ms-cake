import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthPopup from "../components/modals/AuthPopup";
import SummaryPopup from "../components/modals/SummaryPopup";
import ConfirmationPopup from "../components/modals/ConfirmationPopup";
import APIBackend from "../utils/APIBackend";
import ServerAdress from "../utils/ServerAdress";

interface Workshop {
  _id: string;
  Title: string;
  Description: string;
  Date: string;
  Prix: number;
  NbPlaces: number;
  ImageUrl: string;
  Categories: string;
  RemainingPlaces: number;
}
const WorkshopDetailsReserve = () => {
  const [placesToReserve, setPlacesToReserve] = useState(1);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [, setAuthType] = useState<"signin" | "signup">("signin");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Simulated user email after authentication

  const { id } = useParams<{ id: string }>();
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //const [workshops] = useState(initialWorkshops);
  const [workshop, setWorkshop] = useState<any | null>(null);
  // Fetch workshop by ID
  useEffect(() => {
    if (!id) return;

    APIBackend.get<Workshop>(`/Atelier/GetById/${id}`)
      .then((res) => {
        setWorkshop(res.data);
      })
      .catch((err) => {
        console.error("Error fetching workshop:", err);
      });
  }, [id]);

  if (!workshop) {
    return (
      <div className="text-center p-4 text-[#481713]">Workshop not found</div>
    );
  }

  const handleReserve = () => {
    if (placesToReserve > workshop.NbPlaces) {
      alert("Le nombre de places demandées dépasse les places restantes!");
      return;
    }
    if (!isAuthenticated) {
      setIsConfirmationOpen(true);
    } else {
      setIsSummaryOpen(true);
    }
  };

  const handlePlacesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value > workshop.NbPlaces) {
      setPlacesToReserve(workshop.NbPlaces);
    } else if (value < 1) {
      setPlacesToReserve(1);
    } else {
      setPlacesToReserve(value);
    }
  };

  const closeAuth = (email?: string) => {
    setIsAuthOpen(false);
    if (email) {
      setIsAuthenticated(true);
      setUserEmail(email); // Set email after successful auth
    }
    setIsSummaryOpen(true); // Open summary popup after auth or cancellation
  };

  const switchAuth = (type: "signin" | "signup") => {
    setAuthType(type);
  };

  const closeSummary = () => {
    setIsSummaryOpen(false);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const openAuthPopup = () => {
    setIsConfirmationOpen(false);
    setIsAuthOpen(true);
    setAuthType("signin");
  };

  const openSummaryPopup = () => {
    setIsConfirmationOpen(false);
    setIsSummaryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fdf5f2]">
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={ServerAdress + workshop.ImageUrl}
            alt={workshop.Title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#481713] mb-4">
              {workshop.Title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <p className="text-[#481713] font-normal">
                <span className="font-semibold">Date:</span> {new Date(workshop.Date).toLocaleDateString()}
              </p>
              <p className="text-[#481713] font-normal">
                <span className="font-semibold">Prix:</span> {workshop.Prix} €
              </p>
              <p className="text-[#481713] font-normal">
                <span className="font-semibold">Places restantes:</span>{" "}
                {workshop.RemainingPlaces}
              </p>
              <p className="text-[#481713] font-normal">
                <span className="font-semibold">Category:</span>{" "}
                {workshop.Categories}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-[#481713] mb-2">
                Description
              </h2>
              <p className="text-[#481713] font-normal">
                Rejoignez-nous pour une expérience immersive dans la maîtrise de
                l'art de{" "}
                {workshop.Title.toLowerCase().replace("masterclass ", "")}.
                Apprenez les techniques de pâtissiers experts, pratiquez et
                repartez avec vos créations. Parfait pour les débutants comme
                pour les passionnés !
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-[#481713] font-semibold mb-2">
                Nombre de places à réserver:
              </label>
              <input
                type="number"
                min="1"
                max={workshop.RemainingPlaces}
                value={placesToReserve}
                onChange={handlePlacesChange}
                className="w-32 p-2 border border-[#461712] rounded-lg focus:outline-none md:w-32"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleReserve}
                className="bg-[#461712] hover:bg-[#b06c74] text-white px-6 py-3 rounded-3xl"
              >
                Confirmer la réservation
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AuthPopup
        isOpen={isAuthOpen}
        onClose={closeAuth}
        onSwitch={switchAuth}
      />
      <SummaryPopup
        isOpen={isSummaryOpen}
        onClose={closeSummary}
        workshop={workshop}
        placesToReserve={placesToReserve}
        userEmail={isAuthenticated ? userEmail : undefined} // Pass email if authenticated
      />
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        onLogin={openAuthPopup}
        onGuest={openSummaryPopup}
      />
    </div>
  );
};

export default WorkshopDetailsReserve;

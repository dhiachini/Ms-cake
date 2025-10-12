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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch workshop by ID
  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchWorkshop = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await APIBackend.get<Workshop>(`/Atelier/GetById/${id}`);
        if (!cancelled) setWorkshop(res.data);
      } catch (err) {
        console.error("Error fetching workshop:", err);
        if (!cancelled) setError("Erreur lors du chargement de l'atelier.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWorkshop();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="text-center p-8 text-[#481713]">
        <svg
          className="animate-spin h-8 w-8 mx-auto mb-2 text-[#481713]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        Chargement de l'atelier...
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="text-center p-4 text-[#481713]">{error ?? "Workshop not found"}</div>
    );
  }

 // Vérification finale au moment de la réservation
const handleReserve = () => {
  if (placesToReserve > workshop.RemainingPlaces) {
    setPlacesToReserve(workshop.RemainingPlaces); // corrige si nécessaire
    alert(
      `Le nombre de places demandées dépasse les places restantes! Il reste ${workshop.RemainingPlaces} places.`
    );
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
  // Ici on ne force pas le max, on garde la saisie de l'utilisateur
  if (value < 1) {
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
            src={ workshop.ImageUrl}
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

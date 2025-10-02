import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthPopup from "../components/modals/AuthPopup";
import SummaryPopup from "../components/modals/SummaryPopup";
import ConfirmationPopup from "../components/modals/ConfirmationPopup";
import workshop1 from "../assets/images/Workshop-image-1.jpg";
import workshop2 from "../assets/images/Workshop-image-2.jpg";
import workshop3 from "../assets/images/Workshop-image-3.jpg";
import workshop4 from "../assets/images/Workshop-image-4.jpg";
import workshop5 from "../assets/images/Workshop-image-5.jpg";
import workshop6 from "../assets/images/Workshop-image-6.jpg";
import workshop7 from "../assets/images/Workshop-image-7.jpg";

const WorkshopDetails = () => {
  const { id } = useParams<{ id: string }>();
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data (replace with API call or context in a real app)
  const initialWorkshops = [
    {
      id: "1",
      title: "Masterclass Saint-Honoré",
      date: "Samedi 12 Juillet",
      price: 420,
      places: 3,
      image: workshop1,
      category: "Pâtisserie",
    },
    {
      id: "2",
      title: "Masterclass Éclair",
      date: "Dimanche 13 Juillet",
      price: 80,
      places: 2,
      image: workshop2,
      category: "Pâtisserie",
    },
    {
      id: "3",
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: workshop3,
      category: "Pâtisserie",
    },
    {
      id: "4",
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: workshop4,
      category: "Pâtisserie",
    },
    {
      id: "5",
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: workshop5,
      category: "Pâtisserie",
    },
    {
      id: "6",
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: workshop6,
      category: "Cake design",
    },
    {
      id: "7",
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: workshop7,
      category: "Cake design",
    },
  ];

  const [workshops] = useState(initialWorkshops);
  const workshop = workshops.find((w) => w.id === id);

  if (!workshop) {
    return (
      <div className="text-center p-4 text-[#481713]">Workshop not found</div>
    );
  }

  const [placesToReserve, setPlacesToReserve] = useState(1);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [, setAuthType] = useState<"signin" | "signup">("signin");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Simulated user email after authentication

  const handleReserve = () => {
    if (placesToReserve > workshop.places) {
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
    if (value > workshop.places) {
      setPlacesToReserve(workshop.places);
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
            src={workshop.image}
            alt={workshop.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#481713] mb-4">
              {workshop.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <p className="text-[#481713] font-normal">
                <span className="font-semibold">Date:</span> {workshop.date}
              </p>
              <p className="text-[#481713] font-normal">
                <span className="font-semibold">Prix:</span> {workshop.price} €
              </p>
              <p className="text-[#481713] font-normal">
                <span className="font-semibold">Places restantes:</span>{" "}
                {workshop.places}
              </p>
              <p className="text-[#481713] font-normal">
                <span className="font-semibold">Category:</span>{" "}
                {workshop.category}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-[#481713] mb-2">
                Description
              </h2>
              <p className="text-[#481713] font-normal">
                Rejoignez-nous pour une expérience immersive dans la maîtrise de
                l'art de{" "}
                {workshop.title.toLowerCase().replace("masterclass ", "")}.
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
                max={workshop.places}
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

export default WorkshopDetails;

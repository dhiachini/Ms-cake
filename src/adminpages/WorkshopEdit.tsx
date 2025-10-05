import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthPopup from "../components/modals/AuthPopup";
import SummaryPopup from "../components/modals/SummaryPopup";
import ConfirmationPopup from "../components/modals/ConfirmationPopup";

import APIBackend from "../utils/APIBackend";
import ServerAdress from "../utils/ServerAdress";

interface Workshop {
  _id: number;
  Title: string;
  Date: string;
  Prix: number;
  NbPlaces: number;
  ImageUrl: string;
  Categories: string;
  RemainingPlaces: number;
}

const WorkshopEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data (replace with API call in a real app)


  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    APIBackend.get(`/Atelier/GetByID/${id}`)
      .then((response) => {
        setWorkshop(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pastry!", error);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (workshop) {
      if (workshop.Date && e.target.name === "Date") {
        const selectedDate = new Date(e.target.value);
        if (isNaN(selectedDate.getTime())) {
          // Invalid date, do not update state
          return;
        }        
        e.target.value = selectedDate.toISOString().split("T")[0];
      }
      setWorkshop({
        ...workshop,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (workshop) {
      APIBackend.put(`/Atelier/Update/${id}`, workshop)
        .then((response) => {
          console.log("Atelier updated successfully:", response.data);
          navigate("/dashboard"); // Redirect to dashboard after save
        })
        .catch((error) => {
          console.error("There was an error updating the pastry!", error);
        });

    }
  };

  if (!workshop) {
    return (
      <div className="text-center p-4 text-[#481713]">Atelier non trouvé</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf5f2]">
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#481713] mb-4">
              Modifier l'atelier: {workshop.Title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  name="Title"
                  value={workshop.Title}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="Date"
                  value={workshop.Date ? new Date(workshop.Date).toISOString().split("T")[0] : ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Prix (€)
                </label>
                <input
                  type="number"
                  name="Prix"
                  value={workshop.Prix}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Places
                </label>
                <input
                  type="number"
                  name="NbPlaces"
                  value={workshop.NbPlaces}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Catégorie
                </label>
                <select
                  name="Categories"
                  value={workshop.Categories}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                >
                  <option value="Pâtisserie">Pâtisserie</option>
                  <option value="Cake design">Cake design</option>
                </select>
              </div>
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Image (URL)
                </label>
                <input
                  type="text"
                  name="image"
                  value={ServerAdress + workshop.ImageUrl}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-[#461712] hover:bg-[#b06c74] text-white px-6 py-3 rounded-3xl"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AuthPopup
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSwitch={() => { }}
      />
      <SummaryPopup
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        workshop={workshop}
        placesToReserve={1}
        userEmail={undefined}
      />
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onLogin={() => { }}
        onGuest={() => { }}
      />
    </div>
  );
};

export default WorkshopEdit;
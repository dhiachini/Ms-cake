import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

interface Workshop {
  id: string;
  title: string;
  date: string;
  price: number;
  places: number;
  image: string;
  category: string;
}

const WorkshopEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data (replace with API call in a real app)
  const initialWorkshops: Workshop[] = [
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

  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    const foundWorkshop = initialWorkshops.find((w) => w.id === id);
    if (foundWorkshop) {
      setWorkshop(foundWorkshop);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (workshop) {
      setWorkshop({
        ...workshop,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (workshop) {
      console.log("Workshop updated:", workshop); // Replace with API call
      alert("Atelier mis à jour avec succès !");
      navigate("/dashboard"); // Redirect to dashboard after save
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
              Modifier l'atelier: {workshop.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  value={workshop.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={workshop.date}
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
                  name="price"
                  value={workshop.price}
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
                  name="places"
                  value={workshop.places}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={workshop.category}
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
                  value={workshop.image}
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
        onSwitch={() => {}}
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
        onLogin={() => {}}
        onGuest={() => {}}
      />
    </div>
  );
};

export default WorkshopEdit;
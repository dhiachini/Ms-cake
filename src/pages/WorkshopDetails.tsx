import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WorkshopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      image: "/src/assets/images/Workshop-image-1.jpg",
      category: "Pâtisserie",
    },
    {
      id: "2",
      title: "Masterclass Éclair",
      date: "Dimanche 13 Juillet",
      price: 80,
      places: 2,
      image: "/src/assets/images/Workshop-image-2.jpg",
      category: "Pâtisserie",
    },
    {
      id: "3",
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: "/src/assets/images/Workshop-image-3.jpg",
      category: "Pâtisserie",
    },
    {
      id: "4",
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: "/src/assets/images/Workshop-image-4.jpg",
      category: "Pâtisserie",
    },
    {
      id: "5",
      title: "Masterclass Macaron",
      date: "Lundi 14 Juillet",
      price: 80,
      places: 4,
      image: "/src/assets/images/Workshop-image-5.jpg",
      category: "Pâtisserie",
    },
    {
      id: "6",
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: "/src/assets/images/Workshop-image-6.jpg",
      category: "Cake design",
    },
    {
      id: "7",
      title: "Masterclass Tarte",
      date: "Mardi 15 Juillet",
      price: 80,
      places: 1,
      image: "/src/assets/images/Workshop-image-7.jpg",
      category: "Cake design",
    },
  ];

  const [workshops, setWorkshops] = useState(initialWorkshops);
  const workshop = workshops.find((w) => w.id === id);

  if (!workshop) {
    return (
      <div className="text-center p-4 text-[#481713]">Workshop not found</div>
    );
  }

  const [placesToReserve, setPlacesToReserve] = useState(1);

  const handleReserve = () => {
    if (placesToReserve > workshop.places) {
      alert("Le nombre de places demandées dépasse les places restantes!");
      return;
    }
    // Update the remaining places
    const updatedWorkshops = workshops.map((w) =>
      w.id === id ? { ...w, places: w.places - placesToReserve } : w
    );
    setWorkshops(updatedWorkshops);
    alert(
      `Réservation pour ${workshop.title} confirmée pour ${placesToReserve} place(s)!`
    );
    navigate("/workshops"); // Navigate back to the workshops page
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
    </div>
  );
};

export default WorkshopDetails;
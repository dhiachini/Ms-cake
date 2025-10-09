import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import APIBackend from "../../utils/APIBackend"; // ✅ assure-toi que le chemin est correct

interface Workshop {
  _id: string;
  Title: string;
  Date: string;
  Prix: number;
  NbPlaces: number;
  ImageUrl: string;
  Categories: string;
  RemainingPlaces: number;
}

interface SummaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop;
  placesToReserve: number;
  userEmail?: string;
}

const SummaryPopup: React.FC<SummaryPopupProps> = ({
  isOpen,
  onClose,
  workshop,
  placesToReserve: initialPlaces,
  userEmail,
}) => {
  const [formData, setFormData] = useState({
    places: initialPlaces,
    name: "",
    surname: "",
    phone: "",
    email: userEmail || "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      places: initialPlaces,
      email: userEmail || prev.email,
    }));
  }, [initialPlaces, userEmail]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "places") {
      const numValue = parseInt(value) || 1;
      if (numValue > workshop.RemainingPlaces) {
        setFormData((prev) => ({ ...prev, places: workshop.RemainingPlaces }));
      } else if (numValue < 1) {
        setFormData((prev) => ({ ...prev, places: 1 }));
      } else {
        setFormData((prev) => ({ ...prev, places: numValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const totalPrice = workshop.Prix * formData.places;

  // ✅ STRIPE PAYMENT INTEGRATION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await APIBackend.post(
        `/Atelier/Checkout/${workshop._id}`,
        {
          Nom: formData.name,
          Prenom: formData.surname,
          Email: formData.email,
          Phone: formData.phone,
          NbPlacesReserved: formData.places,
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url; // ✅ redirect to Stripe Checkout
      } else {
        console.error("Checkout URL not received:", response.data);
        alert("Une erreur est survenue lors de la redirection vers le paiement.");
      }
    } catch (error) {
      console.error("Erreur lors de la création de la session Stripe:", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center fixed inset-0 z-[60] p-4"
      overlayClassName="fixed inset-0 bg-gray-500/50 backdrop-blur-sm z-[60]"
      contentLabel="Reservation Summary"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-[#481713] mb-2">
            Résumé de la réservation
          </h2>
          <p className="text-center text-[#481713] text-lg">
            Veuillez remplir les informations pour continuer.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <label className="block text-[#481713] font-semibold mb-2">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#461712] rounded-lg"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-[#481713] font-semibold mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#461712] rounded-lg"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="block text-[#481713] font-semibold mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#461712] rounded-lg"
                placeholder="06 12 34 56 78"
              />
            </div>
            <div>
              <label className="block text-[#481713] font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#461712] rounded-lg"
                placeholder="votre.email@exemple.com"
              />
            </div>
            <div>
              <label className="block text-[#481713] font-semibold mb-2">
                Nombre de places
              </label>
              <input
                type="number"
                name="places"
                value={formData.places}
                onChange={handleInputChange}
                min="1"
                max={workshop.RemainingPlaces}
                className="w-24 p-2 border border-[#461712] rounded-lg"
              />
            </div>

            <div className="flex flex-col items-end">
              <label className="block text-[#481713] font-semibold mb-2">
                Prix total
              </label>
              <p className="text-[#481713] font-normal">{totalPrice} €</p>
            </div>
          </div>
          <button
            type="submit"
            className="w-50 bg-[#461712] hover:bg-[#b06c74] text-white py-3 rounded-3xl font-semibold mx-auto block"
          >
            Passer au paiement
          </button>
        </form>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </Modal>
  );
};

export default SummaryPopup;

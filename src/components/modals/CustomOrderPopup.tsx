import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import MsIcon from "../../assets/icons/MsIconBlack";

interface CustomOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomOrderPopup: React.FC<CustomOrderPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    customOrder: "", // New field for custom order text
    email: "",
    phone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, "");
      // Allow up to 10 digits (French mobile number length)
      if (digitsOnly.length > 10) return;

      // Format with spaces after every two digits once at least 2 digits are entered
      let formatted = "";
      for (let i = 0; i < digitsOnly.length; i++) {
        if (i > 0 && i % 2 === 0 && i < 10) {
          formatted += " ";
        }
        formatted += digitsOnly[i];
      }

      // Ensure it starts with 06 or 07 if at least 2 digits are entered
      if (
        digitsOnly.length >= 2 &&
        !digitsOnly.startsWith("06") &&
        !digitsOnly.startsWith("07")
      ) {
        return; // Reject if it doesn't start with 06 or 07 after 2 digits
      }

      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Custom order submitted:", formData);
    onClose(); // Close popup after submission
  };

  // Set the app element for accessibility (required by react-modal)
  Modal.setAppElement("#root"); // Adjust based on your app's root element ID
  // Blocage du scroll
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center fixed inset-0 z-[60] p-4"
      overlayClassName="fixed inset-0 bg-gray-500/50 backdrop-blur-sm z-[60]"
      contentLabel="Custom Order Form"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <div className="flex flex-col items-center mb-6">
          <MsIcon className="h-30 w-full" />
          <p className="text-center text-[#481713] text-lg">
            Soumettez votre commande personnalisée et nous vous contacterons
            pour finaliser les détails.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#481713] font-semibold mb-2">
              Votre commande personnalisée
            </label>
            <textarea
              name="customOrder"
              value={formData.customOrder}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74] resize-y"
              placeholder="Décrivez votre commande personnalisee ici..."
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-[#481713] font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                placeholder="votre.email@exemple.com"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-[#481713] font-semibold mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                placeholder="06 12 34 56 78"
                pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                title="Format attendu : 06 12 34 56 78"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-40 bg-[#461712] hover:bg-[#b06c74] text-white py-3 rounded-3xl font-semibold mx-auto block" // Reduced width to w-40 and centered
          >
            Soumettre
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

export default CustomOrderPopup;

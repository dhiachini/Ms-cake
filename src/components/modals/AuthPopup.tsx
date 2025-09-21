import React, { useState } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import MsIcon from "../../assets/icons/MsIconBlack";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (type: "signin" | "signup") => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose, onSwitch }) => {
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // Placeholder for form submission logic (e.g., API call)
    console.log("Form submitted:", { authType, ...formData });
    onClose(); // Close popup after submission
  };

  // Set the app element for accessibility (required by react-modal)
  Modal.setAppElement("#root"); // Adjust based on your app's root element ID

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center fixed inset-0 z-[60] p-4" // Increased z-index to 60
      overlayClassName="fixed inset-0 bg-gray-500/50 backdrop-blur-sm z-[60]" // Increased z-index to 60
      contentLabel={authType === "signin" ? "Connexion" : "Inscription"}
    >
      <div className="bg-[#fffcf7] rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <div className="relative flex flex-col items-center justify-center mb-6 md:flex-row">
          {/* Logo */}
          <MsIcon className="h-20 w-20 mb-3 md:mb-0 md:absolute md:left-8" />

          {/* Titre */}
          <h2 className="text-2xl font-bold text-[#481713] text-center">
            {authType === "signin" ? "Connexion" : "Inscription"}
          </h2>

          {/* Bouton */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-0 right-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {authType === "signup" && (
            <div className="mb-4">
              <label className="block text-[#481713] font-semibold mb-2">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                placeholder="Votre nom"
              />
            </div>
          )}
          <div className="mb-4">
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
              placeholder="Votre email"
            />
          </div>
          {authType === "signup" && (
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
                className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74] mb-4"
                placeholder="06 12 34 56 78"
                pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                title="Format attendu : 06 12 34 56 78"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-[#481713] font-semibold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
              placeholder="Votre mot de passe"
            />
          </div>
          {authType === "signup" && (
            <div className="mb-6">
              <label className="block text-[#481713] font-semibold mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                placeholder="Confirmez votre mot de passe"
              />
            </div>
          )}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-40 bg-[#461712] hover:bg-[#b06c74] text-white py-3 rounded-3xl font-semibold"
            >
              {authType === "signin" ? "Se connecter" : "S'inscrire"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-[#481713] text-sm">
            {authType === "signin" ? "Pas de compte ?" : "Déjà un compte ?"}
            <button
              onClick={() => {
                setAuthType(authType === "signin" ? "signup" : "signin");
                onSwitch(authType === "signin" ? "signup" : "signin");
              }}
              className="text-[#b06c74] font-semibold ml-1 hover:underline"
            >
              {authType === "signin" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuthPopup;

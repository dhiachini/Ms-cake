import React, { useState } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (type: "signin" | "signup") => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose, onSwitch }) => {
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="bg-[#fffcf7] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#481713]">
            {authType === "signin" ? "Connexion" : "Inscription"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
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
          <button
            type="submit"
            className="w-full bg-[#461712] hover:bg-[#b06c74] text-white py-3 rounded-3xl font-semibold"
          >
            {authType === "signin" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-[#481713] text-sm">
            {authType === "signin"
              ? "Pas de compte ?"
              : "Déjà un compte ?"}
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
import React, { useEffect } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onGuest: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  onLogin,
  onGuest,
}) => {
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
      className="flex  items-center justify-center fixed inset-0 z-[60] p-4"
      overlayClassName="fixed inset-0 bg-gray-500/50 backdrop-blur-sm z-[60]"
      contentLabel="Confirmation Popup"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-semibold text-[#481713] mb-4">
            Connexion requise
          </h2>
          <p className="text-center text-[#481713] text-base">
            Vous devez être connecté pour confirmer votre réservation. Que
            souhaitez-vous faire ?
          </p>
        </div>
        <div className="flex justify-center gap-4 md:flex-row flex-col">
          <button
            onClick={onLogin}
            className="bg-[#461712] hover:bg-[#b06c74] text-white px-6 py-2 rounded-3xl font-semibold"
          >
            Se connecter à votre compte
          </button>
          <button
            onClick={onGuest}
            className="bg-[#b06c74] hover:bg-[#461712] text-white px-6 py-2 rounded-3xl font-semibold"
          >
            Confirmer en tant que visiteur
          </button>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationPopup;

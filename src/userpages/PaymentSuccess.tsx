import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import APIBackend from "../utils/APIBackend";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { Nom, Prenom, Email, Phone, Atelier, NbPlacesReserved } = useParams();
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    if (emailSent) return; // prevent duplicate call

    const sendmail = async () => {
      try {
        await APIBackend.post("/Atelier/sendmail", {
          Nom,
          Prenom,
          Email,
          Phone,
          Atelier,
          NbPlacesReserved,
        }, { timeout: 100000 });
        console.log("Email sent successfully");
        setEmailSent(true); 
      } catch (error) {
        console.error("There was an error sending the email!", error);
      } finally {
        setLoading(false); // stop loader
      }
    };

    sendmail();
  }, [Nom, Prenom, Email, Phone, emailSent, Atelier, NbPlacesReserved]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white text-center px-6">
      {/* Animation de succès */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="mb-6"
      >
        <CheckCircle className="text-green-500 w-24 h-24 md:w-32 md:h-32" />
      </motion.div>

      {/* Titre */}
      <h1 className="text-3xl md:text-5xl font-bold text-green-600 mb-4">
        Paiement réussi 🎉
      </h1>

      {/* Message */}
      <p className="text-gray-700 text-base md:text-lg max-w-md mb-8">
        {loading
          ? "Merci de patientez pour confirmer votre réservation… ⏳"
          : "Merci pour votre réservation ! Votre paiement a été confirmé avec succès. Vous recevrez un e-mail de confirmation sous peu."}
      </p>

      {/* Bouton retour */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        disabled={loading} // désactiver le bouton pendant l'envoi
        className={`bg-green-600 text-white font-medium px-8 py-3 rounded-2xl shadow-lg hover:bg-green-700 transition flex items-center justify-center ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : null}
        {loading ? "Envoi en cours..." : "Retour à l’accueil"}
      </motion.button>
    </div>
  );
};

export default PaymentSuccess;

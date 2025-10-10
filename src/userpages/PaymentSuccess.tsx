import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

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
        Merci pour votre réservation ! Votre paiement a été confirmé avec succès.
        Vous recevrez un e-mail de confirmation sous peu.
      </p>

      {/* Bouton retour */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="bg-green-600 text-white font-medium px-8 py-3 rounded-2xl shadow-lg hover:bg-green-700 transition"
      >
        Retour à l’accueil
      </motion.button>
    </div>
  );
};

export default PaymentSuccess;

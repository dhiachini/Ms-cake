import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import MsIcon from "../../assets/icons/MsIconBlack";
import Swal from "sweetalert2"; // Importer uniquement sweetalert2
import APIBackend from "../../utils/APIBackend";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: (email?: string) => void;
  onSwitch: (type: "signin" | "signup") => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose, onSwitch }) => {
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const initialForm = {
    email: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);

  // Blocage correct du scroll du body
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

  // Réinitialiser les inputs et erreurs lorsque la popup se ferme
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialForm);
      setError(null);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 10) return;

      let formatted = "";
      for (let i = 0; i < digitsOnly.length; i++) {
        if (i > 0 && i % 2 === 0 && i < 10) formatted += " ";
        formatted += digitsOnly[i];
      }

      if (
        digitsOnly.length >= 2 &&
        !digitsOnly.startsWith("06") &&
        !digitsOnly.startsWith("07")
      ) {
        return;
      }

      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authType === "signup") {
      if (formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }

      const registerData = {
        password: formData.password,
        email: formData.email,
        firstname: formData.name,
        lastname: formData.surname,
        phoneNumber: formData.phone.replace(/\s/g, ""), // Supprime les espaces
        datenaissance: formData.birthday,
      };

      try {
        const response = await APIBackend.post("/auth/register", registerData);
        console.log("Registration successful:", response);
        // Afficher une alerte de succès avec SweetAlert2
        await Swal.fire({
          icon: "success",
          title: "Inscription réussie !",
          text: "Vous pouvez maintenant vous connecter.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-[#461712] text-white px-4 py-2 rounded",
          },
        });
        // Après validation, ouvrir le formulaire de connexion (signin)
        setAuthType("signin");
        onSwitch("signin");
        // Conserver l'email pour la connexion et réinitialiser les champs de signup
        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
          name: "",
          surname: "",
        }));
        setError(null);
      } catch (err) {
        setError(
          "Erreur lors de l'inscription. Vérifiez vos informations ou réessayez."
        );
        console.error("Registration error:", err);
      }
    } else {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      try {
        // APIBackend may return either the full axios response or the response body
        const resp: any = await APIBackend.post("/auth/login", loginData);
        const token = resp?.token ?? resp?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
        } else {
          // If no token returned, ensure no stale token remains
          localStorage.removeItem("token");
          console.warn("Login response did not include a token:", resp);
        }

        // save firstname from response (support both resp.user.firstname and resp.data.user.firstname)
        const firstname = resp?.user?.firstname ?? resp?.data?.user?.firstname;
        if (firstname) {
          localStorage.setItem("firstname", firstname);
        } else {
          localStorage.removeItem("firstname");
        }

        // save role from response (support multiple possible shapes)
        const role =
          resp?.user?.role ?? resp?.data?.user?.role ?? resp?.data?.role ?? resp?.role;
        if (role) {
          try {
            // ensure we store a string
            const roleStr = typeof role === "string" ? role : JSON.stringify(role);
            localStorage.setItem("role", roleStr);
          } catch (e) {
            console.warn("Could not stringify role for storage:", e);
          }
        } else {
          localStorage.removeItem("role");
        }

        await Swal.fire({
          icon: "success",
          title: "Connexion réussie !",
          text: "Vous êtes maintenant connecté.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-[#461712] text-white px-4 py-2 rounded",
          },
        });

        if (formData.email) onClose(formData.email);
        else onClose();
      } catch (err) {
        setError(
          "Erreur lors de la connexion. Vérifiez vos identifiants ou réessayez."
        );
        console.error("Login error:", err);
      }
    }
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className="flex items-center justify-center fixed inset-0 z-[60] p-4"
      overlayClassName="fixed inset-0 bg-gray-500/50 backdrop-blur-sm z-[60] overflow-hidden"
      contentLabel={authType === "signin" ? "Connexion" : "Inscription"}
    >
      <div
        className={`bg-[#fffcf7] rounded-3xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative overflow-hidden ${
          authType === "signup" && "md:max-w-xl lg:max-w-2xl"
        }`}
      >
        <div className="relative flex flex-col items-center justify-center mb-6 md:flex-row">
          <MsIcon className="h-20 w-20 mb-3 md:mb-0 md:absolute md:left-8" />
          <h2 className="text-2xl font-bold text-[#481713] text-center">
            {authType === "signin" ? "Connexion" : "Inscription"}
          </h2>
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-700 absolute top-0 right-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {authType === "signin" && (
            <>
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
                  className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                  placeholder="Votre email"
                />
              </div>
              <div>
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
            </>
          )}

          {authType === "signup" && (
            <>
              <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
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
                    className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                    placeholder="Votre email"
                  />
                </div>
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
                    className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
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
                    className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
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
                    className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                    placeholder="06 12 34 56 78"
                    pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                    title="Format attendu : 06 12 34 56 78"
                  />
                </div>
                <div></div>
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
                <div>
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
                <div>
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
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
                <div>
                  <label className="block text-[#481713] font-semibold mb-2">
                    Date d'anniversaire
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-[#461712] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                  />
                </div>
              </div>
            </>
          )}

          {error && <div className="text-red-500 text-center">{error}</div>}

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

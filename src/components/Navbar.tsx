import MsIcon from "../assets/icons/MsIconBlack";
import { ShoppingCart, UserRound, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthPopup from "./modals/AuthPopup";
import { useAuth } from "../AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [, setAuthType] = useState<"signin" | "signup">("signin");
  const [firstname, setFirstname] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null); // ✅ état pour le rôle

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const openAuth = (type: "signin" | "signup") => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    setFirstname(localStorage.getItem("firstname"));
    setRole(localStorage.getItem("role")); // refresh rôle après login
  };

  const switchAuth = (type: "signin" | "signup") => setAuthType(type);
  useAuth();

  useEffect(() => {
    setFirstname(localStorage.getItem("firstname"));
    setRole(localStorage.getItem("role")); // initialise le rôle au chargement
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");
    localStorage.setItem("role", "visiteur"); // supprime le rôle
    setFirstname(null);
    setRole(null);
    navigate("/");
  };

  return (
    <nav className="relative bg-[#fbf2eb]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#b06c74]/10 hover:text-[#b06c74] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#b06c74]"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-shrink-0 items-center w-full justify-center md:w-auto md:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <MsIcon className="h-20 w-full cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center md:items-center">
            <div className="flex space-x-4">
              {role === "admin" && ( // ✅ n'affiche que si admin
                <Link
                  to="/dashboard"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === "/dashboard"
                      ? "bg-[#b06c74]/10 text-[#b06c74]"
                      : "text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
                  }`}
                >
                  Tableau de bord administrateur
                </Link>
              )}

              <Link
                to="/pastryweekend"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  location.pathname === "/pastryweekend"
                    ? "bg-[#b06c74]/10 text-[#b06c74]"
                    : "text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
                }`}
              >
                Patisseries
              </Link>
              <a
                href="/underdevelopment"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
              >
                Cake-personnalisé
              </a>
              <a
                href="/underdevelopment"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
              >
                Traiteur
              </a>
              <Link
                to="/workshops"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  location.pathname === "/workshops" ||
                  location.pathname.startsWith("/workshop/")
                    ? "bg-[#b06c74]/10 text-[#b06c74]"
                    : "text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
                }`}
              >
                Ateliers
              </Link>
              <a
                href="/underdevelopment"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
              >
                E-book
              </a>
            </div>
          </div>

          {/* Icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 gap-3">
            {firstname ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="relative rounded-full p-1 text-sm font-medium text-black">
                  Bonjour, {firstname} |
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="relative rounded-full p-1 text-black hover:text-[#b06c74] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuth("signin")}
                className="relative rounded-full p-1 text-black hover:text-[#b06c74] focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
              >
                <span className="sr-only">View profile</span>
                <UserRound className="h-6 w-6" />
              </button>
            )}
            <button
              type="button"
              className="relative rounded-full p-1 text-black hover:text-[#b06c74] focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
            >
              <span className="sr-only">View cart</span>
              <ShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {firstname && (
            <div className="px-3 py-2 text-base font-medium text-black">
              Bonjour, {firstname}
            </div>
          )}
          {role === "admin" && (
            <Link
              to="/dashboard"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                location.pathname === "/dashboard"
                  ? "bg-[#b06c74]/10 text-[#b06c74]"
                  : "text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
              }`}
            >
              Tableau de bord administrateur
            </Link>
          )}
          <Link
            to="/pastryweekend"
            className={`block rounded-md px-3 py-2 text-base font-medium ${
              location.pathname === "/pastryweekend"
                ? "bg-[#b06c74]/10 text-[#b06c74]"
                : "text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
            }`}
          >
            Patisseries
          </Link>

          <a
            href="underdevelopment"
            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
          >
            Cake-personnalisé
          </a>
          <a
            href="/underdevelopment"
            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
          >
            Traiteur
          </a>
          <Link
            to="/workshops"
            className={`block rounded-md px-3 py-2 text-base font-medium ${
              location.pathname === "/workshops"
                ? "bg-[#b06c74]/10 text-[#b06c74]"
                : "text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
            }`}
          >
            Ateliers
          </Link>
          <a
            href="/underdevelopment"
            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
          >
            E-book
          </a>
          {firstname && (
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
            >
              Se déconnecter
            </button>
          )}
        </div>
      </div>

      <AuthPopup
        isOpen={isAuthOpen}
        onClose={closeAuth}
        onSwitch={switchAuth}
      />
    </nav>
  );
}

export default Navbar;

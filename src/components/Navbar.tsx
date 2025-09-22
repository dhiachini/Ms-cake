import MsIcon from "../assets/icons/MsIconBlack";
import { ShoppingCart, UserRound, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import AuthPopup from "./modals/AuthPopup";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false); // State for popup visibility
  const [, setAuthType] = useState<"signin" | "signup">("signin"); // State for auth type

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuth = (type: "signin" | "signup") => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const switchAuth = (type: "signin" | "signup") => {
    setAuthType(type);
  };

  return (
    <nav className="relative bg-[#fbf2eb]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button (visible on small screens) */}
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
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Logo / Icon centered on mobile, left-aligned on md+ */}
          <div className="flex flex-shrink-0 items-center w-full justify-center md:w-auto md:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <MsIcon className="h-20 w-full cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Menu centered (hidden on mobile, visible on md+) */}
          <div className="hidden md:flex justify-center md:items-center">
            <div className="flex space-x-4">
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
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
              >
                Cake-personnalisé
              </a>
              <a
                href="#"
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
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
              >
                E-book
              </a>
            </div>
          </div>

          {/* Icons on the right */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 gap-3">
            <button
              type="button"
              onClick={() => openAuth("signin")} // Trigger popup on click
              className="relative rounded-full p-1 text-black hover:text-[#b06c74] focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
            >
              <span className="sr-only">View profile</span>
              <UserRound className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="relative rounded-full p-1 text-black hover:text-[#b06c74] focus:outline-none focus:ring-2 focus:ring-[#b06c74]"
            >
              <span className="sr-only">View cart</span>
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (visible when toggled on small screens) */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
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
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
          >
            Cake-personnalisé
          </a>
          <a
            href="#"
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
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#b06c74]/10 hover:text-[#b06c74]"
          >
            E-book
          </a>
        </div>
      </div>

      {/* Auth Popup */}
      <AuthPopup
        isOpen={isAuthOpen}
        onClose={closeAuth}
        onSwitch={switchAuth}
      />
    </nav>
  );
}

export default Navbar;

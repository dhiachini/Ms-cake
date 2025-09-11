import { Facebook, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-[#fbf2eb] text-black text-center p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-sm text-black">
              &copy; 2025 MyCake. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-[#b06c74] cursor-pointer">
              Patisseries
            </span>
            <span className="hover:text-[#b06c74] cursor-pointer">
              Cake-personnalisé
            </span>
            <span className="hover:text-[#b06c74] cursor-pointer">
              Traiteur
            </span>
            <span className="hover:text-[#b06c74] cursor-pointer">
              Ateliers
            </span>
            <span className="hover:text-[#b06c74] cursor-pointer">E-book</span>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="w-5 h-5 text-black " />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black hover:text-[#b06c74]"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="w-5 h-5 text-black" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

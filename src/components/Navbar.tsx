import MsIcon from "../assets/icons/MsIcon";
import { ShoppingCart, UserRound } from "lucide-react";

function Navbar() {
  return (
    <>
      <div className="bg-[#fbf2eb] h-20 flex items-center justify-between px-6">
        {/* Logo / Icon à gauche */}
        <div className="flex items-center">
          <MsIcon className="h-22 w-22" />
        </div>

        {/* Menu centré */}
        <div className="flex gap-8 font-sans text-black font-xs">
          <span>Patisseries</span>
          <span>Cake-personnalisé</span>
          <span>Traiteur</span>
          <span>Ateliers</span>
          <span>E-book</span>
        </div>

        {/* Icônes à droite */}
        <div className="flex items-center gap-6 text-black">
          <UserRound className="h-6 w-6 cursor-pointer" />
          <ShoppingCart className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default Navbar;

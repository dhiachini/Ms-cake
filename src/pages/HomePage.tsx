import { Cake, ChefHat, HandPlatter } from "lucide-react";
import Layout from "../Layout";

function HomePage() {
  return (
    <Layout>
      <div className=" space-y-7">
        <div className="banner py-24  h-screen ">
          <div className="container space-y-3">
            <h1 className="font-serif text-5xl text-[#342520] ">
              La haute pâtisserie
              <br /> française, personalisée <br /> pour vos plus belles
              <br />
              occasions
            </h1>
            <button className="bg-[#faf4e6] hover:bg-[#b06c74] hover:text-[#faf4e6] text-black px-3 py-1 h-[50px] mt-9 w-[180px] rounded-3xl cursor-pointer border-0 outline-none">
              Découvrez-nous
            </button>
          </div>
          {/* Div ajouté après les images */}
        </div>
        {/* Box positionnées à 50% du bas de la bannière */}
        <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[100%] w-full flex justify-center z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-[#fdf5f2] w-70 h-56 p-1 flex flex-col justify-center items-center">
              <Cake className="w-15 h-15 mb-2" />
              <span className="text-3xl text-[#1d110f] text-center mb-3">
                Je commande <br />
              </span>
              <span>Cake personnalisé</span>
            </div>
            <div className="bg-[#fdf5f2] w-70 h-56 p-1 flex flex-col justify-center items-center">
              <HandPlatter className="w-15 h-15 mb-2" />
              <span className="text-3xl text-[#1d110f] text-center mb-3">
                Je découvre <br />
              </span>
              <span>Service traiteur</span>
            </div>{" "}
            <div className="bg-[#fdf5f2] w-70 h-56 p-1 flex flex-col justify-center items-center">
              <ChefHat className="w-15 h-15 mb-2" />
              <span className="text-3xl text-[#1d110f] text-center">
                Je réserve <br />
              </span>
              <span className="text-xl text-[#1d110f] text-center">
                Ateliers <br />
              </span>
              <span>pâtisserie & design cake</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;

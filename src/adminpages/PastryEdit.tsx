import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import patisserie1 from "../assets/images/patisserie-week-1.jpg";
import patisserie2 from "../assets/images/patisserie-week-2.jpg";
import patisserie3 from "../assets/images/patisserie-week-3.jpg";
import patisserie4 from "../assets/images/patisserie-week-4.jpg";

interface Pastry {
  id: string;
  title: string;
  description: string;
  image: string;
}

const PastryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data (replace with API call in a real app)
  const initialPastries: Pastry[] = [
    {
      id: "1",
      title: "Tarte fraise pistache",
      description: "Pate sablée, crème pistache, fraises fraîches",
      image: patisserie1,
    },
    {
      id: "2",
      title: "Millefeuille",
      description: "Crème diplomate vanille, pâte feuilletée caramélisée",
      image: patisserie2,
    },
    {
      id: "3",
      title: "Tarte citron meringuée",
      description: "Lemond curd, meringue italienne",
      image: patisserie3,
    },
    {
      id: "4",
      title: "Eclair chocolat",
      description: "Dark chocolate ganache, pâte à choux",
      image: patisserie4,
    },
  ];

  const [pastry, setPastry] = useState<Pastry | null>(null);

  useEffect(() => {
    const foundPastry = initialPastries.find((p) => p.id === id);
    if (foundPastry) {
      setPastry(foundPastry);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (pastry) {
      setPastry({
        ...pastry,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (pastry) {
      console.log("Pastry updated:", pastry); // Replace with API call
      alert("Atelier de pâtisserie mis à jour avec succès !");
      navigate("/dashboard"); // Redirect to dashboard after save
    }
  };

  if (!pastry) {
    return (
      <div className="text-center p-4 text-[#481713]">Atelier de pâtisserie non trouvé</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf5f2]">
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#481713] mb-4">
              Modifier l'atelier de pâtisserie: {pastry.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  value={pastry.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[#481713] font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={pastry.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none h-24"
                />
              </div>
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Image (URL)
                </label>
                <input
                  type="text"
                  name="image"
                  value={pastry.image}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-[#461712] hover:bg-[#b06c74] text-white px-6 py-3 rounded-3xl"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PastryEdit;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import APIBackend from "../utils/APIBackend";
import ServerAdress from "../utils/ServerAdress";

interface Pastry {
  _id: string;
  Title: string;
  Description: string;
  ImageUrl: string;
}

const PastryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data (replace with API call in a real app)


  const [pastry, setPastry] = useState<Pastry | null>(null);

  useEffect(() => {
    APIBackend.get(`/CakeWeek/GetByID/${id}`)
      .then((response) => {
        setPastry(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pastry!", error);
      });

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
      APIBackend.put(`/CakeWeek/Update/${id}`, pastry)
        .then((response) => {
          console.log("Pastry updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("There was an error updating the pastry!", error);
        });
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
              Modifier l'atelier de pâtisserie: {pastry.Title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  name="Title"
                  value={pastry.Title}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[#481713] font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="Description"
                  value={pastry.Description}
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
                  value={ServerAdress + pastry.ImageUrl}
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
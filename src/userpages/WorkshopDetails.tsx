import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import APIBackend from "../utils/APIBackend";
import ServerAdress from "../utils/ServerAdress";

interface Workshop {
  _id: string;
  Title: string;
  Description: string;
  Date: string;
  Prix: number;
  NbPlaces: number;
  ImageUrl: string;
  Categories: string;
  RemainingPlaces: number;
}

const WorkshopEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch workshop by ID
  useEffect(() => {
    if (!id) return;

    APIBackend.get<Workshop>(`/Atelier/GetById/${id}`)
      .then((res) => {
        setWorkshop(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workshop:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!workshop) return;
    const { name, value } = e.target;

    setWorkshop({
      ...workshop,
      [name]: name === "Prix" || name === "NbPlaces" ? Number(value) : value,
    });
  };

  // Handle date input safely
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!workshop) return;
    setWorkshop({ ...workshop, Date: e.target.value });
  };

  // Save updated workshop
  const handleSave = () => {
    if (!workshop) return;

    const payload = {
      Title: workshop.Title,
      Description: workshop.Description,
      ImageUrl: workshop.ImageUrl,
      AtelierDate: new Date(workshop.Date).toISOString(),
      Categories: workshop.Categories,
      NbPlaces: workshop.NbPlaces,
      Prix: workshop.Prix,
    };

    APIBackend.put(`/Atelier/Update/${workshop._id}`, payload)
      .then((res) => {
        console.log("Workshop updated:", res.data);
        alert("Workshop updated successfully!");
        navigate("/dashboard"); // redirect after save
      })
      .catch((err) => console.error("Error updating workshop:", err));
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!workshop) {
    return <div className="text-center p-4 text-[#481713]">Workshop not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#fdf5f2]">
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={ workshop.ImageUrl}
            alt={workshop.Title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#481713] mb-4">
              Modifier l'atelier: {workshop.Title}
            </h1>

            {/* Workshop form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[#481713] font-semibold mb-2">Titre</label>
                <input
                  type="text"
                  name="Title"
                  value={workshop.Title}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">Date</label>
                <input
                  type="date"
                  name="Date"
                  value={workshop.Date ? workshop.Date.split("T")[0] : ""}
                  onChange={handleDateChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">Prix (€)</label>
                <input
                  type="number"
                  name="Prix"
                  value={workshop.Prix}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">Places</label>
                <input
                  type="number"
                  name="NbPlaces"
                  value={workshop.NbPlaces}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">Catégorie</label>
                <select
                  name="Categories"
                  value={workshop.Categories}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                >
                  <option value="Pâtisserie">Pâtisserie</option>
                  <option value="Cake design">Cake design</option>
                </select>
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">Image (URL)</label>
                <input
                  type="text"
                  name="ImageUrl"
                  value={ workshop.ImageUrl}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#481713] font-semibold mb-2">Description</label>
                <textarea
                  name="Description"
                  value={workshop.Description}
                  onChange={handleChange}
                  rows={4}
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

export default WorkshopEdit;

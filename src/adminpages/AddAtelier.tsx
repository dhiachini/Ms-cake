import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import APIBackend from "../utils/APIBackend";
import Swal from 'sweetalert2';

interface Atelier {
  Title: string;
  Description: string;
  Image: File | null;
  AtelierDate: string;
  Categories: string;
  NbPlaces: number;
  Prix: number;
}

const AddAtelier = () => {
  const navigate = useNavigate();
  const [atelier, setAtelier] = useState<Atelier>({
    Title: "",
    Description: "",
    Image: null,
    AtelierDate: new Date().toISOString().slice(0, 10),
    Categories: "",
    NbPlaces: 1,
    Prix: 0,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value, type } = target as HTMLInputElement;

    // Coerce numeric inputs to numbers so controlled number inputs work correctly
    let parsedValue: string | number = value;
    if (type === "number") {
      parsedValue = value === "" ? ("" as any) : Number(value);
    }

    setAtelier((prev) => ({
      ...prev,
      // name is a key of Atelier at runtime; cast to satisfy TS
      [name as keyof Atelier]: parsedValue as any,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAtelier((prev) => ({ ...prev, Image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let imageUrl = "";

      // Upload image if exists
      if (atelier.Image) {
        const formData = new FormData();
        formData.append("image", atelier.Image);
        const res = await APIBackend.post("/Atelier/UploadImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = res.data.url;
      }

      // Create atelier
      await APIBackend.post("/Atelier/Create", {
        Title: atelier.Title,
        Description: atelier.Description,
        ImageUrl: imageUrl,
        AtelierDate: atelier.AtelierDate,
        Categories: atelier.Categories,
        NbPlaces: atelier.NbPlaces,
        Prix: atelier.Prix,
      });

      await Swal.fire({
        icon: 'success',
        title: 'Créé !',
        text: "L'atelier a été créé avec succès.",
        timer: 1600,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating atelier:", err);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Erreur lors de la création de l'atelier.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf5f2]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#481713] mb-4">
              Ajouter un atelier
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  name="Title"
                  value={atelier.Title}
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
                  value={atelier.Description}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none h-24"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Date de l'atelier
                </label>
                <input
                  type="date"
                  name="AtelierDate"
                  value={atelier.AtelierDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Catégorie
                </label>
                  <select
                  name="Categories"
                  value={atelier.Categories}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Pâtisserie">Pâtisserie</option>
                  <option value="Cake design">Cake design</option>
                </select>
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Nombre de places
                </label>
                <input
                  type="number"
                  name="NbPlaces"
                  min={1}
                  value={atelier.NbPlaces}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Prix
                </label>
                <input
                  type="number"
                  name="Prix"
                  min={0}
                  value={atelier.Prix}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 w-48 h-48 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-[#461712] hover:bg-[#b06c74] text-white px-6 py-3 rounded-3xl disabled:opacity-70"
              >
                {loading ? "Enregistrement..." : "Ajouter l'atelier"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddAtelier;

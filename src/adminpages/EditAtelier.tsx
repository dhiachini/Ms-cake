import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import APIBackend from "../utils/APIBackend";
import ServerAdress from "../utils/ServerAdress";
import Swal from 'sweetalert2';

interface Atelier {
  _id: string;
  Title: string;
  Description: string;
  ImageUrl: string;
  Date: string;
  Categories: string;
  NbPlaces: number;
  Prix: number;
}

const EditAtelier = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [atelier, setAtelier] = useState<Atelier | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchAtelier = async () => {
      setFetching(true);
      setError(null);
      try {
        const res = await APIBackend.get<Atelier>(`/Atelier/GetById/${id}`);
        if (!cancelled) {
          setAtelier(res.data);
          setPreview( res.data.ImageUrl);
        }
      } catch (err) {
        console.error("Error fetching atelier:", err);
        if (!cancelled) setError("Erreur lors du chargement de l'atelier.");
      } finally {
        if (!cancelled) setFetching(false);
      }
    };

    fetchAtelier();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!atelier) return;
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    // Coerce numeric fields back to numbers
    let parsedValue: string | number = value;
    if (name === "NbPlaces" || name === "Prix") {
      parsedValue = Number(value);
    }

    setAtelier({ ...atelier, [name]: parsedValue } as Atelier);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!atelier) return;
    setLoading(true);
    try {
      let imageUrl = atelier.ImageUrl;

      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);
        const res = await APIBackend.post("/Atelier/UploadImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = res.data.url;
      }

      const payload = {
        Title: atelier.Title,
        Description: atelier.Description,
        ImageUrl: imageUrl,
        AtelierDate: atelier.Date,
        Categories: atelier.Categories,
        NbPlaces: atelier.NbPlaces,
        Prix: atelier.Prix,
      };

      await APIBackend.put(`/Atelier/Update/${id}`, payload);
      await Swal.fire({
        icon: 'success',
        title: 'Modifié !',
        text: "L'atelier a été mis à jour avec succès.",
        timer: 1600,
        showConfirmButton: false,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating atelier:", err);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Erreur lors de la mise à jour de l'atelier.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center p-8 text-[#481713]">
        <svg
          className="animate-spin h-8 w-8 mx-auto mb-2 text-[#481713]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        Chargement de l'atelier...
      </div>
    );
  }

  if (!atelier)
    return (
      <div className="text-center p-4 text-[#481713]">{error ?? "Atelier non trouvé"}</div>
    );

  return (
    <div className="min-h-screen bg-[#fdf5f2]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#481713] mb-4">
              Modifier l'atelier: {atelier.Title}
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
                  name="Date"
                  value={atelier.Date.slice(0, 10)}
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
                {loading
                  ? "Enregistrement..."
                  : "Sauvegarder les modifications"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditAtelier;

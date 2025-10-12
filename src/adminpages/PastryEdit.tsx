import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import APIBackend from "../utils/APIBackend";

import Swal from 'sweetalert2';

interface Pastry {
  _id: string;
  Title: string;
  Description: string;
  ImageUrl: string;
}

const PastryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pastry, setPastry] = useState<Pastry | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch pastry
  useEffect(() => {
    APIBackend.get(`/CakeWeek/GetByID/${id}`)
      .then((res) => {
        setPastry(res.data);
        setPreview( res.data.ImageUrl); // initial preview
      })
      .catch((err) => console.error("Error fetching pastry:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!pastry) return;
    const { name, value } = e.target;
    setPastry({
      ...pastry,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!pastry) return;
    setLoading(true);
    try {
      let imageUrl = pastry.ImageUrl;

      // If a new image is selected, upload it
      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);

        const uploadRes = await APIBackend.post("/CakeWeek/UploadImage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadRes.data.url; // update with new URL
      }

      // Update pastry
      const payload = {
        Title: pastry.Title,
        Description: pastry.Description,
        ImageUrl: imageUrl,
      };

      await APIBackend.put(`/CakeWeek/Update/${id}`, payload);
      console.log("Pastry updated successfully");
        // show success popup and navigate back to dashboard
        await Swal.fire({
          icon: 'success',
          title: 'Modifié!',
          text: 'Le gâteau a été mis à jour avec succès.',
          timer: 1800,
          showConfirmButton: false,
        });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating pastry:", err);
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Erreur lors de la mise à jour du gâteau.",
        });
    } finally {
      setLoading(false);
    }
  };

  if (!pastry) {
    return <div className="text-center p-4 text-[#481713]">Atelier de pâtisserie non trouvé</div>;
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
                <label className="block text-[#481713] font-semibold mb-2">Titre</label>
                <input
                  type="text"
                  name="Title"
                  value={pastry.Title}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[#481713] font-semibold mb-2">Description</label>
                <textarea
                  name="Description"
                  value={pastry.Description}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none h-24"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">Photo</label>
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
                {loading ? "Enregistrement..." : "Sauvegarder les modifications"}
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

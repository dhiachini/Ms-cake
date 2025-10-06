import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import APIBackend from "../utils/APIBackend";
import Swal from "sweetalert2";

interface Pastry {
  Title: string;
  Description: string;
  Image: File | null;
  ImageUrl?: string;
  StartDate: string;
  EndDate: string;
}

const AddPastry = () => {
  const navigate = useNavigate();

  // Helper to format date as YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // Default dates
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const [pastry, setPastry] = useState<Pastry>({
    Title: "",
    Description: "",
    Image: null,
    StartDate: formatDate(today),
    EndDate: formatDate(nextWeek),
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPastry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPastry((prev) => ({
        ...prev,
        Image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    // Validation
    if (!pastry.Title.trim()) {
      alert("Veuillez entrer un titre.");
      return;
    }
    if (!pastry.StartDate || !pastry.EndDate) {
      alert("Veuillez remplir les dates.");
      return;
    }
    if (new Date(pastry.EndDate) < new Date(pastry.StartDate)) {
      alert("La date de fin doit être après la date de début.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";

      // Step 1: Upload image
      if (pastry.Image) {
        const formData = new FormData();
        formData.append("image", pastry.Image);

        const uploadRes = await APIBackend.post(
          "/CakeWeek/UploadImage",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        imageUrl = uploadRes.data.url;
      }

      // Step 2: Add CakeWeek entry
      const payload = {
        Title: pastry.Title,
        Description: pastry.Description,
        ImageUrl: imageUrl || "",
        StartDate: pastry.StartDate,
        EndDate: pastry.EndDate,
      };

      const response = await APIBackend.post("/CakeWeek/Add", payload);

      console.log("Cake of the week added successfully:", response.data);
      // show SweetAlert2 success toast/modal then navigate
      await Swal.fire({
        icon: "success",
        title: "Ajout réussi",
        text: "Le gâteau de la semaine a été ajouté.",
        timer: 1600,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding cake:", error);
      alert("Une erreur est survenue lors de l'ajout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf5f2]">
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#481713] mb-4">
              Ajouter le gâteau de la semaine
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

              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  name="StartDate"
                  value={pastry.StartDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#461712] rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#481713] font-semibold mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  name="EndDate"
                  value={pastry.EndDate}
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
                  Photo
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

export default AddPastry;

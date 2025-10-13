import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import APIBackend from "../../utils/APIBackend";
import Swal from 'sweetalert2';

interface Pastry {
  _id: string; // souvent c’est un string en MongoDB
  Title: string;
  Description: string;
  ImageURL?: string;
}

interface PastryTableProps {
  pastries: Pastry[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onEdit: (id: string) => void;
  fetchPastries: () => void; // nouvelle prop pour recharger la liste
}

function PastryTable({
  pastries,
  currentPage,
  itemsPerPage,
  onPageChange,
  onEdit,
  fetchPastries,
}: PastryTableProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await APIBackend.delete(`CakeWeek/Delete/${id}`);
      await Swal.fire({
        icon: 'success',
        title: 'Supprimé',
        text: "L'atelier a été supprimé avec succès.",
        timer: 1400,
        showConfirmButton: false,
      });
      fetchPastries(); // recharge la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur est survenue lors de la suppression.",
      });
    } finally {
      setLoading(false);
    }
  };

  const paginatedPastries = pastries?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-[#fffcf7] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#481713]">
          Liste des Ateliers de Pâtisserie
        </h2>
        <Link
          to={"/addpastry"}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ajouter article
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-[#481713]">
          <thead className="text-xs uppercase bg-[#461712] text-white">
            <tr>
              <th className="px-4 py-2 rounded-l-xl">Titre</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPastries?.map((pastry) => (
              <tr key={pastry._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{pastry.Title}</td>
                <td className="px-4 py-2">{pastry.Description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEdit(pastry._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2"
                  >
                    Modifier
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleDelete(pastry._id)}
                    className={`${
                      loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                    } text-white px-2 py-1 rounded`}
                  >
                    {loading ? "Suppression..." : "Supprimer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          totalItems={pastries?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default PastryTable;

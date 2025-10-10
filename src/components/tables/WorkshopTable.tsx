import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import APIBackend from "../../utils/APIBackend";
import Swal from "sweetalert2";
import { useState, type SetStateAction } from "react";
import ReservationsTable from "./ReservationsTable";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";

interface Workshop {
  _id: string;
  Title: string;
  Date: string;
  Prix: number;
  NbPlaces: number;
  ImageUrl: string;
  Categories: string;
  RemainingPlaces: number;
}

interface WorkshopTableProps {
  workshops: Workshop[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onEdit: (id: string) => void;
  // onDelete should be a refresh callback (no args) to reload the parent list
  onDelete: () => void;
}

function WorkshopTable({
  workshops,
  currentPage,
  itemsPerPage,
  onPageChange,
  onEdit,
  onDelete,
}: WorkshopTableProps) {
  const [loadingId, setLoadingId] = useState<string | number | null>(null);
  const [isReserv, setIReserv] = useState<boolean | null>(false);
  const [isReservId, setIReservId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  // derive unique categories for the dropdown
  const uniqueCategories = Array.from(
    new Set(workshops.map((w) => w.Categories).filter(Boolean))
  ) as string[];

  // apply category filter if any
  const filteredWorkshops = selectedCategory
    ? workshops.filter((w) => w.Categories === selectedCategory)
    : workshops;

  const paginatedWorkshops = filteredWorkshops?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleReservationClick = (id: SetStateAction<string | null>) => {
    setIReserv(true);
    setIReservId(id);
  };

  return (
    <div className="w-full bg-[#fffcf7] rounded-lg p-6">
      {isReserv ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#481713] mb-4">
              {workshops.find((w) => w._id === isReservId)?.Title ?? "Détails de l'atelier"}
            </h2>
            <button onClick={() => setIReserv(false)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              <ChevronLeft className="inline mr-2" />
              Retour aux ateliers
            </button>
          </div>
          <ReservationsTable atelierId={isReservId ?? undefined} />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#481713] mb-4">
              Liste des Ateliers
            </h2>
            <Link
              to={"/addworkshop"}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Ajouter atelier
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-[#481713]">
              <thead className="text-xs uppercase bg-[#461712] text-white">
                <tr>
                  <th className="px-4 py-2">Titre</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Prix (€)</th>
                  <th className="px-4 py-2">Places</th>
                  <th className="px-4 py-2">Places restantes</th>
                  <th className="px-4 py-2">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setShowCategoryDropdown((s) => !s)}
                        className="flex items-center gap-2"
                        aria-expanded={showCategoryDropdown}
                        aria-haspopup="listbox"
                      >
                        Catégorie
                        {showCategoryDropdown ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      {showCategoryDropdown && (
                        <ul className="absolute right-0 mt-2 w-48 bg-[#461712] border rounded shadow z-50">
                          <li
                            className="px-3 py-2 hover:bg-[#b06c74] cursor-pointer"
                            onClick={() => {
                              setSelectedCategory(null);
                              setShowCategoryDropdown(false);
                            }}
                          >
                            Tous
                          </li>
                          {uniqueCategories.map((cat) => (
                            <li
                              key={cat}
                              className="px-3 py-2 hover:bg-[#b06c74] cursor-pointer"
                              onClick={() => {
                                setSelectedCategory(cat);
                                setShowCategoryDropdown(false);
                              }}
                            >
                              {cat}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-2 rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedWorkshops?.map((workshop) => (
                  <tr key={workshop._id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{workshop.Title}</td>
                    <td className="px-4 py-2">
                      {workshop.Date ? new Date(workshop.Date).getDate() : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {workshop.Prix !== undefined
                        ? `${parseFloat(workshop.Prix.toString()).toFixed(3)}`
                        : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {workshop.NbPlaces !== undefined
                        ? `${workshop.NbPlaces}`
                        : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {workshop.NbPlaces !== undefined
                        ? `${workshop.RemainingPlaces}`
                        : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {workshop.Categories ? workshop.Categories : "-"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => onEdit(workshop._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={async () => {
                          const res = await Swal.fire({
                            title: "Êtes-vous sûr ?",
                            text: "Cette action est irréversible.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Oui, supprimer",
                            cancelButtonText: "Annuler",
                          });

                          if (!res.isConfirmed) return;

                          try {
                            setLoadingId(workshop._id);
                            await APIBackend.delete(
                              `Atelier/Delete/${workshop._id}`
                            );
                            await Swal.fire({
                              icon: "success",
                              title: "Supprimé",
                              text: "L'atelier a été supprimé avec succès.",
                              timer: 1400,
                              showConfirmButton: false,
                            });
                            onDelete();
                          } catch (err) {
                            console.error("Erreur suppression atelier:", err);
                            await Swal.fire({
                              icon: "error",
                              title: "Erreur",
                              text: "Une erreur est survenue lors de la suppression.",
                            });
                          } finally {
                            setLoadingId(null);
                          }
                        }}
                        className={`${
                          loadingId === workshop._id
                            ? "bg-gray-400"
                            : "bg-red-500 hover:bg-red-600"
                        } text-white px-2 py-1 rounded`}
                      >
                        {loadingId === workshop._id
                          ? "Suppression..."
                          : "Supprimer"}
                      </button>
                      <button
                        onClick={() => handleReservationClick(workshop._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded ml-2 mr-2"
                      >
                        Reservations
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              totalItems={workshops?.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default WorkshopTable;

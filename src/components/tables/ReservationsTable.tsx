import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../Pagination";
import APIBackend from "../../utils/APIBackend";

interface Reservation {
  Nom: string;
  Prenom: string;
  Email: string;
  Phone: string;
  NbPlacesReserved: number;
  PrixTotal: number;
}

interface ReservationsResponse {
  Total: number;
  PageSize: number;
  CurrentPage: number;
  Reservations: Reservation[];
}

interface ReservationsTableProps {
  atelierId?: string; // can be passed manually or via URL param
}

function ReservationsTable({ atelierId }: ReservationsTableProps) {
  const { id: routeAtelierId } = useParams<{ id: string }>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const finalAtelierId = atelierId || routeAtelierId;

  const fetchReservations = async () => {
    if (!finalAtelierId) return;

    try {
      setLoading(true);
      const res = await APIBackend.get<ReservationsResponse>(
        `Atelier/GetReservations/${finalAtelierId}`
      );
      setReservations(res.data.Reservations);
      setTotalItems(res.data.Total);
      setItemsPerPage(res.data.PageSize);
    } catch (error) {
      console.error("Erreur lors du chargement des réservations :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [finalAtelierId]);

  return (
    <div className="w-full bg-[#fffcf7] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#481713]">
          Historique des Réservations
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-[#481713]">Chargement...</p>
      ) : reservations.length === 0 ? (
        <p className="text-center text-[#481713]">
          Aucune réservation trouvée.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-[#481713]">
              <thead className="text-xs uppercase bg-[#461712] text-white">
                <tr>
                  <th className="px-4 py-2 rounded-l-xl">Nom</th>
                  <th className="px-4 py-2">Prénom</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Téléphone</th>
                  <th className="px-4 py-2">Places Réservées</th>
                  <th className="px-4 py-2 rounded-r-xl">Prix Total (€)</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{res.Nom}</td>
                    <td className="px-4 py-2">{res.Prenom}</td>
                    <td className="px-4 py-2">{res.Email}</td>
                    <td className="px-4 py-2">{res.Phone}</td>
                    <td className="px-4 py-2 text-center">{res.NbPlacesReserved}</td>
                    <td className="px-4 py-2 text-center">{res.PrixTotal} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ReservationsTable;

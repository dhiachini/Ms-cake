import Pagination from "../Pagination";
import APIBackend from "../../utils/APIBackend";
import Swal from "sweetalert2";
import { useState } from "react";

interface CustomOrder {
  _id: string;
  customOrder: string;
  email: string;
  phone: string;
  CreatedAt?: string;
}

interface CustomOrderTableProps {
  customOrders: CustomOrder[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  fetchOrders: () => void;
}

function CustomOrderTable({
  customOrders,
  currentPage,
  itemsPerPage,
  onPageChange,
  fetchOrders,
}: CustomOrderTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const paginated = customOrders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (order: CustomOrder) => {
    Swal.fire({
      title: `<span class="text-2xl font-bold text-[#461712]">Commande de ${order.email}</span>`,
      html: `
        <div class="text-left mt-2 space-y-2">
          <p><strong class="text-[#461712]">Message :</strong><br/>${order.customOrder.replace(/\n/g, '<br/>')}</p>
          <p><strong class="text-[#461712]">Téléphone :</strong> ${order.phone}</p>
          <p><strong class="text-[#461712]">Créée le :</strong> ${
            order.CreatedAt ? new Date(order.CreatedAt).toLocaleString() : '-'
          }</p>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Fermer',
      confirmButtonColor: '#461712',
      width: '600px',
      padding: '2rem',
      backdrop: `
        rgba(0,0,0,0.5)
        left top
        no-repeat
      `,
      customClass: {
        popup: 'rounded-3xl shadow-lg border border-[#461712]',
        title: 'text-center text-xl font-bold text-[#461712]',
        confirmButton:
          'bg-[#461712] hover:bg-[#b06c74] text-white px-6 py-2 rounded-2xl mt-4',
        closeButton: 'text-[#461712] hover:text-[#b06c74]',
      },
    });
  };

  const handleDelete = async (id: string) => {
    const res = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    });

    if (!res.isConfirmed) return;

    try {
      setLoadingId(id);
      await APIBackend.delete(`CustomOrder/Delete/${id}`);
      await Swal.fire({
        icon: 'success',
        title: 'Supprimé',
        text: 'La commande a été supprimée avec succès.',
        timer: 1400,
        showConfirmButton: false,
      });
      fetchOrders();
    } catch (err) {
      console.error('Erreur suppression commande :', err);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la suppression.',
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full bg-[#fffcf7] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#481713]">
          Liste des commandes personnalisées
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-[#481713]">
          <thead className="text-xs uppercase bg-[#461712] text-white">
            <tr>
              <th className="px-4 py-2 rounded-l-xl">Email</th>
              <th className="px-4 py-2">Téléphone</th>
              <th className="px-4 py-2">Commande</th>
              <th className="px-4 py-2">Créée le</th>
              <th className="px-4 py-2 rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated?.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{order.email}</td>
                <td className="px-4 py-2">{order.phone}</td>
                {/* ✨ Texte tronqué avec 3 points quand trop long */}
                <td className="px-4 py-2 max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {order.customOrder}
                </td>
                <td className="px-4 py-2">
                  {order.CreatedAt
                    ? new Date(order.CreatedAt).toLocaleString()
                    : '-'}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleView(order)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className={`${
                      loadingId === order._id
                        ? 'bg-gray-400'
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white px-2 py-1 rounded`}
                  >
                    {loadingId === order._id
                      ? 'Suppression...'
                      : 'Supprimer'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          totalItems={customOrders?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default CustomOrderTable;

import { Link } from "react-router-dom";
import Pagination from "../Pagination";

interface Pastry {
  _id: number;
  Title: string;
  Description: string;
  ImageURL?: string;
}

interface PastryTableProps {
  pastries: Pastry[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function PastryTable({
  pastries,
  currentPage,
  itemsPerPage,
  onPageChange,
  onEdit,
  onDelete,
}: PastryTableProps) {
  const paginatedPastries = pastries?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
console.log(pastries);

  return (
    <div className="w-full bg-[#fffcf7] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#481713]">
          Liste des Ateliers de Pâtisserie
        </h2>
        <Link to={"/addpastry"}  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Ajouter article
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-[#481713]">
          <thead className="text-xs uppercase bg-[#461712] text-white">
            <tr>
              <th className="px-4 py-2">Titre</th>
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
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDelete(pastry._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Supprimer
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
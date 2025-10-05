import Pagination from "../Pagination";

interface Workshop {
  _id: number;
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
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function WorkshopTable({
  workshops,
  currentPage,
  itemsPerPage,
  onPageChange,
  onEdit,
  onDelete,
}: WorkshopTableProps) {
  const paginatedWorkshops = workshops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-[#fffcf7] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#481713] mb-4">
          Liste des Ateliers
        </h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Ajouter atelier
        </button>
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
              <th className="px-4 py-2">Catégorie</th>
              <th className="px-4 py-2 rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedWorkshops.map((workshop) => (
              <tr key={workshop._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{workshop.Title}</td>
                <td className="px-4 py-2">
                  {workshop.Date ? new Date(workshop.Date).getDate() : "-"}
                </td>
                <td className="px-4 py-2">
                  {workshop.Prix !== undefined ? `${parseFloat(workshop.Prix.toString()).toFixed(3)}` : "-"}
                </td>
                <td className="px-4 py-2">
                  {workshop.NbPlaces !== undefined ? `${workshop.NbPlaces}` : "-"}
                </td>
                <td className="px-4 py-2">
                  {workshop.NbPlaces !== undefined ? `${workshop.RemainingPlaces}` : "-"}
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
                    onClick={() => onDelete(workshop._id)}
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
          totalItems={workshops.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default WorkshopTable;

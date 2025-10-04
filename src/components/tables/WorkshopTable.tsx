import Pagination from "../Pagination";

interface Workshop {
  id: number;
  title: string;
  date?: string;
  price?: number;
  places?: number;
  category?: string;
  image?: string;
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
              <th className="px-4 py-2 rounded-l-xl">ID</th>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Prix (€)</th>
              <th className="px-4 py-2">Places</th>
              <th className="px-4 py-2">Catégorie</th>
              <th className="px-4 py-2 rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedWorkshops.map((workshop) => (
              <tr key={workshop.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{workshop.id}</td>
                <td className="px-4 py-2">{workshop.title}</td>
                <td className="px-4 py-2">
                  {workshop.date ? workshop.date : "-"}
                </td>
                <td className="px-4 py-2">
                  {workshop.price !== undefined ? `${workshop.price}` : "-"}
                </td>
                <td className="px-4 py-2">
                  {workshop.places !== undefined ? `${workshop.places}` : "-"}
                </td>
                <td className="px-4 py-2">
                  {workshop.category ? workshop.category : "-"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEdit(workshop.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDelete(workshop.id)}
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

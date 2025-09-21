import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-start mt-4">
      <button
        className="bg-[#461712] hover:bg-[#b06c74] text-white px-1 py-1 h-[40px] w-[90px] rounded-lg cursor-pointer border-0 outline-none"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`bg-[#461712] hover:bg-[#b06c74] text-white px-3 py-1 h-[40px] w-[40px] rounded-lg cursor-pointer border-0 outline-none mx-1 ${
            currentPage === page ? "bg-[#b06c74]" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="bg-[#461712] hover:bg-[#b06c74] text-white px-3 py-1 h-[40px] w-[90px] rounded-lg cursor-pointer border-0 outline-none"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;

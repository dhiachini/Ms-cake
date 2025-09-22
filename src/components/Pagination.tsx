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
    <div className="flex justify-center gap-1 mt-4 flex-wrap md:flex-nowrap items-center">
      {/* Précédent pour desktop */}
      <button
        className="hidden md:inline-flex items-center justify-center bg-[#461712] hover:bg-[#b06c74] text-white h-[40px] w-[90px] rounded-lg cursor-pointer border-0 outline-none"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>

      {/* Numéros de pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`bg-[#461712] hover:bg-[#b06c74] text-white h-[40px] w-[40px] rounded-lg cursor-pointer border-0 outline-none mx-1 flex items-center justify-center ${
            currentPage === page ? "bg-[#b06c74]" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Suivant pour desktop */}
      <button
        className="hidden md:inline-flex items-center justify-center bg-[#461712] hover:bg-[#b06c74] text-white h-[40px] w-[90px] rounded-lg cursor-pointer border-0 outline-none"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;

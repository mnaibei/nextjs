import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <nav>
      <ul className="pagination flex">
        <li className="page-item">
          <a onClick={handlePrevious} className="page-link">
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}>
            <a onClick={() => onPageChange(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a onClick={handleNext} className="page-link">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

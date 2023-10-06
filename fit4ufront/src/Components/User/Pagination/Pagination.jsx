// Pagination.js
import React from 'react';

const Pagination = ({ blogsPerPage, totalBlogs, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4" aria-label="Pagination">
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              href="#"
              className={`px-3 py-1 ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-300'
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

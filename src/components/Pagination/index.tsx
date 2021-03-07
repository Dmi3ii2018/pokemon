import React, { useMemo, useCallback, useEffect } from 'react';
import usePagination from '../../hook/usePagination';
import './Pagination.css';

interface IPagination {
  total: number;
  onPageChange: (num: number) => void;
}

const PaginationItem = ({ onPageClick, number, isActive }) => (
  <li onClick={onPageClick}>
    <button className={isActive ? 'active' : ''}>{number}</button>
  </li>
);

const Dots = () => (
  <li>
    <span>...</span>
  </li>
);

const Pagination: React.FC<IPagination> = ({ total, onPageChange }) => {
  const pagLength = useMemo(() => Math.floor(total / 20 - 1), [total]);
  const [curPage, setCurrentPage, paginationIndexes] = usePagination(pagLength);

  const onNextClick = () => {
    if (pagLength !== curPage) {
      setCurrentPage(curPage + 1);
    }
  };

  const onPrevClick = () => {
    if (curPage !== 1) {
      setCurrentPage(curPage - 1);
    }
  };

  const onPageNumberClick = useCallback(
    (evt) => {
      setCurrentPage(+evt.target.textContent);
    },
    [setCurrentPage],
  );

  useEffect(() => {
    // onPageChange(curPage);
  }, [curPage, onPageChange]);

  const renderPagination = useCallback(
    () => {
      if (paginationIndexes) {
        paginationIndexes.map((page: number, i: number) => {
          if (!page) {
            return <Dots key={`${page}`} />;
          }
          return (
            <PaginationItem
              key={`${page}`}
              onPageClick={onPageNumberClick}
              number={page}
              isActive={page === curPage}
            />
          );
        })
      }
    },
    [curPage, onPageNumberClick, paginationIndexes],
  );

  return (
    <div className="pagination__wrapper">
      <ul className="pagination">
        <li>
          <button type="button" onClick={onPrevClick} className="prev" title="previous page">
            &#10094;
          </button>
        </li>
        {renderPagination()}
        <li>
          <button type="button" onClick={onNextClick} className="next" title="next page">
            &#10095;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

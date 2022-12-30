import React, { useState } from "react";
import styles from "./pagination.module.scss";

const Pagination = (props) => {
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const { currentPage, pageNumberLimit, className, totalData } = props;
  const totalPages = Math.ceil(totalData / pageNumberLimit);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }

    props.onPrevClick();
  };

  const handleNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    props.onNextClick();
  };

  const handlePageClick = (e) => {
    props.onPageChange(Number(e.target.id));
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      let btnClassnm = [styles.button];
      if (currentPage === page) btnClassnm.push(styles.active);
      return (
        <li key={page}>
          <button
            id={page}
            className={btnClassnm.join(" ")}
            onClick={handlePageClick}
          >
            {page}
          </button>
        </li>
      );
    }

    return null;
  });

  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = (
      <li>
        <button className={styles.button} onClick={handleNextClick}>
          &hellip;
        </button>
      </li>
    );
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = (
      <li>
        <button className={styles.button} onClick={handlePrevClick}>
          &hellip;
        </button>
      </li>
    );
  }

  return (
    <div className={className}>
      <ul className={styles.pagination}>
        <li>
          <button
            className={styles.button}
            onClick={handlePrevClick}
            disabled={currentPage === pages[0]}
          >
            {`<`}
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li>
          <button
            className={styles.button}
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            {`>`}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

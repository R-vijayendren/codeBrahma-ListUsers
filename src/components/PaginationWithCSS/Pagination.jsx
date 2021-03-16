import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({
  page,
  onPageChange,
  itemsPerPage,
  setItemsPerPage,
  totalItems = 50,
  pageNumberLimit = 5,
  borderColor = "#000000",
  labelColor = "#000000",
  prevBtnLabel = "Prev",
  nextBtnLabel = "Next",
  morePrevBtnLabel = <>&hellip;</>,
  moreNextBtnLabel = <>&hellip;</>,
  itemsInputLabel = "Items Per Page",
}) => {
  // set initial max pageNumber limit (no of page number in list)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit);
  // set initial min pageNumber limit
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // function to handle the page number click
  const handlePageNumClick = (event) => {
    onPageChange(event.target.id);
  };

  const pages = []; // initial page array;
  // loop to fill the pages array
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  // page number renderer function (based on max & min page numbers)
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          style={{ borderColor: borderColor, color: labelColor }}
          key={number}
          id={number}
          onClick={handlePageNumClick}
          className={page === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  // function to handle next button
  const handleNextbtn = () => {
    const pageNum = Number(page) + 1;
    onPageChange(pageNum);

    if (page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // function to handle previous button
  const handlePrevbtn = () => {
    const pageNum = Number(page) - 1;
    onPageChange(pageNum);

    if ((page - 1) % maxPageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null; // at initial there will be no increment button
  // check for pages array length greater than the max page number limit
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        style={{ borderColor: borderColor, color: labelColor }}
        onClick={handleNextbtn}
      >
        {" "}
        {moreNextBtnLabel}{" "}
      </li>
    );
  }

  let pageDecrementBtn = null; // at initial there will be no decrement button
  // check for pages array length lesser than / equal to the min page number limit
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li
        style={{ borderColor: borderColor, color: labelColor }}
        onClick={handlePrevbtn}
      >
        {" "}
        {morePrevBtnLabel}{" "}
      </li>
    );
  }

  return (
    <>
      {/* Wrapper for Pagination */}
      <div className="paginationWrapper">
        {/* Input Field's Container */}
        <div className="inputContainer">
          <label style={{ color: labelColor }} htmlFor="pageNumber">
            Page
          </label>
          <input
            type="number"
            name="pageNumber"
            id="pageNumber"
            maxLength="3"
            value={page}
            onChange={(e) =>
              onPageChange(e.target.value)
            } /* Setting page number */
            className="inputField"
          />
          <label style={{ color: labelColor }} htmlFor="itemsNumber">
            {itemsInputLabel}
          </label>
          <input
            type="number"
            name="itemsNumber"
            id="itemsNumber"
            maxLength="3"
            value={itemsPerPage}
            onChange={(e) =>
              setItemsPerPage(e.target.value)
            } /* Setting no.of items per page */
            className="inputField"
          />
        </div>
        {/* Page Numbers Container */}
        <ul className="pageNumberContainer">
          <li style={{ borderColor: borderColor, color: labelColor }}>
            <button
              style={{ color: labelColor }}
              onClick={handlePrevbtn}
              disabled={page === pages[0] ? true : false}
            >
              {prevBtnLabel}
            </button>
          </li>
          {pageDecrementBtn}{" "}
          {/* Decrement button to get more previous pageNumbers */}
          {renderPageNumbers} {/* To render pageNumbers */}
          {pageIncrementBtn}{" "}
          {/* Increment button to get more next pageNumbers */}
          <li style={{ borderColor: borderColor, color: labelColor }}>
            <button
              style={{ color: labelColor }}
              onClick={handleNextbtn}
              disabled={page === pages[pages.length - 1] ? true : false}
            >
              {nextBtnLabel}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;

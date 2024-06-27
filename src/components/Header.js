import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./Header.css";
import authors from "../sources/authors.json";
import news from "../sources/news.json";

export default function Header() {
  const [info, setInfo] = useState(news.slice(0, 3));

  const [pageNumber, setPageNumber] = useState(0);

  const articlesPerPage = 1;
  const pagesVisited = pageNumber * articlesPerPage;

  function convertDate(date) {
    var split_date = date.split("-");
    var months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var newDate = split_date[2] + " \n" + months[split_date[1][1]];

    return newDate;
  }

  const displayNews = info
    .slice(pagesVisited, pagesVisited + articlesPerPage)
    .map((details) => {
      return (
        <div className="header-container">
          <img className="article-image" alt="header" src={details.image_url} />
          <div className="article-date">
            <p>{convertDate(details.created_at.substr(0, 10))}</p>
            <div className="triangle"></div>
          </div>
          <div className="article-share">
            <Link to="/" className="share-btn">
              <i class="fas fa-share" />
              SHARE
            </Link>
          </div>
          <hr className="hr-solid" />
          <div className="article-author">
            <p>
              {authors[parseInt(details.author_id) - 1].name} |{" "}
              {authors[parseInt(details.author_id) - 1].role}
            </p>
          </div>
          <div className="article-title">
            <h1>{details.title}</h1>
          </div>
          <div className="article-body">
            <p>{details.body}</p>
          </div>
          <div className="read-article">
            <Link to="/" className="read-link">
              READ ARTICLE
            </Link>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(info.length / articlesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {displayNews}
      <div className="paginator">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"prev-btn"}
          nextLinkClassName={"next-btn"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { InputGroup, Form } from "react-bootstrap";
import BookCard from "../bookcard/BookCard";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./bookstore.module.css";
import PageSwitch from "../PageSwitch/PageSwitch";

function Bookstore(props) {
  let navigate = useNavigate();
  const { id } = useParams();

  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const fetchUrl = `/fee-assessment-books?categoryId=${id}&page=${pages}`;
  useEffect(() => {
    const fetchBooks = async () => {
      const results = await axios.get(fetchUrl);
      setBooks(results.data);
      setLoaded(true);
    };
    fetchBooks();
  }, [id]);

  const fetchPages = async (value) => {
    const fetchUrl = `/fee-assessment-books?categoryId=${id}&page=${value}`;
    const results = await axios
      .get(fetchUrl)
      .then((response) => {
        setBooks(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        setBooks([]);
      });
  };
  function handleChange(e) {
    setSearchTitle(e.target.value);
  }

  function handleSearchPress(e) {
    if (e.key === "Enter") {
      if (searchTitle) {
        const res = books.filter((obj) =>
          JSON.stringify(obj).toLowerCase().includes(searchTitle.toLowerCase())
        );
        navigate(`/bookstore/books_search/${searchTitle}/`, { state: res });
      }
    }
  }
  function decreasePageNumber(pageNumber) {
    console.log("pagenumber", pageNumber);
    if (pageNumber === 0) {
      console.log("data");
    } else {
      setPages(pageNumber - 1);
      fetchPages(pageNumber);
    }
  }
  function increasePageNumber(pageNumber) {
    setPages(pageNumber + 1);

    fetchPages(pageNumber);
  }
  console.log("page", pages);
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Form.Label>Search Books Home</Form.Label>
        <InputGroup
          className="mb-3"
          onChange={handleChange}
          onKeyDown={handleSearchPress}
        >
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <div className="p-d-flex p-flex-column p-jc-center p-grid">
          {!loaded ? (
            <TailSpin ariaLabel="loading-indicator" />
          ) : books.length < 1 ? (
            <h1>No results</h1>
          ) : (
            books.map((book) => (
              <BookCard
                title={book.title}
                author={book.authors}
                imgSrc={book.cover_url}
                description={book.description}
                id={book.category_id}
                key={book.category_id}
              />
            ))
          )}

          <PageSwitch
            pages={pages}
            id={id}
            decreaseonPageNumber={decreasePageNumber}
            increasePageNumber={increasePageNumber}
          />
        </div>
      </div>
    </div>
  );
}

export default Bookstore;

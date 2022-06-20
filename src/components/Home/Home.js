import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import BookCard from "../bookcard/BookCard";
import styles from "./home.module.css";
import { InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const fetchUrl = `/fee-assessment-books?categoryId=1`;
  useEffect(() => {
    const fetchBooks = async () => {
      const results = await axios.get(fetchUrl);
      setBooks(results.data);
      setLoaded(true);
    };
    fetchBooks();
  }, []);
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

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Form.Label>Search Books</Form.Label>
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
        </div>
      </div>
    </div>
  );
}

export default Home;

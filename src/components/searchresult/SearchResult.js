import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./searchresult.module.css";
import { TailSpin } from "react-loader-spinner";
import logoPicture from "../assests/book_logo.png";

function SearchResult(props) {
  const { searchTitle } = useParams();
  const location = useLocation();

  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(location.state);
  }, [searchTitle]);

  return (
    <div className={styles.contentContainer}>
      {results.length < 1 ? (
        <Card>
          <Card.Body>
            <Card.Title>No Results</Card.Title>
          </Card.Body>
        </Card>
      ) : (
        results.map((item, index) => {
          return (
            <Card style={{ margin: 20 }}>
              <Card.Img
                variant="top"
                src={item.cover_url}
                style={{ width: "100px" }}
              />
              <Card.Body>
                <Card.Title>Title:{item.title}</Card.Title>
                <Card.Text>Author:{item.authors}</Card.Text>
                <Card.Text>Description:{item.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        })
      )}
    </div>
  );
}

export default SearchResult;

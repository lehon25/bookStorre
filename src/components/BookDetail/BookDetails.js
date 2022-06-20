import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./bookdetail.module.css";
import { TailSpin } from "react-loader-spinner";

function BookDetails(props) {
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const fetchUrl = `/fee-assessment-books?categoryId=1&page=${id}&size=1`;
  useEffect(() => {
    const fetchDetails = async () => {
      const results = await axios.get(fetchUrl);
      setDetails(results.data);
      setLoaded(true);
    };
    fetchDetails();
  }, [id]);
  return (
    <div className={styles.contentContainer}>
      {!loaded ? (
        <TailSpin ariaLabel="loading-indicator" />
      ) : (
        details.map((details) => {
          return (
            <Card>
              <Card.Img
                variant="top"
                src={details.cover_url}
                style={{ width: "100px" }}
              />
              <Card.Body>
                <Card.Title>Title:{details.title}</Card.Title>
                <Card.Text>Author:{details.author}</Card.Text>
                <Card.Text>Description:{details.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        })
      )}
    </div>
  );
}

export default BookDetails;

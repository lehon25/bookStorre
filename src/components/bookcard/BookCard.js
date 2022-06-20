import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import styles from "./bookcard.module.css";

function BookCard(props) {
  let navigate = useNavigate();

  function navigateBookDetail() {
    navigate(`/bookstore/book/${props.id}`);
  }

  function onFvaorite(responseJSON) {
    localStorage.setItem("favorite", JSON.stringify(responseJSON));
  }
  return (
    <div className={styles.contentContainer}>
      <Card>
        <Card.Img variant="top" src={props.imgSrc} style={{ width: "100px" }} />
        <Card.Body>
          <Card.Title>Title:{props.title}</Card.Title>
          <Card.Text>Author:{props.author}</Card.Text>
          <Card.Text>Description:{props.description}</Card.Text>
          <Button variant="primary" onClick={navigateBookDetail}>
            Details
          </Button>
          <Button
            variant="secondary"
            onClick={() => onFvaorite(props)}
            style={{ margin: 5 }}
          >
            Favorite
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookCard;

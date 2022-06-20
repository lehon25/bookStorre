import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import styles from "./favorite.module.css";

function Favorite(props) {
  const [dataLocal, setDataLocal] = useState([]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("favorite"));
    setDataLocal(local);
  }, []);
  return (
    <div className={styles.contentContainer}>
      <Card>
        <Card.Img
          variant="top"
          src={dataLocal.imgSrc}
          style={{ width: "100px" }}
        />
        <Card.Body>
          <Card.Title>Title:{dataLocal.title}</Card.Title>
          <Card.Text>Author:{dataLocal.author}</Card.Text>
          <Card.Text>Description:{dataLocal.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Favorite;

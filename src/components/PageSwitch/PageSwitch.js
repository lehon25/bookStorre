import React, { useState, useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, InputGroup, Placeholder } from "react-bootstrap";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styles from "./pageSwitch.module.css";

function PageSwitch(props) {
  const left = <FontAwesomeIcon icon={faChevronCircleLeft} />;
  const right = <FontAwesomeIcon icon={faChevronCircleRight} />;

  const [pages, setPage] = useState("");
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loaded, setLoaded] = useState(false);

  console.log("props", props);
  useEffect(() => {
    setPage(props.pages);
    setId(props.id);

    // fetchPages(props.pages, props.id);
  }, []);

  function decreasePageNumber() {
    if (pages === 0) {
      console.log("data");
    } else {
      setPage(pages - 1);
      props.decreaseonPageNumber(pages - 1);
    }
  }
  function increasePageNumber() {
    setPage(pages + 1);
    props.decreaseonPageNumber(pages + 1);
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.pageSwitchContainer}>
          <Button onClick={decreasePageNumber}> {left}</Button>

          <span className={styles.currentPageGroup}>
            <InputGroup>
              <Form.Control
                disabled
                readOnly
                style={{ width: 40 }}
                placeholder={pages}
              />
            </InputGroup>
          </span>

          <Button onClick={increasePageNumber}>{right}</Button>
        </div>
      </div>
    </div>
  );
}

export default PageSwitch;

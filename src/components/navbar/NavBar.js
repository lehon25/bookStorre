import React, { useState, useEffect } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";

import styles from "./navbar.module.css";
import logoPicture from "../assests/book_logo.png";
import axios from "axios";

function NavBar() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const fetchUrl = "/fee-assessment-categories";
  useEffect(() => {
    const fetchBooks = async () => {
      const results = await axios.get(fetchUrl);
      setCategories(results.data);
    };
    fetchBooks();
  }, []);

  function onFavorite() {
    navigate(`/favorite`);
  }
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.navbarContainer}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <img src={logoPicture} alt="BN Bookstore Logo" />
            </Link>
          </div>
          <div className={styles.menuContainer}>
            <div className={styles.menu}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Categori
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((item, idx) => {
                    return (
                      <Link to={`/bookstore/${item.id}`}>
                        <Dropdown.Item href={`/bookstore/${item.id}`}>
                          {item.name}
                        </Dropdown.Item>
                      </Link>
                    );
                  })}
                </Dropdown.Menu>
                <Button style={{ margin: 10 }} onClick={onFavorite}>
                  <div style={{ fontSize: "1rem", fontWeight: 900 }}>
                    Favorite
                  </div>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

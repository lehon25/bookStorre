import React from "react";
import NavBar from "./navbar/NavBar";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Bookstore from "./bookstore/BookStore";
import Home from "./Home/Home";
import BookDetail from "./BookDetail/BookDetails";
import SearchResults from "./searchresult/SearchResult";
import Favorite from "./Favorite/Favorite";

function AppContainer() {
  return (
    <div>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/favorite" element={<Favorite />} />
          <Route path="/bookstore/book/:id" element={<BookDetail />} />
          <Route
            path="/bookstore/books_search/:searchTitle"
            element={<SearchResults />}
          />
          <Route exact path="/bookstore/:id" element={<Bookstore />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default AppContainer;

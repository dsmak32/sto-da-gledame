import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEV-9QkUEchY7W5-bdw_kqxCkttGK5AYw",
  authDomain: "stodagledame.firebaseapp.com",
  projectId: "stodagledame",
  storageBucket: "stodagledame.appspot.com",
  messagingSenderId: "488134054341",
  appId: "1:488134054341:web:a2cbd081837cd7c3103bac",
  databaseURL:
    "https://stodagledame-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(event) {
    event.preventDefault();
    const apiKey = "9e4e111831a0f5c1fc076d66dba29136";
    const baseUrl = "https://api.themoviedb.org/3/search/multi";
    const searchUrl = `${baseUrl}?api_key=${apiKey}&query=${searchQuery}`;
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => setSearchResults(data.results));
  }

  function handleQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  
  const handleAddToWatchLater = (title, poster) => {
    push(ref(db, "watchlater"), { title, poster });
  };

  
  const handleAddToWatched = (title, poster) => {
    push(ref(db, "gledani"), { title, poster });
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/sto-da-gledame">
    <img
      src="https://i.imgur.com/b7dVdY0.png"
      style={{ height: "100px", paddingLeft: 10 }}
      alt=""
    />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="navbar-nav me-auto mb-2 mb-lg-0 pt-3">
      <ul style={{ display: "flex", listStyle: "none" }}>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <li style={{ marginRight: "10px" }}>Home</li>
        </Link>
        <Link to="/watchlater" style={{ color: "black", textDecoration: "none" }}>
          <li style={{ marginRight: "10px" }}>Што да гледаме?</li>
        </Link>
        <Link to="/gledani" style={{ color: "black", textDecoration: "none" }}>
          <li>Гледани филмови</li>
        </Link>
      </ul>
    </Nav>
    <Form className="text-right" inline onSubmit={handleSearch}>
      <FormControl
        type="text"
        placeholder="Пребарај"
        className="form-control-sm"
        style={{ paddingRight: "20px" }}
        value={searchQuery}
        onChange={handleQueryChange}
      />
      <Button variant="btn btn-outline-dark btn-sm" type="submit">
        Пребарување
      </Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

      {searchResults.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {searchResults.map(result => (
            <div className="search-result" key={result.id} style={{ margin: "10px", width: "300px" }}>
              <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={`${result.title} poster`} style={{ width: "60%" }} />
              <div style={{ padding: "1px" }}>
                <h3>{result.title}</h3>
                <button
                    onClick={() => handleAddToWatchLater(result.title, `https://image.tmdb.org/t/p/w500${result.poster_path}`)}
                    className="btn btn-primary">
                    Додади за гледање
                  </button>
                  <button 
                    onClick={() => handleAddToWatched(result.title, `https://image.tmdb.org/t/p/w500${result.poster_path}`)}
                    className="btn btn-secondary">
                    Додади во гледани
                  </button>
                <p>{result.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopNavbar;

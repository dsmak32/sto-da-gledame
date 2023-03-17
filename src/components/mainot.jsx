import React, { useState } from "react";
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

const KLJUC = "api_key=9e4e111831a0f5c1fc076d66dba29136";
const URL = "https://api.themoviedb.org/3";
const Requestot = URL + "/discover/movie?sort_by=popularity.desc&" + KLJUC;


const Mainot = (props) => {
  const [movies, setMovies] = useState([]);

  const handleAddToWatchLater = (title, poster) => {
    push(ref(db, "watchlater"), { title, poster });
  };

  fetch(Requestot)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.results)) {
        const newMovies = data.results.map((item) => {
          const name = item.original_title;
          const poster =
            "https://image.tmdb.org/t/p/w500/" + item.poster_path;
          return (
            <div className="col-md-3 mb-3" key={item.id}>
              <div className="card">
                <img src={poster} className="card-img-top" alt={name} />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <button
                    onClick={() => handleAddToWatchLater(name, poster)}
                    className="btn btn-primary"
                  >
                    Гледај подоцна
                  </button>
                </div>
              </div>
            </div>
          );
        });
        setMovies(newMovies);
      } else {
        console.error("error:", data.results);
      }
    })
    .catch((err) => console.error("error", err));

  return (
    <div className="container">
      <div className="row mt-5">
        {movies}
      </div>
    </div>
  );
};

export default Mainot;

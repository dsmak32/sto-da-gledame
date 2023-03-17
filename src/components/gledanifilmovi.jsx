import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEV-9QkUEchY7W5-bdw_kqxCkttGK5AYw",
  authDomain: "stodagledame.firebaseapp.com",
  projectId: "stodagledame",
  storageBucket: "stodagledame.appspot.com",
  messagingSenderId: "488134054341",
  appId: "1:488134054341:web:a2cbd081837cd7c3103bac",
  databaseURL: 'https://stodagledame-default-rtdb.europe-west1.firebasedatabase.app'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const KLJUC = "api_key=9e4e111831a0f5c1fc076d66dba29136";
const URL = "https://api.themoviedb.org/3";
const Requestot = URL+ "/discover/movie?sort_by=popularity.desc&" + KLJUC;

const Mainot = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const gledaniRef = ref(db, "gledani");
    onValue(gledaniRef, (snapshot) => {
      const gledani = snapshot.val();
      if (gledani) {
        const newMovies = Object.entries(gledani).map(([key, value]) => {
          const { title, poster } = value;
          return (
            <div className="col-md-3 mb-3" key={key}>
              <div className="card">
                <img src={poster} className="card-img-top" alt={title} />
                <div className="card-body">
                  <div style={{ fontSize: 18 }} className="card-title">{title}</div>
                  <button onClick={() => handleRemoveFromWatchLater(key)} className="btn btn-danger mt-2">Отстрани од Гледани</button>
                </div>
              </div>
            </div>
          );
        });
        setMovies(newMovies);
      }
    });
  }, []);


  const handleRemoveFromWatchLater = (key) => {

    remove(ref(db, `gledani/${key}`));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Гледани филмови</h1>
      <div className="row justify-content-center">
        {movies.length > 0 ? (
          movies
        ) : (
          <div className="text-center">Не си гледал филмови?</div>
        )}
      </div>
   
    </div>
  );
};

export default Mainot;

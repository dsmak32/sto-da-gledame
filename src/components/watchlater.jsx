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

const WatchLater1 = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const watchlaterRef = ref(db, "watchlater");
    onValue(watchlaterRef, (snapshot) => {
      const watchlater = snapshot.val();
      if (watchlater) {
        const newMovies = Object.entries(watchlater).map(([key, value]) => {
          const { title, poster } = value;
          return (
            <div className="col-md-3 mb-3" key={key}>
              <div className="card">
                <img src={poster} className="card-img-top" alt={title} />
                <div className="card-body">
                  <div style={{ fontSize: 18 }} className="card-title">{title}</div>
                  <button onClick={() => handleRemoveFromWatchLater(key)} className="btn btn-danger mt-2">Отстрани од Watch Later</button>
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
    remove(ref(db, `watchlater/${key}`));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Watch Later</h1>
      <div className="row justify-content-center">
        {movies.length > 0 ? (
          movies
        ) : (
          <div className="text-center">Нема филмови за гледање</div>
        )}
      </div>
     </div>
  );
};

export default WatchLater1;

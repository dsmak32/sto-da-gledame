import React from "react";
import Navbar from "../components/Navbar";
import Gledani from "../components/gledanifilmovi";

const GledaniFilmovi = () => {
  return (
    <div>
    <Navbar />
    <div
      style={{
        backgroundImage: "url('https://i.imgur.com/DnaX2GK.png')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        height: "20px"
      }}
    ></div>
    <Gledani />
    

    </div>

  );
};

export default GledaniFilmovi;

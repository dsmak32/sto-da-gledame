import React from "react";
import Navbar from "../components/Navbar";
import Mainot from "../components/mainot";

const Home = () => {
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
    <Mainot />

    </div>

  );
};

export default Home;

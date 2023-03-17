import React from "react";
import Navbar from "../components/Navbar";
import WatchLater from "../components/watchlater";

const WatchLater1 = () => {
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
    <WatchLater />
    

    </div>

  );
};

export default WatchLater1;

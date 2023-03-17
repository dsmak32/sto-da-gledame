
import Home from "./pages/Home";
import WatchLater from "./pages/watchlater";
import Gledani from "./pages/gledani";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <BrowserRouter basename={window.location.pathname || ""}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/gledani" element={<Gledani />} />
       </Routes>
    </BrowserRouter>
  );
};

export default App;
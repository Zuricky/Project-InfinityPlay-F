import "./index.css";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";

import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import Footer from "./components/Footer.jsx";
import Backoffice from "./components/Backoffice.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

// ——— Router ———
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ——— Styles ———
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/css/index.css";
import "./assets/styles/css/App.css";
import "./assets/styles/scss/main.scss";

// ——— Contexts ———
import { AuthProvider } from "./contexts/AuthContext";

// ——— Components ———
import NavBar from "./components/Navbar.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/auth/Profile.jsx";
import HomePage from "./pages/HomePage.jsx";
import Games from "./pages/games/Games.jsx";
import GameDetail from "./pages/games/GameDetails.jsx";
import Error404 from "./components/Error404.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameDetail />} />

          <Route path="*" element={<Error404 />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

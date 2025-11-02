import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dictionary from "./Dictionary";
import DailyChallenge from "./DailyChallenge";
import AboutDictionaryApp from "./AboutDictionaryApp";
import "./App.css";

export default function App() {
  return (
    <Router>
      {" "}
      <nav className="navbar">
        <Link to="/">
          <div className="logo">
            {" "}
            <img src="images/logo1.png" alt="logo" className="logo" />
          </div>
        </Link>

        <div>
          <Link to="/" className="navlink">
            Dictionary
          </Link>
          <Link to="/about" className="navlink">
            About
          </Link>
          <Link to="/challenge" className="navlink">
            DailyChallenge
          </Link>
        </div>
      </nav>
      <div className="App">
        <div className="container">
          <header className="App-header"></header>

          <main>
            <Routes>
              <Route path="/" element={<Dictionary />} />
              <Route path="/challenge" element={<DailyChallenge />} />
              <Route path="/about" element={<AboutDictionaryApp />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

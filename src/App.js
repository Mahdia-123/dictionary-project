import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dictionary from "./Dictionary";
import DailyChallenge from "./DailyChallenge"; // import your new component
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
          <Link to="/challenge" className="navlink">
            Daily Challenge
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
            </Routes>
          </main>
        </div>

        <footer className="dictionary-footer">
          <p>
            This page was coded by{" "}
            <a
              href="https://github.com/Mahdia-123"
              target="_blank"
              rel="noreferrer"
            >
              Mahdia Khamoosh
            </a>{" "}
            and is{" "}
            <a
              href="https://github.com/Mahdia-123/afghanista-sightseeing-places"
              target="_blank"
              rel="noreferrer"
            >
              open-sourced
            </a>{" "}
            and hosted on{" "}
            <a
              href="https://vanilla-dictionary-app.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Netlify
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

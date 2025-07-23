import logo from "./logo.png";
import Dictionary from "./Dictionary";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo img-fluid" alt="logo" />
        </header>
        <main>
          <Dictionary />
        </main>
      </div>
      <footer className="dictionary-footer">
        <p>
          This page was coded by
          <a href="https://github.com/Mahdia-123" target="_blank">
            Mahdia Khamoosh
          </a>
          and is
          <a
            href="https://github.com/Mahdia-123/afghanista-sightseeing-places"
            target="_blank"
          >
            open-sourced
          </a>
          and hosted on
          <a href="" target="_blank">
            Netlify
          </a>
        </p>
      </footer>
    </div>
  );
}

import React, { useState } from "react";
import Results from "./Results";
import Photos from "./Photos";
import Translate from "./Translate";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  let [keyWord, setKeyWord] = useState("");
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);
  let [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  function handleResponse(response) {
    setResults(response.data[0]);
  }

  function handlePexelResponse(response) {
    setPhotos(response.data.photos);
  }

  function updateHistory(word) {
    let updated = history.filter(
      (item) => item.toLowerCase() !== word.toLowerCase()
    );
    updated.unshift(word);
    if (updated.length > 5) updated = updated.slice(0, 5);

    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  }

  function search(event) {
    event.preventDefault();
    if (!keyWord) return;

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyWord}`;
    axios.get(apiUrl).then(handleResponse);

    let pexelApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyWord}&key=${process.env.REACT_APP_PEXELS_API_KEY}`;
    axios.get(pexelApiUrl).then(handlePexelResponse);

    updateHistory(keyWord);
  }

  function handleKeywordChange(event) {
    setKeyWord(event.target.value);
  }

  function handleHistoryClick(word) {
    setKeyWord(word);

    // Trigger search for clicked history word
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    axios.get(apiUrl).then(handleResponse);

    let pexelApiUrl = `https://api.shecodes.io/images/v1/search?query=${word}&key=${process.env.REACT_APP_PEXELS_API_KEY}`;
    axios.get(pexelApiUrl).then(handlePexelResponse);
  }

  return (
    <div className="Dictionary">
      <section className="SearchSection">
        <h1>What word do you want to look up?</h1>
        <form onSubmit={search}>
          <input
            type="search"
            autoFocus={true}
            value={keyWord}
            onChange={handleKeywordChange}
          />
        </form>
        <div className="Hint">Suggested Words: honey, flower, yoga...</div>
      </section>

      {/* Translate section appears only if keyWord is not empty */}
      {keyWord && (
        <section className="translate">
          <Translate word={keyWord} />
        </section>
      )}

      {history.length > 0 && (
        <section className="HistorySection">
          <h2>Search History</h2>
          <ul className="HistoryList">
            {history.map((word, index) => (
              <li key={index}>
                <button
                  className="history-btn"
                  onClick={() => handleHistoryClick(word)}
                >
                  {word}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Results results={results} />
      <Photos photos={photos} />
    </div>
  );
}

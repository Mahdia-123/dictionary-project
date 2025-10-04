import React, { useState } from "react";
import Results from "./Results";
import Photos from "./Photos";
import axios from "axios";
import "./Dictionary.css";
export default function Dictionary() {
  let [keyWord, setKeyWord] = useState("");
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);
  function handleResponse(response) {
    console.log(response.data[0]);
    setResults(response.data[0]);
  }
  function handlePexelResponse(response) {
    console.log(response.data);
    setPhotos(response.data.photos);
  }
  function search(event) {
    event.preventDefault();
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyWord}`;
    axios.get(apiUrl).then(handleResponse);

    let pexelApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyWord}&key=${process.env.REACT_APP_PEXELS_API_KEY}`;
    axios.get(pexelApiUrl).then(handlePexelResponse);
  }
  function handleKeywordChange(event) {
    setKeyWord(event.target.value);
  }
  return (
    <div className="Dictionary">
      <section>
        <h1>What word do you want to look up?</h1>
        <form onSubmit={search}>
          <input
            type="search"
            autoFocus={true}
            onChange={handleKeywordChange}
          />
        </form>

        <div className="Hint">Suggested Words: honey, flower, yoga...</div>
      </section>

      <Results results={results} />

      <Photos photos={photos} />
    </div>
  );
}

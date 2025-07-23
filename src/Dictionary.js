import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
export default function Dictionary() {
  let [keyWord, setKeyWord] = useState(null);
  function handleResponse(response) {
    console.log(response.data[0]);
  }

  function search(event) {
    event.preventDefault();

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyWord}`;
    axios.get(apiUrl).then(handleResponse);
    console.log(apiUrl);
  }
  function handleKeywordChange(event) {
    setKeyWord(event.target.value);
  }
  return (
    <div className="Dictionary">
      <form onSubmit={search}>
        <input type="search" autoFocus={true} onChange={handleKeywordChange} />
      </form>
    </div>
  );
}

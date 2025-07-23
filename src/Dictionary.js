import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
export default function Dictionary() {
  let [keyWord, setKeyWord] = useState(null);
  function search(event) {
    event.preventDefault();
    alert(`Searching for ${keyWord} definition`);
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

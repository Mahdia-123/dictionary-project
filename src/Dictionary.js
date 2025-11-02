import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import Phonetic from "./Phonetic";

import "./Dictionary.css";

export default function Dictionary() {
  const [keyWord, setKeyWord] = useState("");
  const [language, setLanguage] = useState("English");
  const [results, setResults] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [pronunciation, setPronunciation] = useState(""); // Persian
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  const updateHistory = (word) => {
    let updated = history.filter(
      (item) => item.toLowerCase() !== word.toLowerCase()
    );
    updated.unshift(word);
    if (updated.length > 5) updated = updated.slice(0, 5);
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const handleSearch = async (event) => {
    if (event) event.preventDefault();
    if (!keyWord) return;

    setLoading(true);
    setResults(null);
    setPhotos(null);
    setPronunciation("");
    updateHistory(keyWord);

    if (language === "English") {
      try {
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          keyWord
        )}`;
        const response = await axios.get(apiUrl);
        setResults(response.data[0]);

        const photoResponse = await axios.get(
          `https://api.shecodes.io/images/v1/search?query=${encodeURIComponent(
            keyWord
          )}&key=${process.env.REACT_APP_PEXELS_API_KEY}`
        );
        setPhotos(photoResponse.data.photos);
      } catch (error) {
        console.error("English search failed:", error);
      } finally {
        setLoading(false);
      }
    }

    if (language === "Persian") {
      try {
        const openAiKey = process.env.REACT_APP_OPENAI_API_KEY;

        // --- Persian dictionary entry ---
        const prompt = `
Create a Persian dictionary entry for "${keyWord}".
Include part of speech, definitions, examples, synonyms.
Return JSON like:
{
  "word": "...",
  "meanings": [
    {
      "partOfSpeech": "...",
      "definitions": [
        {"definition": "...", "example": "...", "synonyms": ["..."]}
      ]
    }
  ]
}`;
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are a Persian dictionary assistant.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 1000,
          }),
        });
        const data = await res.json();
        let entry;
        try {
          entry = JSON.parse(data.choices[0].message.content);
        } catch {
          entry = { word: keyWord, meanings: [] };
        }
        setResults(entry);

        // --- Latin pronunciation ---
        const pronPrompt = `Write the Persian word "${keyWord}" in Latin letters for pronunciation. Return only the text.`;
        const pronRes = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openAiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content: "You are a helpful pronunciation assistant.",
                },
                { role: "user", content: pronPrompt },
              ],
              max_tokens: 30,
            }),
          }
        );
        const pronData = await pronRes.json();
        setPronunciation(pronData.choices[0].message.content.trim());

        // --- Photos (translate Persian to English for search) ---
        const translationPrompt = `
Translate this Persian word "${keyWord}" to a short English word/phrase for image search.
Return only the translated text.`;
        const translationRes = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openAiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content: "You are a Persian to English translator.",
                },
                { role: "user", content: translationPrompt },
              ],
              max_tokens: 50,
            }),
          }
        );
        const translationData = await translationRes.json();
        const imageQuery = translationData.choices[0].message.content.trim();
        const photoResponse = await axios.get(
          `https://api.shecodes.io/images/v1/search?query=${encodeURIComponent(
            imageQuery
          )}&key=${process.env.REACT_APP_PEXELS_API_KEY}`
        );
        setPhotos(photoResponse.data.photos);
      } catch (error) {
        console.error("Persian search failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Group English meanings by part of speech
  const groupedMeanings = {};
  if (language === "English" && results && results.meanings) {
    results.meanings.forEach((meaning) => {
      if (!groupedMeanings[meaning.partOfSpeech]) {
        groupedMeanings[meaning.partOfSpeech] = [];
      }
      groupedMeanings[meaning.partOfSpeech].push(meaning);
    });
  }

  return (
    <div className="Dictionary">
      <section className="SearchSection">
        <h1>What word do you want to look up?</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            placeholder="Enter a word"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Persian">Persian</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        <div className="Hint">Suggested Words: honey, گل, yoga...</div>
      </section>

      {history.length > 0 && (
        <section className="HistorySection">
          <h2>Search History</h2>
          <ul className="HistoryList">
            {history.map((word, index) => (
              <li key={index}>
                <button
                  className="history-btn"
                  onClick={() => {
                    setKeyWord(word);
                    handleSearch();
                  }}
                >
                  {word}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {results && (
        <>
          <section className="PhoneticSection">
            <h2>{results.word}</h2>

            {language === "English" &&
              results.phonetics &&
              results.phonetics.map((phon, idx) => (
                <Phonetic key={idx} phonetic={phon} />
              ))}

            {language === "Persian" && pronunciation && (
              <div className="PersianPronunciation">
                <button
                  className="persian-Phonetic"
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(keyWord);
                    utterance.lang = "fa-IR";
                    window.speechSynthesis.speak(utterance);
                  }}
                >
                  Listen
                </button>
                <span className="pronunciation">/{pronunciation}/</span>
              </div>
            )}
          </section>

          {language === "English" &&
            Object.keys(groupedMeanings).map((pos) => (
              <div key={pos} className="POSSection">
                {groupedMeanings[pos].map((meaning, idx) => {
                  const limitedMeaning = {
                    ...meaning,
                    definitions: meaning.definitions.slice(0, 3),
                  };
                  return (
                    <Results
                      key={idx}
                      results={{
                        word: results.word,
                        meanings: [limitedMeaning],
                      }}
                    />
                  );
                })}
              </div>
            ))}

          {language === "Persian" && <Results results={results} />}
        </>
      )}

      {photos && <Photos photos={photos} />}
    </div>
  );
}

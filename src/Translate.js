import React, { useState, useEffect } from "react";
import Polyglot from "node-polyglot";
import "./Translate.css";

const polyglot = new Polyglot(); // stable instance

export default function Translate({ word }) {
  const [selectedLang, setSelectedLang] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const openAiKey = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    if (!word || !selectedLang) {
      setTranslation(""); // reset translation if no language is selected
      return;
    }

    const fetchTranslation = async () => {
      setLoading(true);
      setError(false);

      const key = `${word}_${selectedLang}`;
      try {
        if (polyglot.has(key)) {
          setTranslation(polyglot.t(key));
        } else {
          const res = await fetch(
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
                  { role: "system", content: "You are a helpful translator." },
                  {
                    role: "user",
                    content: `Translate the English word "${word}" into ${selectedLang}. Only return the translation.`,
                  },
                ],
                max_tokens: 50,
              }),
            }
          );

          const data = await res.json();
          const text = data.choices?.[0]?.message?.content?.trim() || "N/A";
          polyglot.extend({ [key]: text });
          setTranslation(text);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslation();
  }, [word, selectedLang, openAiKey]);

  // Render translation section only if a word exists
  if (!word) return null;

  return (
    <section className="translate-section">
      <h3>Select Language:</h3>
      <div className="radio-group">
        {["Persian", "Pashto", "Turkish"].map((lang) => (
          <label key={lang} className="radio-label">
            <input
              type="radio"
              name="language"
              value={lang}
              checked={selectedLang === lang}
              onChange={(e) => setSelectedLang(e.target.value)}
            />
            {lang}
          </label>
        ))}
      </div>

      {loading && <p className="loading">Loading translation...</p>}
      {error && <p className="error">Failed to fetch translation.</p>}
      {!loading && !error && translation && (
        <p className="result">
          <strong>{selectedLang}:</strong> {translation}
        </p>
      )}
    </section>
  );
}

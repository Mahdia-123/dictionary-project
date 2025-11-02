import React from "react";
import Synonyms from "./Synonyms";
import "./Results.css";

export default function Results({ results }) {
  if (!results || !results.meanings) return null;

  return (
    <section className="results-section">
      {results.meanings.map((meaning, idx) => (
        <div key={idx} className="meaning">
          {/* Only show POS name */}
          <h3 className="pos-name">{meaning.partOfSpeech}</h3>

          {meaning.definitions.map((def, i) => (
            <div key={i} className="definition-block">
              <p className="definition">{def.definition}</p>
              {def.example && (
                <p className="example">
                  <em>{def.example}</em>
                </p>
              )}
              {def.synonyms && def.synonyms.length > 0 && (
                <Synonyms synonyms={def.synonyms} />
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

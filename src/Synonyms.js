import React from "react";
import "./Synonym.css";

export default function Synonyms(props) {
  if (props.synonyms) {
    return (
      <ul className="Synonyms">
        {props.synonyms.map(function (synonym, index) {
          return (
            <span key={index}>
              <li>{synonym}</li>
            </span>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
}

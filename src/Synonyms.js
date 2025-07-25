import React from "react";

export default function Synonyms(props) {
  if (props.synonyms) {
    return (
      <ul className="Synonyms text-primary">
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

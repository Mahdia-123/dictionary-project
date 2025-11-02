import React from "react";

export default function Translate({ word }) {
  if (!word) return null;

  return (
    <div className="Translate">
      <h3>Translation of "{word}"</h3>
      {/* You can replace this with your translation logic */}
    </div>
  );
}

import React, { useState } from "react";
import openai from "./openai";
import "./DailyChallenge.css";

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false); // New state for toggling answer

  async function fetchChallenge() {
    setLoading(true);
    setShowAnswer(false); // Hide answer whenever a new challenge is fetched
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Give me a challenging but useful English word for today, 
              with its definition, an example sentence, and a quiz question 
              in JSON like this:
              {
                "word": "...",
                "meaning": "...",
                "example": "...",
                "quiz": {
                  "question": "...",
                  "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
                  "answer": "B"
                }
              }`,
          },
        ],
      });

      const data = completion.choices[0].message.content;

      // Sometimes AI sends extra text around JSON, so we try to parse safely
      const jsonStart = data.indexOf("{");
      const jsonEnd = data.lastIndexOf("}") + 1;
      const jsonString = data.substring(jsonStart, jsonEnd);

      setChallenge(JSON.parse(jsonString));
    } catch (err) {
      console.error("Error fetching challenge:", err);
    }
    setLoading(false);
  }

  return (
    <div className="DailyChallenge">
      <h1 className="challengeh1">Daily Challenge Word</h1>
      <button
        onClick={fetchChallenge}
        disabled={loading}
        className="challengeBtn"
      >
        {loading ? "Loading..." : "Get Today’s Word"}
      </button>

      {challenge && (
        <div className="challenge-card">
          <h2>{challenge.word}</h2>
          <p>
            <strong>Meaning:</strong> {challenge.meaning}
          </p>
          <p>
            <strong>Example:</strong> {challenge.example}
          </p>
          <p>
            <strong>Quiz:</strong> {challenge.quiz.question}
          </p>
          <ul>
            {challenge.quiz.options.map((opt, index) => (
              <li key={index}>{opt}</li>
            ))}
          </ul>

          {/* Toggle Answer Button */}
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="toggleBtn"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          {showAnswer && (
            <p className="answer">
              <strong>Answer:</strong> {challenge.quiz.answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

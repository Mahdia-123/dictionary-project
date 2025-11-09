import React, { useState } from "react";
import openai from "./openai";
import "./DailyChallenge.css";

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // ✅ Track which answers were correct
  const [checkedAnswers, setCheckedAnswers] = useState({});

  // Fallback challenge if OpenAI API fails or rate limit is hit
  const fallbackChallenge = {
    word: "Eloquent",
    meaning: "Fluent or persuasive in speaking or writing.",
    example: "The professor gave an eloquent lecture on human rights.",
    blanks: [
      {
        sentence: "He gave a very _____ speech at the ceremony.",
        answer: "eloquent",
      },
    ],
    quiz: [
      {
        type: "synonym",
        question: "Which word is a synonym for 'eloquent'?",
        options: ["A) Fluent", "B) Silent", "C) Angry", "D) Confused"],
        answer: "A",
      },
      {
        type: "truefalse",
        question:
          "'Eloquent' can be used to describe writing, speaking, or gestures.",
        answer: "True",
      },
    ],
  };

  async function fetchChallenge() {
    setLoading(true);
    setScore(null);
    setAnswers({});
    setCheckedAnswers({});
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Give me a challenging English word for today in JSON format including:
            1. "word" - the word of the day
            2. "meaning" - definition
            3. "example" - example sentence
            4. "blanks" - array of sentences with a missing word
            5. "quiz" - array of mini-questions, types: 'synonym' or 'truefalse', with options if applicable
            JSON example:
{
  "word": "Eloquent",
  "meaning": "...",
  "example": "...",
  "blanks": [{"sentence": "He gave a very _____ speech.", "answer": "eloquent"}],
  "quiz": [
    {
      "type": "synonym",
      "question": "...",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "answer": "A"
    },
    {
      "type": "truefalse",
      "question": "...",
      "answer": "True"
    }
  ]
}`,
          },
        ],
      });

      const data = completion.choices[0].message.content;
      const jsonStart = data.indexOf("{");
      const jsonEnd = data.lastIndexOf("}") + 1;
      const jsonString = data.substring(jsonStart, jsonEnd);
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed.quiz)) parsed.quiz = [];
      if (!Array.isArray(parsed.blanks)) parsed.blanks = [];
      setChallenge(parsed);
    } catch (err) {
      console.error("Error fetching challenge:", err);
      if (err.status === 429 || err.message.includes("429")) {
        console.warn("OpenAI quota exceeded. Using fallback challenge.");
        setChallenge(fallbackChallenge);
      } else {
        alert("Failed to fetch challenge. Try again later.");
      }
    }
    setLoading(false);
  }

  function handleAnswerChange(key, value) {
    setAnswers({ ...answers, [key]: value });
  }

  function checkAnswers() {
    if (!challenge) return;
    let correct = 0;
    const checked = {};

    // Check the single blank
    const blank = challenge.blanks[0];
    if (
      answers["blank_0"] &&
      answers["blank_0"].trim().toLowerCase() === blank.answer.toLowerCase()
    ) {
      correct++;
      checked["blank_0"] = true;
    } else {
      checked["blank_0"] = false;
    }

    // Check all quizzes
    challenge.quiz.forEach((q, i) => {
      const isCorrect = answers[`quiz_${i}`] === q.answer;
      if (isCorrect) correct++;
      checked[`quiz_${i}`] = isCorrect;
    });

    setCheckedAnswers(checked);
    setScore(correct);
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
          <h2 className="word-title">{challenge.word}</h2>
          <p>
            <strong>Meaning:</strong> {challenge.meaning}
          </p>
          <p>
            <strong>Example:</strong> {challenge.example}
          </p>

          {/* ✅ Single fill-in-the-blank section */}
          {Array.isArray(challenge.blanks) && challenge.blanks.length > 0 && (
            <div className="blank-card">
              <h3>Fill in the Blank</h3>
              <p className="blank-sentence">
                {challenge.blanks[0].sentence?.includes("_____")
                  ? challenge.blanks[0].sentence
                  : challenge.blanks[0].sentence + " _____"}
              </p>
              <input
                type="text"
                placeholder="Type your answer..."
                value={answers["blank_0"] || ""}
                onChange={(e) => handleAnswerChange("blank_0", e.target.value)}
                className="blank-input"
              />
              {score !== null &&
                (checkedAnswers["blank_0"] ? (
                  <span className="tick"> ✅</span>
                ) : (
                  <span className="cross"> ❌</span>
                ))}
            </div>
          )}

          {/* ✅ Quiz section (synonym + true/false) */}
          <div className="quiz-container">
            {Array.isArray(challenge.quiz) &&
              challenge.quiz.map((q, i) => (
                <div key={i} className="quiz-card">
                  <p className="quiz-question">{q.question}</p>

                  {q.type === "synonym" &&
                    q.options.map((opt, idx) => (
                      <label key={idx} className="option-label">
                        <input
                          type="radio"
                          name={`quiz_${i}`}
                          value={opt.charAt(0)}
                          checked={answers[`quiz_${i}`] === opt.charAt(0)}
                          onChange={() =>
                            handleAnswerChange(`quiz_${i}`, opt.charAt(0))
                          }
                        />
                        {opt}
                      </label>
                    ))}

                  {q.type === "truefalse" && (
                    <div className="tf-options">
                      <label>
                        <input
                          type="radio"
                          name={`quiz_${i}`}
                          value="True"
                          checked={answers[`quiz_${i}`] === "True"}
                          onChange={() =>
                            handleAnswerChange(`quiz_${i}`, "True")
                          }
                        />
                        True
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`quiz_${i}`}
                          value="False"
                          checked={answers[`quiz_${i}`] === "False"}
                          onChange={() =>
                            handleAnswerChange(`quiz_${i}`, "False")
                          }
                        />
                        False
                      </label>
                    </div>
                  )}

                  {score !== null &&
                    (checkedAnswers[`quiz_${i}`] ? (
                      <span className="tick"> ✅</span>
                    ) : (
                      <span className="cross"> ❌</span>
                    ))}
                </div>
              ))}
          </div>

          <button onClick={checkAnswers} className="checkBtn">
            Check Answers
          </button>

          {score !== null && (
            <p className="score">
              You got {score} out of {1 + (challenge.quiz?.length || 0)}{" "}
              correct!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

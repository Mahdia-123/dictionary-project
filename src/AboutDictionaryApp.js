import React from "react";
import "./AboutDictionaryApp.css";

const AboutDictionaryApp = () => {
  return (
    <section className="about-container">
      <div className="about-image">
        {/* Replace with your actual image */}
        <img src="images/dictionary-app.png" alt="Dictionary App preview" />
      </div>

      <div className="about-content">
        <span className="about-tag">About</span>
        <h1>Dictionary App — your friendly word companion</h1>
        <p className="about-intro">
          We believe learning new words should be simple, fun, and inspiring.
          Dictionary App gives you everything you need to truly understand and
          enjoy language — not just the definitions.
        </p>

        <ul className="feature-list">
          <li>
            <span className="icon">📖</span>
            <div>
              <strong>Clear definitions</strong>
              <p>Accurate, concise explanations for thousands of words.</p>
            </div>
          </li>
          <li>
            <span className="icon">🔊</span>
            <div>
              <strong>Pronunciation & phonetics</strong>
              <p>Hear how words are spoken and read phonetic transcriptions.</p>
            </div>
          </li>
          <li>
            <span className="icon">🗣️</span>
            <div>
              <strong>Synonyms, examples & parts of speech</strong>
              <p>
                Contextual examples, grammar info, and alternative words to
                expand your vocabulary.
              </p>
            </div>
          </li>
          <li>
            <span className="icon">🖼️</span>
            <div>
              <strong>Pictures for every word</strong>
              <p>Helpful visuals that make meanings easier to remember.</p>
            </div>
          </li>
          <li>
            <span className="icon">🌐</span>
            <div>
              <strong>Translate between multiple languages</strong>
              <p>
                Instantly translate words between <strong>English</strong>,
                <strong> Persian</strong>, and <strong>Pashto</strong> — plus
                get translations into <strong>Turkish</strong> and other
                languages. Perfect for bilingual learners and travelers.
              </p>
            </div>
          </li>
          <li>
            <span className="icon">🤖</span>
            <div>
              <strong>AI-powered Daily Challenge</strong>
              <p>
                Get a daily word and a 4-question quiz to test meaning, usage,
                pronunciation, and synonyms — perfect for building streaks and
                confidence.
              </p>
            </div>
          </li>
        </ul>

        <p className="about-footer">
          Whether you’re a student, writer, or just curious about words,
          Dictionary App helps words come alive — one day, one word, one
          challenge at a time.
        </p>

        <div className="about-buttons">
          <button className="btn-primary">Get the App</button>
          <button className="btn-outline">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default AboutDictionaryApp;

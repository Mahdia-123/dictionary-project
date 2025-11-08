import React from "react";
import "./AboutDictionaryApp.css";

const AboutDictionaryApp = () => {
  const items = [
    {
      title: "Phonetics",
      text: "The phonetic feature provides the correct pronunciation of each word. English words use IPA notations, while Persian words use Latin letters. You can also listen to the word being pronounced.",
      img: "/images/phonetic.webp",
    },
    {
      title: "Definition",
      text: "Definitions provide clear meanings of words. English definitions are grouped by part of speech, while Persian entries include AI-generated explanations for better understanding.",
      img: "/images/definition.webp",
    },
    {
      title: "Example",
      text: "Example sentences illustrate how each word is used naturally in context. Persian words also have AI-generated examples when needed.",
      img: "/images/example.webp",
    },
    {
      title: "Synonyms",
      text: "Synonyms help expand your vocabulary by showing alternative words with similar meanings, allowing you to use the right word in different contexts.",
      img: "/images/synonyms.png",
    },
    {
      title: "Usage & Context",
      text: "This section explains common usage, grammar tips, and contextual applications of each word to improve comprehension and fluency.",
      img: "/images/context.jpg",
    },
    {
      title: "Photos & Visual Learning",
      text: "Relevant images help visual learners associate meaning quickly. Photos are available for both English and Persian words.",
      img: "/images/visual-learning.jpg",
    },
    {
      title: "Search History",
      text: "Keeps track of your recent words, allowing you to revisit past searches quickly. Up to five entries are saved for easy review.",
      img: "/images/history.jpg",
    },
    {
      title: "Multi-Language Support",
      text: "Supports English and Persian. English words come from dictionary APIs, while Persian entries are AI-enhanced for clarity and examples.",
      img: "/images/multi-language.png",
    },
  ];

  return (
    <div className="about-page">
      <h1 className="aboutHead">
        <strong>About</strong> This <strong>Dictionary</strong> App
      </h1>

      <div className="about-intro">
        <p>
          Welcome to the <strong>English–Persian Dictionary App</strong> — a
          smart, interactive tool designed to help learners, translators, and
          language enthusiasts explore words with depth and clarity. This app
          combines reliable dictionary APIs for English with AI-powered Persian
          translations, ensuring both accuracy and natural context.
        </p>
        <p>
          Whether you're learning new words, improving pronunciation, or
          exploring meanings across languages, our app makes language learning
          simple, visual, and engaging. From definitions and phonetics to
          examples and images — everything you need is right here in one place.
        </p>
      </div>

      {items.map((item, index) => (
        <div
          className={`about-item ${
            index % 2 === 0 ? "text-left" : "text-right"
          }`}
          key={index}
        >
          <div className="about-text">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
          <div className="about-image">
            <img src={item.img} alt={`${item.title} illustration`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutDictionaryApp;

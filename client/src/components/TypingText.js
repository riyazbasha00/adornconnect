import React, { useState, useEffect, useRef } from 'react';

export default function TypingText({ words, speed = 100, pause = 2000, className = '' }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && charIndex === currentWord.length) {
      timeout.current = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timeout.current);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const delta = isDeleting ? speed / 2 : speed;
    timeout.current = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, delta);

    return () => clearTimeout(timeout.current);
  }, [charIndex, isDeleting, wordIndex, words, speed, pause]);

  return (
    <span className={`typing-text ${className}`}>
      {words[wordIndex].substring(0, charIndex)}
      <span className="typing-cursor">|</span>
    </span>
  );
}

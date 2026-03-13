"use client";

import { useEffect, useState, useRef } from "react";

interface Props {
  words: string[];
  className?: string;
  interval?: number;
}

export default function TextReveal({ words, className = "", interval = 3000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const word = words[current];

    if (!isDeleting && displayed === word) {
      // Pause before deleting
      timeout.current = setTimeout(() => setIsDeleting(true), interval);
    } else if (isDeleting && displayed === "") {
      // Move to next word
      setIsDeleting(false);
      setCurrent((c) => (c + 1) % words.length);
    } else {
      // Type or delete
      const speed = isDeleting ? 40 : 80;
      timeout.current = setTimeout(() => {
        setDisplayed(
          isDeleting ? word.slice(0, displayed.length - 1) : word.slice(0, displayed.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout.current);
  }, [displayed, isDeleting, current, words, interval]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-[2px] h-[0.9em] bg-gold ml-0.5 align-middle animate-blink" />
    </span>
  );
}

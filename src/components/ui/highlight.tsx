import React from 'react';

interface HighlightProps {
  text: string;
  query: string;
}

/**
 * A component that highlights occurrences of a search query within a text string.
 * Uses semantic <mark> tags for accessibility and visual feedback.
 */
export const Highlight = ({ text, query }: HighlightProps) => {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));

  return (
    <>
      {parts.map((part, i) => (
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-primary/20 text-foreground rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      ))}
    </>
  );
};

import React from 'react';

export const HighlightedText = ({ fullString, piece }) => {
  const parts = fullString.split(new RegExp(`(${piece})`, 'gi'));

  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          style={part.toLowerCase() === piece.toLowerCase() ? { backgroundColor: '#6cbaff' } : {}}
        >
          {part}
        </span>
      ))}
    </>
  );
};

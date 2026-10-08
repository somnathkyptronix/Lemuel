import React from 'react';

export default function Marquee({ text }) {
  const repeated = Array(6).fill(text).join('  ');
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  );
}

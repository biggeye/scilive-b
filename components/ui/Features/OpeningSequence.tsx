import React, { useState, useEffect } from 'react';
 // Ensure this CSS file exists and is correctly imported

const OpeningSequence = () => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(0); // 0: Blinking Cursor, 1: Activate, 2: Transform, 3: Shatter

  useEffect(() => {
    if (phase === 1) {
      setTimeout(() => setText('Activate'), 500); // Start with "Activate"
    } else if (phase === 2) {
      // Transform to "Transform" through an intermediate scramble (for effect)
      const transformations = ['tcaormfte', 'Transform'];
      let i = 0;
      const interval = setInterval(() => {
        setText(transformations[i]);
        i++;
        if (i >= transformations.length) clearInterval(interval);
      }, 1000); // Adjust time as needed
    }
    // Add more phases as needed
  }, [phase]);

  const handleUserClick = () => {
    if (phase < 3) {
      setPhase(phase + 1);
    }
  };

  return (
    <div className="animation-container" onClick={handleUserClick}>
        <span className="blinking-cursor">:|</span>
    </div>
  );
};

export default OpeningSequence;

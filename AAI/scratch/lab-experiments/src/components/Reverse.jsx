import React, { useState } from "react";

function Reverse() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setSentence(e.target.value);
  };

  const reverseWords = () => {
    const words = sentence.split(" ");
    const reversed = words.map((word) => word.split("").reverse().join(""));
    setResult(reversed.join(" "));
  };

  return (
    <div className="card">
      <h2>Reverse Each Word</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Input: 'Hello World' → Output: 'olleH dlroW'
      </p>
      <input
        type="text"
        placeholder="Enter a sentence"
        value={sentence}
        onChange={handleChange}
        onKeyUp={(e) => e.key === 'Enter' && reverseWords()}
      />
      <button onClick={reverseWords}>Reverse Words</button>
      {result && (
        <div className="result-text" style={{ borderLeft: '4px solid var(--accent)' }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default Reverse;

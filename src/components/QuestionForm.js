import React, { useState } from 'react';

function QuestionForm({ setQuestions }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = { prompt, answers, correctIndex };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(data => {
        setQuestions(prevQuestions => [...prevQuestions, data]);
      })
      .catch(error => console.error("Error adding question:", error));
  }

  // Handle form inputs and rendering
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Question prompt"
      />
      {/* Render answer inputs here */}
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;

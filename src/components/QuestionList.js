import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  return (
    <div>
      <h1>Quiz Admin Panel</h1>
      <QuestionList questions={questions} setQuestions={setQuestions} />
    </div>
  );
}

export default App;

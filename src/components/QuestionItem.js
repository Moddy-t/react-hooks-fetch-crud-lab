function QuestionItem({ question, onUpdate }) {
  function handleCorrectAnswerChange(e) {
    const updatedQuestion = { ...question, correctIndex: parseInt(e.target.value) };

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then(response => response.json())
      .then(data => onUpdate(data))
      .catch(error => console.error("Error updating question:", error));
  }

  return (
    <div>
      <h3>{question.prompt}</h3>
      <select value={question.correctIndex} onChange={handleCorrectAnswerChange}>
        {question.answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>
    </div>
  );
}

function QuestionList({ questions, setQuestions }) {
  function handleUpdate(updatedQuestion) {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <div>
      {questions.map(question => (
        <QuestionItem key={question.id} question={question} onUpdate={handleUpdate} />
      ))}
    </div>
  );
}

export default QuestionList;

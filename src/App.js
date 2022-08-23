import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const { questions, waiting, loading, index, correct } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers, correct_answer];
  
  return (
    <main className="">
      {/* <Modal/> */}
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/ {index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, idx) => {
              return (
                <button
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                  key={idx}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question">next question</button>
      </section>
    </main>
  );
}

export default App

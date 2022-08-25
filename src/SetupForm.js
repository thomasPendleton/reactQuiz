import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const { quiz, handleSubmit, handleChange, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form action="" className="setpu-form">
          <h2>Setup quiz</h2>
          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">Number of questions</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          {/* category */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              className="form-input"
              name="category"
              id="category"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="computers">computers</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">category</label>
            <select
              className="form-input"
              name="difficulty"
              id="difficulty"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            submit
          </button>
        </form>
      </section>
    </main>
  );
}

export default SetupForm

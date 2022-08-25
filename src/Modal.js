import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { correct, isModalOpen, closeModal, questions } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>
          You answered {correct} of {questions.length} question correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          Play again
        </button>
      </div>
    </div>
  );
}

export default Modal

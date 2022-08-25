import axios from 'axios'
import React, { useState, useContext } from "react";

const table = {
  sports: 21,
  history: 23,
  computers: 18,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";
// const tempUrl = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  // Axios -------------
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios.get(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      }
    } else {
      setWaiting(true);
      setError(true);
    }
  };

  // Fetch api ----------------------
  // const fetchQuestions = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setQuestions(data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const incrementIndex = () => {
    setIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex > questions.length - 1) {
        openModal();

        return 0;
      } else {
        return newIndex;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((prev) => prev + 1);
    }
    incrementIndex();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setQuiz({ ...quiz, [name]: value });
  };

  return (
    <AppContext.Provider
      value={{
        questions,
        index,
        loading,
        waiting,
        correct,
        error,
        isModalOpen,
        incrementIndex,
        checkAnswer,
        closeModal,
        handleSubmit,
        handleChange,
        quiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

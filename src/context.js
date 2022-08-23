import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = "";
const tempUrl = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  useEffect(() => {
    if (!waiting) {
    }
    fetchQuestions(tempUrl);

    return () => {
      console.log("return");
    };
  }, []);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

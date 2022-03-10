import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const fetchAnswers = async () => {
      const db = getDatabase();
      const answerRef = ref(db, `answers/${id}/questions`);
      const answerQuery = query(answerRef, orderByKey());
      try {
        setLoading(true);
        const snapshot = await get(answerQuery);
        if (snapshot.exists()) {
          setLoading(false);
          setError(false);
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchAnswers();
  }, [id]);
  return {
    loading,
    error,
    answers,
  };
};

export default useAnswers;

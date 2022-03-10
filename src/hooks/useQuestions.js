import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useQuestions = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQestions] = useState([]);
  useEffect(() => {
    const fetchQusetions = async () => {
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + id + "/questions");
      const quizQuery = query(quizRef, orderByKey());

      try {
        setLoading(true);
        const snapshot = await get(quizQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQestions((prevQuestons) => {
            return [...prevQuestons, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchQusetions();
  }, [id]);
  return {
    loading,
    error,
    questions,
  };
};

export default useQuestions;

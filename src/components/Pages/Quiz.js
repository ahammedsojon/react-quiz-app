import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useQuestions from "../../hooks/useQuestions";
import Answer from "../Answer";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((val) => {
        val.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

const Quiz = () => {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  // console.log(questions[0].title);
  const [qna, dispatch] = useReducer(reducer, []);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { currentUser } = useAuth();
  const history = useHistory();
  const { location } = history;
  const { state } = location;
  const { videoTitle } = state;

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  // when user clicked on next question
  const nextQuestion = () => {
    if (currentQuestion <= qna.length) {
      setCurrentQuestion((prevCurrent) => {
        return prevCurrent + 1;
      });
    }
  };

  // when user clicked on prev question
  const prevQuestion = () => {
    if (currentQuestion >= 1 && currentQuestion <= qna.length) {
      setCurrentQuestion((prevCurrent) => {
        return prevCurrent - 1;
      });
    }
  };

  // progeree bar
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / qna.length) * 100 : 0;

  // submit answer
  const submitQuiz = async () => {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });
    history.push({
      pathname: `/result/${id}`,
      state: { qna },
    });
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answer
            input={true}
            handleAnswerChange={handleAnswerChange}
            options={qna[currentQuestion].options}
          />
          <MiniPlayer id={id} title={videoTitle} />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage}
            submit={submitQuiz}
          />
        </>
      )}
    </>
  );
};

export default Quiz;

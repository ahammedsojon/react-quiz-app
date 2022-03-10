import _ from "lodash";
import React from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

const Result = () => {
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;
  const { loading, error, answers } = useAnswers(id);

  const calculate = () => {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexs = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexs.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexs)) {
        score = score + 5;
      }
    });
    return score;
  };
  const useScore = calculate();
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}
      {answers && answers.length && (
        <>
          <Summary score={useScore} noq={qna.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
};

export default Result;

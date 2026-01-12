import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const options = [option1, option2, option3, option4];

  const question = data[index];

  const checkAns = (e, ans) => {
    if (lock) return;

    setLock(true);

    if (question.ans === ans) {
      e.target.classList.add("correct");
      setScore((prev) => prev + 1);
    } else {
      e.target.classList.add("wrong");
      options[question.ans - 1].current.classList.add("correct");
    }
  };

  const next = () => {
    if (!lock) return;
    options.forEach((opt) => {
      opt.current.classList.remove("correct");
      opt.current.classList.remove("wrong");
    });

    if (index === data.length - 1) {
      setResult(true);
    } else {
      setIndex((prev) => prev + 1);
      setLock(false);
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {result ? (
        <>
          <h2>Quiz Completed </h2>
          <h3>
            Score: {score} / {data.length}
          </h3>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>

          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>

          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;

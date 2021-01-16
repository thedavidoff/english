import React from "react";

type ResultType = {
  status: boolean | null;
  rightAnswer: string;
};

const Result = ({ status, rightAnswer }: ResultType) => {
  return status === false ? <div>Правильный ответ: <span style={{color: "green"}}><b>{rightAnswer}</b></span></div> : null;
};

export default Result;

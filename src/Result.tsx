import React from "react";

type ResultType = {
  status: boolean | null;
  rightAnswer: string;
};

const Result = ({ status, rightAnswer }: ResultType) => {
  return status === false ? (
    <div style={{ textAlign: "center" }}>
      Правильный ответ:
      <br />
      <p style={{ margin: 0, color: "green" }}>
        <b>{rightAnswer}</b>
      </p>
    </div>
  ) : null;
};

export default Result;

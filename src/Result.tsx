import React from "react";

type ResultType = {
  status: boolean | null;
  rightAnswer: string;
};

const Result = ({ status, rightAnswer }: ResultType) => {
  return (
    <>
      <div>{status && "Right"}</div>
      {status === false ? (
        <>
          <div>Правильный ответ:</div>
          <div>{rightAnswer}</div>
        </>
      ) : null}
    </>
  );
};

export default Result;

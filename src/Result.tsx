import React from "react";

type ResultType = {
  status: boolean | null;
};

const Result = ({ status }: ResultType) => {
  return <div>{status && "Right"}{status === false && "Wrong"}</div>;
};

export default Result;

import React from "react";
import { IResult } from "./interfaces";

const Result = ({ status, answer }: IResult) => {
  return status === false ? (
    <div style={{ textAlign: "center" }}>
      Правильный ответ:
      <br />
      <p style={{ margin: 0, color: "green" }}>
        <b>{answer}</b>
      </p>
    </div>
  ) : null;
};

export default Result;

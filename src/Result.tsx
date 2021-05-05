import React from "react";
import { IResultProps } from "./interfaces";

const Result: React.FC<IResultProps> = ({ status, answer }) => {
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

import React from "react";

export interface IStats {
  correct: number;
  wrong: number;
  score: number;
}
export interface ISentences {
  sentence: Array<string>;
}
export interface IPossibleAnswers {
  possibleAnswers: Array<string>;
}
export interface IPossibleAnswersBlock {
  possibleAnswers: Array<string>;
  result: Array<string>;
  handleClick: (event: React.MouseEvent<HTMLTableCellElement>) => void;
}
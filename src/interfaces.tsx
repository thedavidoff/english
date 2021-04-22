import React from "react";

export interface IStats {
  correct: number;
  wrong: number;
  score: number;
}
export interface ISentences {
  sentence: Array<string>;
}
export interface IHeader {
  status: null | boolean;
  stats: IStats;
}
export interface IPossibleAnswers {
  possibleAnswers: Array<string>;
}
export interface IPossibleAnswersBlock {
  possibleAnswers: Array<string>;
  ids: Array<string>;
  handleClick: (event: React.MouseEvent<HTMLTableCellElement>) => void;
}
export interface IResult {
  status: boolean | null;
  answer: string;
}
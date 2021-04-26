import React from "react";

export interface IStats {
  correct: number;
  wrong: number;
  score: number;
}
export interface ISentences {
  sentence: string[];
}
export interface ITranscriptions {[key: string]: string[]}
export interface IHeader {
  status: null | boolean;
  stats: IStats;
}
export interface IAudioPlayerProps {
  task: string,
  transcriptions: ITranscriptions,
  translations: string
}
export interface IAudio {
  firstWord: string,
  secondWord: string,
  playUS: () => {},
  playUK: () => {},
}
export interface IInfoModalProps {
  word: string,
  transcriptions: ITranscriptions,
  translations: string,
  handleMouseEnter: (e: React.MouseEvent<HTMLImageElement>) => void,
  handleMouseLeave: (e: React.MouseEvent<HTMLImageElement>) => void
}
export interface IPossibleAnswers {
  possibleAnswers: string[];
}
export interface IPossibleAnswersBlock {
  possibleAnswers: string[];
  ids: string[];
  handleClick: (event: React.MouseEvent<HTMLTableCellElement>) => void;
}
export interface IResult {
  status: boolean | null;
  answer: string;
}
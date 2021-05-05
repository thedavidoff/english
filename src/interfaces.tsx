import React from "react";

export interface ISentence {
  task: string;
  answer: string | string[];
  translation: string;
}
export interface ITranscriptions {
  [key: string]: string[];
}
export interface ISentences {
  sentence: ISentence,
  transcriptions: ITranscriptions,
  possibleAnswers: string[]
}
export interface IStats {
  correct: number;
  wrong: number;
  score: number;
}
export interface IHeader {
  status: null | boolean;
  stats: IStats;
}
export interface IAudioPlayerProps {
  task: string;
  transcriptions: ITranscriptions;
  translations: string;
}
export interface IInfoModalProps {
  word: string;
  transcriptions: ITranscriptions;
  translations: string;
}
export interface IPossibleAnswers {
  possibleAnswers: string[];
}
export interface IPossibleAnswersBlockProps {
  possibleAnswers: string[];
  ids: string[];
  handleClick: (event: React.MouseEvent<HTMLTableCellElement>) => void;
}
export interface IResultProps {
  status: boolean | null;
  answer: string;
}
export interface ISVGProps {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

import React from "react";

export const shuffle = (array: string[]): string[] => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const addItalicToLi = (t: string, index: number): JSX.Element => {
    let arr: string[] = [];
    let posOfLeftParenthesis: number;
    let posOfRightParenthesis: number;
    let lastPosOfLeftParenthesis: number;
    if (t.includes("(")) {
      posOfLeftParenthesis = t.indexOf("(");
      posOfRightParenthesis = t.indexOf(")");
      lastPosOfLeftParenthesis = t.lastIndexOf("(");
      arr.push(t.slice(posOfLeftParenthesis === -1 ? 0 : posOfLeftParenthesis, posOfRightParenthesis === -1 ? t.length : posOfRightParenthesis + 1));
      if ((t.match(new RegExp("\\(", "g")) || []).length === 2) {
        arr.push(t.slice(lastPosOfLeftParenthesis));
        return <li key={index}>- <><i>{arr[0]}</i>{t.slice(posOfRightParenthesis + 1, lastPosOfLeftParenthesis)} <i>{arr[1]}</i></></li>;
      }
      return <li key={index}>- {posOfLeftParenthesis === 0 ? (<><i>{arr[0]}</i>{t.slice(posOfRightParenthesis + 1, t.length)}</>) :
        (<>{t.slice(0, posOfLeftParenthesis)}<i>{arr[0]}</i></>)}</li>;
    }
    return <li key={index}>- {t}</li>;
};

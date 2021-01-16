import React from "react";

const Lesson1 = () => {
  const subject: string = "Подлежащее + сказуемое (глагол) (1)";
  const formulas: Array<string> = [
    "I + глагол (1.1)",
    "I / We / You / They + глагол (1.2)",
    "I + глагол + ... (1.3)",
    "I / We / You / They + глагол + ... (1.4)",
  ];
  const sentencesObj = {
    0: [
      {
        subject: "Подлежащее + сказуемое (глагол) (1)",
        formulas: [
          "I + глагол (1.1)",
          "I / We / You / They + глагол (1.2)",
          "I + глагол + ... (1.3)",
          "I / We / You / They + глагол + ... (1.4)",
        ],
      },
      {
        sentence: "Я вижу",
        translate: "I see",
        possibleAnswers: [
          "I",
          "see",
          "understand",
          "agree",
          "study",
          "work",
          "remember",
          "read",
          "write",
        ],
      },
    ],
  };
  const sentences = {
    0: [
      ["Я вижу", "I see"],
      ["Я понимаю", "I understand"],
      ["Я знаю", "I know"],
      ["Я согласен", "I agree"],
      ["Я учусь", "I study"],
      ["Я работаю", "I work"],
      ["Я помню", "I remember"],
      ["Я читаю", "I read"],
      ["Я пишу", "I write"],
    ],
    1: [
      ["Мы работаем", "We work"],
      ["Они учатся", "They study"],
      ["Ты понимаешь", "You understand"],
      ["Мы согласны", "We agree"],
      ["Они согласны", "They agree"],
      ["Ты знаешь", "You know"],
      ["Мы помним", "We remember"],
      ["Мы читаем", "We read"],
      ["Они понимают", "They understand"],
      ["Они пишут", "They write"],
      ["Вы понимаете", "You understand"],
    ],
    2: [
      ["Я вижу это", "I see it"],
      ["Я понимаю это", "I understand it"],
      ["Я знаю это", "I know it"],
      ["Я живу здесь", "I live here"],
      ["Я учусь там", "I study there"],
      ["Я здесь учусь", "I study here"],
      ["Я вижу тебя", "I see you"],
    ],
    3: [
      ["Я понимаю тебя очень хорошо", "I understand you very well"],
      ["Я согласен с тобой", "I agree with you"],
      ["Я знаю это очень хорошо", "I know it very well"],
      ["Я вижу тебя", "I see you"],
      ["Я вижу это сейчас", "I see it now"],
      ["Я согласен с этим", "I agree with it"],
      ["Я живу в этом городе", "I live in this city"],
      ["Я живу в этой стране", "I live in this country"],
      ["Я живу в России", "I live in Russia"],
      ["Они живут в Америке", "They live in America"],
      ["Они знают это", "They know it"],
      ["Я читаю различные книги", "I read different books"],
      ["Я смотрю различные фильмы", "I watch different movies"],
      ["Я говорю по-английски", "I speak English"],
      ["Я говорю по-русски", "I speak Russian"],
      ["Я говорю по-английски и по-русски", "I speak English and Russian"],
      ["Мы смотрим различные фильмы", "We watch different movies"],
      ["Они живут в этой стране", "They live in this country"],
      ["Мы живем в этом городе", "We live in this city"],
      ["Они говорят по-английски", "They speak English"],
    ],
  };

  return <div>{sentencesObj[0][1].translate}</div>;
};

export default Lesson1;

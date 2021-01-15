import React, { useEffect, useMemo, useState } from "react";
import {
  makeStyles,
  Container,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Result from "./Result";

const shuffle = (array: Array<string>) => {
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

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    borderCollapse: "inherit",
  },
  cell: {
    width: "calc(100%/3)",
    border: "1px solid #808080",
    userSelect: "none",
    "&:hover": {
      color: "#fff",
      background: "grey",
      cursor: "pointer",
    },
  },
  disabledCell: {
    color: "#fff",
    background: "#c5c5c5",
    border: "1px solid #c5c5c5",
    "&:hover": {
      background: "#c5c5c5",
      cursor: "inherit"
    },
  },
});

const App: React.FC = () => {
  const [result, setResult] = useState<Array<string>>([]);
  const [status, setStatus] = useState<boolean | null>(null);
  const classes = useStyles();

  const sentences: Array<Array<string>> = [
    ["Я вижу", "I see"],
    ["Я понимаю", "I understand"],
    ["Я знаю", "I know"],
    ["Я согласен", "I agree"],
    ["Я учусь", "I study"],
    ["Я работаю", "I work"],
    ["Я помню", "I remember"],
    ["Я читаю", "I read"],
    ["Я пишу", "I write"],
  ];
  let possibleAnswers = useMemo(
    () => [
      [
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
      [
        "I",
        "see",
        "understand",
        "know",
        "agree",
        "study",
        "work",
        "read",
        "write",
      ],
      [
        "I",
        "see",
        "know",
        "agree",
        "study",
        "work",
        "remember",
        "read",
        "write",
      ],
      [
        "I",
        "see",
        "understand",
        "know",
        "agree",
        "study",
        "remember",
        "read",
        "write",
      ],
      [
        "I",
        "see",
        "understand",
        "know",
        "study",
        "work",
        "remember",
        "read",
        "write",
      ],
      [
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
      [
        "I",
        "see",
        "understand",
        "know",
        "agree",
        "study",
        "remember",
        "read",
        "write",
      ],
      [
        "I",
        "see",
        "know",
        "agree",
        "study",
        "work",
        "remember",
        "read",
        "write",
      ],
      [
        "I",
        "see",
        "understand",
        "know",
        "agree",
        "study",
        "work",
        "read",
        "write",
      ],
    ],
    []
  );
  const [randomNumber, setRandomNumber] = useState<number>(
    Math.floor(Math.random() * sentences.length)
  );

  useEffect(() => {
    if (status !== null)
      possibleAnswers[randomNumber] = shuffle(possibleAnswers[randomNumber]);
  }, [status, possibleAnswers, randomNumber]);

  const next = (): void => {
    setResult([]);
    setStatus(null);
    setRandomNumber(Math.floor(Math.random() * sentences.length));
  };

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>): void => {
    let innerText: string = e.currentTarget.innerText;
    let classList: DOMTokenList = e.currentTarget.classList;
    let classListValue = classList.value;
    let rightAnswer = sentences[randomNumber][1];
    if (status !== null || classListValue.indexOf("disabledCell") !== -1) return;
    setResult([...result, innerText]);
    if (rightAnswer === [...result, innerText].join(" ")) {
      setStatus(true);
      setTimeout(() => next(), 1000);
      return;
    }
    if (rightAnswer.split(" ").length === [...result, innerText].length) {
      setStatus(false);
    }
  };
  const handleDelete = (): void => {
    setResult([...result.slice(0, -1)]);
    setStatus(null);
  };

  return (
    <Container className={classes.container}>
      <div style={{ marginBottom: 50 }}>{sentences[randomNumber][0]}</div>
      <div style={{ marginBottom: 50 }}>{result.join(" ")}</div>
      <TableContainer
        component={Paper}
        elevation={15}
        style={{ maxWidth: 500 }}
      >
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              {possibleAnswers[randomNumber].slice(0, 3).map((option) => (
                <TableCell
                  key={option}
                  align="center"
                  className={`${classes.cell} ${result.includes(option) ? classes.disabledCell : ''}`}
                  onClick={handleClick}
                >
                  {option}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {possibleAnswers[randomNumber].slice(3, 6).map((option) => (
                <TableCell
                  key={option}
                  align="center"
                  className={`${classes.cell} ${result.includes(option) ? classes.disabledCell : ''}`}
                  onClick={handleClick}
                >
                  {option}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {possibleAnswers[randomNumber].slice(6, 9).map((option) => (
                <TableCell
                  key={option}
                  align="center"
                  className={`${classes.cell} ${result.includes(option) ? classes.disabledCell : ''}`}
                  onClick={handleClick}
                >
                  {option}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {result.length ? (
        <div onClick={handleDelete}>
          Удалить
          <Result status={status} rightAnswer={sentences[randomNumber][1]} />
        </div>
      ) : null}
    </Container>
  );
};

export default App;

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
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Result from "./Result";
import Lesson1 from "./lessons/Lesson1";

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
    padding: 16
  },
  header: {
    display: "flex",
    width: "100%",
    maxWidth: 480,
    justifyContent: "space-between",
    marginBottom: 50,
  },
  rightAnswerStats: {
    width: 100,
    textAlign: "center",
    color: "#fff",
    background: "rgba(0, 128, 0, .7)",
  },
  scoreStats: {
    width: 100,
    textAlign: "center",
    color: "#fff",
    background: "rgba(128, 128, 128, .7)",
  },
  wrongAnswerStats: {
    width: 100,
    textAlign: "center",
    color: "#fff",
    background: "rgba(255, 0, 0, .7)",
  },
  tableContainer: {
    position: "relative",
    maxWidth: 480,
  },
  table: {
    borderCollapse: "inherit",
  },
  cell: {
    width: "calc(100%/3)",
    padding: 8,
    wordBreak: "break-all",
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
      cursor: "inherit",
    },
  },
  borderTopLeftRadiusCell: {
    borderTopLeftRadius: 4,
  },
  borderTopRightRadiusCell: {
    borderTopRightRadius: 4,
  },
  borderBottomLeftRadiusCell: {
    borderBottomLeftRadius: 4
  },
  borderBottomRightRadiusCell: {
    borderBottomRightRadius: 4
  },
  status: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    background: "rgba(204, 204, 204, .8)",
    cursor: "pointer",
  },
  bigStatusIcon: {
    fontSize: 100,
  },
  smallStatusIcon: {
    fontSize: 30,
  },
  correctStatusIcon: {
    color: "green",
  },
  incorrectStatusIcon: {
    color: "red",
  },
  deleteButton: {
    cursor: "pointer",
  },
});

export interface IStats {
  right: number;
  wrong: number;
  score: number;
}

const LESSON_1: React.FC = () => {
  const [result, setResult] = useState<Array<string>>([]);
  const [status, setStatus] = useState<boolean | null>(null);
  const [stats, setStats] = useState<IStats>({ right: 0, wrong: 0, score: 0 });
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
    if (status !== null || classListValue.indexOf("disabledCell") !== -1)
      return;
    setResult([...result, innerText]);
    if (rightAnswer === [...result, innerText].join(" ")) {
      setStatus(true);
      setStats({
        ...stats,
        right: stats.right + 1,
        score: stats.right + 1 - stats.wrong,
      });
      setTimeout(() => next(), 1000);
      return;
    }
    if (rightAnswer.split(" ").length === [...result, innerText].length) {
      setStatus(false);
      setStats({
        ...stats,
        wrong: stats.wrong + 1,
        score: stats.right - 1 - stats.wrong,
      });
    }
  };
  const handleDelete = (): void => {
    setResult([...result.slice(0, -1)]);
    setStatus(null);
  };
  const handleClear = (): void => {
    setResult([]);
    setStatus(null);
  };

  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <Paper elevation={15} className={classes.rightAnswerStats}>
          Right
          <br />
          {stats.right}
        </Paper>
        <Paper elevation={15} className={classes.scoreStats}>
          Score
          <br />
          {stats.score}
        </Paper>
        <Paper elevation={15} className={classes.wrongAnswerStats}>
          Wrong
          <br />
          {stats.wrong}
        </Paper>
      </div>
      <div style={{ marginBottom: 50 }}>{sentences[randomNumber][0]}</div>
      <div style={{ height: 33, marginBottom: 50, fontSize: 25 }}>
        {result.join(" ")}
      </div>
      <div style={{ minHeight: 50 }}>
        {result.length ? (
          <>
            <div className={classes.deleteButton} onClick={handleDelete}>
              {status === null ? (
                <HighlightOffIcon
                  className={`${classes.smallStatusIcon} ${classes.incorrectStatusIcon}`}
                />
              ) : null}
            </div>
            <Result status={status} rightAnswer={sentences[randomNumber][1]} />
          </>
        ) : null}
      </div>
      <TableContainer
        component={Paper}
        elevation={15}
        className={classes.tableContainer}
      >
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              {possibleAnswers[randomNumber]
                .slice(0, 3)
                .map((option, index) => (
                  <TableCell
                    key={option}
                    align="center"
                    className={`${classes.cell} ${
                      result.includes(option) ? classes.disabledCell : ""
                    } ${index === 0 ? classes.borderTopLeftRadiusCell : ""}
                    ${index === 2 ? classes.borderTopRightRadiusCell : ""}`}
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
                  className={`${classes.cell} ${
                    result.includes(option) ? classes.disabledCell : ""
                  }`}
                  onClick={handleClick}
                >
                  {option}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {possibleAnswers[randomNumber].slice(6, 9).map((option, index) => (
                <TableCell
                  key={option}
                  align="center"
                  className={`${classes.cell} ${
                    result.includes(option) ? classes.disabledCell : ""
                  } ${index === 0 ? classes.borderBottomLeftRadiusCell : ""} ${index === 2 ? classes.borderBottomRightRadiusCell : ""}`}
                  onClick={handleClick}
                >
                  {option}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
        {status !== null ? (
          <div
            className={classes.status}
            onClick={!status ? handleClear : () => {}}
          >
            {status ? (
              <CheckCircleOutlineOutlinedIcon
                className={`${classes.bigStatusIcon} ${classes.correctStatusIcon}`}
              />
            ) : (
              <HighlightOffIcon
                className={`${classes.bigStatusIcon} ${classes.incorrectStatusIcon}`}
              />
            )}
          </div>
        ) : null}
      </TableContainer>
      <Lesson1 />
    </Container>
  );
};

export default LESSON_1;

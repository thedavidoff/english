import React, { useEffect } from "react";
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
import {log} from "util";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  header: {
    display: "flex",
    width: "100%",
    maxWidth: 480,
    justifyContent: "space-between",
    marginBottom: 50,
  },
  statsOfCorrectAnswers: {
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
  statsOfWrongAnswers: {
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
  selectedCell: {
    color: "#fff",
    background: "#c5c5c5",
    border: "1px solid #c5c5c5",
    "&:hover": {
      background: "#c5c5c5",
      cursor: "inherit",
    },
  },
  topLeftCellRadius: {
    borderTopLeftRadius: 4,
  },
  topRightCellRadius: {
    borderTopRightRadius: 4,
  },
  bottomLeftCellRadius: {
    borderBottomLeftRadius: 4,
  },
  bottomRightCellRadius: {
    borderBottomRightRadius: 4,
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
  iconOfCorrectStatus: {
    color: "green",
  },
  iconOfWrongStatus: {
    color: "red",
  },
  deleteButton: {
    cursor: "pointer",
  },
});

interface IStats {
  correct: number;
  wrong: number;
  score: number;
}
interface ISentences {
  sentence: Array<string>;
}

const LESSON_1: React.FC = () => {
  const [sentences, setSentences] = React.useState<Array<string>>([]);
  const [possibleAnswers, setPossibleAnswers] = React.useState<Array<string>>(
    []
  );

  const [result, setResult] = React.useState<Array<string>>([]);
  const [status, setStatus] = React.useState<boolean | null>(null);
  const [stats, setStats] = React.useState<IStats>({
    correct: 0,
    wrong: 0,
    score: 0,
  });
  const classes = useStyles();
  let task: string = "";
  let answer: string = "";

  React.useEffect(() => {
    (async () => {
      await fetch("http://localhost:3001/lessons")
        .then(res => res.json())
        .then(data => {
          setSentences(
            data.map((i: { sentences: ISentences }) => {
              return Object.values(i.sentences)
            }
            )
          );
          setPossibleAnswers(
            data.map((i: { sentences: ISentences }) =>
              Object.values(i.sentences).map((y) => y.possibleAnswers)
            )
          );
        });
    })();
  }, []);
  const random = Math.floor(Math.random() * sentences.length);
  const [randomNumber, setRandomNumber] = React.useState<number>(random);
  console.log(sentences);
  console.log(possibleAnswers);

  if (sentences.length) {
    task = sentences[randomNumber][0];
    answer = sentences[randomNumber][1];
  }

  // React.useEffect(() => {
  //   if (status !== null)
  //     possibleAnswers[randomNumber] = shuffle(possibleAnswers[randomNumber]);
  // }, [status, possibleAnswers, randomNumber]);

  const next = (): void => {
    setResult([]);
    setStatus(null);
    setRandomNumber(random);
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
        correct: stats.correct + 1,
        score: stats.correct + 1 - stats.wrong,
      });
      setTimeout(() => next(), 1000);
      return;
    }
    if (rightAnswer.split(" ").length === [...result, innerText].length) {
      setStatus(false);
      setStats({
        ...stats,
        wrong: stats.wrong + 1,
        score: stats.correct - 1 - stats.wrong,
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
        <Paper elevation={15} className={classes.statsOfCorrectAnswers}>
          Correct
          <br />
          {stats.correct}
        </Paper>
        <Paper elevation={15} className={classes.scoreStats}>
          Score
          <br />
          {stats.score}
        </Paper>
        <Paper elevation={15} className={classes.statsOfWrongAnswers}>
          Wrong
          <br />
          {stats.wrong}
        </Paper>
      </div>
      <div style={{ marginBottom: 50 }}>{task}</div>
      <div style={{ height: 33, marginBottom: 50, fontSize: 25 }}>
        {result.join(" ")}
      </div>
      <div style={{ minHeight: 50 }}>
        {result.length ? (
          <>
            <div className={classes.deleteButton} onClick={handleDelete}>
              {status === null ? (
                <HighlightOffIcon
                  className={`${classes.smallStatusIcon} ${classes.iconOfWrongStatus}`}
                />
              ) : null}
            </div>
            <Result status={status} rightAnswer={answer} />
          </>
        ) : null}
      </div>
      {/*<TableContainer*/}
      {/*  component={Paper}*/}
      {/*  elevation={15}*/}
      {/*  className={classes.tableContainer}*/}
      {/*>*/}
      {/*  <Table className={classes.table}>*/}
      {/*    <TableBody>*/}
      {/*      {possibleAnswers.length ? (*/}
      {/*        <>*/}
      {/*          <TableRow>*/}
      {/*            {possibleAnswers[randomNumber]*/}
      {/*              .slice(0, 3)*/}
      {/*              .map((option, index) => (*/}
      {/*                <TableCell*/}
      {/*                  key={option}*/}
      {/*                  align="center"*/}
      {/*                  className={`${classes.cell} ${*/}
      {/*                    result.includes(option) ? classes.selectedCell : ""*/}
      {/*                  } ${index === 0 ? classes.topLeftCellRadius : ""}*/}
      {/*              ${index === 2 ? classes.topRightCellRadius : ""}`}*/}
      {/*                  onClick={handleClick}*/}
      {/*                >*/}
      {/*                  {option}*/}
      {/*                </TableCell>*/}
      {/*              ))}*/}
      {/*          </TableRow>*/}
      {/*          <TableRow>*/}
      {/*            {possibleAnswers[randomNumber].slice(3, 6).map((option) => (*/}
      {/*              <TableCell*/}
      {/*                key={option}*/}
      {/*                align="center"*/}
      {/*                className={`${classes.cell} ${*/}
      {/*                  result.includes(option) ? classes.selectedCell : ""*/}
      {/*                }`}*/}
      {/*                onClick={handleClick}*/}
      {/*              >*/}
      {/*                {option}*/}
      {/*              </TableCell>*/}
      {/*            ))}*/}
      {/*          </TableRow>*/}
      {/*          <TableRow>*/}
      {/*            {possibleAnswers[randomNumber]*/}
      {/*              .slice(6, 9)*/}
      {/*              .map((option, index) => (*/}
      {/*                <TableCell*/}
      {/*                  key={option}*/}
      {/*                  align="center"*/}
      {/*                  className={`${classes.cell} ${*/}
      {/*                    result.includes(option) ? classes.selectedCell : ""*/}
      {/*                  } ${index === 0 ? classes.bottomLeftCellRadius : ""} ${*/}
      {/*                    index === 2 ? classes.bottomRightCellRadius : ""*/}
      {/*                  }`}*/}
      {/*                  onClick={handleClick}*/}
      {/*                >*/}
      {/*                  {option}*/}
      {/*                </TableCell>*/}
      {/*              ))}*/}
      {/*          </TableRow>*/}
      {/*        </>*/}
      {/*      ) : null}*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}
      {/*  {status !== null ? (*/}
      {/*    <div*/}
      {/*      className={classes.status}*/}
      {/*      onClick={!status ? handleClear : () => {}}*/}
      {/*    >*/}
      {/*      {status ? (*/}
      {/*        <CheckCircleOutlineOutlinedIcon*/}
      {/*          className={`${classes.bigStatusIcon} ${classes.iconOfCorrectStatus}`}*/}
      {/*        />*/}
      {/*      ) : (*/}
      {/*        <HighlightOffIcon*/}
      {/*          className={`${classes.bigStatusIcon} ${classes.iconOfWrongStatus}`}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  ) : null}*/}
      {/*</TableContainer>*/}
      <Lesson1 />
    </Container>
  );
};

export default LESSON_1;

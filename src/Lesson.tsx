import React from "react";
import { useParams } from "react-router-dom";
import {
  makeStyles,
  Container,
  TableContainer,
  Paper,
  Table,
  TableBody,
} from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Transition } from "react-transition-group";
import Result from "./Result";
import { shuffle } from "./utils";
import { IStats, ISentences, IPossibleAnswers } from "./interfaces";
import PossibleAnswersBlock from "./PossibleAnswersBlock";

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
  task: {
    marginBottom: 50,
  },
  result: {
    height: 33,
    marginBottom: 50,
    fontSize: 25,
  },
  correctAnswer: {
    minHeight: 50,
  },
  tableContainer: {
    position: "relative",
    maxWidth: 480,
  },
  table: {
    borderCollapse: "inherit",
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

const Lesson: React.FC = () => {
  const [sentences, setSentences] = React.useState<Array<string>>([]);
  const [possibleAnswers, setPossibleAnswers] = React.useState<Array<any>>([]);
  const [random, setRandom] = React.useState<number>(0);
  const [result, setResult] = React.useState<Array<string>>([]);
  const [status, setStatus] = React.useState<null | boolean>(null);
  const [stats, setStats] = React.useState<IStats>({
    correct: 0,
    wrong: 0,
    score: 0,
  });

  let { id: lessonPath }: { id: string } = useParams();
  const classes = useStyles();
  let task: string = "";
  let answer: string = "";
  const correctRef = React.useRef(null);
  const wrongRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      await fetch(`http://localhost:3001/lessons/${lessonPath}`)
        .then((res) => res.json())
        .then((json) => {
          setSentences(
            json.sentences.map((i: ISentences) => Object.values(i.sentence))
          );
          let result: Array<Array<string> | undefined> = [];
          json.sentences.map((i: IPossibleAnswers) => {
            return result.push(shuffle(Object.values(i.possibleAnswers)));
          });
          setPossibleAnswers(result);
        })
        .catch((e) => console.log(e));
    })();
    setRandom(Math.floor(Math.random() * sentences.length));
  }, [lessonPath, sentences.length]);

  if (possibleAnswers.length) {
    task = sentences[random][0];
    answer = sentences[random][1];
  }

  const next = (): void => {
    setRandom(Math.floor(Math.random() * sentences.length));
    setResult([]);
    setStatus(null);
  };
  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>): void => {
    let innerText: string = e.currentTarget.innerText;
    let classList: DOMTokenList = e.currentTarget.classList;
    let classListValue = classList.value;
    let rightAnswer = sentences[random][1];
    if (status !== null || classListValue.indexOf("selectedCell") !== -1)
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
  };
  const handleClear = (): void => {
    setResult([]);
    setStatus(null);
  };
  const correctStatus: any = {
    entering: {
      boxShadow: "0 0 10px 0px rgba(0, 128, 0, 1)",
      background: "rgba(0, 128, 0, .8)",
    },
  };
  const wrongStatus: any = {
    entering: {
      boxShadow: "0 0 10px 0px rgba(255, 0, 0, 1)",
      background: "rgba(255, 0, 0, .8)",
    },
  };

  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <Transition in={!!status} timeout={1000} nodeRef={correctRef}>
          {(state) => (
            <Paper
              elevation={15}
              className={classes.statsOfCorrectAnswers}
              style={{ ...correctStatus[state] }}
              ref={correctRef}
            >
              Correct
              <br />
              {stats.correct}
            </Paper>
          )}
        </Transition>
        <Paper elevation={15} className={classes.scoreStats}>
          Score
          <br />
          {stats.score}
        </Paper>
        <Transition in={status === false} timeout={1000} nodeRef={wrongRef}>
          {(state) => (
            <Paper
              elevation={15}
              className={classes.statsOfWrongAnswers}
              style={{ ...wrongStatus[state] }}
              ref={wrongRef}
            >
              Wrong
              <br />
              {stats.wrong}
            </Paper>
          )}
        </Transition>
      </div>
      <div className={classes.task}>{task || "..."}</div>
      <div className={classes.result}>{result.join(" ")}</div>
      <div className={classes.correctAnswer}>
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
      <TableContainer
        component={Paper}
        elevation={15}
        className={classes.tableContainer}
      >
        <Table className={classes.table}>
          <TableBody>
            {possibleAnswers[random] ? (
              <PossibleAnswersBlock
                possibleAnswers={possibleAnswers[random]}
                result={result}
                handleClick={handleClick}
              />
            ) : null}
          </TableBody>
        </Table>
        {status !== null ? (
          <div
            className={classes.status}
            onClick={!status ? handleClear : () => {}}
          >
            {status ? (
              <CheckCircleOutlineOutlinedIcon
                className={`${classes.bigStatusIcon} ${classes.iconOfCorrectStatus}`}
              />
            ) : (
              <HighlightOffIcon
                className={`${classes.bigStatusIcon} ${classes.iconOfWrongStatus}`}
              />
            )}
          </div>
        ) : null}
      </TableContainer>
    </Container>
  );
};

export default Lesson;

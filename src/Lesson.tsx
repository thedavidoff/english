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
import Result from "./Result";
import { shuffle } from "./utils";
import { IStats, ISentences, IPossibleAnswers } from "./interfaces";
import PossibleAnswersBlock from "./PossibleAnswersBlock";
import Header from "./Header";
import AudioPlayer from "./AudioPlayer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
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
const ids: string[] = [];

const Lesson: React.FC = () => {
  const [sentences, setSentences] = React.useState<Array<string | []>>([]);
  const [possibleAnswers, setPossibleAnswers] = React.useState<
    Array<Array<string>>
  >([]);
  const [random, setRandom] = React.useState<number>(0);
  const [result, setResult] = React.useState<Array<string>>([]);
  const [status, setStatus] = React.useState<null | boolean>(null);
  const [stats, setStats] = React.useState<IStats>({
    correct: 0,
    wrong: 0,
    score: 0,
  });

  const { id: lessonPath }: { id: string } = useParams();
  const classes = useStyles();
  let task: string | null = null;
  let answer: string = "";

  React.useEffect(() => {
    (async () => {
      await fetch(`http://localhost:3001/lessons/${lessonPath}`)
        .then((res) => res.json())
        .then((json) => {
          //console.log(json.sentences.length);

          setSentences(
            json.sentences.map((i: ISentences) => Object.values(i.sentence))
          );
          let result: Array<Array<string>> = [];
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
    if (Array.isArray(sentences[random][1])) {
      answer = `${sentences[random][1][0]
        .toString()
        .replaceAll(",", "/")} | ${sentences[random][1][1]
        .toString()
        .replaceAll(",", "/")}`;
    } else {
      answer = sentences[random][1];
    }
  }

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>): void => {
      let id = e.currentTarget.id;
      let innerText: string = e.currentTarget.innerText;
      let classList: DOMTokenList = e.currentTarget.classList;
      let classListValue = classList.value;
      let correctAnswer = sentences[random][1];
      if (status !== null || classListValue.indexOf("selectedCell") !== -1)
        return;

      setResult([...result, innerText]);
      ids.push(id);
      const next = (): void => {
        setRandom(Math.floor(Math.random() * sentences.length));
        setResult([]);
        ids.length = 0;
        setStatus(null);
      };

      if (Array.isArray(correctAnswer)) {
        // When there are several correct answers.
        if (
          correctAnswer[0].includes(result[0]) &&
          correctAnswer[1].includes(innerText)
        ) {
          setStatus(true);
          setStats({
            ...stats,
            correct: stats.correct + 1,
            score: stats.correct + 1 - stats.wrong,
          });
          setTimeout(() => next(), 1000);
          return;
        }
        if (correctAnswer.length === [...result, innerText].length) {
          setStatus(false);
          setStats({
            ...stats,
            wrong: stats.wrong + 1,
            score: stats.correct - 1 - stats.wrong,
          });
          return;
        }
        return;
      }
      if (correctAnswer === [...result, innerText].join(" ")) {
        // When there are one correct answer.
        setStatus(true);
        setStats({
          ...stats,
          correct: stats.correct + 1,
          score: stats.correct + 1 - stats.wrong,
        });
        setTimeout(() => next(), 1000);
        return;
      }
      if (correctAnswer.split(" ").length === [...result, innerText].length) {
        setStatus(false);
        setStats({
          ...stats,
          wrong: stats.wrong + 1,
          score: stats.correct - 1 - stats.wrong,
        });
      }
    },
    [random, result, sentences, stats, status]
  );
  const handleDelete = (): void => {
    setResult([...result.slice(0, -1)]);
    ids.length = ids.length - 1;
  };
  const handleClear = (): void => {
    setResult([]);
    setStatus(null);
    ids.length = 0;
  };

  return (
    <Container className={classes.container}>
      <Header stats={stats} status={status} />
      <div className={classes.task}>{task || "..."}</div>
      <div className={classes.result}>{result.join(" ")}</div>
      {task !== null ? (<AudioPlayer task={task} />) : null}
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
            <Result status={status} answer={answer} />
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
                ids={ids}
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

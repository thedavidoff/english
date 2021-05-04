import React from "react";
import { Transition } from "react-transition-group";
import { makeStyles, Paper } from "@material-ui/core";
import { IHeader } from "./interfaces";

const useStyles = makeStyles(theme => ({
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
}));

const Header: React.FC<IHeader> = ({ status, stats }) => {
  const classes = useStyles();
  const correctRef = React.useRef(null);
  const wrongRef = React.useRef(null);
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
  );
};

export default Header;

import React from "react";
import { makeStyles, Container } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
});

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <NavLink to="/">Урок 1-2</NavLink>
    </Container>
  );
};

export default Home;

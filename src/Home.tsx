import React from "react";
import { NavLink } from "react-router-dom";
import {
  makeStyles,
  Container,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableContainer,
  TableCell,
} from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  tableContainer: {
    position: "relative",
    maxWidth: 480,
  },
  tableOfLinks: {
    "& td": {
      display: "flex",
      padding: 0,
      "& a": {
        width: "100%",
        padding: 16,
        textDecoration: "none",
        "&:hover": {
          color: "#fff",
          background: "grey",
        },
      },
    },
    "& tr:last-child td": {
      borderBottom: "none",
    },
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const lessonNumbers: Array<string> = ["1-2", "3-4"];

  return (
    <Container className={classes.container}>
      <TableContainer
        component={Paper}
        elevation={15}
        className={classes.tableContainer}
      >
        <Table className={classes.tableOfLinks}>
          <TableBody>
            {lessonNumbers.map((lesson, index) => (
              <TableRow key={index}>
                <TableCell>
                  <NavLink to={`/${index + 1}`}>{`Урок ${
                    index + 1
                  } (${lesson})`}</NavLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;

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

  return (
    <Container className={classes.container}>
      <TableContainer
        component={Paper}
        elevation={15}
        className={classes.tableContainer}
      >
        <Table className={classes.tableOfLinks}>
          <TableBody>
            <TableRow>
              <TableCell>
                <NavLink to="/1">Урок 1 (1-2)</NavLink>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <NavLink to="/2">Урок 2 (3-4)</NavLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;

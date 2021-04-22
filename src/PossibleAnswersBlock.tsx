import React from "react";
import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import { IPossibleAnswersBlock } from "./interfaces";

const useStyles = makeStyles({
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
});

const PossibleAnswersBlock: React.FC<IPossibleAnswersBlock> = ({
  possibleAnswers,
  ids,
  handleClick,
}) => {
  const classes = useStyles();

  return (
    <>
      <TableRow>
        {possibleAnswers.slice(0, 3).map((option: string, index: number) => (
          <TableCell
            key={option + index}
            id={index.toString()}
            align="center"
            className={`${classes.cell} ${
              ids.includes(index.toString())
                ? classes.selectedCell
                : null
            } ${index === 0 ? classes.topLeftCellRadius : ""}
                    ${index === 2 ? classes.topRightCellRadius : ""}`}
            onClick={handleClick}
          >
            {option}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        {possibleAnswers.slice(3, 6).map((option: string, index: number) => (
          <TableCell
            key={option + index}
            id={(index + 3).toString()}
            align="center"
            className={`${classes.cell} ${
              ids.includes((index + 3).toString())
                ? classes.selectedCell
                : null
            }`}
            onClick={handleClick}
          >
            {option}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        {possibleAnswers.slice(6, 9).map((option: string, index: number) => (
          <TableCell
            key={option + index}
            id={(index + 6).toString()}
            align="center"
            className={`${classes.cell} ${
              ids.includes((index + 6).toString())
                ? classes.selectedCell
                : null
            } ${index === 0 ? classes.bottomLeftCellRadius : ""} ${
              index === 2 ? classes.bottomRightCellRadius : ""
            }`}
            onClick={handleClick}
          >
            {option}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

export default PossibleAnswersBlock;

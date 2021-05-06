import React from "react";
import { IInfoTableProps } from "./interfaces";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import Audio from "./Audio";
import InfoModal from "./InfoModal";

const useStyles = makeStyles({
  infoTable: {
    maxWidth: 480,
    "& tr": {
      height: 47,
    },
  },
  infoTableLeftCell: {
    padding: 8,
    textAlign: "right",
  },
  infoTableRightCell: {
    width: 93,
    padding: 8,
  },
  infoTableImg: {
    marginRight: 8,
    "&:last-child": {
      marginRight: 0,
    },
  },
});

const InfoTable: React.FC<IInfoTableProps> = React.memo(
  ({ task, transcriptions, translations }) => {
    const classes = useStyles();

    const slashPos: number = task.indexOf("/");
    const spacePos: number = task.indexOf(" ");
    let firstWord: string = "";
    let secondWord: string = "";

    if (slashPos !== -1) {
      // When there is a slash. For example: "do/does (делать, поступать)"
      firstWord = task.slice(0, slashPos);
      secondWord = task.slice(slashPos + 1, spacePos);
    } else {
      firstWord = task.split(" ")[0];
    }

    return (
      <Table className={classes.infoTable}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.infoTableLeftCell}>
              {firstWord}
            </TableCell>
            <TableCell className={classes.infoTableRightCell}>
              <Audio
                word={task.split(" ")[0]}
                lang="us"
                className={classes.infoTableImg}
              />
              <Audio
                word={task.split(" ")[0]}
                lang="uk"
                className={classes.infoTableImg}
              />
              <InfoModal
                word={firstWord}
                transcriptions={transcriptions}
                translations={translations}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            {secondWord ? (
              <>
                <TableCell className={classes.infoTableLeftCell}>
                  {secondWord}
                </TableCell>
                <TableCell className={classes.infoTableRightCell}>
                  <Audio
                    word={task.split(" ")[0]}
                    lang="us"
                    className={classes.infoTableImg}
                  />
                  <Audio
                    word={task.split(" ")[0]}
                    lang="uk"
                    className={classes.infoTableImg}
                  />
                  <InfoModal
                    word={firstWord}
                    transcriptions={transcriptions}
                    translations={translations}
                  />
                </TableCell>
              </>
            ) : null}
          </TableRow>
        </TableBody>
      </Table>
    );
  }
);

export default InfoTable;

import React from "react";
import useSound from "use-sound";
import { IAudioPlayerProps } from "./interfaces";
import US from "./sounds/us";
import UK from "./sounds/uk";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import InfoModal from "./InfoModal";
import USSVG from "./images/USSVG";
import UKSVG from "./images/UKSVG";

const useStyles = makeStyles({
  audioPlayerTable: {
    maxWidth: 480,
    "& tr": {
      height: 47,
    },
  },
  audioPlayerLeftCell: {
    padding: 8,
    textAlign: "right",
  },
  audioPlayerRightCell: {
    width: 93,
    padding: 8,
  },
  audioPlayerImg: {
    marginRight: 8,
    "&:last-child": {
      marginRight: 0,
    },
  },
  audioPlayerDisabledImg: {
    opacity: 0.3,
    "&:hover": {
      cursor: "inherit",
    },
  },
});

const AudioPlayer: React.FC<IAudioPlayerProps> = React.memo(({ task, transcriptions, translations }) => {
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

  const [playFirstWordUS]: any = useSound(US[firstWord]);
  const [playFirstWordUK]: any = useSound(UK[firstWord]);
  const [playSecondWordUS]: any = useSound(US[secondWord]);
  const [playSecondWordUK]: any = useSound(UK[secondWord]);

  return firstWord ? (
    <Table className={classes.audioPlayerTable}>
      <TableBody>
        <TableRow>
          <TableCell className={classes.audioPlayerLeftCell}>
            {firstWord}
          </TableCell>
          <TableCell className={classes.audioPlayerRightCell}>
            <USSVG
              disabled={!US[firstWord]}
              className={classes.audioPlayerImg}
              onClick={playFirstWordUS}
            />
            <UKSVG
              disabled={!UK[firstWord]}
              className={classes.audioPlayerImg}
              onClick={playFirstWordUK}
            />
            <InfoModal word={firstWord} transcriptions={transcriptions} translations={translations} />
          </TableCell>
        </TableRow>
        <TableRow>
          {secondWord ? (
            <>
              <TableCell className={classes.audioPlayerLeftCell}>
                {secondWord}
              </TableCell>
              <TableCell className={classes.audioPlayerRightCell}>
                <USSVG
                  disabled={!US[secondWord]}
                  className={classes.audioPlayerImg}
                  onClick={playSecondWordUS}
                />
                <UKSVG
                  disabled={!UK[secondWord]}
                  className={classes.audioPlayerImg}
                  onClick={playSecondWordUK}
                />
                <InfoModal word={secondWord} transcriptions={transcriptions} translations={translations} />
              </TableCell>
            </>
          ) : null}
        </TableRow>
      </TableBody>
    </Table>
  ) : null;
});

export default AudioPlayer;

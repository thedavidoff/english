import React from "react";
import useSound from "use-sound";
import { IAudioPlayer } from "./interfaces";
import US from "./sounds/us";
import UK from "./sounds/uk";
import usLogo from "./images/us.svg";
import usLogoHover from "./images/us-hover.svg";
import ukLogo from "./images/uk.svg";
import ukLogoHover from "./images/uk-hover.svg";
import infoLogo from "./images/info.svg";
import infoLogoHover from "./images/info-hover.svg";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  audioPlayerTable: {
    maxWidth: 480,
    "& tr": {
      height: 47
    }
  },
  audioPlayerLeftCell: {
    position: "relative",
    top: 2.5,
    padding: 8,
    textAlign: "right",
  },
  audioPlayerRightCell: {
    width: 93,
    padding: 8,
    "& img": {
      position: "relative",
      top: 2.5,
      marginRight: 8,
      "&:hover": {
        cursor: "pointer"
      }
    },
    "& img:last-child": {
      marginRight: 0
    },
  }
});

const AudioPlayer: React.FC<IAudioPlayer> = React.memo(({ task }) => {
  console.log(task);

  const classes = useStyles();

  const slashPos: number = task.indexOf("/");
  const spacePos: number = task.indexOf(" ");

  let firstWord: string = "";
  let secondWord: string = "";
  if (slashPos !== -1) {
    // For example: "do/does (делать)"
    firstWord = task.slice(0, slashPos);
    secondWord = task.slice(slashPos + 1, spacePos);
  } else {
    firstWord = task.split(" ")[0];
  }

  const [playFirstWordUS]: any = useSound(US[firstWord]);
  const [playSecondWordUS]: any = useSound(US[secondWord]);
  const [playFirstWordUK]: any = useSound(UK[firstWord]);
  const [playSecondWordUK]: any = useSound(UK[secondWord]);

  return firstWord ? (
    <Table className={classes.audioPlayerTable}>
      <TableBody>
        <TableRow>
          <TableCell className={classes.audioPlayerLeftCell}>
            {firstWord}
          </TableCell>
          <TableCell className={classes.audioPlayerRightCell}>
            <img
              src={usLogo}
              alt="us-flag"
              onMouseEnter={(e) => e.currentTarget.src = usLogoHover}
              onMouseLeave={(e) => e.currentTarget.src = usLogo}
              onClick={playFirstWordUS}
            />
            <img
              src={ukLogo}
              alt="uk-flag"
              onMouseEnter={(e) => e.currentTarget.src = ukLogoHover}
              onMouseLeave={(e) => e.currentTarget.src = ukLogo}
              onClick={playFirstWordUK}
            />
            <img
              src={infoLogo}
              alt="info"
              onMouseEnter={(e) => e.currentTarget.src = infoLogoHover}
              onMouseLeave={(e) => e.currentTarget.src = infoLogo}
              onClick={() => console.log("click")}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          {secondWord ? (
            <>
              <TableCell className={classes.audioPlayerLeftCell}>
                {secondWord}
              </TableCell>
              <TableCell className={classes.audioPlayerRightCell}>
                <img
                  src={usLogo}
                  alt="us-flag"
                  onMouseEnter={(e) => e.currentTarget.src = usLogoHover}
                  onMouseLeave={(e) => e.currentTarget.src = usLogo}
                  onClick={playSecondWordUS}
                />
                <img
                  src={ukLogo}
                  alt="uk-flag"
                  onMouseEnter={(e) => e.currentTarget.src = ukLogoHover}
                  onMouseLeave={(e) => e.currentTarget.src = ukLogo}
                  onClick={playSecondWordUK}
                />
                <img
                  src={infoLogo}
                  alt="info"
                  onMouseEnter={(e) => e.currentTarget.src = infoLogoHover}
                  onMouseLeave={(e) => e.currentTarget.src = infoLogo}
                  onClick={() => console.log("click")}
                />
              </TableCell>
            </>
          ) : null}
        </TableRow>
      </TableBody>
    </Table>
  ) : null;
});

export default AudioPlayer;

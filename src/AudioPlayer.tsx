import React from "react";
import useSound from "use-sound";
import { IAudioPlayerProps } from "./interfaces";
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
    "&:hover": {
      cursor: "pointer",
    },
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

//let renders = 0;

const AudioPlayer: React.FC<IAudioPlayerProps> = React.memo(({ task }) => {
  // ++renders;
  // console.log(renders);

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

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    let hasClass;
    target.classList.forEach((val) => {
      if (val.indexOf("audioPlayerDisabledImg") === -1) {
        hasClass = false;
        return;
      }
      hasClass = true;
    });
    if (hasClass) {
      return;
    }
    switch (target.alt) {
      case "usLogo":
        target.src = usLogoHover;
        return;
      case "ukLogo":
        target.src = ukLogoHover;
        return;
      case "infoLogo":
        target.src = infoLogoHover;
        return;
    }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    switch (target.alt) {
      case "usLogo":
        target.src = usLogo;
        return;
      case "ukLogo":
        target.src = ukLogo;
        return;
      case "infoLogo":
        target.src = infoLogo;
        return;
    }
  };

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
            <img
              src={usLogo}
              alt="usLogo"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={playFirstWordUS}
              className={US[firstWord] ? classes.audioPlayerImg : `${classes.audioPlayerImg} ${classes.audioPlayerDisabledImg}`}
            />
            <img
              src={ukLogo}
              alt="ukLogo"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={playFirstWordUK}
              className={UK[firstWord] ? classes.audioPlayerImg : `${classes.audioPlayerImg} ${classes.audioPlayerDisabledImg}`}
            />
            <img
              src={infoLogo}
              alt="infoLogo"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={classes.audioPlayerImg}
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
                  alt="usLogo"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={playSecondWordUS}
                  className={US[secondWord] ? classes.audioPlayerImg : `${classes.audioPlayerImg} ${classes.audioPlayerDisabledImg}`}
                />
                <img
                  src={ukLogo}
                  alt="ukLogo"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={playSecondWordUK}
                  className={UK[secondWord] ? classes.audioPlayerImg : `${classes.audioPlayerImg} ${classes.audioPlayerDisabledImg}`}
                />
                <img
                  src={infoLogo}
                  alt="infoLogo"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={classes.audioPlayerImg}
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

import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IInfoModalProps } from "./interfaces";
import infoLogo from "./images/info.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    audioPlayerImg: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    infoModalCloseButton: {
      position: "absolute",
      top: 0,
      right: 0,
      "&:hover": {
        color: "#f00",
      },
    },
    infoModalTranslationsList: {
      margin: 0,
      paddingLeft: 10,
      listStyle: "none",
      "& li": {
        margin: ".5em 0",
        wordBreak: "break-all"
      },
    },
  })
);

const InfoModal: React.FC<IInfoModalProps> = ({
  word,
  transcriptions,
  translations,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const nodeRef = React.useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <img
        src={infoLogo}
        alt="infoLogo"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes.audioPlayerImg}
        onClick={handleOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <IconButton
          aria-label="close"
          className={classes.infoModalCloseButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="scroll-dialog-title">{word}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={nodeRef}
            tabIndex={-1}
          >
            <p>
              <i>амер.</i> <span>| {transcriptions[word][0]} |</span>
            </p>
            {transcriptions[word][1] ? (
              <p>
                <i>брит.</i> <span>| {transcriptions[word][1]} |</span>
              </p>
            ) : null}
            <hr />
            <ul className={classes.infoModalTranslationsList}>
              {translations.split(", ").map((i: string) => {
                return <li>- {i}</li>;
              })}
            </ul>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfoModal;

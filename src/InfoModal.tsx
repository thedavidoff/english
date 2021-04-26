import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Modal,
  Backdrop,
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
    infoModal: {
      height: "100%",
      position: "absolute",
      top: "50% !important",
      left: "50% !important",
      //display: "flex",
      overflow: "scroll",
      // alignItems: "center",
      // justifyContent: "center",
    },
    infoModalPaper: {
      position: "relative",
      top: "-50% !important",
      left: "-50% !important",
      maxWidth: 288,
      padding: theme.spacing(2, 5, 3),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[15],
      borderRadius: 10,
      "&:focus-visible": {
        outline: "none",
      },
      boxSizing: "border-box",
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

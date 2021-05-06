import React from "react";
import {
  makeStyles,
  createStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IInfoModalProps } from "./interfaces";
import InfoSVG from "./images/InfoSVG";
import {addItalicToLi} from "./utils";

const useStyles = makeStyles(() =>
  createStyles({
    infoModal: {
      borderRadius: 10,
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
        wordBreak: "break-all",
      },
      "& i": {
        fontSize: 12,
        color: "#909090"
      }
    },
  })
);

const InfoModal: React.FC<IInfoModalProps> = ({
  word,
  transcriptions,
  translations,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const nodeRef = React.useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <InfoSVG onClick={handleOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        PaperProps={{ classes: { root: classes.infoModal } }}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal--description"
      >
        <IconButton
          aria-label="close"
          className={classes.infoModalCloseButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="info-modal-title">{word}</DialogTitle>
        <DialogContent id="info-modal-description" ref={nodeRef} tabIndex={-1}>
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
            {translations.split("; ").map((t: string, index: number) => addItalicToLi(t, index))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfoModal;

import React from "react";
import { Transition } from "react-transition-group";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import infoLogo from "./images/info.svg";
import { IInfoModalProps } from "./interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    audioPlayerImg: {
      marginRight: 8,
      "&:hover": {
        cursor: "pointer",
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const InfoModal: React.FC<IInfoModalProps> = ({
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img
        src={infoLogo}
        alt="infoLogo"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes.audioPlayerImg}
        onClick={handleOpen}
      />
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Transition in={open} timeout={0}>
          <div className={classes.paper}>
            <h2>Transition modal</h2>
            <p>react-transition-group animates me.</p>
          </div>
        </Transition>
      </Modal>
    </div>
  );
};

export default InfoModal;

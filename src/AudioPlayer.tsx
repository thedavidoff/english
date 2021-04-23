import React from "react";
import useSound from "use-sound";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { IAudioPlayer } from "./interfaces";
import US from "./sounds/us";
import UK from "./sounds/uk";
import usLogo from "./images/us.svg";
import ukLogo from "./images/uk.svg";

const AudioPlayer: React.FC<IAudioPlayer> = ({ task }) => {
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

  return (
    <div>
      <div style={{display: "flex", alignItems: "center"}}>
        {firstWord}
        <div style={{display: "flex", alignItems: "center"}} onClick={playFirstWordUS}>
          <img src={usLogo} alt="us-flag" style={{width: 25}} />
          <PlayCircleOutlineIcon color="primary" style={{fontSize: 30}} />
        </div>
        <div style={{display: "flex", alignItems: "center"}} onClick={playFirstWordUK}>
          <img src={ukLogo} alt="uk-flag" style={{width: 25}} />
          <PlayCircleOutlineIcon color="primary" />
        </div>
      </div>
      {secondWord ? (
        <>
          <div onClick={playSecondWordUS}>
            {secondWord}
            <PlayCircleOutlineIcon color="primary" />
          </div>
          <div onClick={playSecondWordUK}>
            <PlayCircleOutlineIcon color="primary" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AudioPlayer;

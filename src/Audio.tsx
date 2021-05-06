import React from "react";
import useSound from "use-sound";
import { IAudioProps } from "./interfaces";
import US from "./sounds/us";
import UK from "./sounds/uk";
import USSVG from "./images/USSVG";
import UKSVG from "./images/UKSVG";

const Audio: React.FC<IAudioProps> = ({ word, lang, ...props }) => {
  const [playUS]: any = useSound(US[word]);
  const [playUK]: any = useSound(UK[word]);

  switch (lang) {
    case "us":
      return (
        <USSVG
          disabled={!US[word]}
          onClick={playUS}
          {...props}
        />
      );
    case "uk":
      return (
        <UKSVG
          disabled={!UK[word]}
          onClick={playUK}
          {...props}
        />
      );
    default:
      return null;
  }
};

export default Audio;

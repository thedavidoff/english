import React from "react";
import { makeStyles } from "@material-ui/core";
import { ISVGProps } from "../interfaces";

const useStyles = makeStyles({
  infoSVG: {
    stroke: "none",
    fillRule: "nonzero",
    fill: "rgb(74,164,255)",
    fillOpacity: 1,
    "&:hover": {
      fill: "rgb(0,126,253)",
      cursor: "pointer",
    },
  },
});

const InfoSVG: React.FC<ISVGProps> = ({ className, onClick }) => {
  const classes = useStyles();
  return (
    <svg
      onClick={onClick}
      className={`${classes.infoSVG} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="25px"
      height="25px"
      viewBox="0 0 25 25"
      version="1.1"
    >
      <g>
        <path d="M 12.5 25 C 19.402344 25 25 19.402344 25 12.5 C 25 5.597656 19.402344 0 12.5 0 C 5.597656 0 0 5.597656 0 12.5 C 0 19.402344 5.597656 25 12.5 25 Z M 13.542969 18.75 L 11.457031 18.75 L 11.457031 10.417969 L 13.542969 10.417969 Z M 12.5 5.988281 C 13.21875 5.988281 13.800781 6.574219 13.800781 7.292969 C 13.800781 8.011719 13.21875 8.59375 12.5 8.59375 C 11.78125 8.59375 11.199219 8.011719 11.199219 7.292969 C 11.199219 6.574219 11.78125 5.988281 12.5 5.988281 Z M 12.5 5.988281 " />
      </g>
    </svg>
  );
};

export default InfoSVG;

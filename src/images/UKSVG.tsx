import React from "react";
import { makeStyles } from "@material-ui/core";
import { ISVGProps } from "../interfaces";

const useStyles = makeStyles({
  UKSVG: {
    stroke: "none",
    fillRule: "nonzero",
    fillOpacity: 1,
    "&:hover": {
      cursor: "pointer",
      "& path:nth-child(n + 2)": {
        fill: "#d30026"
      },
      "& path:nth-child(n + 10)": {
        fill: "#004faf"
      }
    },
  },
  UKSVGDisabled: {
    opacity: .3
  }
});

const UKSVG: React.FC<ISVGProps> = ({ disabled, className, onClick }) => {
  const classes = useStyles();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={`${disabled ? classes.UKSVGDisabled : classes.UKSVG} ${className}`}
      width="25px"
      height="25px"
      viewBox="0 0 25 25"
      version="1.1"
    >
      <g>
        <path
          fill="#fff"
          d="M 25 12.5 C 25 19.402344 19.402344 25 12.5 25 C 5.597656 25 0 19.402344 0 12.5 C 0 5.597656 5.597656 0 12.5 0 C 19.402344 0 25 5.597656 25 12.5 Z M 25 12.5 "
        />
        <path
          fill="#004faf"
          d="M 2.585938 4.890625 C 1.601562 6.167969 0.863281 7.640625 0.429688 9.238281 L 6.933594 9.238281 Z M 2.585938 4.890625 "
        />
        <path
          fill="#004faf"
          d="M 24.570312 9.238281 C 24.136719 7.640625 23.398438 6.167969 22.414062 4.890625 L 18.066406 9.238281 Z M 24.570312 9.238281 "
        />
        <path
          fill="#004faf"
          d="M 0.429688 15.761719 C 0.863281 17.359375 1.601562 18.832031 2.585938 20.109375 L 6.933594 15.761719 Z M 0.429688 15.761719 "
        />
        <path
          fill="#004faf"
          d="M 20.109375 2.585938 C 18.832031 1.601562 17.359375 0.863281 15.761719 0.429688 L 15.761719 6.933594 Z M 20.109375 2.585938 "
        />
        <path
          fill="#004faf"
          d="M 4.890625 22.414062 C 6.167969 23.398438 7.640625 24.136719 9.238281 24.570312 L 9.238281 18.066406 Z M 4.890625 22.414062 "
        />
        <path
          fill="#004faf"
          d="M 9.238281 0.429688 C 7.640625 0.863281 6.167969 1.601562 4.890625 2.585938 L 9.238281 6.933594 Z M 9.238281 0.429688 "
        />
        <path
          fill="#004faf"
          d="M 15.761719 24.570312 C 17.359375 24.136719 18.832031 23.398438 20.109375 22.414062 L 15.761719 18.066406 Z M 15.761719 24.570312 "
        />
        <path
          fill="#004faf"
          d="M 18.066406 15.761719 L 22.414062 20.109375 C 23.398438 18.832031 24.136719 17.359375 24.570312 15.761719 Z M 18.066406 15.761719 "
        />
        <path
          fill="#d30026"
          d="M 24.894531 10.871094 L 14.128906 10.871094 L 14.128906 0.105469 C 13.597656 0.0351562 13.050781 0 12.5 0 C 11.949219 0 11.402344 0.0351562 10.871094 0.105469 L 10.871094 10.871094 L 0.105469 10.871094 C 0.0351562 11.402344 0 11.949219 0 12.5 C 0 13.050781 0.0351562 13.597656 0.105469 14.128906 L 10.871094 14.128906 L 10.871094 24.894531 C 11.402344 24.964844 11.949219 25 12.5 25 C 13.050781 25 13.597656 24.964844 14.128906 24.894531 L 14.128906 14.128906 L 24.894531 14.128906 C 24.964844 13.597656 25 13.050781 25 12.5 C 25 11.949219 24.964844 11.402344 24.894531 10.871094 Z M 24.894531 10.871094 "
        />
        <path
          fill="#d30026"
          d="M 15.761719 15.761719 L 21.339844 21.339844 C 21.59375 21.082031 21.839844 20.8125 22.074219 20.535156 L 17.296875 15.761719 Z M 15.761719 15.761719 "
        />
        <path
          fill="#d30026"
          d="M 9.238281 15.761719 L 3.660156 21.339844 C 3.917969 21.59375 4.1875 21.839844 4.464844 22.074219 L 9.238281 17.296875 Z M 9.238281 15.761719 "
        />
        <path
          fill="#d30026"
          d="M 9.238281 9.238281 L 3.660156 3.660156 C 3.40625 3.917969 3.160156 4.1875 2.925781 4.464844 L 7.703125 9.238281 Z M 9.238281 9.238281 "
        />
        <path
          fill="#d30026"
          d="M 15.761719 9.238281 L 21.339844 3.660156 C 21.082031 3.40625 20.8125 3.160156 20.535156 2.925781 L 15.761719 7.703125 Z M 15.761719 9.238281 "
        />
      </g>
    </svg>
  );
};

export default UKSVG;

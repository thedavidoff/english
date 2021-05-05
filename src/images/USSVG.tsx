import React from "react";
import { makeStyles } from "@material-ui/core";
import { ISVGProps } from "../interfaces";

const useStyles = makeStyles({
  USSVG: {
    stroke: "none",
    fillRule: "nonzero",
    fillOpacity: 1,
    "&:hover": {
      cursor: "pointer",
      "& path:nth-child(n + 2)": {
        fill: "#0052b4",
      },
      "& path:last-child": {
        fill: "#d80027",
      },
    },
  },
  USSVGDisabled: {
    opacity: .3
  }
});

const USSVG: React.FC<ISVGProps> = ({ disabled, className, onClick }) => {
  const classes = useStyles();
  // red #d80027
  // blue #0052b4
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={`${disabled ? classes.USSVGDisabled : classes.USSVG} ${className}`}
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
          fill="#d80027"
          d="M 11.957031 12.5 L 25 12.5 C 25 11.371094 24.851562 10.277344 24.570312 9.238281 L 11.957031 9.238281 Z M 11.957031 12.5 "
        />
        <path
          fill="#d80027"
          d="M 11.957031 5.976562 L 23.164062 5.976562 C 22.398438 4.730469 21.421875 3.625 20.28125 2.71875 L 11.957031 2.71875 Z M 11.957031 5.976562 "
        />
        <path
          fill="#d80027"
          d="M 12.5 25 C 15.441406 25 18.144531 23.984375 20.28125 22.28125 L 4.71875 22.28125 C 6.855469 23.984375 9.558594 25 12.5 25 Z M 12.5 25 "
        />
        <path
          fill="#d80027"
          d="M 1.835938 19.023438 L 23.164062 19.023438 C 23.78125 18.019531 24.257812 16.921875 24.570312 15.761719 L 0.429688 15.761719 C 0.742188 16.921875 1.21875 18.019531 1.835938 19.023438 Z M 1.835938 19.023438 "
        />
        <path
          fill="#0052b4"
          d="M 5.789062 1.953125 L 6.929688 1.953125 L 5.871094 2.722656 L 6.273438 3.96875 L 5.214844 3.199219 L 4.15625 3.96875 L 4.503906 2.890625 C 3.570312 3.667969 2.753906 4.578125 2.082031 5.59375 L 2.445312 5.59375 L 1.769531 6.082031 C 1.667969 6.257812 1.566406 6.4375 1.46875 6.617188 L 1.789062 7.609375 L 1.191406 7.171875 C 1.039062 7.488281 0.902344 7.8125 0.78125 8.140625 L 1.136719 9.234375 L 2.445312 9.234375 L 1.386719 10.003906 L 1.789062 11.25 L 0.730469 10.480469 L 0.0976562 10.941406 C 0.03125 11.453125 0 11.972656 0 12.5 L 12.5 12.5 C 12.5 5.597656 12.5 4.78125 12.5 0 C 10.03125 0 7.730469 0.714844 5.789062 1.953125 Z M 6.273438 11.25 L 5.214844 10.480469 L 4.15625 11.25 L 4.558594 10.003906 L 3.5 9.234375 L 4.808594 9.234375 L 5.214844 7.988281 L 5.621094 9.234375 L 6.929688 9.234375 L 5.871094 10.003906 Z M 5.871094 6.363281 L 6.273438 7.609375 L 5.214844 6.839844 L 4.15625 7.609375 L 4.558594 6.363281 L 3.5 5.59375 L 4.808594 5.59375 L 5.214844 4.347656 L 5.621094 5.59375 L 6.929688 5.59375 Z M 10.757812 11.25 L 9.699219 10.480469 L 8.640625 11.25 L 9.042969 10.003906 L 7.984375 9.234375 L 9.292969 9.234375 L 9.699219 7.988281 L 10.101562 9.234375 L 11.414062 9.234375 L 10.351562 10.003906 Z M 10.351562 6.363281 L 10.757812 7.609375 L 9.699219 6.839844 L 8.640625 7.609375 L 9.042969 6.363281 L 7.984375 5.59375 L 9.292969 5.59375 L 9.699219 4.347656 L 10.101562 5.59375 L 11.414062 5.59375 Z M 10.351562 2.722656 L 10.757812 3.96875 L 9.699219 3.199219 L 8.640625 3.96875 L 9.042969 2.722656 L 7.984375 1.953125 L 9.292969 1.953125 L 9.699219 0.707031 L 10.101562 1.953125 L 11.414062 1.953125 Z M 10.351562 2.722656 "
        />
      </g>
    </svg>
  );
};

export default USSVG;
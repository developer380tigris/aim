import React from "react";
import generateValue from "../Utils/generateValue";
import Ball from "./Ball";
import "./SVGCanvas.css";

function SVGCanvas({ currentClick }) {
  const [balls, setBalls] = React.useState(
    Array.from({ length: 1 }, (_el, index) => ({
      key: index++,
      cx: generateValue().generateCX(),
      cy: generateValue().generateCY(),
    }))
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      balls.length < 50
        ? balls.push({
            key: generateValue().generateCX(),
            cx: generateValue().generateCX(),
            cy: generateValue().generateCY(),
          })
        : clearInterval(intervalId);
    }, 500);
    return () => clearInterval(intervalId);
  });

  const removeBall = (i) => {
    setBalls(balls.filter((item, j) => i !== j));
  };
  return (
    <svg
      className="svg-canvas"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 500"
    >
      <g className="svg-canvas__console">
        {balls.map((item, i) => {
          return (
            <text key={i} x="10" y={i * 7 + 10} fontSize="8px">
              ball-{item.key}
            </text>
          );
        })}
      </g>
      {balls?.map((item, i) => {
        return (
          <Ball
            key={item.key}
            cx={item.cx}
            cy={item.cy}
            index={i}
            removeBall={() => {
              removeBall(i);
            }}
          />
        );
      })}
    </svg>
  );
}

export default SVGCanvas;

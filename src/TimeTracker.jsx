import React, { useState } from "react";
import "./TimeTracker.css";

import profile from "./images/image-jeremy.png";

import one from "./images/icon-work.svg";
import two from "./images/icon-play.svg";
import three from "./images/icon-study.svg";
import four from "./images/icon-exercise.svg";
import five from "./images/icon-social.svg";
import six from "./images/icon-self-care.svg";

import dot from "./images/icon-ellipsis.svg";

import data from "../data.json";

const arr = [
  { id: 1, img: one },
  { id: 2, img: two },
  { id: 3, img: three },
  { id: 4, img: four },
  { id: 5, img: five },
  { id: 6, img: six },
];

const TimeTracker = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");

  const handleClick = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };
  return (
    <div className="timeTracker">
      <div className="wrapper">
        <div className="left">
          <div className="profile">
            <img src={profile} alt="profile" />
            <div className="title">
              <span>Report for</span>
              <h1>
                Jeremy <br /> Robson
              </h1>
            </div>
          </div>
          <ul>
            <li onClick={() => handleClick("daily")}>Daily</li>
            <li onClick={() => handleClick("weekly")}>Weekly</li>
            <li onClick={() => handleClick("monthly")}>Monthly</li>
          </ul>
        </div>
        <div className="right">
          {data.map((item, index) => (
            <div className={`content-${index + 1}`} key={index}>
              <img
                src={arr.find((item) => item.id === index + 1)?.img}
                alt=""
              />

              <div className="content">
                <div>
                  <h2>{item.title}</h2>
                  <img src={dot} alt="" />
                </div>
                <span>{item.timeframes[selectedTimeframe].current} hrs</span>
                <p>
                  Last{" "}
                  {selectedTimeframe === "monthly"
                    ? "month"
                    : selectedTimeframe === "weekly"
                    ? "week"
                    : "day"}{" "}
                  {item.timeframes[selectedTimeframe].previous}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;

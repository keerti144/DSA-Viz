import React, { useState, useRef } from "react";
import Button from "../../ui/Button";
import getLinearSearch from "./getlinearsearch";
import { BackButton } from "../../ui/BackButton";
import classes from "../Searching.module.css";

const LinearSearch = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const elementRefs = useRef([]);

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    elementRefs.current = [];
  };

  const visualizeSearch = () => {
    const animations = getLinearSearch(array, Number(target));
    animations.forEach((idx, i) => {
      setTimeout(() => {
        if (elementRefs.current[idx]) {
          elementRefs.current[idx].style.backgroundColor = "#4caf50";
        }
      }, i * 500);
    });
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <h2 className={classes.heading}>Linear Search</h2>

      <div className={classes.arrayContainer}>
        {array.map((value, idx) => (
          <div
            key={idx}
            ref={(el) => (elementRefs.current[idx] = el)}
            className={classes.arrayElement}
          >
            {value}
          </div>
        ))}
      </div>

      <div className={classes.controls}>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter target"
          className={classes.input}
        />
        <Button onClick={generateArray}>Generate Array</Button>
        <Button onClick={visualizeSearch}>Start Search</Button>
      </div>
    </div>
  );
};

export default LinearSearch;

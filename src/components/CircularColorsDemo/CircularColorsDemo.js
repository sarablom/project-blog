"use client";
import React, { useEffect, useState, useId } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const id = useId();

  function getColor(timeElapsed) {
    const colorIndex = timeElapsed % COLORS.length;

    return COLORS[colorIndex];
  }

  useEffect(() => {
    let startTimer;

    if (timerStarted) {
      startTimer = setTimeout(() => {
        const nextValue = timeElapsed + 1;
        setTimeElapsed(nextValue);
        setSelectedColor(getColor(nextValue));
      }, 1000);
    }

    return () => {
      clearTimeout(startTimer);
    };
  }, [timerStarted, timeElapsed]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-modula-operator-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => setTimerStarted(!timerStarted)}>
            {timerStarted ? <Pause /> : <Play />}
            <VisuallyHidden>{timerStarted ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setTimerStarted(false);
              setTimeElapsed(0);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;

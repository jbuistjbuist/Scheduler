import { useState } from "react";

/**
 * custom hook used by the appointment component to switch back and forth between the display of its components
 * @param {string} initial initial value to be set as the state
 * @returns {object} object containing the state and methods for changing the state
 */
const useVisualMode = function (initial) {
  const [history, setHistory] = useState([initial]);

  //transition to a new state and save the current state in history. if replace=true, replace the previous state.
  const transition = function (newMode, replace = false) {
    setHistory((prev) => {
      return replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode];
    });
  };

  //go back one step in the history, to display the previous component shown
  const back = function () {
    if (history.length < 2) {
      return;
    }

    setHistory((prev) => {
      return prev.slice(0, -1);
    });
  };

  const mode = history[history.length - 1];

  return { mode, transition, back };
};

export default useVisualMode;

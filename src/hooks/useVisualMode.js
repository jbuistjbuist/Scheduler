import { useState } from "react";


const useVisualMode = function (initial) {

  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {

    setHistory(prev => {

      return replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode];
    
    });
  };

  const back = function () {

    if (history.length < 2) {
      return;
    }

    setHistory(prev => {
      return prev.slice(0, -1);
    });
  };


  const mode = history[history.length -1];

  return { mode, transition, back };
};

export default useVisualMode;